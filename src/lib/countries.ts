
export const countries = [
    // North America
    { name: "United States", code: "USA", flag: "https://flagcdn.com/w320/us.png", taxInfo: "Sales Tax (Variable)" },
    { name: "Canada", code: "CAN", flag: "https://flagcdn.com/w320/ca.png", taxInfo: "GST/HST/PST" },
    // Latin America
    { name: "México", code: "MEX", flag: "https://flagcdn.com/w320/mx.png", taxInfo: "IVA, ISR" },
    { name: "Brasil", code: "BRA", flag: "https://flagcdn.com/w320/br.png", taxInfo: "ICMS, IPI, PIS/COFINS" },
    { name: "Argentina", code: "ARG", flag: "https://flagcdn.com/w320/ar.png", taxInfo: "IVA, IIBB, Ganancias" },
    { name: "Colombia", code: "COL", flag: "https://flagcdn.com/w320/co.png", taxInfo: "IVA, Retefuente" },
    { name: "Chile", code: "CHL", flag: "https://flagcdn.com/w320/cl.png", taxInfo: "IVA (DTE)" },
    // Europe
    { name: "España", code: "ESP", flag: "https://flagcdn.com/w320/es.png", taxInfo: "IVA, IRPF" },
    { name: "Deutschland", code: "DEU", flag: "https://flagcdn.com/w320/de.png", taxInfo: "Umsatzsteuer (VAT)" },
    { name: "France", code: "FRA", flag: "https://flagcdn.com/w320/fr.png", taxInfo: "TVA" },
    { name: "Italia", code: "ITA", flag: "https://flagcdn.com/w320/it.png", taxInfo: "IVA (Fattura Elettronica)" },
    { name: "Nederland", code: "NLD", flag: "https://flagcdn.com/w320/nl.png", taxInfo: "BTW" },
    // Asia & Middle East
    { name: "中国 (China)", code: "CHN", flag: "https://flagcdn.com/w320/cn.png", taxInfo: "VAT (Fapiao System)" },
    { name: "الإمارات (UAE)", code: "ARE", flag: "https://flagcdn.com/w320/ae.png", taxInfo: "VAT (e-Invoicing)" },
];

type CountryModule = {
    currency: string;
    tax_rates: Record<string, string | string[]>;
    legal_requirements: Record<string, string | boolean | string[]>;
}

export const countryModules: Record<string, CountryModule> = {
    "USA": {
        currency: "USD",
        tax_rates: { "Sales Tax": "Variable by state" },
        legal_requirements: { "Required Fields": ["EIN (if applicable)", "Billing Address"], "W-9/W-8BEN Form": "Required for vendors" }
    },
    "CAN": {
        currency: "CAD",
        tax_rates: { "GST/HST/PST": "Variable by province" },
        legal_requirements: { "Required Fields": ["Business Number (BN)", "GST/HST Number"] }
    },
    "MEX": {
        currency: "MXN",
        tax_rates: { "IVA": "16%", "ISR": "Variable", "IEPS": "Variable" },
        legal_requirements: { "Campos Obligatorios": ["RFC", "Uso CFDI", "Forma de pago"], "Requiere CFDI 4.0": true, "Validación SAT": true }
    },
    "COL": {
        currency: "COP",
        tax_rates: { "IVA": "19% (General)", "Retefuente": "Variable" },
        legal_requirements: { "Campos Obligatorios": ["NIT", "CUFE", "Resolución DIAN"], "Facturación Electrónica": true }
    },
    "BRA": {
        currency: "BRL",
        tax_rates: { "ICMS": "Variável", "IPI": "Variável", "PIS/COFINS": "Variável" },
        legal_requirements: { "Campos Obrigatórios": ["CNPJ/CPF", "Nota Fiscal Eletrônica (NF-e)"], "CFOP (Código Fiscal)": true }
    },
    "ARG": {
        currency: "ARS",
        tax_rates: { "IVA": "21%", "IIBB": "Variable", "Ganancias": "Variable" },
        legal_requirements: { "Campos Obligatorios": ["CUIT", "Condición frente al IVA", "CAE"], "Tipos de Factura": ["A", "B", "C"], "Firma Digital": true }
    },
    "CHL": {
        currency: "CLP",
        tax_rates: { "IVA": "19%" },
        legal_requirements: { "Campos Obligatorios": ["RUT", "Folio Sii"], "Documento Tributario Electrónico (DTE)": true, "Boleta Electrónica": true }
    },
    "ESP": {
        currency: "EUR",
        tax_rates: { "IVA": "21% (General), 10% (Reducido), 4% (Superreducido)", "IRPF": "Variable" },
        legal_requirements: { "Campos Obligatorios": ["NIF", "Régimen IVA"], "Obligación SII": true, "Formato FacturaE": "Opcional" }
    },
    "DEU": {
        currency: "EUR",
        tax_rates: { "Umsatzsteuer (VAT)": "19% (Standard), 7% (Reduced)" },
        legal_requirements: { "Pflichtfelder": ["Steuernummer/USt-IdNr."], "GoBD-Konformität": true }
    },
    "FRA": {
        currency: "EUR",
        tax_rates: { "TVA": "20% (Standard), 10%, 5.5%, 2.1%" },
        legal_requirements: { "Champs Obligatoires": ["Numéro de TVA", "SIREN/SIRET"], "Chorus Pro (B2G)": true }
    },
    "ITA": {
        currency: "EUR",
        tax_rates: { "IVA": "22% (Ordinaria), 10%, 5%, 4%" },
        legal_requirements: { "Campi Obbligatori": ["Partita IVA/Codice Fiscale"], "Fattura Elettronica (SdI)": true }
    },
    "NLD": {
        currency: "EUR",
        tax_rates: { "BTW": "21% (Standaard), 9% (Verlaagd), 0% (Nul)" },
        legal_requirements: { "Verplichte Velden": ["BTW-nummer", "KvK-nummer"] }
    },
    "CHN": {
        currency: "CNY",
        tax_rates: { "增值税 (VAT)": "13% (标准), 9%, 6%" },
        legal_requirements: { "发票系统 (Fapiao System)": true, "金税三期集成 (Golden Tax System)": true }
    },
    "ARE": {
        currency: "AED",
        tax_rates: { "ضريبة القيمة المضافة (VAT)": "5%" },
        legal_requirements: { "رقم التسجيل الضريبي (TRN)": true, "الفواتير الإلكترونية (Peppol)": "إلزامي اعتبارًا من 2026" }
    },
};
