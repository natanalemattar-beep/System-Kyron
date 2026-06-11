'use client';

import { LetterWrapper } from '@/components/brand/letter-wrapper';

export default function PlanNegocioMovisunPage() {
  return (
    <LetterWrapper
      title="Plan de Negocio — Importaci\u00f3n de Calzado a Venezuela"
      filename="System-Kyron-Plan-Negocio-Movisun.pdf"
    >
      <Section title="1. Plan de Factibilidad de Importaci\u00f3n (Colombia a Venezuela)">
        <SubSection title="An\u00e1lisis Arancelario y Legal">
          <p>La importaci\u00f3n de calzado desde Colombia hacia Venezuela se acoge al <strong>Acuerdo de Alcance Parcial de Complementaci\u00f3n Econ\u00f3mica AAP.CE No. 28</strong> (CAN - Comunidad Andina), lo que permite preferencias arancelarias significativas. El arancel base para calzado (partida arancelaria 64) oscila entre 15% y 35%, seg\u00fan el tipo de calzado.</p>
        </SubSection>

        <SubSection title="Requisitos Fitosanitarios y T\u00e9cnicos">
          <ul>
            <li><strong>SENCAMER:</strong> Registro de producto y certificado de conformidad.</li>
            <li><strong>SENIAT:</strong> Registro \u00danico de Informaci\u00f3n Fiscal (RIF) de importador.</li>
            <li><strong>INTT:</strong> Homologaci\u00f3n de calzado (normas COVENIN).</li>
            <li><strong>INSALUD:</strong> Permiso sanitario para calzado de uso m\u00e9dico o industrial.</li>
            <li><strong>Certificado de Origen:</strong> Emitido por el Ministerio de Comercio de Colombia (formato DIGITEX).</li>
          </ul>
        </SubSection>

        <SubSection title="Log\u00edstica y Fletes">
          <p>Ruta principal: <strong>C\u00facuta (Colombia) — San Antonio del T\u00e1chira (Venezuela)</strong>. Tiempo estimado de tr\u00e1nsito: 2 a 4 d\u00edas h\u00e1biles. Costo estimado de flete terrestre: $1.50 - $3.00 USD por par, dependiendo del volumen. Alternativa mar\u00edtima: Puerto de Barranquilla a La Guaira (7 a 10 d\u00edas).</p>
        </SubSection>

        <SubSection title="Proveedores Potenciales en Colombia">
          <ul>
            <li><strong>Calzado Croydon S.A.</strong> — Calzado industrial y de seguridad</li>
            <li><strong>Calzado Brixa</strong> — Calzado casual y formal</li>
            <li><strong>V\u00e9lez S.A.S.</strong> — Calzado de cuero premium</li>
            <li><strong>Calzado Mustang</strong> — Calzado deportivo y urbano</li>
            <li><strong>Fabricato / Tejicondor</strong> — Insumos textiles para calzado</li>
          </ul>
        </SubSection>
      </Section>

      <Section title="2. Plan de Distribuci\u00f3n del Producto">
        <SubSection title="Canales de Distribuci\u00f3n">
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
              <thead>
                <tr style={{ backgroundColor: '#1e3a5f', color: 'white' }}>
                  <th style={{ padding: '6px 10px', textAlign: 'left', border: '1px solid #ccc' }}>Canal</th>
                  <th style={{ padding: '6px 10px', textAlign: 'left', border: '1px solid #ccc' }}>Descripci\u00f3n</th>
                  <th style={{ padding: '6px 10px', textAlign: 'center', border: '1px solid #ccc' }}>% Margen</th>
                  <th style={{ padding: '6px 10px', textAlign: 'center', border: '1px solid #ccc' }}>Volumen</th>
                </tr>
              </thead>
              <tbody>
                <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc', fontWeight: 600 }}>DTC (Directo al Consumidor)</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Tienda online integrada a System Kyron con cat\u00e1logo digital, carrito de compras, pasarela de pago en divisas (USDT, PayPal, Zelle) y bol\u00edvares (BCV). Entrega contra entrega o por delivery express 24h en ciudades principales.</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>50% - 65%</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>Bajo-Medio</td></tr>
                <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc', fontWeight: 600 }}>Mayorista</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Venta por lotes (m\u00edn. 50 pares) a comercios multimarca en centros comerciales de Caracas, Maracaibo, Valencia, Barquisimeto y Puerto Ordaz. Contrato trimestral con vol\u00famenes escalonados.</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>20% - 30%</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>Alto</td></tr>
                <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc', fontWeight: 600 }}>Corporativo / Dotaciones</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Venta B2B a empresas para uniformes laborales, dotaci\u00f3n de personal y calzado industrial. Contratos anuales con entregas programadas. Facturaci\u00f3n electr\u00f3nica y cr\u00e9dito a 30-60 d\u00edas.</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>30% - 40%</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>Medio-Alto</td></tr>
                <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc', fontWeight: 600 }}>Red de Agentes</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Comisionistas independientes con cat\u00e1logo digital y link de pago personalizado. Comisi\u00f3n del 10%-15% por venta. Capacitaci\u00f3n inicial y soporte continuo v\u00eda System Kyron.</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>10% - 15% (comisi\u00f3n)</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>Medio</td></tr>
                <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc', fontWeight: 600 }}>Distribuidores Regionales</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Socios comerciales en cada estado con exclusividad zonal. Compra directa de inventario a precio de distribuidor (35% descuento sobre PVP). M\u00ednimo 200 pares por pedido inicial.</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>25% - 35%</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>Muy Alto</td></tr>
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
                <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Econ\u00f3mico</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Sint\u00e9tico, casual b\u00e1sico</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'right' }}>$8 - $12</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'right' }}>$25 - $30</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>55% - 60%</td></tr>
                <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Medio</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Cuero, escolar, deportivo</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'right' }}>$15 - $22</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'right' }}>$40 - $55</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>50% - 55%</td></tr>
                <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Premium</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Cuero genuino, dise\u00f1o, industrial</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'right' }}>$28 - $40</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'right' }}>$65 - $90</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>45% - 50%</td></tr>
                <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Industrial / Seguridad</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Punta de acero, dielectrico</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'right' }}>$20 - $35</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'right' }}>$55 - $80</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>45% - 55%</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-gray-500 mt-2">* Los precios incluyen costo de importaci\u00f3n, log\u00edstica interna y margen del 5% adicional. Descuentos por volumen: 5% (50-100 pares), 10% (101-500 pares), 15% (500+ pares).</p>
        </SubSection>

        <SubSection title="Almacenamiento y Gesti\u00f3n de Inventario">
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
              <thead>
                <tr style={{ backgroundColor: '#1e3a5f', color: 'white' }}>
                  <th style={{ padding: '6px 10px', textAlign: 'left', border: '1px solid #ccc' }}>Centro</th>
                  <th style={{ padding: '6px 10px', textAlign: 'left', border: '1px solid #ccc' }}>Ubicaci\u00f3n</th>
                  <th style={{ padding: '6px 10px', textAlign: 'center', border: '1px solid #ccc' }}>Capacidad</th>
                  <th style={{ padding: '6px 10px', textAlign: 'left', border: '1px solid #ccc' }}>Cobertura</th>
                </tr>
              </thead>
              <tbody>
                <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc', fontWeight: 600 }}>Principal</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>La Guaira (cerca del puerto)</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>5,000 pares</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Centro-Norte (Caracas, Miranda, La Guaira, Aragua)</td></tr>
                <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc', fontWeight: 600 }}>Occidente</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Maracaibo (Zulia)</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>3,000 pares</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Zulia, Falc\u00f3n, M\u00e9rida, T\u00e1chira, Trujillo</td></tr>
                <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc', fontWeight: 600 }}>Oriente</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Puerto Ordaz (Bol\u00edvar)</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>2,500 pares</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Bol\u00edvar, Anzo\u00e1tegui, Monagas, Delta Amacuro, Nueva Esparta</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-gray-700 mt-2"><strong>Gesti\u00f3n de inventario:</strong> Sistema automatizado v\u00eda m\u00f3dulo de inventario de System Kyron con alertas de stock m\u00ednimo configuradas al 20% de capacidad. Conexi\u00f3n en tiempo real con la tienda online para evitar sobreventa. Auditor\u00edas f\u00edsicas mensuales con c\u00f3digo QR por lote.</p>
        </SubSection>

        <SubSection title="Log\u00edstica de \u00daltima Milla">
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
              <thead>
                <tr style={{ backgroundColor: '#1e3a5f', color: 'white' }}>
                  <th style={{ padding: '6px 10px', textAlign: 'left', border: '1px solid #ccc' }}>Tipo de Entrega</th>
                  <th style={{ padding: '6px 10px', textAlign: 'left', border: '1px solid #ccc' }}>Aliados Log\u00edsticos</th>
                  <th style={{ padding: '6px 10px', textAlign: 'center', border: '1px solid #ccc' }}>Tiempo</th>
                  <th style={{ padding: '6px 10px', textAlign: 'right', border: '1px solid #ccc' }}>Costo x Par</th>
                </tr>
              </thead>
              <tbody>
                <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Express 24h (ciudades capitales)</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>MRW, Zoom, Domesa</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>24 horas</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'right' }}>$2.50</td></tr>
                <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Est\u00e1ndar (todo el territorio)</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>MRW, Domesa, Tealca</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>3-5 d\u00edas h\u00e1biles</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'right' }}>$1.80</td></tr>
                <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Contra Entrega (solo DTC)</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>MRW, Zoom</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>24-48 horas</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'right' }}>$3.00</td></tr>
                <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Carga Pesada (pedidos mayoristas)</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Transporte Rodado C.A., Log\u00edstica del Lago</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>5-7 d\u00edas h\u00e1biles</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'right' }}>$0.80 - $1.20</td></tr>
              </tbody>
            </table>
          </div>
        </SubSection>

        <SubSection title="Gesti\u00f3n de Devoluciones y Garant\u00edas">
          <ul>
            <li><strong>Devoluciones por defecto de f\u00e1brica:</strong> Hasta 30 d\u00edas post-entrega. Reemplazo inmediato sin costo. El producto defectuoso se devuelve al proveedor en Colombia para cr\u00e9dito.</li>
            <li><strong>Cambios por talla:</strong> Hasta 15 d\u00edas. Costo de env\u00edo cubierto por el cliente ($2.50). Stock de cambio reservado en almac\u00e9n principal.</li>
            <li><strong>Garant\u00eda de producto:</strong> 90 d\u00edas contra defectos de fabricaci\u00f3n (costuras, suelas, materiales). Proceso gestionado directamente desde el m\u00f3dulo de CRM de System Kyron con generaci\u00f3n autom\u00e1tica de etiqueta de devoluci\u00f3n.</li>
            <li><strong>Tasa de devoluci\u00f3n estimada:</strong> 3% - 5% del total de ventas, acorde al est\u00e1ndar de la industria del calzado en Venezuela.</li>
          </ul>
        </SubSection>

        <SubSection title="Cobertura Geogr\u00e1fica y Plan de Expansi\u00f3n">
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
              <thead>
                <tr style={{ backgroundColor: '#1e3a5f', color: 'white' }}>
                  <th style={{ padding: '6px 10px', textAlign: 'left', border: '1px solid #ccc' }}>Fase</th>
                  <th style={{ padding: '6px 10px', textAlign: 'left', border: '1px solid #ccc' }}>Per\u00edodo</th>
                  <th style={{ padding: '6px 10px', textAlign: 'left', border: '1px solid #ccc' }}>Cobertura</th>
                  <th style={{ padding: '6px 10px', textAlign: 'left', border: '1px solid #ccc' }}>Meta de Ventas</th>
                </tr>
              </thead>
              <tbody>
                <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Fase 1</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Meses 1-3</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Caracas, Miranda, La Guaira (DTC + Mayorista)</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>800 pares</td></tr>
                <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Fase 2</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Meses 4-6</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Maracaibo, Valencia, Barquisimeto (Apertura occidente)</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>2,500 pares</td></tr>
                <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Fase 3</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Meses 7-9</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Puerto Ordaz, Barcelona, Matur\u00edn (Apertura oriente)</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>4,000 pares</td></tr>
                <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Fase 4</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Meses 10-12</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Cobertura nacional + distribuidores regionales en todos los estados</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>6,000+ pares</td></tr>
              </tbody>
            </table>
          </div>
        </SubSection>

        <SubSection title="KPIs de Distribuci\u00f3n">
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
              <thead>
                <tr style={{ backgroundColor: '#1e3a5f', color: 'white' }}>
                  <th style={{ padding: '6px 10px', textAlign: 'left', border: '1px solid #ccc' }}>KPI</th>
                  <th style={{ padding: '6px 10px', textAlign: 'left', border: '1px solid #ccc' }}>Descripci\u00f3n</th>
                  <th style={{ padding: '6px 10px', textAlign: 'center', border: '1px solid #ccc' }}>Meta</th>
                </tr>
              </thead>
              <tbody>
                <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>OTIF</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>On Time In Full — entregas completas y a tiempo</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>&ge; 95%</td></tr>
                <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Rotaci\u00f3n de Inventario</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Veces que se vende y repone el stock por a\u00f1o</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>4x - 6x anual</td></tr>
                <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Costo de Distribuci\u00f3n</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Porcentaje del PVP destinado a log\u00edstica y entrega</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>&le; 8%</td></tr>
                <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Tasa de Devoluci\u00f3n</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Porcentaje de productos devueltos sobre vendidos</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>&le; 4%</td></tr>
                <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Cobertura de Mercado</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>% de estados de Venezuela con presencia activa</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>80% (20/24 estados)</td></tr>
                <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>NPS Log\u00edstico</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Net Promoter Score de experiencia de entrega</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>&ge; 70</td></tr>
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
            <li><strong>EPA / Ferreter\u00eda EPA:</strong> Calzado industrial y de seguridad laboral.</li>
            <li><strong>Tiendas D1 / Ara (Venezuela):</strong> Canales de descuento para calzado econ\u00f3mico.</li>
          </ul>
        </SubSection>

        <SubSection title="Empresas de Dotaci\u00f3n Laboral">
          <ul>
            <li><strong>Dotaciones CRS:</strong> Uniformes y calzado industrial para empresas petroleras.</li>
            <li><strong>Inversiones Vensafe:</strong> Equipos de protecci\u00f3n personal (EPP) para sector construcci\u00f3n.</li>
            <li><strong>Servicios Log\u00edsticos del Lago:</strong> Dotaci\u00f3n para sector petrolero en el Zulia.</li>
            <li><strong>Grupo Varma:</strong> Distribuci\u00f3n de uniformes y calzado corporativo a nivel nacional.</li>
          </ul>
        </SubSection>

        <SubSection title="Sector Salud">
          <ul>
            <li><strong>Cl\u00ednicas privadas (Caracas, Valencia, Maracaibo):</strong> Calzado cl\u00ednico y antideslizante para personal m\u00e9dico.</li>
            <li><strong>Seguros Hospitalarios de Venezuela:</strong> Dotaci\u00f3n de calzado para personal de salud.</li>
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

      <Section title="4. Plan de Inversi\u00f3n Inicial y Financiamiento">
        <SubSection title="Inversi\u00f3n Inicial Estimada">
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
              <thead>
                <tr style={{ backgroundColor: '#1e3a5f', color: 'white' }}>
                  <th style={{ padding: '6px 10px', textAlign: 'left', border: '1px solid #ccc' }}>Concepto</th>
                  <th style={{ padding: '6px 10px', textAlign: 'right', border: '1px solid #ccc' }}>Monto (USD)</th>
                </tr>
              </thead>
              <tbody>
                <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Constituci\u00f3n legal y permisos de importaci\u00f3n</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'right' }}>$2,500</td></tr>
                <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Registro sanitario y certificaciones (SENCAMER, INTT)</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'right' }}>$1,800</td></tr>
                <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Primer lote de inventario (1,500 pares)</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'right' }}>$30,000</td></tr>
                <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Flete y seguro internacional</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'right' }}>$3,500</td></tr>
                <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Adecuaci\u00f3n de centro de distribuci\u00f3n (La Guaira)</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'right' }}>$4,000</td></tr>
                <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Plataforma e-commerce + branding</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'right' }}>$3,500</td></tr>
                <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Equipos y mobiliario de oficina</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'right' }}>$2,200</td></tr>
                <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Capital de trabajo (3 meses)</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'right' }}>$15,000</td></tr>
                <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Marketing y publicidad inicial</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'right' }}>$3,000</td></tr>
                <tr style={{ backgroundColor: '#f0f4f8', fontWeight: 'bold' }}><td style={{ padding: '6px 10px', border: '1px solid #ccc' }}>TOTAL INVERSI\u00d3N INICIAL</td><td style={{ padding: '6px 10px', border: '1px solid #ccc', textAlign: 'right' }}>$65,500</td></tr>
              </tbody>
            </table>
          </div>
        </SubSection>

        <SubSection title="Esquema de Financiamiento a Clientes (Venta a Cr\u00e9dito)">
          <p>Para facilitar la adopci\u00f3n por parte de las empresas compradoras, se ofrecer\u00e1n las siguientes opciones:</p>
          <ul>
            <li><strong>Cr\u00e9dito Directo del Vendedor:</strong> 30% de anticipo, saldo a 30, 60 y 90 d\u00edas. Tasa de inter\u00e9s: 1.5% mensual sobre saldo.</li>
            <li><strong>Pago en Divisas:</strong> Descuento del 5% por pago de contado en USDT, BTC o PayPal.</li>
            <li><strong>Financiamiento Bancario:</strong> Gesti\u00f3n de l\u00edneas de cr\u00e9dito comerciales con bancos nacionales (Banco de Venezuela, Bancaribe, Banesco) para clientes corporativos calificados.</li>
            <li><strong>Factoring:</strong> Venta de facturas a entidades financieras para obtener liquidez inmediata.</li>
          </ul>
        </SubSection>

        <SubSection title="Proyecci\u00f3n de Retorno">
          <p>Punto de equilibrio estimado: 4,500 pares vendidos (aproximadamente 5 meses de operaci\u00f3n). Retorno sobre inversi\u00f3n (ROI) proyectado al primer a\u00f1o: 35% - 50%.</p>
        </SubSection>
      </Section>

      <Section title="5. Plan de Empleados, Capacitaci\u00f3n y Organizaci\u00f3n">
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
                <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Gerente General</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>1</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Experiencia en comercio internacional y gesti\u00f3n de equipos</td></tr>
                <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Analista de Importaciones</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>1</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Conocimiento en aduanas, aranceles y log\u00edstica internacional</td></tr>
                <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Ejecutivo de Ventas Corporativas</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>2</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Experiencia en ventas B2B y negociaci\u00f3n con empresas</td></tr>
                <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Community Manager / E-commerce</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>1</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Manejo de redes sociales, tienda online y atenci\u00f3n al cliente digital</td></tr>
                <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Asistente Log\u00edstico / Almac\u00e9n</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>1</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Control de inventario, recepci\u00f3n y despacho de mercanc\u00eda</td></tr>
                <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Agentes Comerciales (comisionistas)</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'center' }}>5</td><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Red de ventas independiente con comisi\u00f3n del 10%-15%</td></tr>
                <tr style={{ backgroundColor: '#f0f4f8', fontWeight: 'bold' }}><td style={{ padding: '6px 10px', border: '1px solid #ccc' }}>Total</td><td style={{ padding: '6px 10px', border: '1px solid #ccc', textAlign: 'center' }}>11</td><td style={{ padding: '6px 10px', border: '1px solid #ccc' }}>&#8212;</td></tr>
              </tbody>
            </table>
          </div>
        </SubSection>

        <SubSection title="Plan de Capacitaci\u00f3n Inicial">
          <ul>
            <li><strong>Semana 1 - Inducci\u00f3n General:</strong> Visi\u00f3n y valores de la empresa, conocimiento del producto (calzado), proceso de importaci\u00f3n y cadena de suministro.</li>
            <li><strong>Semana 2 - Sistema System Kyron:</strong> Capacitaci\u00f3n en el uso de los m\u00f3dulos de inventario, ventas, facturaci\u00f3n electr\u00f3nica y CRM. Uso de la plataforma de e-commerce.</li>
            <li><strong>Semana 3 - Ventas y Negociaci\u00f3n:</strong> T\u00e9cnicas de venta consultiva, manejo de objeciones, negociaci\u00f3n de precios y condiciones de pago, presentaci\u00f3n de cat\u00e1logo digital.</li>
            <li><strong>Semana 4 - Log\u00edstica y Distribuci\u00f3n:</strong> Procesos de almacenamiento, control de inventario, despacho y seguimiento de entregas. Manejo de incidencias y devoluciones.</li>
            <li><strong>Capacitaci\u00f3n Continua:</strong> Sesiones mensuales de actualizaci\u00f3n sobre productos, tendencias del mercado y mejoras en la plataforma System Kyron.</li>
          </ul>
        </SubSection>
      </Section>

      <Section title="6. Plan de Publicidad — Zapato Roto + Aud\u00edfono Movisun">
        <SubSection title="Concepto Creativo">
          <p style={{ fontStyle: 'italic', fontSize: '13px', color: '#1e3a5f', borderLeft: '3px solid #1e3a5f', paddingLeft: '12px' }}>
            &ldquo;El zapato que NO necesitas reparar porque no escuchar&aacute;s quejas.&rdquo;
          </p>
          <p><strong>Concepto:</strong> Un zapato roto (con la suela despegada y un hueco visible) al que se le ha insertado un aud\u00edfono Movisun en lugar de repararlo. El mensaje: &ldquo;Cuando la calidad habla, los defectos se silencian.&rdquo; — Una met\u00e1fora visual que comunica que los productos Movisun son tan superiores que incluso lo &quot;roto&quot; puede tener valor cuando se combina con tecnolog\u00eda de calidad.</p>
        </SubSection>

        <SubSection title="Piezas Publicitarias">
          <ul>
            <li><strong>Imagen Principal (Instagram / Facebook / TikTok):</strong> Fotograf\u00eda de alto contraste: primer plano del zapato roto en blanco y negro, con el aud\u00edfono Movisun en color (rojo corporativo) brillando. Texto superpuesto: &ldquo;HAZ QUE HABLE LA CALIDAD.&rdquo;</li>
            <li><strong>Video Corto (Reels / TikTok / YouTube Shorts):</strong> Secuencia r\u00e1pida: pie caminando &rarr; zapato se rompe &rarr; persona coloca aud\u00edfono Movisun en el hueco &rarr; contin\u00faa caminando con el aud\u00edfono sonando m\u00fasica &rarr; texto final: &ldquo;No lo repares. Con\u00e9ctate. MOVISUN.&rdquo;</li>
            <li><strong>Publicidad Est\u00e1tica (Vallas / Posters):</strong> Imagen del zapato roto con el aud\u00edfono insertado. Tagline: &ldquo;MOVISUN: Tecnolog\u00eda que transforma lo imperfecto en extraordinario.&rdquo; Logo de System Kyron + Movisun.</li>
            <li><strong>Merchandising:</strong> Parches bordados con forma de aud\u00edfono Movisun para coser en zapatos rotos. C\u00f3digo QR que lleva a la tienda online.</li>
          </ul>
        </SubSection>

        <SubSection title="Estrategia de Lanzamiento">
          <ul>
            <li><strong>D\u00eda 1-3 Teaser:</strong> Publicaci\u00f3n de la imagen del zapato roto sin contexto. Texto: &ldquo;Algo grande se acerca... y viene con aud\u00edfonos.&rdquo;</li>
            <li><strong>D\u00eda 4-6 Revelaci\u00f3n:</strong> Video completo mostrando el concepto. Anuncio de la alianza System Kyron x Movisun.</li>
            <li><strong>D\u00eda 7-10 Campa\u00f1a Activa:</strong> Publicidad pagada en redes sociales segmentada a p\u00fablico venezolano (18-45 a\u00f1os, inter\u00e9s en tecnolog\u00eda, m\u00fasica y estilo de vida).</li>
            <li><strong>D\u00eda 14+ Mantenimiento:</strong> Contenido generado por usuarios (UGC) con el hashtag #ZapatoRotoMovisun. Concurso: &ldquo;El zapato m\u00e1s roto de Venezuela&rdquo; — el ganador recibe un par de aud\u00edfonos Movisun.</li>
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
                <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Producci\u00f3n de video y fotograf\u00eda</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'right' }}>$800</td></tr>
                <tr><td style={{ padding: '5px 10px', border: '1px solid #ccc' }}>Anuncios en redes sociales (Meta + TikTok, 14 d\u00edas)</td><td style={{ padding: '5px 10px', border: '1px solid #ccc', textAlign: 'right' }}>$1,200</td></tr>
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
