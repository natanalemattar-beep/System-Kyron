import { createHash } from 'crypto';

export type ChainConfig = {
  chainId: number;
  name: string;
  rpcUrl: string;
  explorerUrl: string;
  symbol: string;
};

export const SUPPORTED_CHAINS: Record<string, ChainConfig> = {
  polygon: {
    chainId: 137,
    name: 'Polygon',
    rpcUrl: 'https://polygon-rpc.com',
    explorerUrl: 'https://polygonscan.com',
    symbol: 'MATIC',
  },
  ethereum: {
    chainId: 1,
    name: 'Ethereum',
    rpcUrl: 'https://eth.llamarpc.com',
    explorerUrl: 'https://etherscan.io',
    symbol: 'ETH',
  },
  bsc: {
    chainId: 56,
    name: 'BNB Smart Chain',
    rpcUrl: 'https://bsc-dataseed.binance.org',
    explorerUrl: 'https://bscscan.com',
    symbol: 'BNB',
  },
  polygon_amoy: {
    chainId: 80002,
    name: 'Polygon Amoy (Testnet)',
    rpcUrl: 'https://rpc-amoy.polygon.technology',
    explorerUrl: 'https://amoy.polygonscan.com',
    symbol: 'MATIC',
  },
};

export type BlockchainProofStatus = 'pending' | 'anchored' | 'verified' | 'failed';

export interface ProofData {
  entityType: string;
  entityId: string | number;
  dataHash: string;
  payload: Record<string, unknown>;
  timestamp: number;
}

export interface AnchorResult {
  success: boolean;
  txHash?: string;
  blockNumber?: number;
  chainId?: number;
  chainName?: string;
  error?: string;
}

function canonicalize(value: unknown): string {
  if (value === null || value === undefined) return 'null';
  if (typeof value === 'boolean' || typeof value === 'number') return String(value);
  if (typeof value === 'string') return JSON.stringify(value);
  if (Array.isArray(value)) {
    return '[' + value.map(canonicalize).join(',') + ']';
  }
  if (typeof value === 'object') {
    const obj = value as Record<string, unknown>;
    const keys = Object.keys(obj).sort();
    return '{' + keys.map(k => JSON.stringify(k) + ':' + canonicalize(obj[k])).join(',') + '}';
  }
  return String(value);
}

export function generateDataHash(data: Record<string, unknown>): string {
  const normalized = canonicalize(data);
  return createHash('sha256').update(normalized).digest('hex');
}

export function generateMerkleRoot(hashes: string[]): string {
  if (hashes.length === 0) return '';
  if (hashes.length === 1) return hashes[0];

  const nextLevel: string[] = [];
  for (let i = 0; i < hashes.length; i += 2) {
    const left = hashes[i];
    const right = i + 1 < hashes.length ? hashes[i + 1] : left;
    const combined = createHash('sha256').update(left + right).digest('hex');
    nextLevel.push(combined);
  }
  return generateMerkleRoot(nextLevel);
}

export function generateProofPayload(params: {
  tablaAfectada: string;
  registroId?: number | null;
  operacion: string;
  datosAnteriores?: Record<string, unknown> | null;
  datosNuevos?: Record<string, unknown> | null;
  camposModificados?: string[];
  userId?: number | null;
  riskLevel?: string;
  timestamp?: number;
}): ProofData {
  const timestamp = params.timestamp || Date.now();
  const payload: Record<string, unknown> = {
    tabla: params.tablaAfectada,
    registro_id: params.registroId,
    operacion: params.operacion,
    datos_anteriores: params.datosAnteriores || null,
    datos_nuevos: params.datosNuevos || null,
    campos_modificados: params.camposModificados || [],
    user_id: params.userId,
    risk_level: params.riskLevel || 'low',
    timestamp,
  };

  return {
    entityType: params.tablaAfectada,
    entityId: params.registroId || 0,
    dataHash: generateDataHash(payload),
    payload,
    timestamp,
  };
}

function isBlockchainConfigured(): boolean {
  return !!(
    process.env.BLOCKCHAIN_RPC_URL &&
    process.env.BLOCKCHAIN_PRIVATE_KEY
  );
}

function getActiveChain(): ChainConfig {
  const chainKey = process.env.BLOCKCHAIN_CHAIN || 'polygon_amoy';
  return SUPPORTED_CHAINS[chainKey] || SUPPORTED_CHAINS.polygon_amoy;
}

export async function anchorHashOnChain(dataHash: string): Promise<AnchorResult> {
  if (!isBlockchainConfigured()) {
    return {
      success: false,
      error: 'Blockchain not configured. Set BLOCKCHAIN_RPC_URL and BLOCKCHAIN_PRIVATE_KEY.',
    };
  }

  try {
    const { ethers } = await import('ethers');
    const chain = getActiveChain();
    const rpcUrl = process.env.BLOCKCHAIN_RPC_URL || chain.rpcUrl;

    const provider = new ethers.JsonRpcProvider(rpcUrl);
    const wallet = new ethers.Wallet(process.env.BLOCKCHAIN_PRIVATE_KEY!, provider);

    const tx = await wallet.sendTransaction({
      to: wallet.address,
      value: 0n,
      data: ethers.hexlify(ethers.toUtf8Bytes(`KYRON_PROOF:${dataHash}`)),
    });

    const receipt = await tx.wait();

    return {
      success: true,
      txHash: receipt?.hash || tx.hash,
      blockNumber: receipt?.blockNumber || 0,
      chainId: chain.chainId,
      chainName: chain.name,
    };
  } catch (err) {
    console.error('[blockchain] Anchor failed:', err);
    return {
      success: false,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

export async function anchorBatchOnChain(hashes: string[]): Promise<AnchorResult> {
  if (hashes.length === 0) {
    return { success: false, error: 'No hashes to anchor' };
  }

  const merkleRoot = generateMerkleRoot(hashes);
  return anchorHashOnChain(merkleRoot);
}

export async function verifyHashIntegrity(
  originalData: Record<string, unknown>,
  storedHash: string
): Promise<{ valid: boolean; computedHash: string; match: boolean }> {
  const computedHash = generateDataHash(originalData);
  return {
    valid: true,
    computedHash,
    match: computedHash === storedHash,
  };
}

export function getExplorerUrl(txHash: string, chainKey?: string): string {
  const chain = SUPPORTED_CHAINS[chainKey || process.env.BLOCKCHAIN_CHAIN || 'polygon_amoy'];
  if (!chain) return '';
  return `${chain.explorerUrl}/tx/${txHash}`;
}

export function getBlockchainStatus(): {
  configured: boolean;
  chain: ChainConfig;
  walletConfigured: boolean;
} {
  return {
    configured: isBlockchainConfigured(),
    chain: getActiveChain(),
    walletConfigured: !!process.env.BLOCKCHAIN_PRIVATE_KEY,
  };
}
