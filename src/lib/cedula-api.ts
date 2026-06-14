type Nacionalidad = 'V' | 'E';

interface CedulaData {
  nacionalidad: string;
  cedula: number;
  rif: string;
  primer_apellido: string;
  segundo_apellido: string;
  primer_nombre: string;
  segundo_nombre: string;
  cne: {
    estado: string;
    municipio: string;
    parroquia: string;
    centro_electoral: string;
  };
  request_date: string;
}

interface CedulaResponse {
  error: boolean;
  error_str: string | false;
  data: CedulaData | null;
}

export async function consultarCedula(
  nacionalidad: Nacionalidad,
  cedula: string
): Promise<CedulaResponse> {
  const appId = process.env.CEDULA_API_APP_ID;
  const token = process.env.CEDULA_API_ACCESS_TOKEN;

  if (!appId || !token) {
    return { error: true, error_str: 'API no configurada', data: null };
  }

  const params = new URLSearchParams({
    app_id: appId,
    token,
    nacionalidad,
    cedula: cedula.replace(/\D/g, ''),
  });

  const res = await fetch(`https://api.cedula.com.ve/api/v1?${params}`, {
    next: { revalidate: 86400 },
  });

  if (!res.ok) {
    return { error: true, error_str: `HTTP ${res.status}`, data: null };
  }

  return res.json();
}
