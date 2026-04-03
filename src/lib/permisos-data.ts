
export const initialPermisos: Array<{
    id: string;
    tipo: string;
    emisor: string;
    fechaEmision: string;
    fechaVencimiento: string;
    estado: string;
    requisitosInscripcion: string[];
    requisitosRenovacion: string[];
}> = [];

export const companyData = {
  denominacion: "",
  rif: "",
  direccion: "",
  telefono: "",
  socios: [] as Array<{ nombre: string; cedula: string; rif: string; cargo: string }>,
  objetoSocial: "",
};
