export const initialPermisos = [
    // --- Ministerios - Petróleo y Minería ---
    { id: "PERM-PET-001", tipo: "Transporte Terrestre de Hidrocarburos", emisor: "Min. Petróleo (MINPET)", fechaEmision: "2024-01-10", fechaVencimiento: "2025-01-10", estado: "Vigente", requisitosInscripcion: ["Copia del RIF", "Registro Mercantil", "Póliza de Seguro de Responsabilidad Civil"], requisitosRenovacion: ["Solvencia de pago de impuestos", "Inspección técnica vehicular vigente"] },
    { id: "PERM-PET-002", tipo: "Transporte Acuático de Hidrocarburos", emisor: "Min. Petróleo (MINPET)", fechaEmision: "2024-02-15", fechaVencimiento: "2025-02-15", estado: "Vigente", requisitosInscripcion: ["Documento de Propiedad o Contrato de Arrendamiento de la embarcación", "Matrícula de la embarcación", "Certificado de seguridad emitido por el INEA"], requisitosRenovacion: ["Inspección de seguridad actualizada", "Solvencia del INEA"] },
    { id: "PERM-PET-003", tipo: "Distribución de Lubricantes Terminados", emisor: "Min. Petróleo (MINPET)", fechaEmision: "2023-08-01", fechaVencimiento: "2024-08-01", estado: "Por Vencer", requisitosInscripcion: ["Licencia de Actividades Económicas", "Memoria Descriptiva de las instalaciones", "Permiso de Bomberos"], requisitosRenovacion: ["Declaración de volúmenes de venta del período anterior"] },
    { id: "PERM-PET-004", tipo: "Distribución de Derivados de Hidrocarburos", emisor: "Min. Petróleo (MINPET)", fechaEmision: "2024-04-05", fechaVencimiento: "2025-04-05", estado: "Vigente", requisitosInscripcion: ["RIF vigente", "Acta Constitutiva", "Permiso de Almacenamiento"], requisitosRenovacion: ["Solvencia fiscal (SENIAT)"] },
    { id: "PERM-PET-005", tipo: "Suministro y Almacenamiento de Gas", emisor: "Min. Petróleo (MINPET)", fechaEmision: "2024-05-20", fechaVencimiento: "2026-05-20", estado: "Vigente", requisitosInscripcion: ["Estudio de impacto ambiental", "Certificación de seguridad industrial", "Plan de emergencia"], requisitosRenovacion: ["Auditoría de seguridad anual"] },
    
    // --- SAPI - Propiedad Intelectual ---
    { 
        id: "PERM-SAPI-DA-001", 
        tipo: "Registro de Programa de Computación (Software)", 
        emisor: "SAPI", 
        fechaEmision: "2023-03-05", 
        fechaVencimiento: "Vitalicio", 
        estado: "Vigente", 
        requisitosInscripcion: [
            "Ejemplar de la obra (Código Fuente en soporte digital)", 
            "Formulario de solicitud de registro", 
            "Memoria descriptiva de la arquitectura lógica", 
            "Comprobante de pago de tasas administrativas"
        ], 
        requisitosRenovacion: [] 
    },
    { id: "PERM-SAPI-001", tipo: "Registro de Marca Comercial", emisor: "SAPI", fechaEmision: "2022-01-10", fechaVencimiento: "2032-01-10", estado: "Vigente", requisitosInscripcion: ["Búsqueda fonética y gráfica de antecedentes", "Diseño del logo (JPG/PNG)", "Pago de tasas fiscales"], requisitosRenovacion: ["Pago de tasa de renovación decenal"] },
    { id: "PERM-SAPI-INV-001", tipo: "Patente de Invención", emisor: "SAPI", fechaEmision: "2023-05-20", fechaVencimiento: "2024-11-20", estado: "Vigente", requisitosInscripcion: ["Formulario FP-01", "Memoria descriptiva", "Reivindicaciones", "Dibujos técnicos", "Resumen"], requisitosRenovacion: ["Pago de anualidades de mantenimiento"] },

    // --- Entes Nacionales y Registros Obligatorios ---
    { id: "REG-MERC-001", tipo: "Registro Mercantil", emisor: "SAREN", fechaEmision: "2020-01-05", fechaVencimiento: "Indefinido", estado: "Vigente", requisitosInscripcion: ["Acta Constitutiva Visada", "Identificación de los socios", "Pago de tasas SAREN"], requisitosRenovacion: ["Actualización de Actas de Asamblea"] },
    { id: "PERM-NAC-001", tipo: "Inscripción Patronal IVSS", emisor: "IVSS", fechaEmision: "2020-01-10", fechaVencimiento: "Indefinido", estado: "Vigente", requisitosInscripcion: ["Formulario 14-01", "RIF de la entidad", "Cédula del representante"], requisitosRenovacion: [] },
    { id: "PERM-NAC-003", tipo: "Habilitación Postal", emisor: "CONATEL", fechaEmision: "2021-06-01", fechaVencimiento: "2024-06-01", estado: "Vencido", requisitosInscripcion: ["Registro como operador postal", "Descripción de servicios"], requisitosRenovacion: ["Solvencia de tasas postales"] },
    { id: "PERM-NAC-009", tipo: "Concesión de Espectro Radioeléctrico", emisor: "CONATEL", fechaEmision: "2023-03-20", fechaVencimiento: "2028-03-20", estado: "Vigente", requisitosInscripcion: ["Proyecto técnico de red", "Estudio de factibilidad económica", "Garantía de cumplimiento"], requisitosRenovacion: ["Pago de tasas anuales", "Informe de uso"] },
    { id: "PERM-NAC-010", tipo: "Licencia de Proveedor de Internet (ISP)", emisor: "CONATEL", fechaEmision: "2023-04-01", fechaVencimiento: "2028-04-01", estado: "Vigente", requisitosInscripcion: ["Objeto social adecuado", "Proyecto técnico detallado", "Solvencia fiscal"], requisitosRenovacion: ["Actualización técnica", "Tasas regulatorias"] },
];

export const companyData = {
  socios: [
    { nombre: "CARLOS ALBERTO NATANALE MATTAR HERNANDEZ", cedula: "V-32.855.496", rif: "V-32856496-4" },
    { nombre: "MARIA TERESA HERNANDEZ BASTIDAS", cedula: "V-13.374.121", rif: "V-13374121-2" },
    { nombre: "JOSE DE JESUS HERRERA BOZZO", cedula: "V-12.459.024", rif: "V-12459024-4" },
  ],
  objetoSocial: "Distribución, Venta al Mayor y Detal, prestación de servicios de telecomunicaciones móviles y fijas, venta de dispositivos móviles (teléfonos) y asignación de números telefónicos. Desarrollo de soluciones digitales (ERP, CRM, Software Contable) con integración de IA y Blockchain. Venta de artículos de oficina, equipos fiscales homologados y hardware. Fabricación, venta y registro de marca de mobiliario inteligente y papeleras inteligentes con tecnología de magnetismo. Gestión integral de holdings y asesoría estratégica corporativa.",
};