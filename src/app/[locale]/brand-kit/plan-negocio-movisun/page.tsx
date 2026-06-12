'use client';

import { LetterWrapper, LetterPage } from '@/components/brand/letter-wrapper';

export default function PlanNegocioMovisunPage() {
  return (
    <LetterWrapper filename="System-Kyron-Plan-Negocio-Movisun.pdf">
      <LetterPage title="Plan de Negocio — Importación de Calzado a Venezuela">
        <Section title="1. Plan de Factibilidad de Importación (Colombia a Venezuela)">
          <SubSection title="Análisis Arancelario y Legal">
            <p>La importación de calzado desde Colombia hacia Venezuela se acoge al <strong>Acuerdo de Alcance Parcial de Complementación Económica AAP.CE No. 28</strong> (CAN - Comunidad Andina), lo que permite preferencias arancelarias significativas. El arancel base para calzado (partida arancelaria 64) oscila entre 15% y 35%, según el tipo de calzado.</p>
          </SubSection>

          <SubSection title="Requisitos Fitosanitarios y Técnicos">
            <ul>
              <li><strong>SENCAMER:</strong> Registro de producto y certificado de conformidad.</li>
              <li><strong>SENIAT:</strong> Registro Único de Información Fiscal (RIF) de importador.</li>
              <li><strong>INTT:</strong> Homologación de calzado (normas COVENIN).</li>
              <li><strong>INSALUD:</strong> Permiso sanitario para calzado de uso médico o industrial.</li>
              <li><strong>Certificado de Origen:</strong> Emitido por el Ministerio de Comercio de Colombia (formato DIGITEX).</li>
            </ul>
          </SubSection>

          <SubSection title="Logística y Fletes">
            <p>Ruta principal: <strong>Cúcuta (Colombia) — San Antonio del Táchira (Venezuela)</strong>. Tiempo estimado de tránsito: 2 a 4 días hábiles. Costo estimado de flete terrestre: $1.50 - $3.00 USD por par, dependiendo del volumen. Alternativa marítima: Puerto de Barranquilla a La Guaira (7 a 10 días).</p>
          </SubSection>

          <SubSection title="Proveedores Potenciales en Colombia">
            <ul>
              <li><strong>Calzado Croydon S.A.</strong> — Calzado industrial y de seguridad</li>
              <li><strong>Calzado Brixa</strong> — Calzado casual y formal</li>
              <li><strong>Vélez S.A.S.</strong> — Calzado de cuero premium</li>
              <li><strong>Calzado Mustang</strong> — Calzado deportivo y urbano</li>
              <li><strong>Fabricato / Tejicondor</strong> — Insumos textiles para calzado</li>
            </ul>
          </SubSection>
        </Section>

        <div className="mt-8 pt-4 border-t border-gray-300 text-center">
          <p className="text-[10px] text-gray-500 font-semibold">EMPRENDIMIENTO CARLOS MATTAR — RIF J-50832149-9</p>
          <p className="text-[9px] text-gray-400">Página 1 de 6</p>
        </div>
      </LetterPage>

      <LetterPage>
        <Section title="2. Plan de Distribución del Producto">
          <SubSection title="Canales de Distribución">
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#1e3a5f', color: 'white' }}>
                    <th style={{ padding: '6px 10px', textAlign: 'left', border: '1px solid #ccc' }}>Canal</th>
                    <th style={{ padding: '6px 10px', textAlign: 'left', border: '1px solid #ccc' }}>Descripción</th>
                    <th style={{ padding: '6px 10px', textAlign: 'center', border: '1px solid #ccc' }}>% Margen</th>
                    <th style={{ padding: '6px 10px', textAlign: 'center', border: '1px solid #ccc' }}>Volumen</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc', fontWeight: 600 }}>DTC</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Tienda online integrada. Pago en USDT, PayPal, Zelle, BCV. Delivery 24h.</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>50% - 65%</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>Bajo-Medio</td></tr>
                  <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc', fontWeight: 600 }}>Mayorista</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Lotes (mín. 50 pares) a comercios en Caracas, Maracaibo, Valencia, Barquisimeto, Pto. Ordaz.</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>20% - 30%</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>Alto</td></tr>
                  <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc', fontWeight: 600 }}>Corporativo</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Venta B2B para uniformes, dotaciones y calzado industrial. Facturación electrónica.</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>30% - 40%</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>Medio-Alto</td></tr>
                  <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc', fontWeight: 600 }}>Agentes</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Comisionistas independientes con link de pago. Comisión 10%-15%.</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>10% - 15% (com.)</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>Medio</td></tr>
                  <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc', fontWeight: 600 }}>Distribuidores Regionales</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Exclusividad zonal. 35% descuento sobre PVP. Mín. 200 pares iniciales.</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>25% - 35%</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>Muy Alto</td></tr>
                </tbody>
              </table>
            </div>
          </SubSection>

          <SubSection title="Estrategia de Precios por Segmento">
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#1e3a5f', color: 'white' }}>
                    <th style={{ padding: '6px 10px', textAlign: 'left', border: '1px solid #ccc' }}>Segmento</th>
                    <th style={{ padding: '6px 10px', textAlign: 'left', border: '1px solid #ccc' }}>Tipo</th>
                    <th style={{ padding: '6px 10px', textAlign: 'right', border: '1px solid #ccc' }}>Costo FOB</th>
                    <th style={{ padding: '6px 10px', textAlign: 'right', border: '1px solid #ccc' }}>PVP</th>
                    <th style={{ padding: '6px 10px', textAlign: 'center', border: '1px solid #ccc' }}>Margen</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Económico</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Sintético, casual básico</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'right' }}>$8-$12</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'right' }}>$25-$30</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>55-60%</td></tr>
                  <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Medio</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Cuero, escolar, deportivo</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'right' }}>$15-$22</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'right' }}>$40-$55</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>50-55%</td></tr>
                  <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Premium</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Cuero genuino, diseño</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'right' }}>$28-$40</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'right' }}>$65-$90</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>45-50%</td></tr>
                  <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Industrial</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Punta de acero, dieléctrico</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'right' }}>$20-$35</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'right' }}>$55-$80</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>45-55%</td></tr>
                </tbody>
              </table>
            </div>
            <p className="text-[10px] text-gray-500 mt-1">* Descuentos por volumen: 5% (50-100 pares), 10% (101-500), 15% (500+).</p>
          </SubSection>
        </Section>

        <div className="mt-8 pt-4 border-t border-gray-300 text-center">
          <p className="text-[10px] text-gray-500 font-semibold">EMPRENDIMIENTO CARLOS MATTAR — RIF J-50832149-9</p>
          <p className="text-[9px] text-gray-400">Página 2 de 6</p>
        </div>
      </LetterPage>

      <LetterPage>
        <Section title="2. Plan de Distribución (cont.)">
          <SubSection title="Almacenamiento y Gestión de Inventario">
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#1e3a5f', color: 'white' }}>
                    <th style={{ padding: '6px 10px', textAlign: 'left', border: '1px solid #ccc' }}>Centro</th>
                    <th style={{ padding: '6px 10px', textAlign: 'left', border: '1px solid #ccc' }}>Ubicación</th>
                    <th style={{ padding: '6px 10px', textAlign: 'center', border: '1px solid #ccc' }}>Capacidad</th>
                    <th style={{ padding: '6px 10px', textAlign: 'left', border: '1px solid #ccc' }}>Cobertura</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc', fontWeight: 600 }}>Principal</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>La Guaira (puerto)</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>5,000 pares</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Centro-Norte</td></tr>
                  <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc', fontWeight: 600 }}>Occidente</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Maracaibo (Zulia)</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>3,000 pares</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Zulia, Falcón, Mérida, Táchira, Trujillo</td></tr>
                  <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc', fontWeight: 600 }}>Oriente</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Pto. Ordaz (Bolívar)</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>2,500 pares</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Bolívar, Anzoátegui, Monagas, Delta Amacuro, Nva. Esparta</td></tr>
                </tbody>
              </table>
            </div>
            <p className="text-[10px] text-gray-700 mt-1"><strong>Gestión:</strong> System Kyron con alertas de stock mínimo al 20%. Conexión en tiempo real con tienda online. Auditorías mensuales con QR por lote.</p>
          </SubSection>

          <SubSection title="Logística de Última Milla">
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#1e3a5f', color: 'white' }}>
                    <th style={{ padding: '6px 10px', textAlign: 'left', border: '1px solid #ccc' }}>Tipo</th>
                    <th style={{ padding: '6px 10px', textAlign: 'left', border: '1px solid #ccc' }}>Aliados</th>
                    <th style={{ padding: '6px 10px', textAlign: 'center', border: '1px solid #ccc' }}>Tiempo</th>
                    <th style={{ padding: '6px 10px', textAlign: 'right', border: '1px solid #ccc' }}>Costo x Par</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Express 24h</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>MRW, Zoom, Domesa</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>24 h</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'right' }}>$2.50</td></tr>
                  <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Estándar</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>MRW, Domesa, Tealca</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>3-5 d</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'right' }}>$1.80</td></tr>
                  <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Contra Entrega</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>MRW, Zoom</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>24-48 h</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'right' }}>$3.00</td></tr>
                  <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Carga Pesada</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Transp. Rodado, Log. del Lago</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>5-7 d</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'right' }}>$0.80-$1.20</td></tr>
                </tbody>
              </table>
            </div>
          </SubSection>

          <SubSection title="Gestión de Devoluciones y Garantías">
            <ul>
              <li><strong>Defecto de fábrica:</strong> 30 días post-entrega. Reemplazo sin costo.</li>
              <li><strong>Cambios por talla:</strong> 15 días. Envío a cargo del cliente ($2.50).</li>
              <li><strong>Garantía:</strong> 90 días contra defectos. Gestionado vía CRM de System Kyron.</li>
              <li><strong>Tasa estimada:</strong> 3% - 5% del total de ventas.</li>
            </ul>
          </SubSection>
        </Section>

        <div className="mt-8 pt-4 border-t border-gray-300 text-center">
          <p className="text-[10px] text-gray-500 font-semibold">EMPRENDIMIENTO CARLOS MATTAR — RIF J-50832149-9</p>
          <p className="text-[9px] text-gray-400">Página 3 de 6</p>
        </div>
      </LetterPage>

      <LetterPage>
        <Section title="2. Plan de Distribución (cont.)">
          <SubSection title="Cobertura Geográfica y Plan de Expansión">
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#1e3a5f', color: 'white' }}>
                    <th style={{ padding: '6px 10px', textAlign: 'left', border: '1px solid #ccc' }}>Fase</th>
                    <th style={{ padding: '6px 10px', textAlign: 'left', border: '1px solid #ccc' }}>Período</th>
                    <th style={{ padding: '6px 10px', textAlign: 'left', border: '1px solid #ccc' }}>Cobertura</th>
                    <th style={{ padding: '6px 10px', textAlign: 'center', border: '1px solid #ccc' }}>Meta</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>1</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Meses 1-3</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Caracas, Miranda, La Guaira</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>800 pares</td></tr>
                  <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>2</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Meses 4-6</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Maracaibo, Valencia, Barquisimeto</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>2,500 pares</td></tr>
                  <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>3</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Meses 7-9</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Pto. Ordaz, Barcelona, Maturín</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>4,000 pares</td></tr>
                  <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>4</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Meses 10-12</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Nacional + distribuidores regionales</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>6,000+ pares</td></tr>
                </tbody>
              </table>
            </div>
          </SubSection>

          <SubSection title="KPIs de Distribución">
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#1e3a5f', color: 'white' }}>
                    <th style={{ padding: '6px 10px', textAlign: 'left', border: '1px solid #ccc' }}>KPI</th>
                    <th style={{ padding: '6px 10px', textAlign: 'left', border: '1px solid #ccc' }}>Descripción</th>
                    <th style={{ padding: '6px 10px', textAlign: 'center', border: '1px solid #ccc' }}>Meta</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>OTIF</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>On Time In Full</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>&ge; 95%</td></tr>
                  <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Rotación</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Veces que se vende/repone stock al año</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>4x - 6x</td></tr>
                  <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Costo Dist.</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>% del PVP destinado a logística</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>&le; 8%</td></tr>
                  <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Devolución</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>% productos devueltos</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>&le; 4%</td></tr>
                  <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Cobertura</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Estados con presencia activa</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>80% (20/24)</td></tr>
                  <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>NPS Log.</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Net Promoter Score de entrega</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>&ge; 70</td></tr>
                </tbody>
              </table>
            </div>
          </SubSection>
        </Section>

        <div className="mt-8 pt-4 border-t border-gray-300 text-center">
          <p className="text-[10px] text-gray-500 font-semibold">EMPRENDIMIENTO CARLOS MATTAR — RIF J-50832149-9</p>
          <p className="text-[9px] text-gray-400">Página 4 de 6</p>
        </div>
      </LetterPage>

      <LetterPage>
        <Section title="3. Empresas Potenciales para la Oferta del Producto">
          <SubSection title="Cadenas de Retail">
            <ul>
              <li><strong>Farmatodo / Locatel:</strong> Secciones de calzado y accesorios.</li>
              <li><strong>Central Madeirense:</strong> Calzado casual y formal departamental.</li>
              <li><strong>EPA / Ferretería EPA:</strong> Calzado industrial y de seguridad.</li>
              <li><strong>Tiendas D1 / Ara (Venezuela):</strong> Canales de descuento.</li>
            </ul>
          </SubSection>

          <SubSection title="Empresas de Dotación Laboral">
            <ul>
              <li><strong>Dotaciones CRS:</strong> Uniformes y calzado industrial petrolero.</li>
              <li><strong>Inversiones Vensafe:</strong> EPP para sector construcción.</li>
              <li><strong>Servicios Logísticos del Lago:</strong> Dotación sector petrolero Zulia.</li>
              <li><strong>Grupo Varma:</strong> Distribución nacional de uniformes.</li>
            </ul>
          </SubSection>

          <SubSection title="Sector Salud y Educativo">
            <ul>
              <li><strong>Clínicas privadas:</strong> Calzado clínico antideslizante.</li>
              <li><strong>Colegios privados:</strong> Calzado escolar y deportivo.</li>
              <li><strong>Ligas deportivas:</strong> Calzado personalizado con logos.</li>
              <li><strong>Gimnasios:</strong> Calzado para entrenamiento y crossfit.</li>
            </ul>
          </SubSection>
        </Section>

        <Section title="4. Plan de Inversión Inicial y Financiamiento">
          <SubSection title="Inversión Inicial Estimada">
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#1e3a5f', color: 'white' }}>
                    <th style={{ padding: '6px 10px', textAlign: 'left', border: '1px solid #ccc' }}>Concepto</th>
                    <th style={{ padding: '6px 10px', textAlign: 'right', border: '1px solid #ccc' }}>Monto (USD)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Constitución legal y permisos</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'right' }}>$2,500</td></tr>
                  <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Registro sanitario y certificaciones</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'right' }}>$1,800</td></tr>
                  <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Primer lote (1,500 pares)</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'right' }}>$30,000</td></tr>
                  <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Flete y seguro internacional</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'right' }}>$3,500</td></tr>
                  <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Adecuación centro de distribución</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'right' }}>$4,000</td></tr>
                  <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>E-commerce + branding</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'right' }}>$3,500</td></tr>
                  <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Equipos y mobiliario</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'right' }}>$2,200</td></tr>
                  <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Capital de trabajo (3 meses)</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'right' }}>$15,000</td></tr>
                  <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Marketing y publicidad inicial</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'right' }}>$3,000</td></tr>
                  <tr style={{ backgroundColor: '#f0f4f8', fontWeight: 'bold' }}><td style={{ padding: '6px 10px', border: '1px solid #ccc' }}>TOTAL</td><td style={{ padding: '6px 10px', border: '1px solid #ccc', textAlign: 'right' }}>$65,500</td></tr>
                </tbody>
              </table>
            </div>
          </SubSection>
        </Section>

        <div className="mt-8 pt-4 border-t border-gray-300 text-center">
          <p className="text-[10px] text-gray-500 font-semibold">EMPRENDIMIENTO CARLOS MATTAR — RIF J-50832149-9</p>
          <p className="text-[9px] text-gray-400">Página 5 de 6</p>
        </div>
      </LetterPage>

      <LetterPage>
        <Section title="4. Plan de Inversión (cont.)">
          <SubSection title="Esquema de Financiamiento a Clientes">
            <ul>
              <li><strong>Crédito Directo:</strong> 30% anticipo, saldo a 30/60/90 días. Interés 1.5% mensual.</li>
              <li><strong>Pago en Divisas:</strong> 5% descuento por pago de contado en USDT, BTC o PayPal.</li>
              <li><strong>Financiamiento Bancario:</strong> Líneas de crédito con Bco. Venezuela, Bancaribe, Banesco.</li>
              <li><strong>Factoring:</strong> Venta de facturas para liquidez inmediata.</li>
            </ul>
          </SubSection>

          <SubSection title="Proyección de Retorno">
            <p>Punto de equilibrio: 4,500 pares (~5 meses). ROI proyectado al primer año: 35% - 50%.</p>
          </SubSection>
        </Section>

        <Section title="5. Plan de Empleados, Capacitación y Organización">
          <SubSection title="Estructura Organizacional">
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#1e3a5f', color: 'white' }}>
                    <th style={{ padding: '6px 10px', textAlign: 'left', border: '1px solid #ccc' }}>Cargo</th>
                    <th style={{ padding: '6px 10px', textAlign: 'center', border: '1px solid #ccc' }}>Cant.</th>
                    <th style={{ padding: '6px 10px', textAlign: 'left', border: '1px solid #ccc' }}>Perfil</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Gerente General</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>1</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Comercio internacional y gestión de equipos</td></tr>
                  <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Analista de Importaciones</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>1</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Aduanas, aranceles y logística internacional</td></tr>
                  <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Ejecutivo Ventas Corp.</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>2</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Ventas B2B y negociación con empresas</td></tr>
                  <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Community Manager / E-com</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>1</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Redes sociales, tienda online y atención digital</td></tr>
                  <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Asistente Logístico</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>1</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Control de inventario, recepción y despacho</td></tr>
                  <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Agentes Comerciales</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>5</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Red de ventas independiente (com. 10%-15%)</td></tr>
                  <tr style={{ backgroundColor: '#f0f4f8', fontWeight: 'bold' }}><td style={{ padding: '6px 10px', border: '1px solid #ccc' }}>Total</td><td style={{ padding: '6px 10px', border: '1px solid #ccc', textAlign: 'center' }}>11</td><td style={{ padding: '6px 10px', border: '1px solid #ccc' }}>—</td></tr>
                </tbody>
              </table>
            </div>
          </SubSection>

          <SubSection title="Plan de Capacitación">
            <ul>
              <li><strong>Semana 1:</strong> Inducción general, producto, importación y cadena de suministro.</li>
              <li><strong>Semana 2:</strong> Sistema Kyron: inventario, ventas, facturación electrónica, CRM, e-commerce.</li>
              <li><strong>Semana 3:</strong> Ventas consultivas, negociación, presentación de catálogo digital.</li>
              <li><strong>Semana 4:</strong> Logística: almacenamiento, control de inventario, despacho, devoluciones.</li>
              <li><strong>Continua:</strong> Sesiones mensuales de actualización sobre productos y tendencias.</li>
            </ul>
          </SubSection>
        </Section>

        <div className="mt-8 pt-4 border-t border-gray-300 text-center">
          <p className="text-[10px] text-gray-500 font-semibold">EMPRENDIMIENTO CARLOS MATTAR — RIF J-50832149-9</p>
          <p className="text-[9px] text-gray-400">Página 6 de 6</p>
        </div>
      </LetterPage>
    </LetterWrapper>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <h2 className="text-sm font-bold text-[#1e3a5f] uppercase tracking-tight border-b border-gray-200 pb-1.5 mb-3">{title}</h2>
      {children}
    </div>
  );
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-3">
      <h3 className="text-[12px] font-bold text-gray-800 mb-1">{title}</h3>
      <div className="text-[11px] leading-[1.5] text-gray-700 space-y-1 [&_ul]:pl-4 [&_ul]:space-y-0.5 [&_li]:text-[11px] [&_p]:text-[11px]">{children}</div>
    </div>
  );
}
