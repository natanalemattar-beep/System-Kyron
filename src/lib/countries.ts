
export const countries = [
    // North America
    { name: "United States", code: "USA", flag: "https://flagcdn.com/w320/us.png", taxInfo: "Sales Tax (Variable)" },
    { name: "Canada", code: "CAN", flag: "https://flagcdn.com/w320/ca.png", taxInfo: "GST/HST/PST" },
    // Latin America
    { name: "Mexico", code: "MEX", flag: "https://flagcdn.com/w320/mx.png", taxInfo: "IVA, ISR" },
    { name: "Brazil", code: "BRA", flag: "https://flagcdn.com/w320/br.png", taxInfo: "ICMS, IPI, PIS/COFINS" },
    { name: "Argentina", code: "ARG", flag: "https://flagcdn.com/w320/ar.png", taxInfo: "IVA, IIBB, Ganancias" },
    { name: "Colombia", code: "COL", flag: "https://flagcdn.com/w320/co.png", taxInfo: "IVA, Retefuente" },
    { name: "Chile", code: "CHL", flag: "https://flagcdn.com/w320/cl.png", taxInfo: "IVA (DTE)" },
    // Europe
    { name: "Spain", code: "ESP", flag: "https://flagcdn.com/w320/es.png", taxInfo: "IVA, IRPF" },
    { name: "Germany", code: "DEU", flag: "https://flagcdn.com/w320/de.png", taxInfo: "Umsatzsteuer (VAT)" },
    { name: "France", code: "FRA", flag: "https://flagcdn.com/w320/fr.png", taxInfo: "TVA" },
    { name: "Italy", code: "ITA", flag: "https://flagcdn.com/w320/it.png", taxInfo: "IVA (Fattura Elettronica)" },
    { name: "Netherlands", code: "NLD", flag: "https://flagcdn.com/w320/nl.png", taxInfo: "BTW" },
    // Asia & Middle East
    { name: "China", code: "CHN", flag: "https://flagcdn.com/w320/cn.png", taxInfo: "VAT (Fapiao System)" },
    { name: "UAE", code: "ARE", flag: "https://flagcdn.com/w320/ae.png", taxInfo: "VAT (e-Invoicing)" },
];

type CountryModule = {
    currency: string;
    tax_rates: Record<string, string | string[]>;
    legal_requirements: Record<string, string | boolean | string[]>;
}

export const countryModules: Record<string, CountryModule> = {
    "USA": {
        currency: "USD",
        tax_rates: { "Sales Tax": "Variable por estado" },
        legal_requirements: { "Campos Obligatorios": ["EIN (si aplica)", "Dirección de facturación"], "W-9/W-8BEN": "Requerido para proveedores" }
    },
    "CAN": {
        currency: "CAD",
        tax_rates: { "GST/HST/PST": "Variable por provincia" },
        legal_requirements: { "Campos Obligatorios": ["Business Number (BN)", "Número de GST/HST"] }
    },
    "MEX": {
        currency: "MXN",
        tax_rates: { "IVA": "16%", "ISR": "Variable", "IEPS": "Variable" },
        legal_requirements: { "Campos Obligatorios": ["RFC", "Uso CFDI", "Forma de pago"], "Requiere CFDI 4.0": true, "Validación SAT": true }
    },
    "COL": {
        currency: "COP",
        tax_rates: { "IVA": "19% (General)", "Retefuente": "variable" },
        legal_requirements: { "Campos Obligatorios": ["NIT", "CUFE", "Resolución DIAN"], "Facturación Electrónica": true }
    },
    "BRA": {
        currency: "BRL",
        tax_rates: { "ICMS": "Variable", "IPI": "Variable", "PIS/COFINS": "Variable" },
        legal_requirements: { "Campos Obligatorios": ["CNPJ/CPF", "Nota Fiscal Eletrônica (NF-e)"], "CFOP (Código Fiscal)": true }
    },
    "ARG": {
        currency: "ARS",
        tax_rates: { "IVA": "21%", "IIBB": "Variable", "GANANCIAS": "Variable" },
        legal_requirements: { "Campos Obligatorios": ["CUIT", "Condición IVA", "CAE"], "Series de Factura": ["A", "B", "C"], "Firma Digital": true }
    },
    "CHL": {
        currency: "CLP",
        tax_rates: { "IVA": "19%" },
        legal_requirements: { "Campos Obligatorios": ["RUT", "Folio Sii"], "Documento Electrónico (DTE)": true, "Boleta Electrónica": true }
    },
    "ESP": {
        currency: "EUR",
        tax_rates: { "IVA": "21% (General), 10% (Reducido), 4% (Superreducido)", "IRPF": "Variable" },
        legal_requirements: { "Campos Obligatorios": ["NIF", "Régimen IVA"], "Obligación SII": true, "Formato FacturaE": "Opcional" }
    },
    "DEU": {
        currency: "EUR",
        tax_rates: { "Umsatzsteuer (VAT)": "19% (General), 7% (Reducido)" },
        legal_requirements: { "Campos Obligatorios": ["Steuernummer/USt-IdNr."], "GoBD Compliant": true }
    },
    "FRA": {
        currency: "EUR",
        tax_rates: { "TVA": "20% (General), 10%, 5.5%, 2.1%" },
        legal_requirements: { "Campos Obligatorios": ["Numéro de TVA", "SIREN/SIRET"], "Chorus Pro (B2G)": true }
    },
    "ITA": {
        currency: "EUR",
        tax_rates: { "IVA": "22% (Ordinaria), 10%, 5%, 4%" },
        legal_requirements: { "Campos Obligatorios": ["Partita IVA/Codice Fiscale"], "Fattura Elettronica (SdI)": true }
    },
    "NLD": {
        currency: "EUR",
        tax_rates: { "BTW": "21% (Standard), 9% (Reduced), 0% (Zero)" },
        legal_requirements: { "Campos Obligatorios": ["BTW-nummer", "KvK-nummer"] }
    },
    "CHN": {
        currency: "CNY",
        tax_rates: { "VAT": "13% (General), 9%, 6%" },
        legal_requirements: { "Fapiao System": true, "Golden Tax System Integration": true }
    },
    "ARE": {
        currency: "AED",
        tax_rates: { "VAT": "5%" },
        legal_requirements: { "TRN (Tax Registration Number)": true, "e-Invoicing (Peppol)": "Obligatorio desde 2026" }
    },
};
