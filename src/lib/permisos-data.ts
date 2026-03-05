
export const initialPermisos = [
    // --- Ministerios - Petróleo y Minería ---
    { id: "PERM-PET-001", tipo: "Transporte Terrestre de Hidrocarburos", emisor: "Ministerio del Poder Popular de Petróleo", fechaEmision: "2024-01-10", fechaVencimiento: "2025-01-10", estado: "Vigente", requisitosInscripcion: ["Copia del RIF Corporativo", "Registro Mercantil Original", "Póliza de Responsabilidad Civil Vigente"], requisitosRenovacion: ["Solvencia de Impuestos Nacionales", "Certificación Técnica de Flota"] },
    
    // --- SAPI - Propiedad Intelectual ---
    { 
        id: "PERM-SAPI-DA-001", 
        tipo: "Registro de Propiedad Intelectual: Ecosistema Kyron", 
        emisor: "Servicio Autónomo de la Propiedad Intelectual (SAPI)", 
        fechaEmision: "2023-03-05", 
        fechaVencimiento: "Vitalicio", 
        estado: "Vigente", 
        requisitosInscripcion: ["Depósito de Código Fuente", "Memoria Descriptiva de Algoritmos"], 
        requisitosRenovacion: [] 
    },
    { id: "PERM-SAPI-001", tipo: "Registro de Marca Comercial: System Kyron", emisor: "SAPI", fechaEmision: "2022-01-10", fechaVencimiento: "2032-01-10", estado: "Vigente", requisitosInscripcion: ["Búsqueda de Antecedentes Fonéticos", "Diseño Gráfico de Logotipo"], requisitosRenovacion: ["Renovación Decenal de Derechos"] },
    { id: "PERM-SAPI-MAG", tipo: "Patente de Invención: Tecnología de Inducción Magnética", emisor: "SAPI", fechaEmision: "2024-05-20", fechaVencimiento: "2034-05-20", estado: "Vigente", requisitosInscripcion: ["Pliego de Reivindicaciones", "Planos de Ingeniería de Sensores"], requisitosRenovacion: ["Anualidades de Mantenimiento de Patente"] },

    // --- Entes Nacionales ---
    { id: "REG-MERC-001", tipo: "Inscripción en Registro Mercantil Primero", emisor: "SAREN", fechaEmision: "2020-01-05", fechaVencimiento: "Indefinido", estado: "Vigente", requisitosInscripcion: ["Acta Constitutiva y Estatutos Sociales"], requisitosRenovacion: ["Actualización de Actas de Asamblea"] },
    { id: "PERM-NAC-009", tipo: "Habilitación General de Telecomunicaciones", emisor: "CONATEL", fechaEmision: "2023-03-20", fechaVencimiento: "2028-03-20", estado: "Vigente", requisitosInscripcion: ["Proyecto Técnico de Red", "Garantía de Fiel Cumplimiento"], requisitosRenovacion: ["Pago de Tasas y Contribuciones Trimestrales"] },
];

export const companyData = {
  socios: [
    { nombre: "ING. CARLOS MATTAR", cedula: "V-32.855.496", rif: "V-32856496-4", cargo: "Director General de Tecnología" },
    { nombre: "LIC. BEATRIZ MARTÍNEZ", cedula: "V-13.374.121", rif: "V-13374121-2", cargo: "Directora de Gestión de Talento" },
    { nombre: "ABOG. MARÍA TERESA HERNÁNDEZ", cedula: "V-12.459.024", rif: "V-12459024-4", cargo: "Consultora Jurídica Senior" },
  ],
  objetoSocial: "Comercialización y distribución a escala corporativa de terminales inteligentes con tecnología de inducción magnética síncrona, mobiliario ergonómico de oficina y sistemas fiscales homologados. Provisión de servicios de telecomunicaciones convergentes, incluyendo la gestión de perfiles eSIM y conectividad 5G. Desarrollo, mantenimiento y consultoría de arquitectura de software bajo el ecosistema de inteligencia de negocios System Kyron. Gestión integral de holdings empresariales y optimización de activos estratégicos.",
};
