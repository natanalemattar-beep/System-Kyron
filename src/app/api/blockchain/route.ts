import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getSession } from '@/lib/auth';
import {
  getBlockchainStatus,
  verifyHashIntegrity,
  anchorBatchOnChain,
  generateMerkleRoot,
  getExplorerUrl,
} from '@/lib/blockchain-service';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const action = searchParams.get('action') || 'stats';

    if (action === 'stats') {
      const status = getBlockchainStatus();

      const [totalProofs] = await query<{ count: string }>(
        `SELECT COUNT(*) as count FROM blockchain_proofs`
      );
      const [pendingProofs] = await query<{ count: string }>(
        `SELECT COUNT(*) as count FROM blockchain_proofs WHERE status = 'pending'`
      );
      const [anchoredProofs] = await query<{ count: string }>(
        `SELECT COUNT(*) as count FROM blockchain_proofs WHERE status = 'anchored'`
      );
      const [failedProofs] = await query<{ count: string }>(
        `SELECT COUNT(*) as count FROM blockchain_proofs WHERE status = 'failed'`
      );
      const [hashedAudits] = await query<{ count: string }>(
        `SELECT COUNT(*) as count FROM auditoria_detallada WHERE blockchain_hash IS NOT NULL`
      );

      const recentProofs = await query<{
        id: number;
        entity_type: string;
        entity_id: string;
        data_hash: string;
        status: string;
        tx_hash: string | null;
        chain_name: string | null;
        created_at: string;
        anchored_at: string | null;
      }>(
        `SELECT id, entity_type, entity_id, data_hash, status, tx_hash, chain_name, created_at, anchored_at
         FROM blockchain_proofs ORDER BY created_at DESC LIMIT 20`
      );

      return NextResponse.json({
        blockchain: {
          configured: status.configured,
          chain: status.chain.name,
          chainId: status.chain.chainId,
          symbol: status.chain.symbol,
          walletConfigured: status.walletConfigured,
        },
        stats: {
          totalProofs: parseInt(totalProofs?.count || '0'),
          pending: parseInt(pendingProofs?.count || '0'),
          anchored: parseInt(anchoredProofs?.count || '0'),
          failed: parseInt(failedProofs?.count || '0'),
          hashedAudits: parseInt(hashedAudits?.count || '0'),
        },
        recentProofs: recentProofs.map(p => ({
          ...p,
          explorerUrl: p.tx_hash ? getExplorerUrl(p.tx_hash) : null,
        })),
      });
    }

    if (action === 'proofs') {
      const page = parseInt(searchParams.get('page') || '1');
      const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 100);
      const offset = (page - 1) * limit;
      const statusFilter = searchParams.get('status');

      const validStatuses = ['pending', 'anchored', 'verified', 'failed'];
      const useStatusFilter = statusFilter && validStatuses.includes(statusFilter);

      let listSql: string;
      let countSql: string;
      let listParams: (string | number)[];
      let countParams: string[];

      if (useStatusFilter) {
        listSql = `SELECT id, entity_type, entity_id, data_hash, status, tx_hash, block_number, chain_id, chain_name, created_at, anchored_at
                   FROM blockchain_proofs WHERE status = $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3`;
        listParams = [statusFilter!, limit, offset];
        countSql = `SELECT COUNT(*) as count FROM blockchain_proofs WHERE status = $1`;
        countParams = [statusFilter!];
      } else {
        listSql = `SELECT id, entity_type, entity_id, data_hash, status, tx_hash, block_number, chain_id, chain_name, created_at, anchored_at
                   FROM blockchain_proofs ORDER BY created_at DESC LIMIT $1 OFFSET $2`;
        listParams = [limit, offset];
        countSql = `SELECT COUNT(*) as count FROM blockchain_proofs`;
        countParams = [];
      }

      const proofs = await query(listSql, listParams);
      const [total] = await query<{ count: string }>(countSql, countParams);

      return NextResponse.json({
        proofs: (proofs as any[]).map(p => ({
          ...p,
          explorerUrl: p.tx_hash ? getExplorerUrl(p.tx_hash) : null,
        })),
        total: parseInt(total?.count || '0'),
        page,
        limit,
      });
    }

    if (action === 'verify') {
      const proofId = searchParams.get('id');
      if (!proofId) return NextResponse.json({ error: 'ID requerido' }, { status: 400 });

      const proofIdNum = parseInt(proofId);
      if (isNaN(proofIdNum)) return NextResponse.json({ error: 'ID inválido' }, { status: 400 });

      const [proof] = await query<{
        id: number;
        data_hash: string;
        payload_snapshot: string;
        status: string;
        tx_hash: string | null;
      }>(
        `SELECT id, data_hash, payload_snapshot, status, tx_hash FROM blockchain_proofs WHERE id = $1`,
        [proofIdNum]
      );

      if (!proof) return NextResponse.json({ error: 'Proof no encontrado' }, { status: 404 });

      const payload = typeof proof.payload_snapshot === 'string'
        ? JSON.parse(proof.payload_snapshot)
        : proof.payload_snapshot;

      const verification = await verifyHashIntegrity(payload, proof.data_hash);

      return NextResponse.json({
        proof: {
          id: proof.id,
          dataHash: proof.data_hash,
          status: proof.status,
          txHash: proof.tx_hash,
          explorerUrl: proof.tx_hash ? getExplorerUrl(proof.tx_hash) : null,
        },
        verification: {
          integrityValid: verification.match,
          computedHash: verification.computedHash,
          storedHash: proof.data_hash,
          tampered: !verification.match,
        },
      });
    }

    return NextResponse.json({ error: 'Acción no válida' }, { status: 400 });
  } catch (err) {
    console.error('[blockchain-api] Error:', err);
    return NextResponse.json({ error: 'Error en la API de blockchain' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

    const body = await req.json();
    const action = body.action;

    if (action === 'anchor') {
      const pendingProofs = await query<{ id: number; data_hash: string }>(
        `SELECT id, data_hash FROM blockchain_proofs WHERE status = 'pending' ORDER BY created_at ASC LIMIT 100`
      );

      if (pendingProofs.length === 0) {
        return NextResponse.json({ message: 'No hay pruebas pendientes para anclar', anchored: 0 });
      }

      const hashes = pendingProofs.map(p => p.data_hash);
      const merkleRoot = generateMerkleRoot(hashes);
      const result = await anchorBatchOnChain(hashes);

      if (result.success) {
        const ids = pendingProofs.map(p => p.id);
        await query(
          `UPDATE blockchain_proofs 
           SET status = 'anchored', tx_hash = $1, block_number = $2, chain_id = $3, chain_name = $4, 
               merkle_root = $5, anchored_at = NOW(), anchor_attempts = anchor_attempts + 1
           WHERE id = ANY($6::int[])`,
          [result.txHash, result.blockNumber, result.chainId, result.chainName, merkleRoot, ids]
        );

        await query(
          `UPDATE auditoria_detallada SET blockchain_verified = TRUE 
           WHERE blockchain_hash = ANY($1::text[])`,
          [hashes]
        );

        return NextResponse.json({
          success: true,
          anchored: pendingProofs.length,
          txHash: result.txHash,
          blockNumber: result.blockNumber,
          chain: result.chainName,
          merkleRoot,
          explorerUrl: result.txHash ? getExplorerUrl(result.txHash) : null,
        });
      } else {
        const ids = pendingProofs.map(p => p.id);
        await query(
          `UPDATE blockchain_proofs SET status = 'failed', anchor_attempts = anchor_attempts + 1, last_error = $1 WHERE id = ANY($2::int[])`,
          [result.error, ids]
        );

        return NextResponse.json({
          success: false,
          error: result.error,
          pending: pendingProofs.length,
        }, { status: 502 });
      }
    }

    return NextResponse.json({ error: 'Acción no válida' }, { status: 400 });
  } catch (err) {
    console.error('[blockchain-api] POST error:', err);
    return NextResponse.json({ error: 'Error al procesar solicitud blockchain' }, { status: 500 });
  }
}
