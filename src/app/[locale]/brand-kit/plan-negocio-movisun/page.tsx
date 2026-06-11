'use client';

import { LetterWrapper } from '@/components/brand/letter-wrapper';

export default function PlanNegocioMovisunPage() {
  return (
    <LetterWrapper
      title="Plan de Negocio — Importación de Calzado a Venezuela"
      filename="System-Kyron-Plan-Negocio-Movisun.pdf"
    >
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
                <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc', fontWeight: 600 }}>DTC (Directo al Consumidor)</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Tienda online integrada a System Kyron con catálogo digital, carrito de compras, pasarela de pago en divisas (USDT, PayPal, Zelle) y bolívares (BCV). Entrega contra entrega o por delivery express 24h en ciudades principales.</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>50% - 65%</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>Bajo-Medio</td></tr>
                <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc', fontWeight: 600 }}>Mayorista</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Venta por lotes (mín. 50 pares) a comercios multimarca en centros comerciales de Caracas, Maracaibo, Valencia, Barquisimeto y Puerto Ordaz. Contrato trimestral con volúmenes escalonados.</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>20% - 30%</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>Alto</td></tr>
                <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc', fontWeight: 600 }}>Corporativo / Dotaciones</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Venta B2B a empresas para uniformes laborales, dotación de personal y calzado industrial. Contratos anuales con entregas programadas. Facturación electrónica y crédito a 30-60 días.</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>30% - 40%</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>Medio-Alto</td></tr>
                <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc', fontWeight: 600 }}>Red de Agentes</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Comisionistas independientes con catálogo digital y link de pago personalizado. Comisión del 10%-15% por venta. Capacitación inicial y soporte continuo vía System Kyron.</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>10% - 15% (comisión)</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>Medio</td></tr>
                <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc', fontWeight: 600 }}>Distribuidores Regionales</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Socios comerciales en cada estado con exclusividad zonal. Compra directa de inventario a precio de distribuidor (35% descuento sobre PVP). Mínimo 200 pares por pedido inicial.</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>25% - 35%</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>Muy Alto</td></tr>
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
                  <th style={{ padding: '6px 10px', textAlign: 'left', border: '1px solid #ccc' }}>Tipo de Calzado</th>
                  <th style={{ padding: '6px 10px', textAlign: 'right', border: '1px solid #ccc' }}>Costo FOB (USD)</th>
                  <th style={{ padding: '6px 10px', textAlign: 'right', border: '1px solid #ccc' }}>PVP Sugerido (USD)</th>
                  <th style={{ padding: '6px 10px', textAlign: 'center', border: '1px solid #ccc' }}>Margen</th>
                </tr>
              </thead>
              <tbody>
                <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Económico</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Sintético, casual básico</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'right' }}>$8 - $12</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'right' }}>$25 - $30</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>55% - 60%</td></tr>
                <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Medio</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Cuero, escolar, deportivo</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'right' }}>$15 - $22</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'right' }}>$40 - $55</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>50% - 55%</td></tr>
                <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Premium</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Cuero genuino, diseño, industrial</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'right' }}>$28 - $40</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'right' }}>$65 - $90</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>45% - 50%</td></tr>
                <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Industrial / Seguridad</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Punta de acero, dieléctrico</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'right' }}>$20 - $35</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'right' }}>$55 - $80</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>45% - 55%</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-gray-500 mt-2">* Los precios incluyen costo de importación, logística interna y margen del 5% adicional. Descuentos por volumen: 5% (50-100 pares), 10% (101-500 pares), 15% (500+ pares).</p>
        </SubSection>

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
                <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc', fontWeight: 600 }}>Principal</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>La Guaira (cerca del puerto)</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>5,000 pares</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Centro-Norte (Caracas, Miranda, La Guaira, Aragua)</td></tr>
                <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc', fontWeight: 600 }}>Occidente</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Maracaibo (Zulia)</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>3,000 pares</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Zulia, Falcón, Mérida, Táchira, Trujillo</td></tr>
                <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc', fontWeight: 600 }}>Oriente</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Puerto Ordaz (Bolívar)</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>2,500 pares</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Bolívar, Anzoátegui, Monagas, Delta Amacuro, Nueva Esparta</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-gray-700 mt-2"><strong>Gestión de inventario:</strong> Sistema automatizado vía módulo de inventario de System Kyron con alertas de stock mínimo configuradas al 20% de capacidad. Conexión en tiempo real con la tienda online para evitar sobreventa. Auditorías físicas mensuales con código QR por lote.</p>
        </SubSection>

        <SubSection title="Logística de Última Milla">
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
              <thead>
                <tr style={{ backgroundColor: '#1e3a5f', color: 'white' }}>
                  <th style={{ padding: '6px 10px', textAlign: 'left', border: '1px solid #ccc' }}>Tipo de Entrega</th>
                  <th style={{ padding: '6px 10px', textAlign: 'left', border: '1px solid #ccc' }}>Aliados Logísticos</th>
                  <th style={{ padding: '6px 10px', textAlign: 'center', border: '1px solid #ccc' }}>Tiempo</th>
                  <th style={{ padding: '6px 10px', textAlign: 'right', border: '1px solid #ccc' }}>Costo x Par</th>
                </tr>
              </thead>
              <tbody>
                <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Express 24h (ciudades capitales)</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>MRW, Zoom, Domesa</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>24 horas</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'right' }}>$2.50</td></tr>
                <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Estándar (todo el territorio)</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>MRW, Domesa, Tealca</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>3-5 días hábiles</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'right' }}>$1.80</td></tr>
                <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Contra Entrega (solo DTC)</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>MRW, Zoom</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>24-48 horas</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'right' }}>$3.00</td></tr>
                <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Carga Pesada (pedidos mayoristas)</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Transporte Rodado C.A., Logística del Lago</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>5-7 días hábiles</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'right' }}>$0.80 - $1.20</td></tr>
              </tbody>
            </table>
          </div>
        </SubSection>

        <SubSection title="Gestión de Devoluciones y Garantías">
          <ul>
            <li><strong>Devoluciones por defecto de fábrica:</strong> Hasta 30 días post-entrega. Reemplazo inmediato sin costo. El producto defectuoso se devuelve al proveedor en Colombia para crédito.</li>
            <li><strong>Cambios por talla:</strong> Hasta 15 días. Costo de envío cubierto por el cliente ($2.50). Stock de cambio reservado en almacén principal.</li>
            <li><strong>Garantía de producto:</strong> 90 días contra defectos de fabricación (costuras, suelas, materiales). Proceso gestionado directamente desde el módulo de CRM de System Kyron con generación automática de etiqueta de devolución.</li>
            <li><strong>Tasa de devolución estimada:</strong> 3% - 5% del total de ventas, acorde al estándar de la industria del calzado en Venezuela.</li>
          </ul>
        </SubSection>

        <SubSection title="Cobertura Geográfica y Plan de Expansión">
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
              <thead>
                <tr style={{ backgroundColor: '#1e3a5f', color: 'white' }}>
                  <th style={{ padding: '6px 10px', textAlign: 'left', border: '1px solid #ccc' }}>Fase</th>
                  <th style={{ padding: '6px 10px', textAlign: 'left', border: '1px solid #ccc' }}>Período</th>
                  <th style={{ padding: '6px 10px', textAlign: 'left', border: '1px solid #ccc' }}>Cobertura</th>
                  <th style={{ padding: '6px 10px', textAlign: 'left', border: '1px solid #ccc' }}>Meta de Ventas</th>
                </tr>
              </thead>
              <tbody>
                <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Fase 1</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Meses 1-3</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Caracas, Miranda, La Guaira (DTC + Mayorista)</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>800 pares</td></tr>
                <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Fase 2</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Meses 4-6</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Maracaibo, Valencia, Barquisimeto (Apertura occidente)</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>2,500 pares</td></tr>
                <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Fase 3</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Meses 7-9</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Puerto Ordaz, Barcelona, Maturín (Apertura oriente)</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>4,000 pares</td></tr>
                <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Fase 4</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Meses 10-12</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Cobertura nacional + distribuidores regionales en todos los estados</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>6,000+ pares</td></tr>
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
                <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>OTIF</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>On Time In Full — entregas completas y a tiempo</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>&ge; 95%</td></tr>
                <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Rotación de Inventario</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Veces que se vende y repone el stock por año</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>4x - 6x anual</td></tr>
                <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Costo de Distribución</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Porcentaje del PVP destinado a logística y entrega</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>&le; 8%</td></tr>
                <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Tasa de Devolución</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Porcentaje de productos devueltos sobre vendidos</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>&le; 4%</td></tr>
                <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Cobertura de Mercado</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>% de estados de Venezuela con presencia activa</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>80% (20/24 estados)</td></tr>
                <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>NPS Logístico</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Net Promoter Score de experiencia de entrega</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>&ge; 70</td></tr>
              </tbody>
            </table>
          </div>
        </SubSection>
      </Section>

      <Section title="3. Empresas Potenciales para la Oferta del Producto">
        <SubSection title="Cadenas de Retail">
          <ul>
            <li><strong>Farmatodo / Locatel:</strong> Secciones de calzado y accesorios en sus tiendas.</li>
            <li><strong>Central Madeirense:</strong> Calzado casual y formal para sus tiendas departamentales.</li>
            <li><strong>EPA / Ferretería EPA:</strong> Calzado industrial y de seguridad laboral.</li>
            <li><strong>Tiendas D1 / Ara (Venezuela):</strong> Canales de descuento para calzado económico.</li>
          </ul>
        </SubSection>

        <SubSection title="Empresas de Dotación Laboral">
          <ul>
            <li><strong>Dotaciones CRS:</strong> Uniformes y calzado industrial para empresas petroleras.</li>
            <li><strong>Inversiones Vensafe:</strong> Equipos de protección personal (EPP) para sector construcción.</li>
            <li><strong>Servicios Logísticos del Lago:</strong> Dotación para sector petrolero en el Zulia.</li>
            <li><strong>Grupo Varma:</strong> Distribución de uniformes y calzado corporativo a nivel nacional.</li>
          </ul>
        </SubSection>

        <SubSection title="Sector Salud">
          <ul>
            <li><strong>Clínicas privadas (Caracas, Valencia, Maracaibo):</strong> Calzado clínico y antideslizante para personal médico.</li>
            <li><strong>Seguros Hospitalarios de Venezuela:</strong> Dotación de calzado para personal de salud.</li>
          </ul>
        </SubSection>

        <SubSection title="Sector Educativo y Deportivo">
          <ul>
            <li><strong>Colegios privados (asociaciones de padres):</strong> Calzado escolar y uniformes deportivos.</li>
            <li><strong>Ligas deportivas y academias:</strong> Calzado deportivo personalizado con logos institucionales.</li>
            <li><strong>Gimnasios y centros de fitness:</strong> Calzado para entrenamiento y crossfit.</li>
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
                <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Constitución legal y permisos de importación</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'right' }}>$2,500</td></tr>
                <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Registro sanitario y certificaciones (SENCAMER, INTT)</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'right' }}>$1,800</td></tr>
                <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Primer lote de inventario (1,500 pares)</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'right' }}>$30,000</td></tr>
                <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Flete y seguro internacional</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'right' }}>$3,500</td></tr>
                <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Adecuación de centro de distribución (La Guaira)</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'right' }}>$4,000</td></tr>
                <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Plataforma e-commerce + branding</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'right' }}>$3,500</td></tr>
                <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Equipos y mobiliario de oficina</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'right' }}>$2,200</td></tr>
                <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Capital de trabajo (3 meses)</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'right' }}>$15,000</td></tr>
                <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Marketing y publicidad inicial</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'right' }}>$3,000</td></tr>
                <tr style={{ backgroundColor: '#f0f4f8', fontWeight: 'bold' }}><td style={{ padding: '6px 10px', border: '1px solid #ccc' }}>TOTAL INVERSIÓN INICIAL</td><td style={{ padding: '6px 10px', border: '1px solid #ccc', textAlign: 'right' }}>$65,500</td></tr>
              </tbody>
            </table>
          </div>
        </SubSection>

        <SubSection title="Esquema de Financiamiento a Clientes (Venta a Crédito)">
          <p>Para facilitar la adopción por parte de las empresas compradoras, se ofrecerán las siguientes opciones:</p>
          <ul>
            <li><strong>Crédito Directo del Vendedor:</strong> 30% de anticipo, saldo a 30, 60 y 90 días. Tasa de interés: 1.5% mensual sobre saldo.</li>
            <li><strong>Pago en Divisas:</strong> Descuento del 5% por pago de contado en USDT, BTC o PayPal.</li>
            <li><strong>Financiamiento Bancario:</strong> Gestión de líneas de crédito comerciales con bancos nacionales (Banco de Venezuela, Bancaribe, Banesco) para clientes corporativos calificados.</li>
            <li><strong>Factoring:</strong> Venta de facturas a entidades financieras para obtener liquidez inmediata.</li>
          </ul>
        </SubSection>

        <SubSection title="Proyección de Retorno">
          <p>Punto de equilibrio estimado: 4,500 pares vendidos (aproximadamente 5 meses de operación). Retorno sobre inversión (ROI) proyectado al primer año: 35% - 50%.</p>
        </SubSection>
      </Section>

      <Section title="5. Plan de Empleados, Capacitación y Organización">
        <SubSection title="Estructura Organizacional">
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
              <thead>
                <tr style={{ backgroundColor: '#1e3a5f', color: 'white' }}>
                  <th style={{ padding: '6px 10px', textAlign: 'left', border: '1px solid #ccc' }}>Cargo</th>
                  <th style={{ padding: '6px 10px', textAlign: 'center', border: '1px solid #ccc' }}>Cantidad</th>
                  <th style={{ padding: '6px 10px', textAlign: 'left', border: '1px solid #ccc' }}>Perfil</th>
                </tr>
              </thead>
              <tbody>
                <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Gerente General</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>1</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Experiencia en comercio internacional y gestión de equipos</td></tr>
                <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Analista de Importaciones</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>1</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Conocimiento en aduanas, aranceles y logística internacional</td></tr>
                <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Ejecutivo de Ventas Corporativas</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>2</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Experiencia en ventas B2B y negociación con empresas</td></tr>
                <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Community Manager / E-commerce</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>1</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Manejo de redes sociales, tienda online y atención al cliente digital</td></tr>
                <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Asistente Logístico / Almacén</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>1</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Control de inventario, recepción y despacho de mercancía</td></tr>
                <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Agentes Comerciales (comisionistas)</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>5</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Red de ventas independiente con comisión del 10%-15%</td></tr>
                <tr style={{ backgroundColor: '#f0f4f8', fontWeight: 'bold' }}><td style={{ padding: '6px 10px', border: '1px solid #ccc' }}>Total</td><td style={{ padding: '6px 10px', border: '1px solid #ccc', textAlign: 'center' }}>11</td><td style={{ padding: '6px 10px', border: '1px solid #ccc' }}>—</td></tr>
              </tbody>
            </table>
          </div>
        </SubSection>

        <SubSection title="Plan de Capacitación Inicial">
          <ul>
            <li><strong>Semana 1 - Inducción General:</strong> Visión y valores de la empresa, conocimiento del producto (calzado), proceso de importación y cadena de suministro.</li>
            <li><strong>Semana 2 - Sistema System Kyron:</strong> Capacitación en el uso de los módulos de inventario, ventas, facturación electrónica y CRM. Uso de la plataforma de e-commerce.</li>
            <li><strong>Semana 3 - Ventas y Negociación:</strong> Técnicas de venta consultiva, manejo de objeciones, negociación de precios y condiciones de pago, presentación de catálogo digital.</li>
            <li><strong>Semana 4 - Logística y Distribución:</strong> Procesos de almacenamiento, control de inventario, despacho y seguimiento de entregas. Manejo de incidencias y devoluciones.</li>
            <li><strong>Capacitación Continua:</strong> Sesiones mensuales de actualización sobre productos, tendencias del mercado y mejoras en la plataforma System Kyron.</li>
          </ul>
        </SubSection>
      </Section>

      <Section title="6. Plan de Publicidad — Zapato Roto + Audífono Movisun">
        <SubSection title="Concepto Creativo">
          <p style={{ fontStyle: 'italic', fontSize: '13px', color: '#1e3a5f', borderLeft: '3px solid #1e3a5f', paddingLeft: '12px' }}>
            &ldquo;El zapato que NO necesitas reparar porque no escuchar&aacute;s quejas.&rdquo;
          </p>
          <p><strong>Concepto:</strong> Un zapato roto (con la suela despegada y un hueco visible) al que se le ha insertado un audífono Movisun en lugar de repararlo. El mensaje: &ldquo;Cuando la calidad habla, los defectos se silencian.&rdquo; — Una metáfora visual que comunica que los productos Movisun son tan superiores que incluso lo &quot;roto&quot; puede tener valor cuando se combina con tecnología de calidad.</p>
        </SubSection>

        <SubSection title="Piezas Publicitarias">
          <ul>
            <li><strong>Imagen Principal (Instagram / Facebook / TikTok):</strong> Fotografía de alto contraste: primer plano del zapato roto en blanco y negro, con el audífono Movisun en color (rojo corporativo) brillando. Texto superpuesto: &ldquo;HAZ QUE HABLE LA CALIDAD.&rdquo;</li>
            <li><strong>Video Corto (Reels / TikTok / YouTube Shorts):</strong> Secuencia rápida: pie caminando &rarr; zapato se rompe &rarr; persona coloca audífono Movisun en el hueco &rarr; continúa caminando con el audífono sonando música &rarr; texto final: &ldquo;No lo repares. Conéctate. MOVISUN.&rdquo;</li>
            <li><strong>Publicidad Estática (Vallas / Posters):</strong> Imagen del zapato roto con el audífono insertado. Tagline: &ldquo;MOVISUN: Tecnología que transforma lo imperfecto en extraordinario.&rdquo; Logo de System Kyron + Movisun.</li>
            <li><strong>Merchandising:</strong> Parches bordados con forma de audífono Movisun para coser en zapatos rotos. Código QR que lleva a la tienda online.</li>
          </ul>
        </SubSection>

        <SubSection title="Estrategia de Lanzamiento">
          <ul>
            <li><strong>Día 1-3 Teaser:</strong> Publicación de la imagen del zapato roto sin contexto. Texto: &ldquo;Algo grande se acerca... y viene con audífonos.&rdquo;</li>
            <li><strong>Día 4-6 Revelación:</strong> Video completo mostrando el concepto. Anuncio de la alianza System Kyron x Movisun.</li>
            <li><strong>Día 7-10 Campaña Activa:</strong> Publicidad pagada en redes sociales segmentada a público venezolano (18-45 años, interés en tecnología, música y estilo de vida).</li>
            <li><strong>Día 14+ Mantenimiento:</strong> Contenido generado por usuarios (UGC) con el hashtag #ZapatoRotoMovisun. Concurso: &ldquo;El zapato más roto de Venezuela&rdquo; — el ganador recibe un par de audífonos Movisun.</li>
          </ul>
        </SubSection>

        <SubSection title="Presupuesto de Publicidad Inicial">
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
              <thead>
                <tr style={{ backgroundColor: '#1e3a5f', color: 'white' }}>
                  <th style={{ padding: '6px 10px', textAlign: 'left', border: '1px solid #ccc' }}>Concepto</th>
                  <th style={{ padding: '6px 10px', textAlign: 'right', border: '1px solid #ccc' }}>Costo (USD)</th>
                </tr>
              </thead>
              <tbody>
                <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Producción de video y fotografía</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'right' }}>$800</td></tr>
                <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Anuncios en redes sociales (Meta + TikTok, 14 días)</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'right' }}>$1,200</td></tr>
                <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Material POP (parches bordados, stickers)</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'right' }}>$400</td></tr>
                <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Influencers (3 micro-influencers venezolanos)</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'right' }}>$600</td></tr>
                <tr style={{ backgroundColor: '#f0f4f8', fontWeight: 'bold' }}><td style={{ padding: '6px 10px', border: '1px solid #ccc' }}>TOTAL PUBLICIDAD</td><td style={{ padding: '6px 10px', border: '1px solid #ccc', textAlign: 'right' }}>$3,000</td></tr>
              </tbody>
            </table>
          </div>
        </SubSection>
      </Section>

      <div className="mt-8 pt-4 border-t border-gray-300 text-center">
        <p className="text-[10px] text-gray-500 font-semibold">EMPRENDIMIENTO CARLOS MATTAR — RIF J-50832149-9</p>
        <p className="text-[9px] text-gray-400">System Kyron &times; Movisun — Documento Confidencial</p>
        <p className="text-[9px] text-gray-400">Generado el {new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
      </div>
    </LetterWrapper>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <h2 className="text-sm font-bold text-[#1e3a5f] uppercase tracking-tight border-b border-gray-200 pb-1.5 mb-3">{title}</h2>
      {children}
    </div>
  );
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-3.5">
      <h3 className="text-[12px] font-bold text-gray-800 mb-1.5">{title}</h3>
      <div className="text-[11.5px] leading-[1.6] text-gray-700 space-y-1.5 [&_ul]:pl-4 [&_ul]:space-y-1 [&_li]:text-[11.5px] [&_p]:text-[11.5px]">{children}</div>
    </div>
  );
}
