export const initialPermisos = [
    // --- Ministerios - Petróleo y Minería ---
    { id: "PERM-PET-001", tipo: "Transporte Terrestre de Hidrocarburos", emisor: "Min. Petróleo (MINPET)", fechaEmision: "2024-01-10", fechaVencimiento: "2025-01-10", estado: "Vigente", requisitosInscripcion: ["Copia del RIF", "Registro Mercantil", "Póliza de Seguro de Responsabilidad Civil"], requisitosRenovacion: ["Solvencia de pago de impuestos", "Inspección técnica vehicular vigente"] },
    
    // --- SAPI - Propiedad Intelectual ---
    { 
        id: "PERM-SAPI-DA-001", 
        tipo: "Registro de Software y Soluciones IA", 
        emisor: "SAPI", 
        fechaEmision: "2023-03-05", 
        fechaVencimiento: "Vitalicio", 
        estado: "Vigente", 
        requisitosInscripcion: ["Código Fuente", "Memoria descriptiva"], 
        requisitosRenovacion: [] 
    },
    { id: "PERM-SAPI-001", tipo: "Registro de Marca: System Kyron", emisor: "SAPI", fechaEmision: "2022-01-10", fechaVencimiento: "2032-01-10", estado: "Vigente", requisitosInscripcion: ["Búsqueda fonética", "Logo"], requisitosRenovacion: ["Pago decenal"] },
    { id: "PERM-SAPI-MAG", tipo: "Patente de Tecnología Magnética", emisor: "SAPI", fechaEmision: "2024-05-20", fechaVencimiento: "2034-05-20", estado: "Vigente", requisitosInscripcion: ["Memoria técnica", "Planos de inducción"], requisitosRenovacion: ["Anualidades"] },

    // --- Entes Nacionales ---
    { id: "REG-MERC-001", tipo: "Registro Mercantil", emisor: "SAREN", fechaEmision: "2020-01-05", fechaVencimiento: "Indefinido", estado: "Vigente", requisitosInscripcion: ["Acta Constitutiva"], requisitosRenovacion: ["Asambleas"] },
    { id: "PERM-NAC-009", tipo: "Concesión de Espectro Radioeléctrico", emisor: "CONATEL", fechaEmision: "2023-03-20", fechaVencimiento: "2028-03-20", estado: "Vigente", requisitosInscripcion: ["Proyecto técnico", "Garantía"], requisitosRenovacion: ["Tasas anuales"] },
];

export const companyData = {
  socios: [
    { nombre: "CARLOS ALBERTO NATANALE MATTAR HERNANDEZ", cedula: "V-32.855.496", rif: "V-32856496-4" },
    { nombre: "MARIA TERESA HERNANDEZ BASTIDAS", cedula: "V-13.374.121", rif: "V-13374121-2" },
    { nombre: "JOSE DE JESUS HERRERA BOZZO", cedula: "V-12.459.024", rif: "V-12459024-4" },
  ],
  objetoSocial: "Comercialización y venta al mayor y detal de papeleras inteligentes con tecnología de magnetismo, mobiliario de oficina y equipos fiscales homologados. Prestación de servicios de telecomunicaciones móviles y fijas, incluyendo la asignación de números telefónicos y venta de dispositivos móviles (smartphones). Desarrollo de software ERP/CRM bajo el ecosistema System Kyron con integración de IA y Blockchain. Consultoría estratégica y gestión integral de holdings corporativos.",
};
