'use client';

import { LetterWrapper, LetterPage } from '@/components/brand/letter-wrapper';

const styles = `
  .pm-table { width: 100%; border-collapse: collapse; margin-bottom: 8px; }
  .pm-table thead tr th { background-color: #1e3a5f; color: white; padding: 3px 6px; font-size: 8.5px; font-weight: bold; border: 1px solid #cbd5e1; }
  .pm-table thead tr th:not(:first-child) { text-align: right; }
  .pm-table tbody tr td { padding: 2.5px 5px; font-size: 8px; border: 1px solid #e2e8f0; color: #334155; line-height: 1.2; }
  .pm-table tbody tr td:not(:first-child) { text-align: right; }
  .pm-table tbody tr td:last-child { font-weight: bold; color: #0f172a; }
  .pm-table tbody tr:nth-child(even) td { background-color: #f8fafc; }
  .pm-table tbody tr:hover td { background-color: #f1f5f9; }
  .pm-table tbody tr.pm-total td { background-color: #f0f4f8; font-weight: bold; font-size: 12px; }
`;

export default function PresupuestoMovisunPage() {
  const tableHeaderStyle: React.CSSProperties = {
    backgroundColor: '#1e3a5f',
    color: 'white',
    padding: '3px 6px',
    fontSize: '8.5px',
    fontWeight: 'bold',
    textAlign: 'left',
    border: '1px solid #cbd5e1',
  };

  const tableHeaderRightStyle: React.CSSProperties = {
    ...tableHeaderStyle,
    textAlign: 'right',
  };

  const cellStyle: React.CSSProperties = {
    padding: '2.5px 5px',
    fontSize: '8px',
    border: '1px solid #e2e8f0',
    color: '#334155',
    lineHeight: '1.2',
  };

  const cellRightStyle: React.CSSProperties = {
    ...cellStyle,
    textAlign: 'right',
  };

  const categoryHeaderStyle: React.CSSProperties = {
    fontSize: '11px',
    fontWeight: 'bold',
    color: '#1e3a5f',
    padding: '6px 0 3px 0',
    borderBottom: '2px solid #1e3a5f',
    marginTop: '6px',
    marginBottom: '4px',
  };

  return (
    <LetterWrapper filename="System-Kyron-Movisun-Analisis-Precios-Techo.pdf">
      <style>{styles}</style>
      {/* PAGE 1 */}
      <LetterPage>
        <div style={{ marginBottom: '10px' }}>
          <h1 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e3a5f', lineHeight: '1.1', margin: 0 }}>
            ANÁLISIS DE PRECIOS TECHO (ESCENARIO ZOOM)
          </h1>
          <p style={{ fontSize: '11px', color: '#475569', fontWeight: 600, margin: '2px 0 0 0' }}>
            System Kyron — Distribución Autorizada MOVISUN Venezuela
          </p>
        </div>

        <div style={{
          backgroundColor: '#f8fafc',
          borderLeft: '4px solid #1e3a5f',
          padding: '8px 12px',
          borderRadius: '4px',
          marginBottom: '10px',
        }}>
          <p style={{ fontSize: '9px', fontWeight: 'bold', color: '#1e3a5f', margin: '0 0 4px 0' }}>
            Objetivo del Modelo:
          </p>
          <p style={{ fontSize: '8.5px', color: '#334155', margin: '0 0 6px 0', lineHeight: '1.3' }}>
            Estructurar un escenario de costos máximos (Techo Logístico) utilizando el courier Grupo ZOOM bajo modalidad de importación aérea individual. Esto garantiza la protección de los márgenes y sirve como punto de partida para evaluar alternativas más económicas.
          </p>
          <p style={{ fontSize: '9px', fontWeight: 'bold', color: '#1e3a5f', margin: '0 0 4px 0' }}>
            Premisas de Cálculo (Junio 2026):
          </p>
          <ul style={{ fontSize: '8.5px', color: '#334155', margin: 0, paddingLeft: '12px', lineHeight: '1.3' }}>
            <li>Tasa de Cambio Base: 1 USD = 3.476 COP</li>
            <li>Flete de Referencia (ZOOM Individual Máximo): $16.20 USD por artículo (tarifa mínima por fracción de peso)</li>
            <li>Margen de Comercialización System Kyron: 30% aplicado sobre costo total acumulado</li>
          </ul>
        </div>

        <div style={categoryHeaderStyle}>Audífonos Inalámbricos TWS/Bluetooth</div>

        <table className="pm-table">
          <thead>
            <tr>
              <th style={{ ...tableHeaderStyle, width: '45%' }}>PRODUCTO</th>
              <th style={{ ...tableHeaderRightStyle, width: '15%' }}>CATÁLOGO (COP)</th>
              <th style={{ ...tableHeaderRightStyle, width: '13%' }}>COSTO BASE (USD)</th>
              <th style={{ ...tableHeaderRightStyle, width: '13%' }}>FLETE ZOOM (USD)</th>
              <th style={{ ...tableHeaderRightStyle, width: '14%' }}>PVP SUGERIDO (USD)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={cellStyle}>Audífonos T4 Mini Sonido HD (Lila / Rosa / Blanco)</td>
              <td style={cellRightStyle}>$60,000</td>
              <td style={cellRightStyle}>$17.26</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$43.50</td>
            </tr>
            <tr>
              <td style={cellStyle}>Audífonos T5 Bluetooth Pantalla LED (Lila/Blanco/Rosado)</td>
              <td style={cellRightStyle}>$69,900</td>
              <td style={cellRightStyle}>$20.11</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$47.20</td>
            </tr>
            <tr>
              <td style={cellStyle}>Audífonos T5 Super Mini</td>
              <td style={cellRightStyle}>$69,900</td>
              <td style={cellRightStyle}>$20.11</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$47.20</td>
            </tr>
            <tr>
              <td style={cellStyle}>Audífonos T6 Súper Mini Ligero (Negro/Lila/Verde/Blanco)</td>
              <td style={cellRightStyle}>$116,900</td>
              <td style={cellRightStyle}>$33.63</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$64.78</td>
            </tr>
            <tr>
              <td style={cellStyle}>Audífonos TWS T7 Bluetooth Gamer (Azul Oscuro)</td>
              <td style={cellRightStyle}>$109,900</td>
              <td style={cellRightStyle}>$31.62</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$62.16</td>
            </tr>
            <tr>
              <td style={cellStyle}>Audífonos Gamer T8 Baja Latencia Negro</td>
              <td style={cellRightStyle}>$99,555</td>
              <td style={cellRightStyle}>$28.64</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$58.29</td>
            </tr>
            <tr>
              <td style={cellStyle}>Audífonos T10 Transmisión Aérea (Índigo)</td>
              <td style={cellRightStyle}>$109,900</td>
              <td style={cellRightStyle}>$31.62</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$62.16</td>
            </tr>
            <tr>
              <td style={cellStyle}>Audífonos T13 TWS Bluetooth</td>
              <td style={cellRightStyle}>$89,900</td>
              <td style={cellRightStyle}>$25.86</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$54.68</td>
            </tr>
            <tr>
              <td style={cellStyle}>Audífonos T15 Bluetooth TWS (Negro)</td>
              <td style={cellRightStyle}>$129,900</td>
              <td style={cellRightStyle}>$37.37</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$69.64</td>
            </tr>
            <tr>
              <td style={cellStyle}>Audífonos T17 Aptos Dormir (Verde)</td>
              <td style={cellRightStyle}>$153,000</td>
              <td style={cellRightStyle}>$44.02</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$78.28</td>
            </tr>
            <tr>
              <td style={cellStyle}>Audífonos T19 TWS 24 Horas (Negro)</td>
              <td style={cellRightStyle}>$129,900</td>
              <td style={cellRightStyle}>$37.37</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$69.64</td>
            </tr>
            <tr>
              <td style={cellStyle}>Audífonos T20 Cancelación de Ruido (Negro)</td>
              <td style={cellRightStyle}>$129,900</td>
              <td style={cellRightStyle}>$37.37</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$69.64</td>
            </tr>
            <tr>
              <td style={cellStyle}>Audífonos T30 TWS Parlante Bluetooth</td>
              <td style={cellRightStyle}>$149,900</td>
              <td style={cellRightStyle}>$43.12</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$77.12</td>
            </tr>
            <tr>
              <td style={cellStyle}>Audífonos T100 OWS Bluetooth</td>
              <td style={cellRightStyle}>$142,000</td>
              <td style={cellRightStyle}>$40.85</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$74.17</td>
            </tr>
            <tr>
              <td style={cellStyle}>Audífonos T110 OWS 36 Horas (Gris)</td>
              <td style={cellRightStyle}>$109,900</td>
              <td style={cellRightStyle}>$31.62</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$62.16</td>
            </tr>
            <tr>
              <td style={cellStyle}>Audífonos T180 Conducción Ósea OWS (Negro/Plateado)</td>
              <td style={cellRightStyle}>$179,900</td>
              <td style={cellRightStyle}>$51.75</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$88.34</td>
            </tr>
            <tr>
              <td style={cellStyle}>Audífonos TW-2 Oído Abierto 12 Hrs Negro</td>
              <td style={cellRightStyle}>$64,900</td>
              <td style={cellRightStyle}>$18.67</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$45.33</td>
            </tr>
            <tr>
              <td style={cellStyle}>Audífonos TW-3 OWS 25 Horas (Beige)</td>
              <td style={cellRightStyle}>$69,900</td>
              <td style={cellRightStyle}>$20.11</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$47.20</td>
            </tr>
          </tbody>
        </table>

        <div style={{ flexGrow: 1 }} />

        <div style={{ marginTop: 'auto', pt: '8px', borderTop: '1px solid #cbd5e1', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '7.5px', color: '#64748b', fontWeight: 600 }}>SYSTEM KYRON - DISTRIBUIDOR OFICIAL MOVISUN VENEZUELA (JUNIO 2026)</span>
          <span style={{ fontSize: '7.5px', color: '#64748b', fontWeight: 600 }}>PÁGINA 1 DE 8</span>
        </div>
      </LetterPage>

      {/* PAGE 2 */}
      <LetterPage>
        <div style={categoryHeaderStyle}>Audífonos Inalámbricos TWS/Bluetooth (cont.)</div>

        <table className="pm-table">
          <thead>
            <tr>
              <th style={{ ...tableHeaderStyle, width: '45%' }}>PRODUCTO</th>
              <th style={{ ...tableHeaderRightStyle, width: '15%' }}>CATÁLOGO (COP)</th>
              <th style={{ ...tableHeaderRightStyle, width: '13%' }}>COSTO BASE (USD)</th>
              <th style={{ ...tableHeaderRightStyle, width: '13%' }}>FLETE ZOOM (USD)</th>
              <th style={{ ...tableHeaderRightStyle, width: '14%' }}>PVP SUGERIDO (USD)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={cellStyle}>Audífonos TWS TW120 OWS + Estuche Carga (Gris)</td>
              <td style={cellRightStyle}>$109,900</td>
              <td style={cellRightStyle}>$31.62</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$62.16</td>
            </tr>
            <tr>
              <td style={cellStyle}>Audífonos S-11 Inalámbricos Con Micrófono</td>
              <td style={cellRightStyle}>$79,900</td>
              <td style={cellRightStyle}>$22.99</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$50.94</td>
            </tr>
            <tr>
              <td style={cellStyle}>Audífonos S3 Magnético (Negro)</td>
              <td style={cellRightStyle}>$59,900</td>
              <td style={cellRightStyle}>$17.23</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$43.46</td>
            </tr>
            <tr>
              <td style={cellStyle}>Audífonos S5 Ultra (Negro)</td>
              <td style={cellRightStyle}>$55,900</td>
              <td style={cellRightStyle}>$16.08</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$41.97</td>
            </tr>
            <tr>
              <td style={cellStyle}>Audífonos S5 Pro (Negro)</td>
              <td style={cellRightStyle}>$55,900</td>
              <td style={cellRightStyle}>$16.08</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$41.97</td>
            </tr>
            <tr>
              <td style={cellStyle}>Audífonos S5-Max Pantalla LED Magnético</td>
              <td style={cellRightStyle}>$55,900</td>
              <td style={cellRightStyle}>$16.08</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$41.97</td>
            </tr>
            <tr>
              <td style={cellStyle}>Audífonos S8 Magnético Sensor Táctil</td>
              <td style={cellRightStyle}>$68,903</td>
              <td style={cellRightStyle}>$19.82</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$46.83</td>
            </tr>
            <tr>
              <td style={cellStyle}>Audífonos S9 Magnético Linterna</td>
              <td style={cellRightStyle}>$79,900</td>
              <td style={cellRightStyle}>$22.99</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$50.94</td>
            </tr>
            <tr>
              <td style={cellStyle}>Audífonos S9 Magnético (Reacondicionado)</td>
              <td style={cellRightStyle}>$35,900</td>
              <td style={cellRightStyle}>$10.33</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$34.49</td>
            </tr>
            <tr>
              <td style={cellStyle}>Audífonos S20 (Negro)</td>
              <td style={cellRightStyle}>$79,900</td>
              <td style={cellRightStyle}>$22.99</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$50.94</td>
            </tr>
            <tr>
              <td style={cellStyle}>Audífonos S-30 Diseño Deportivo (Negro)</td>
              <td style={cellRightStyle}>$69,900</td>
              <td style={cellRightStyle}>$20.11</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$47.20</td>
            </tr>
            <tr>
              <td style={cellStyle}>Audífonos W1 Lite (Negro/Blanco/Azul/Rosa)</td>
              <td style={cellRightStyle}>$60,000</td>
              <td style={cellRightStyle}>$17.26</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$43.50</td>
            </tr>
            <tr>
              <td style={cellStyle}>Audífonos ITA-4 (AirPods 3a Gen, Blanco)</td>
              <td style={cellRightStyle}>$99,900</td>
              <td style={cellRightStyle}>$28.74</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$58.42</td>
            </tr>
            <tr>
              <td style={cellStyle}>Audífonos ITA-5 Pro (Blanco)</td>
              <td style={cellRightStyle}>$90,896</td>
              <td style={cellRightStyle}>$26.15</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$55.05</td>
            </tr>
            <tr>
              <td style={cellStyle}>Audífonos ITA-8 Cancelación Ruido Activa</td>
              <td style={cellRightStyle}>$129,900</td>
              <td style={cellRightStyle}>$37.37</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$69.64</td>
            </tr>
            <tr>
              <td style={cellStyle}>Audífonos ITA-10 Pantalla LED</td>
              <td style={cellRightStyle}>$139,900</td>
              <td style={cellRightStyle}>$40.25</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$73.38</td>
            </tr>
            <tr>
              <td style={cellStyle}>Audífonos ITA-3 Lite (Blanco)</td>
              <td style={cellRightStyle}>$99,900</td>
              <td style={cellRightStyle}>$28.74</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$58.42</td>
            </tr>
            <tr>
              <td style={cellStyle}>Audífonos T3 (Negro / Azul Cielo)</td>
              <td style={cellRightStyle}>$79,900</td>
              <td style={cellRightStyle}>$22.99</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$50.94</td>
            </tr>
          </tbody>
        </table>

        <div style={categoryHeaderStyle}>Audífonos Manos Libres / Con Cable</div>

        <table className="pm-table">
          <thead>
            <tr>
              <th style={{ ...tableHeaderStyle, width: '45%' }}>PRODUCTO</th>
              <th style={{ ...tableHeaderRightStyle, width: '15%' }}>CATÁLOGO (COP)</th>
              <th style={{ ...tableHeaderRightStyle, width: '13%' }}>COSTO BASE (USD)</th>
              <th style={{ ...tableHeaderRightStyle, width: '13%' }}>FLETE ZOOM (USD)</th>
              <th style={{ ...tableHeaderRightStyle, width: '14%' }}>PVP SUGERIDO (USD)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={cellStyle}>Manos Libres Chacha B1 Aislador de Ruido</td>
              <td style={cellRightStyle}>$16,000</td>
              <td style={cellRightStyle}>$4.60</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$27.04</td>
            </tr>
            <tr>
              <td style={cellStyle}>Manos Libres Chacha B4 (Negro / Con Micrófono)</td>
              <td style={cellRightStyle}>$19,900</td>
              <td style={cellRightStyle}>$5.72</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$28.50</td>
            </tr>
            <tr>
              <td style={cellStyle}>Manos Libres Chacha B4 (Blanco)</td>
              <td style={cellRightStyle}>$24,000</td>
              <td style={cellRightStyle}>$6.90</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$30.04</td>
            </tr>
            <tr>
              <td style={cellStyle}>Manos Libres Chacha B5 Con Micrófono (Negro/Blanco)</td>
              <td style={cellRightStyle}>$29,900</td>
              <td style={cellRightStyle}>$8.60</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$32.24</td>
            </tr>
            <tr>
              <td style={cellStyle}>Manos Libres Chacha B5 3.5mm (Blanco)</td>
              <td style={cellRightStyle}>$29,900</td>
              <td style={cellRightStyle}>$8.60</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$32.24</td>
            </tr>
            <tr>
              <td style={cellStyle}>Manos Libres Chacha B5 Tipo C (Negro/Blanco)</td>
              <td style={cellRightStyle}>$29,900</td>
              <td style={cellRightStyle}>$8.60</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$32.24</td>
            </tr>
            <tr>
              <td style={cellStyle}>Manos Libres Chacha B6 TC Con Micrófono (Azul)</td>
              <td style={cellRightStyle}>$39,900</td>
              <td style={cellRightStyle}>$11.48</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$35.98</td>
            </tr>
            <tr>
              <td style={cellStyle}>Manos Libres Chacha B6 Con Micrófono (Azul)</td>
              <td style={cellRightStyle}>$29,900</td>
              <td style={cellRightStyle}>$8.60</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$32.24</td>
            </tr>
            <tr>
              <td style={cellStyle}>Manos Libres Chacha B10 TC (Negro)</td>
              <td style={cellRightStyle}>$24,000</td>
              <td style={cellRightStyle}>$6.90</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$30.04</td>
            </tr>
          </tbody>
        </table>

        <div style={{ flexGrow: 1 }} />

        <div style={{ marginTop: 'auto', pt: '8px', borderTop: '1px solid #cbd5e1', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '7.5px', color: '#64748b', fontWeight: 600 }}>SYSTEM KYRON - DISTRIBUIDOR OFICIAL MOVISUN VENEZUELA (JUNIO 2026)</span>
          <span style={{ fontSize: '7.5px', color: '#64748b', fontWeight: 600 }}>PÁGINA 2 DE 8</span>
        </div>
      </LetterPage>

      {/* PAGE 3 */}
      <LetterPage>
        <div style={categoryHeaderStyle}>Audífonos Manos Libres / Con Cable (cont.)</div>

        <table className="pm-table">
          <thead>
            <tr>
              <th style={{ ...tableHeaderStyle, width: '45%' }}>PRODUCTO</th>
              <th style={{ ...tableHeaderRightStyle, width: '15%' }}>CATÁLOGO (COP)</th>
              <th style={{ ...tableHeaderRightStyle, width: '13%' }}>COSTO BASE (USD)</th>
              <th style={{ ...tableHeaderRightStyle, width: '13%' }}>FLETE ZOOM (USD)</th>
              <th style={{ ...tableHeaderRightStyle, width: '14%' }}>PVP SUGERIDO (USD)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={cellStyle}>Manos Libres Enjoy P1 Con Micrófono (Blanco)</td>
              <td style={cellRightStyle}>$29,900</td>
              <td style={cellRightStyle}>$8.60</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$32.24</td>
            </tr>
            <tr>
              <td style={cellStyle}>Manos Libres Super X7 Con Micrófono</td>
              <td style={cellRightStyle}>$55,900</td>
              <td style={cellRightStyle}>$16.08</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$41.97</td>
            </tr>
            <tr>
              <td style={cellStyle}>Audífonos Im-7 Aislamiento De Ruido</td>
              <td style={cellRightStyle}>$35,000</td>
              <td style={cellRightStyle}>$10.07</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$34.15</td>
            </tr>
            <tr>
              <td style={cellStyle}>Audífonos Im-9 Tipo C Aislamiento De Ruido</td>
              <td style={cellRightStyle}>$35,600</td>
              <td style={cellRightStyle}>$10.24</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$34.37</td>
            </tr>
            <tr>
              <td style={cellStyle}>Audífonos Intrauditivos Super X20 Tipo C</td>
              <td style={cellRightStyle}>$132,000</td>
              <td style={cellRightStyle}>$37.97</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$70.43</td>
            </tr>
          </tbody>
        </table>

        <div style={categoryHeaderStyle}>Diademas / Over-Ear</div>

        <table className="pm-table">
          <thead>
            <tr>
              <th style={{ ...tableHeaderStyle, width: '45%' }}>PRODUCTO</th>
              <th style={{ ...tableHeaderRightStyle, width: '15%' }}>CATÁLOGO (COP)</th>
              <th style={{ ...tableHeaderRightStyle, width: '13%' }}>COSTO BASE (USD)</th>
              <th style={{ ...tableHeaderRightStyle, width: '13%' }}>FLETE ZOOM (USD)</th>
              <th style={{ ...tableHeaderRightStyle, width: '14%' }}>PVP SUGERIDO (USD)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={cellStyle}>Diadema Bluetooth K80 Cancelación Ruido</td>
              <td style={cellRightStyle}>$199,900</td>
              <td style={cellRightStyle}>$57.51</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$95.82</td>
            </tr>
            <tr>
              <td style={cellStyle}>Diadema K22 Cuadrada (Azul)</td>
              <td style={cellRightStyle}>$169,900</td>
              <td style={cellRightStyle}>$48.88</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$84.60</td>
            </tr>
            <tr>
              <td style={cellStyle}>Diadema K20 Inalámbrica Con Micrófono (Verde)</td>
              <td style={cellRightStyle}>$149,900</td>
              <td style={cellRightStyle}>$43.12</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$77.12</td>
            </tr>
            <tr>
              <td style={cellStyle}>Audífonos K20 Diadema (Azul / Varios colores)</td>
              <td style={cellRightStyle}>$149,900</td>
              <td style={cellRightStyle}>$43.12</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$77.12</td>
            </tr>
            <tr>
              <td style={cellStyle}>Audífonos K22 Diadema 70 Horas</td>
              <td style={cellRightStyle}>$169,900</td>
              <td style={cellRightStyle}>$48.88</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$84.60</td>
            </tr>
            <tr>
              <td style={cellStyle}>Audífonos K10 Diadema 33 Horas (Negro)</td>
              <td style={cellRightStyle}>$86,000</td>
              <td style={cellRightStyle}>$24.74</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$53.22</td>
            </tr>
            <tr>
              <td style={cellStyle}>Audífonos K50 Diadema Inalámbrico (Negro)</td>
              <td style={cellRightStyle}>$119,900</td>
              <td style={cellRightStyle}>$34.49</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$65.90</td>
            </tr>
            <tr>
              <td style={cellStyle}>Diadema Gamer KG-100 Micrófono Omnidireccional</td>
              <td style={cellRightStyle}>$109,900</td>
              <td style={cellRightStyle}>$31.62</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$62.16</td>
            </tr>
            <tr>
              <td style={cellStyle}>Diadema Gamer KG-200 Cancelación Ruido (Gris/Negro)</td>
              <td style={cellRightStyle}>$239,900</td>
              <td style={cellRightStyle}>$69.02</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$110.78</td>
            </tr>
            <tr>
              <td style={cellStyle}>Audífonos Osmo X8 Conducción Ósea</td>
              <td style={cellRightStyle}>$249,900</td>
              <td style={cellRightStyle}>$71.89</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$114.52</td>
            </tr>
          </tbody>
        </table>

        <div style={categoryHeaderStyle}>Parlantes Bluetooth</div>

        <table className="pm-table">
          <thead>
            <tr>
              <th style={{ ...tableHeaderStyle, width: '45%' }}>PRODUCTO</th>
              <th style={{ ...tableHeaderRightStyle, width: '15%' }}>CATÁLOGO (COP)</th>
              <th style={{ ...tableHeaderRightStyle, width: '13%' }}>COSTO BASE (USD)</th>
              <th style={{ ...tableHeaderRightStyle, width: '13%' }}>FLETE ZOOM (USD)</th>
              <th style={{ ...tableHeaderRightStyle, width: '14%' }}>PVP SUGERIDO (USD)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={cellStyle}>Parlante Egg-neo+ 3w Portátil</td>
              <td style={cellRightStyle}>$69,900</td>
              <td style={cellRightStyle}>$20.11</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$47.20</td>
            </tr>
            <tr>
              <td style={cellStyle}>Parlante Magnético Bunker 5w (Negro)</td>
              <td style={cellRightStyle}>$99,900</td>
              <td style={cellRightStyle}>$28.74</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$58.42</td>
            </tr>
            <tr>
              <td style={cellStyle}>Parlante Alarm Radio Reloj Bluetooth (Negro)</td>
              <td style={cellRightStyle}>$99,900</td>
              <td style={cellRightStyle}>$28.74</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$58.42</td>
            </tr>
            <tr>
              <td style={cellStyle}>Parlante Totato 5w (Negro)</td>
              <td style={cellRightStyle}>$90,000</td>
              <td style={cellRightStyle}>$25.89</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$54.72</td>
            </tr>
            <tr>
              <td style={cellStyle}>Parlante Totato BT 5.3 Luces RGB</td>
              <td style={cellRightStyle}>$110,900</td>
              <td style={cellRightStyle}>$31.90</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$62.54</td>
            </tr>
            <tr>
              <td style={cellStyle}>Parlante Bici-10 Para Bicicleta (Azul)</td>
              <td style={cellRightStyle}>$119,900</td>
              <td style={cellRightStyle}>$34.49</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$65.90</td>
            </tr>
            <tr>
              <td style={cellStyle}>Parlante Power Zero 10w (Negro)</td>
              <td style={cellRightStyle}>$149,900</td>
              <td style={cellRightStyle}>$43.12</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$77.12</td>
            </tr>
            <tr>
              <td style={cellStyle}>Parlante FK60 10w Radio FM</td>
              <td style={cellRightStyle}>$139,900</td>
              <td style={cellRightStyle}>$40.25</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$73.38</td>
            </tr>
          </tbody>
        </table>

        <div style={{ flexGrow: 1 }} />

        <div style={{ marginTop: 'auto', pt: '8px', borderTop: '1px solid #cbd5e1', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '7.5px', color: '#64748b', fontWeight: 600 }}>SYSTEM KYRON - DISTRIBUIDOR OFICIAL MOVISUN VENEZUELA (JUNIO 2026)</span>
          <span style={{ fontSize: '7.5px', color: '#64748b', fontWeight: 600 }}>PÁGINA 3 DE 8</span>
        </div>
      </LetterPage>

      {/* PAGE 4 */}
      <LetterPage>
        <div style={categoryHeaderStyle}>Parlantes Bluetooth (cont.)</div>

        <table className="pm-table">
          <thead>
            <tr>
              <th style={{ ...tableHeaderStyle, width: '45%' }}>PRODUCTO</th>
              <th style={{ ...tableHeaderRightStyle, width: '15%' }}>CATÁLOGO (COP)</th>
              <th style={{ ...tableHeaderRightStyle, width: '13%' }}>COSTO BASE (USD)</th>
              <th style={{ ...tableHeaderRightStyle, width: '13%' }}>FLETE ZOOM (USD)</th>
              <th style={{ ...tableHeaderRightStyle, width: '14%' }}>PVP SUGERIDO (USD)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={cellStyle}>Parlante Cannon Max 10w (Azul)</td>
              <td style={cellRightStyle}>$169,900</td>
              <td style={cellRightStyle}>$48.88</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$84.60</td>
            </tr>
            <tr>
              <td style={cellStyle}>Parlante Bici-50 Multiusos</td>
              <td style={cellRightStyle}>$219,900</td>
              <td style={cellRightStyle}>$63.26</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$103.30</td>
            </tr>
            <tr>
              <td style={cellStyle}>Parlante Tower 6w+6w (Azul)</td>
              <td style={cellRightStyle}>$194,000</td>
              <td style={cellRightStyle}>$55.81</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$93.61</td>
            </tr>
            <tr>
              <td style={cellStyle}>Parlante FK65 20w Radio FM</td>
              <td style={cellRightStyle}>$179,900</td>
              <td style={cellRightStyle}>$51.75</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$88.34</td>
            </tr>
            <tr>
              <td style={cellStyle}>Parlante Flag 20w Sonido Premium</td>
              <td style={cellRightStyle}>$255,900</td>
              <td style={cellRightStyle}>$73.62</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$116.76</td>
            </tr>
            <tr>
              <td style={cellStyle}>Parlante Disko 16w RGB 360°</td>
              <td style={cellRightStyle}>$209,900</td>
              <td style={cellRightStyle}>$60.39</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$99.56</td>
            </tr>
            <tr>
              <td style={cellStyle}>Parlante Sunday TWS Sumergible IPX7 (Negro)</td>
              <td style={cellRightStyle}>$149,900</td>
              <td style={cellRightStyle}>$43.12</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$77.12</td>
            </tr>
            <tr>
              <td style={cellStyle}>Parlante Bomb IPX6 (Multicolor)</td>
              <td style={cellRightStyle}>$149,900</td>
              <td style={cellRightStyle}>$43.12</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$77.12</td>
            </tr>
            <tr>
              <td style={cellStyle}>Parlante Zamba 10w+10w (Negro)</td>
              <td style={cellRightStyle}>$246,000</td>
              <td style={cellRightStyle}>$70.77</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$113.06</td>
            </tr>
            <tr>
              <td style={cellStyle}>Parlante Arko 70w Sonido Premium (Negro)</td>
              <td style={cellRightStyle}>$319,900</td>
              <td style={cellRightStyle}>$92.03</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$140.70</td>
            </tr>
            <tr>
              <td style={cellStyle}>Parlante Baket 80w Doble Efecto (Negro)</td>
              <td style={cellRightStyle}>$506,000</td>
              <td style={cellRightStyle}>$145.57</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$210.30</td>
            </tr>
            <tr>
              <td style={cellStyle}>Parlante Cruiser (Negro)</td>
              <td style={cellRightStyle}>$1,199,900</td>
              <td style={cellRightStyle}>$345.20</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$469.81</td>
            </tr>
            <tr>
              <td style={cellStyle}>Cabina Elite 220 100w + Karaoke</td>
              <td style={cellRightStyle}>$1,496,000</td>
              <td style={cellRightStyle}>$430.38</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$580.55</td>
            </tr>
            <tr>
              <td style={cellStyle}>Cabina Elite Bluetooth (versión alternativa)</td>
              <td style={cellRightStyle}>$1,249,900</td>
              <td style={cellRightStyle}>$359.58</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$488.51</td>
            </tr>
            <tr>
              <td style={cellStyle}>Banda Deportiva TP-500 Con Altavoces (Rojo/Negro)</td>
              <td style={cellRightStyle}>$154,000</td>
              <td style={cellRightStyle}>$44.30</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$78.65</td>
            </tr>
          </tbody>
        </table>

        <div style={categoryHeaderStyle}>Smartwatches / Relojes Inteligentes</div>

        <table className="pm-table">
          <thead>
            <tr>
              <th style={{ ...tableHeaderStyle, width: '45%' }}>PRODUCTO</th>
              <th style={{ ...tableHeaderRightStyle, width: '15%' }}>CATÁLOGO (COP)</th>
              <th style={{ ...tableHeaderRightStyle, width: '13%' }}>COSTO BASE (USD)</th>
              <th style={{ ...tableHeaderRightStyle, width: '13%' }}>FLETE ZOOM (USD)</th>
              <th style={{ ...tableHeaderRightStyle, width: '14%' }}>PVP SUGERIDO (USD)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={cellStyle}>Smartwatch QN-30 Pantalla 1.75 Full Touch</td>
              <td style={cellRightStyle}>$209,900</td>
              <td style={cellRightStyle}>$60.39</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$99.56</td>
            </tr>
            <tr>
              <td style={cellStyle}>Smartwatch QN-35 Circular 1.39 (Negro/Rosado)</td>
              <td style={cellRightStyle}>$219,900</td>
              <td style={cellRightStyle}>$63.26</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$103.30</td>
            </tr>
            <tr>
              <td style={cellStyle}>Reloj QM-60 Sumergible AMOLED</td>
              <td style={cellRightStyle}>$299,900</td>
              <td style={cellRightStyle}>$86.28</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$133.22</td>
            </tr>
            <tr>
              <td style={cellStyle}>Reloj QH10 -Sumergible (Gris)</td>
              <td style={cellRightStyle}>$299,900</td>
              <td style={cellRightStyle}>$86.28</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$133.22</td>
            </tr>
            <tr>
              <td style={cellStyle}>Reloj QM-80 AMOLED Sumergible</td>
              <td style={cellRightStyle}>$304,764</td>
              <td style={cellRightStyle}>$87.68</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$135.04</td>
            </tr>
            <tr>
              <td style={cellStyle}>Smartwatch W&O X8+ Ultra Sport Titanio 49mm 128GB</td>
              <td style={cellRightStyle}>$149,900</td>
              <td style={cellRightStyle}>$43.12</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$77.12</td>
            </tr>
            <tr>
              <td style={cellStyle}>Smartwatch W&O XBO 8 Ultra Titanio Milanese (Dorado)</td>
              <td style={cellRightStyle}>$169,900</td>
              <td style={cellRightStyle}>$48.88</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$84.60</td>
            </tr>
            <tr>
              <td style={cellStyle}>Smartwatch W&O X8+ Ultra Titanio (Reacondicionado)</td>
              <td style={cellRightStyle}>$49,900</td>
              <td style={cellRightStyle}>$14.36</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$39.72</td>
            </tr>
          </tbody>
        </table>

        <div style={{ flexGrow: 1 }} />

        <div style={{ marginTop: 'auto', pt: '8px', borderTop: '1px solid #cbd5e1', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '7.5px', color: '#64748b', fontWeight: 600 }}>SYSTEM KYRON - DISTRIBUIDOR OFICIAL MOVISUN VENEZUELA (JUNIO 2026)</span>
          <span style={{ fontSize: '7.5px', color: '#64748b', fontWeight: 600 }}>PÁGINA 4 DE 8</span>
        </div>
      </LetterPage>

      {/* PAGE 5 */}
      <LetterPage>
        <div style={categoryHeaderStyle}>Powerbanks</div>

        <table className="pm-table">
          <thead>
            <tr>
              <th style={{ ...tableHeaderStyle, width: '45%' }}>PRODUCTO</th>
              <th style={{ ...tableHeaderRightStyle, width: '15%' }}>CATÁLOGO (COP)</th>
              <th style={{ ...tableHeaderRightStyle, width: '13%' }}>COSTO BASE (USD)</th>
              <th style={{ ...tableHeaderRightStyle, width: '13%' }}>FLETE ZOOM (USD)</th>
              <th style={{ ...tableHeaderRightStyle, width: '14%' }}>PVP SUGERIDO (USD)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={cellStyle}>Powerbank 1-500 LT 5.000 mAh Magnético (Blanco)</td>
              <td style={cellRightStyle}>$89,900</td>
              <td style={cellRightStyle}>$25.86</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$54.68</td>
            </tr>
            <tr>
              <td style={cellStyle}>Power Bank Magnético 1-500 Tipo C 5.000 mAh</td>
              <td style={cellRightStyle}>$71,900</td>
              <td style={cellRightStyle}>$20.68</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$47.95</td>
            </tr>
            <tr>
              <td style={cellStyle}>Powerbank 1-1000 Magnético 10.000 mAh (Negro)</td>
              <td style={cellRightStyle}>$139,900</td>
              <td style={cellRightStyle}>$40.25</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$73.38</td>
            </tr>
            <tr>
              <td style={cellStyle}>Powerbank Mini I-200 Para Smartwatch (Negro)</td>
              <td style={cellRightStyle}>$69,900</td>
              <td style={cellRightStyle}>$20.11</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$47.20</td>
            </tr>
            <tr>
              <td style={cellStyle}>Powerbank Rocket P11 10.000 mAh 2.1A (Negro)</td>
              <td style={cellRightStyle}>$79,900</td>
              <td style={cellRightStyle}>$22.99</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$50.94</td>
            </tr>
            <tr>
              <td style={cellStyle}>Powerbank Rocket P12 10.000 mAh</td>
              <td style={cellRightStyle}>$99,900</td>
              <td style={cellRightStyle}>$28.74</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$58.42</td>
            </tr>
            <tr>
              <td style={cellStyle}>Powerbank Rocket P17 10.000 mAh</td>
              <td style={cellRightStyle}>$129,900</td>
              <td style={cellRightStyle}>$37.37</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$69.64</td>
            </tr>
            <tr>
              <td style={cellStyle}>Powerbank Rocket P20 20.000 mAh</td>
              <td style={cellRightStyle}>$149,900</td>
              <td style={cellRightStyle}>$43.12</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$77.12</td>
            </tr>
            <tr>
              <td style={cellStyle}>Powerbank Rocket P21 20.000 mAh</td>
              <td style={cellRightStyle}>$149,900</td>
              <td style={cellRightStyle}>$43.12</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$77.12</td>
            </tr>
            <tr>
              <td style={cellStyle}>Power Bank 20.000 1-2030 Cables Integrados (Negro)</td>
              <td style={cellRightStyle}>$165,900</td>
              <td style={cellRightStyle}>$47.73</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$83.11</td>
            </tr>
            <tr>
              <td style={cellStyle}>Powerbank Rocket P23 20.000 mAh Carga Rápida</td>
              <td style={cellRightStyle}>$109,900</td>
              <td style={cellRightStyle}>$31.62</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$62.16</td>
            </tr>
            <tr>
              <td style={cellStyle}>Powerbank Rocket P25 20.000 mAh</td>
              <td style={cellRightStyle}>$199,900</td>
              <td style={cellRightStyle}>$57.51</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$95.82</td>
            </tr>
            <tr>
              <td style={cellStyle}>Powerbank R2765 20.000 mAh Carga Rápida (Negro)</td>
              <td style={cellRightStyle}>$352,000</td>
              <td style={cellRightStyle}>$101.27</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$152.71</td>
            </tr>
            <tr>
              <td style={cellStyle}>Powerbank Rocket P30 30.000 mAh</td>
              <td style={cellRightStyle}>$249,900</td>
              <td style={cellRightStyle}>$71.89</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$114.52</td>
            </tr>
            <tr>
              <td style={cellStyle}>Powerbank Rocket P33 30.000 mAh</td>
              <td style={cellRightStyle}>$194,000</td>
              <td style={cellRightStyle}>$55.81</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$93.61</td>
            </tr>
            <tr>
              <td style={cellStyle}>Powerbank R10 Plug 10.000 mAh 3-en-1</td>
              <td style={cellRightStyle}>$139,900</td>
              <td style={cellRightStyle}>$40.25</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$73.38</td>
            </tr>
            <tr>
              <td style={cellStyle}>Powerbank R20 Plug 20.000 mAh 3-en-1</td>
              <td style={cellRightStyle}>$209,900</td>
              <td style={cellRightStyle}>$60.39</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$99.56</td>
            </tr>
            <tr>
              <td style={cellStyle}>Powerbank Rocket P50 50.000 mAh</td>
              <td style={cellRightStyle}>$349,900</td>
              <td style={cellRightStyle}>$100.66</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$151.92</td>
            </tr>
            <tr>
              <td style={cellStyle}>Powerbank Rocket P60 60.000 mAh (Blanco)</td>
              <td style={cellRightStyle}>$374,000</td>
              <td style={cellRightStyle}>$107.59</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$160.93</td>
            </tr>
            <tr>
              <td style={cellStyle}>Cargador 007 Powerbank 10.000 mAh (Blanco)</td>
              <td style={cellRightStyle}>$249,900</td>
              <td style={cellRightStyle}>$71.89</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$114.52</td>
            </tr>
            <tr>
              <td style={cellStyle}>Pilas Recargables Litio RB2A Tipo C</td>
              <td style={cellRightStyle}>$35,200</td>
              <td style={cellRightStyle}>$10.13</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$34.22</td>
            </tr>
            <tr>
              <td style={cellStyle}>Pilas Recargables Litio RB3A Tipo C</td>
              <td style={cellRightStyle}>$26,400</td>
              <td style={cellRightStyle}>$7.59</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$30.93</td>
            </tr>
            <tr>
              <td style={cellStyle}>Eco-300 Estación Energía Portátil 300w/256Wh</td>
              <td style={cellRightStyle}>$1,499,900</td>
              <td style={cellRightStyle}>$431.50</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$582.01</td>
            </tr>
          </tbody>
        </table>

        <div style={{ flexGrow: 1 }} />

        <div style={{ marginTop: 'auto', pt: '8px', borderTop: '1px solid #cbd5e1', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '7.5px', color: '#64748b', fontWeight: 600 }}>SYSTEM KYRON - DISTRIBUIDOR OFICIAL MOVISUN VENEZUELA (JUNIO 2026)</span>
          <span style={{ fontSize: '7.5px', color: '#64748b', fontWeight: 600 }}>PÁGINA 5 DE 8</span>
        </div>
      </LetterPage>

      {/* PAGE 6 */}
      <LetterPage>
        <div style={categoryHeaderStyle}>Cargadores y Transmisores</div>

        <table className="pm-table">
          <thead>
            <tr>
              <th style={{ ...tableHeaderStyle, width: '45%' }}>PRODUCTO</th>
              <th style={{ ...tableHeaderRightStyle, width: '15%' }}>CATÁLOGO (COP)</th>
              <th style={{ ...tableHeaderRightStyle, width: '13%' }}>COSTO BASE (USD)</th>
              <th style={{ ...tableHeaderRightStyle, width: '13%' }}>FLETE ZOOM (USD)</th>
              <th style={{ ...tableHeaderRightStyle, width: '14%' }}>PVP SUGERIDO (USD)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={cellStyle}>Cargador MC-60 2 Puertos USB 2.4A (Negro)</td>
              <td style={cellRightStyle}>$23,900</td>
              <td style={cellRightStyle}>$6.88</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$30.00</td>
            </tr>
            <tr>
              <td style={cellStyle}>Cargador MC-65 2.4A + Cable USB-V8 (Negro)</td>
              <td style={cellRightStyle}>$26,900</td>
              <td style={cellRightStyle}>$7.74</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$31.12</td>
            </tr>
            <tr>
              <td style={cellStyle}>Cargador MC-65 2.4A + Cable USB-TC (Blanco)</td>
              <td style={cellRightStyle}>$27,900</td>
              <td style={cellRightStyle}>$8.03</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$31.49</td>
            </tr>
            <tr>
              <td style={cellStyle}>Cargador MC-65 2.4A + Cable USB-V8</td>
              <td style={cellRightStyle}>$29,900</td>
              <td style={cellRightStyle}>$8.60</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$32.24</td>
            </tr>
            <tr>
              <td style={cellStyle}>Cargador MQC-72 Turbo Charge (Blanco)</td>
              <td style={cellRightStyle}>$26,473</td>
              <td style={cellRightStyle}>$7.62</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$30.96</td>
            </tr>
            <tr>
              <td style={cellStyle}>Cargador MQC-75 Tipo C 18W (Negro)</td>
              <td style={cellRightStyle}>$27,900</td>
              <td style={cellRightStyle}>$8.03</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$31.49</td>
            </tr>
            <tr>
              <td style={cellStyle}>Cargador MPD-15 Compatible iPhone 20W</td>
              <td style={cellRightStyle}>$63,900</td>
              <td style={cellRightStyle}>$18.38</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$44.96</td>
            </tr>
            <tr>
              <td style={cellStyle}>Adaptador IP-15 35W Carga Turbo TC</td>
              <td style={cellRightStyle}>$23,000</td>
              <td style={cellRightStyle}>$6.62</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$29.66</td>
            </tr>
            <tr>
              <td style={cellStyle}>Adaptador IP-35 35W Carga Turbo TC</td>
              <td style={cellRightStyle}>$48,000</td>
              <td style={cellRightStyle}>$13.81</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$39.01</td>
            </tr>
            <tr>
              <td style={cellStyle}>Adaptador MPD-35 35W Carga Turbo TC</td>
              <td style={cellRightStyle}>$60,000</td>
              <td style={cellRightStyle}>$17.26</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$43.50</td>
            </tr>
            <tr>
              <td style={cellStyle}>Cargador MPD-80 CL Carga Rápida</td>
              <td style={cellRightStyle}>$55,000</td>
              <td style={cellRightStyle}>$15.82</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$41.63</td>
            </tr>
            <tr>
              <td style={cellStyle}>Cargador MPD-80 Tipo C (Blanco)</td>
              <td style={cellRightStyle}>$40,000</td>
              <td style={cellRightStyle}>$11.51</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$36.02</td>
            </tr>
            <tr>
              <td style={cellStyle}>Cargador MPD-86 USB-C Turbo 25W + Cable</td>
              <td style={cellRightStyle}>$34,137</td>
              <td style={cellRightStyle}>$9.82</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$33.83</td>
            </tr>
            <tr>
              <td style={cellStyle}>Cargador MPD-88 Tipo C Turbo (Negro)</td>
              <td style={cellRightStyle}>$39,900</td>
              <td style={cellRightStyle}>$11.48</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$35.98</td>
            </tr>
            <tr>
              <td style={cellStyle}>Adaptador MS-45C 45W Turbo TC (Negro)</td>
              <td style={cellRightStyle}>$60,000</td>
              <td style={cellRightStyle}>$17.26</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$43.50</td>
            </tr>
            <tr>
              <td style={cellStyle}>Adaptador IP-45 45W Turbo Doble Salida TC</td>
              <td style={cellRightStyle}>$65,000</td>
              <td style={cellRightStyle}>$18.70</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$45.37</td>
            </tr>
            <tr>
              <td style={cellStyle}>Cargador M-30C/TC (Negro / Blanco)</td>
              <td style={cellRightStyle}>$68,000</td>
              <td style={cellRightStyle}>$19.56</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$46.49</td>
            </tr>
            <tr>
              <td style={cellStyle}>Cargador M-33UC Carga Rápida (Negro)</td>
              <td style={cellRightStyle}>$58,900</td>
              <td style={cellRightStyle}>$16.94</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$43.09</td>
            </tr>
            <tr>
              <td style={cellStyle}>Cargador M-55C 55W Carga Rápida (Negro)</td>
              <td style={cellRightStyle}>$69,000</td>
              <td style={cellRightStyle}>$19.85</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$46.87</td>
            </tr>
            <tr>
              <td style={cellStyle}>Cargador M-100 Carga Dual 100W (Negro)</td>
              <td style={cellRightStyle}>$210,000</td>
              <td style={cellRightStyle}>$60.41</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$99.60</td>
            </tr>
            <tr>
              <td style={cellStyle}>Cargador MIP-60 GaN 60W USB Tipo C (Blanco)</td>
              <td style={cellRightStyle}>$69,900</td>
              <td style={cellRightStyle}>$20.11</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$47.20</td>
            </tr>
            <tr>
              <td style={cellStyle}>Cargador MX-65UC 65W (Blanco/Negro)</td>
              <td style={cellRightStyle}>$120,000</td>
              <td style={cellRightStyle}>$34.52</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$65.94</td>
            </tr>
            <tr>
              <td style={cellStyle}>Cargador MX-67U 67W Turbo Charge (Blanco)</td>
              <td style={cellRightStyle}>$98,000</td>
              <td style={cellRightStyle}>$28.19</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$57.71</td>
            </tr>
            <tr>
              <td style={cellStyle}>Cargador MS-25C 25W + Cable CC (Negro)</td>
              <td style={cellRightStyle}>$75,900</td>
              <td style={cellRightStyle}>$21.84</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$49.45</td>
            </tr>
            <tr>
              <td style={cellStyle}>Cargador Moto C-60 USB/USB-C (Negro)</td>
              <td style={cellRightStyle}>$89,900</td>
              <td style={cellRightStyle}>$25.86</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$54.68</td>
            </tr>
            <tr>
              <td style={cellStyle}>Cargador Panel Solar 10 USB-C</td>
              <td style={cellRightStyle}>$149,900</td>
              <td style={cellRightStyle}>$43.12</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$77.12</td>
            </tr>
          </tbody>
        </table>

        <div style={{ flexGrow: 1 }} />

        <div style={{ marginTop: 'auto', pt: '8px', borderTop: '1px solid #cbd5e1', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '7.5px', color: '#64748b', fontWeight: 600 }}>SYSTEM KYRON - DISTRIBUIDOR OFICIAL MOVISUN VENEZUELA (JUNIO 2026)</span>
          <span style={{ fontSize: '7.5px', color: '#64748b', fontWeight: 600 }}>PÁGINA 6 DE 8</span>
        </div>
      </LetterPage>

      {/* PAGE 7 */}
      <LetterPage>
        <div style={categoryHeaderStyle}>Cargadores y Transmisores (cont.)</div>

        <table className="pm-table">
          <thead>
            <tr>
              <th style={{ ...tableHeaderStyle, width: '45%' }}>PRODUCTO</th>
              <th style={{ ...tableHeaderRightStyle, width: '15%' }}>CATÁLOGO (COP)</th>
              <th style={{ ...tableHeaderRightStyle, width: '13%' }}>COSTO BASE (USD)</th>
              <th style={{ ...tableHeaderRightStyle, width: '13%' }}>FLETE ZOOM (USD)</th>
              <th style={{ ...tableHeaderRightStyle, width: '14%' }}>PVP SUGERIDO (USD)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={cellStyle}>Cargador Rocket P23 Powerbank 20.000 mAh</td>
              <td style={cellRightStyle}>$109,900</td>
              <td style={cellRightStyle}>$31.62</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$62.16</td>
            </tr>
            <tr>
              <td style={cellStyle}>Cargador Rocket P20 Powerbank 20.000 mAh</td>
              <td style={cellRightStyle}>$149,900</td>
              <td style={cellRightStyle}>$43.12</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$77.12</td>
            </tr>
            <tr>
              <td style={cellStyle}>Cargador Rocket P12 Powerbank 10.000 mAh</td>
              <td style={cellRightStyle}>$99,900</td>
              <td style={cellRightStyle}>$28.74</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$58.42</td>
            </tr>
            <tr>
              <td style={cellStyle}>Transmisor FM Bluetooth CF-60 20W (Auto)</td>
              <td style={cellRightStyle}>$95,900</td>
              <td style={cellRightStyle}>$27.59</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$56.93</td>
            </tr>
            <tr>
              <td style={cellStyle}>Transmisor FM Bluetooth CF-88 80W (Auto)</td>
              <td style={cellRightStyle}>$131,900</td>
              <td style={cellRightStyle}>$37.95</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$70.39</td>
            </tr>
            <tr>
              <td style={cellStyle}>Soporte Multifuncional Carro/Mesa CS-80 (Negro)</td>
              <td style={cellRightStyle}>$132,000</td>
              <td style={cellRightStyle}>$37.97</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$70.43</td>
            </tr>
          </tbody>
        </table>

        <div style={categoryHeaderStyle}>Cables y Conectores</div>

        <table className="pm-table">
          <thead>
            <tr>
              <th style={{ ...tableHeaderStyle, width: '45%' }}>PRODUCTO</th>
              <th style={{ ...tableHeaderRightStyle, width: '15%' }}>CATÁLOGO (COP)</th>
              <th style={{ ...tableHeaderRightStyle, width: '13%' }}>COSTO BASE (USD)</th>
              <th style={{ ...tableHeaderRightStyle, width: '13%' }}>FLETE ZOOM (USD)</th>
              <th style={{ ...tableHeaderRightStyle, width: '14%' }}>PVP SUGERIDO (USD)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={cellStyle}>Cable Auxiliar 3.5mm TRS</td>
              <td style={cellRightStyle}>$14,000</td>
              <td style={cellRightStyle}>$4.03</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$26.30</td>
            </tr>
            <tr>
              <td style={cellStyle}>Cable Auxiliar 3 en 1 ZCA-3 Alta Calidad</td>
              <td style={cellRightStyle}>$34,000</td>
              <td style={cellRightStyle}>$9.78</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$33.78</td>
            </tr>
            <tr>
              <td style={cellStyle}>Cable Adaptador Audio 3.5mm ZCA-2 Tipo C</td>
              <td style={cellRightStyle}>$26,400</td>
              <td style={cellRightStyle}>$7.59</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$30.93</td>
            </tr>
            <tr>
              <td style={cellStyle}>Cable USB-A Tipo C Z62 5A Carga Rápida Trenzado</td>
              <td style={cellRightStyle}>$25,900</td>
              <td style={cellRightStyle}>$7.45</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$30.75</td>
            </tr>
            <tr>
              <td style={cellStyle}>Cable USB-A Lightning Z64 3.5A Carga Rápida</td>
              <td style={cellRightStyle}>$26,900</td>
              <td style={cellRightStyle}>$7.74</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$31.12</td>
            </tr>
            <tr>
              <td style={cellStyle}>Cable TC a Lightning IC-10</td>
              <td style={cellRightStyle}>$17,200</td>
              <td style={cellRightStyle}>$4.95</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$27.49</td>
            </tr>
            <tr>
              <td style={cellStyle}>Cable TC a Lightning Z68 CL 3.5A</td>
              <td style={cellRightStyle}>$29,900</td>
              <td style={cellRightStyle}>$8.60</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$32.24</td>
            </tr>
            <tr>
              <td style={cellStyle}>Cable TC a TC ZK-6 Pantalla LED (Negro)</td>
              <td style={cellRightStyle}>$28,600</td>
              <td style={cellRightStyle}>$8.23</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$31.76</td>
            </tr>
            <tr>
              <td style={cellStyle}>Cable TC a TC Z66 67W Carga Rápida</td>
              <td style={cellRightStyle}>$27,900</td>
              <td style={cellRightStyle}>$8.03</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$31.49</td>
            </tr>
            <tr>
              <td style={cellStyle}>Cable TC a TC ZK-240 240W Carga Rápida</td>
              <td style={cellRightStyle}>$39,900</td>
              <td style={cellRightStyle}>$11.48</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$35.98</td>
            </tr>
            <tr>
              <td style={cellStyle}>Cable USB-A TC ZK-2 Pantalla LED (Negro)</td>
              <td style={cellRightStyle}>$24,200</td>
              <td style={cellRightStyle}>$6.96</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$30.11</td>
            </tr>
            <tr>
              <td style={cellStyle}>Cable Multifunción ZK-2A2 60W</td>
              <td style={cellRightStyle}>$39,900</td>
              <td style={cellRightStyle}>$11.48</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$35.98</td>
            </tr>
          </tbody>
        </table>

        <div style={categoryHeaderStyle}>Rastreadores, Intercomunicadores y Otros</div>

        <table className="pm-table">
          <thead>
            <tr>
              <th style={{ ...tableHeaderStyle, width: '45%' }}>PRODUCTO</th>
              <th style={{ ...tableHeaderRightStyle, width: '15%' }}>CATÁLOGO (COP)</th>
              <th style={{ ...tableHeaderRightStyle, width: '13%' }}>COSTO BASE (USD)</th>
              <th style={{ ...tableHeaderRightStyle, width: '13%' }}>FLETE ZOOM (USD)</th>
              <th style={{ ...tableHeaderRightStyle, width: '14%' }}>PVP SUGERIDO (USD)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={cellStyle}>Localizador GPS Tag Mini Para iPhone</td>
              <td style={cellRightStyle}>$52,442</td>
              <td style={cellRightStyle}>$15.09</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$40.67</td>
            </tr>
            <tr>
              <td style={cellStyle}>Localizador GPS Tag Mini iPhone (Reacondicionado)</td>
              <td style={cellRightStyle}>$25,000</td>
              <td style={cellRightStyle}>$7.19</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$30.41</td>
            </tr>
          </tbody>
        </table>

        <div style={{ flexGrow: 1 }} />

        <div style={{ marginTop: 'auto', pt: '8px', borderTop: '1px solid #cbd5e1', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '7.5px', color: '#64748b', fontWeight: 600 }}>SYSTEM KYRON - DISTRIBUIDOR OFICIAL MOVISUN VENEZUELA (JUNIO 2026)</span>
          <span style={{ fontSize: '7.5px', color: '#64748b', fontWeight: 600 }}>PÁGINA 7 DE 8</span>
        </div>
      </LetterPage>

      {/* PAGE 8 */}
      <LetterPage>
        <div style={categoryHeaderStyle}>Rastreadores, Intercomunicadores y Otros (cont.)</div>

        <table className="pm-table">
          <thead>
            <tr>
              <th style={{ ...tableHeaderStyle, width: '45%' }}>PRODUCTO</th>
              <th style={{ ...tableHeaderRightStyle, width: '15%' }}>CATÁLOGO (COP)</th>
              <th style={{ ...tableHeaderRightStyle, width: '13%' }}>COSTO BASE (USD)</th>
              <th style={{ ...tableHeaderRightStyle, width: '13%' }}>FLETE ZOOM (USD)</th>
              <th style={{ ...tableHeaderRightStyle, width: '14%' }}>PVP SUGERIDO (USD)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={cellStyle}>Rastreador GPS Tag Pro Compatible iPhone</td>
              <td style={cellRightStyle}>$55,900</td>
              <td style={cellRightStyle}>$16.08</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$41.97</td>
            </tr>
            <tr>
              <td style={cellStyle}>Intercomunicador Para Motos KY-600</td>
              <td style={cellRightStyle}>$135,000</td>
              <td style={cellRightStyle}>$38.84</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$71.55</td>
            </tr>
            <tr>
              <td style={cellStyle}>Intercomunicador Bluetooth KY-680</td>
              <td style={cellRightStyle}>$329,900</td>
              <td style={cellRightStyle}>$94.91</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$144.44</td>
            </tr>
            <tr>
              <td style={cellStyle}>Compresor Portátil RF30 150 PSI + Powerbank 4.000 mAh</td>
              <td style={cellRightStyle}>$209,900</td>
              <td style={cellRightStyle}>$60.39</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$99.56</td>
            </tr>
            <tr>
              <td style={cellStyle}>Mini Compresor Portátil RF70 120 PSI (Inflador)</td>
              <td style={cellRightStyle}>$339,900</td>
              <td style={cellRightStyle}>$97.78</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$148.18</td>
            </tr>
            <tr>
              <td style={cellStyle}>Gafas Inteligentes TF-800 UV400 (Ciclismo)</td>
              <td style={cellRightStyle}>$146,000</td>
              <td style={cellRightStyle}>$42.00</td>
              <td style={cellRightStyle}>$16.20</td>
              <td style={{ ...cellRightStyle, fontWeight: 'bold', color: '#0f172a' }}>$75.66</td>
            </tr>
          </tbody>
        </table>

        <div style={{
          backgroundColor: '#fdf2f8',
          borderLeft: '4px solid #db2777',
          padding: '8px 12px',
          borderRadius: '4px',
          marginTop: '15px',
          marginBottom: '15px',
        }}>
          <p style={{ fontSize: '9px', fontWeight: 'bold', color: '#db2777', margin: '0 0 4px 0', textTransform: 'uppercase' }}>
            Nota Comercial:
          </p>
          <p style={{ fontSize: '8.5px', color: '#831843', margin: 0, lineHeight: '1.4', textAlign: 'justify' }}>
            Al ser este el escenario "Techo" (el flete individual más costoso del mercado), los precios sugeridos en dólares reflejan un posicionamiento de gama premium. Cualquier optimización posterior en la logística (como el envío consolidado por carga marítima o terrestre, o el uso de couriers puerta a puerta en lote) reducirá el flete unitario drásticamente, incrementando la rentabilidad neta de System Kyron o permitiendo ofrecer precios de venta más competitivos en Venezuela.
          </p>
        </div>

        <div style={{ flexGrow: 1 }} />

        <div style={{ marginTop: 'auto', pt: '8px', borderTop: '1px solid #cbd5e1', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '7.5px', color: '#64748b', fontWeight: 600 }}>SYSTEM KYRON - DISTRIBUIDOR OFICIAL MOVISUN VENEZUELA (JUNIO 2026)</span>
          <span style={{ fontSize: '7.5px', color: '#64748b', fontWeight: 600 }}>PÁGINA 8 DE 8</span>
        </div>
      </LetterPage>
    </LetterWrapper>
  );
}
