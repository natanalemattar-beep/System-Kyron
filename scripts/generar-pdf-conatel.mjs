import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

const TMP = 'C:/Users/Carlos/AppData/Local/Temp/CONATEL_SYSTEM_KYRON.pdf';
const doc = new PDFDocument({
  size: 'LETTER',
  margins: { top: 70, bottom: 70, left: 60, right: 60 },
  info: {
    Title: 'Solicitud de Habilitación General - Atributo Servicios de Internet',
    Author: 'System Kyron',
    Subject: 'CONATEL - Habilitación Administrativa General de Servicios de Internet',
    Keywords: 'CONATEL, habilitación, internet, telecomunicaciones, Venezuela'
  }
});
const stream = fs.createWriteStream(TMP);
doc.pipe(stream);

const R = 'Times-Roman', RB = 'Times-Bold', RI = 'Times-Italic';
const H = 'Helvetica', HB = 'Helvetica-Bold';
const PW = 612, PH = 792, ML = 60, CW = PW - ML - 60;
const AZUL = '#1a3a5c', GRIS = '#555';

let pg = 1;

function pie() {
  doc.fontSize(6).font(RI).fillColor('#888');
  doc.text('System Kyron\u00AE  |  Emprendimiento Carlos Mattar  |  RIF J-50832149-9  |  systemkyronofficial@gmail.com', ML, 38, { width: CW, align: 'center' });
  doc.text(`P\u00E1gina ${pg}`, ML, 28, { width: CW, align: 'right' });
  doc.fillColor('#000');
}

function marco() {
  doc.rect(20, 20, PW - 40, PH - 40).lineWidth(1).stroke('#bbb');
  doc.rect(22, 22, PW - 44, PH - 44).lineWidth(0.3).stroke('#ddd');
}

function encabezado(tit) {
  marco();
  doc.fontSize(8).font(H).fillColor('#333');
  doc.text('REP\u00DABLICA BOLIVARIANA DE VENEZUELA', ML, 48, { width: CW, align: 'center' });
  doc.fontSize(7).font(HB).fillColor(GRIS);
  doc.text('COMISI\u00D3N NACIONAL DE TELECOMUNICACIONES (CONATEL)', ML, 60, { width: CW, align: 'center' });
  doc.moveDown(0.7);
  const ly = doc.y;
  doc.moveTo(ML, ly).lineTo(ML + CW, ly).lineWidth(1.5).stroke(AZUL);
  doc.moveDown(0.4);
  if (tit) {
    doc.fontSize(12).font(HB).fillColor(AZUL).text(tit, ML, doc.y, { width: CW, align: 'center' });
    doc.moveDown(0.2);
    doc.moveTo(ML, doc.y).lineTo(ML + CW, doc.y).lineWidth(0.4).stroke(AZUL);
    doc.moveDown(0.4);
  }
  doc.fillColor('#000');
}

function stit(t) {
  doc.fontSize(10).font(RB).fillColor(AZUL).text(t, ML, doc.y, { width: CW });
  doc.moveDown(0.35);
  doc.fillColor('#000');
}

function tx(t, sz = 9, o = {}) {
  doc.fontSize(sz).font(o.b ? RB : o.i ? RI : R).fillColor(o.c || '#000');
  doc.text(t, o.x || ML, o.y || doc.y, { width: o.w || CW, align: o.a || 'justify', indent: o.indent || 0 });
  if (!o.y) doc.moveDown(o.space || 0.25);
  doc.fillColor('#000');
}

function bf(l, v, o = {}) {
  const x = o.x || ML, y = o.y || doc.y;
  doc.fontSize(o.sz || 8.5).font(RB).fillColor('#333').text(l, x, y, { width: 62, continued: true });
  doc.font(R).fillColor('#000').text(v || '(PENDIENTE)', { width: CW - 62 });
  doc.moveDown(0.15);
}

function th(cols, widths) {
  const y = doc.y, h = 17;
  let x = ML;
  cols.forEach((c, i) => {
    doc.rect(x, y, widths[i], h).fillAndStroke(AZUL, AZUL);
    doc.fontSize(6.5).font(HB).fillColor('#FFF').text(c, x + 2, y + (h - 8) / 2, { width: widths[i] - 4, align: 'center' });
    x += widths[i];
  });
  doc.fillColor('#000');
  doc.moveDown(1.3);
}

function tr(cols, widths, shade = false) {
  const y = doc.y, h = 15;
  if (shade) doc.rect(ML, y - 1, CW, h).fill('#f4f6fa');
  let x = ML;
  cols.forEach((c, i) => {
    doc.fontSize(6.5).font(/TOTAL|General/.test(c) ? RB : R);
    doc.text(String(c || ''), x + 2, y, { width: widths[i] - 4, align: 'center' });
    x += widths[i];
  });
  doc.fillColor('#000');
  doc.moveDown(0.85);
}

function np() { pie(); doc.addPage(); pg++; }

// ============== P\u00C1G 1: PORTADA ==============
encabezado('SOLICITUD DE HABILITACI\u00D3N GENERAL');
tx('CON EL ATRIBUTO DE SERVICIOS DE INTERNET', 9, { a: 'center', b: true });
doc.moveDown(0.4);

const bx = doc.y;
const items = [
  ['Raz\u00F3n Social:', 'EMPRENDIMIENTO CARLOS MATTAR'],
  ['Nombre Comercial:', 'System Kyron'],
  ['RIF:', 'J-50832149-9'],
  ['RNE:', 'CRNE2026/46455'],
  ['Direcci\u00F3n:', 'Av. Playa Grande, Edif. Belo Horizonte, Piso 15, Apt. 155-B'],
  ['', 'Catia La Mar, Estado La Guaira, Zona Postal 1162'],
  ['Tel\u00E9fono:', '+58 412-1234567'],
  ['Correo Electr\u00F3nico:', 'systemkyronofficial@gmail.com'],
  ['Representante Legal:', 'Carlos Mattar (menor de edad)'],
  ['C.I. del Representante:', 'V-32.855.496'],
  ['Padre:', 'Omar Antonio Mattar Fanianos  |  C.I. V-9.488.296'],
  ['Madre:', 'Mar\u00EDa Teresa Hern\u00E1ndez Bastidas  |  C.I. V-13.374.121'],
];
tx('DATOS DEL SOLICITANTE', 10, { b: true, c: AZUL });
doc.moveDown(0.15);
items.forEach(([l, v]) => bf(l, v));
doc.moveDown(0.2);
const bx2 = doc.y;
doc.rect(ML, bx, CW, bx2 - bx + 8).lineWidth(0.5).stroke('#999');

doc.moveDown(0.3);
tx('TIPO DE SOLICITANTE:', 8.5, { b: true, c: '#333', a: 'left', indent: 0, x: ML, w: 110, space: 0 });
tx('  Persona Jur\u00EDdica \u2014 Prestaci\u00F3n de servicios a terceros (con fines de lucro)', 8.5, { a: 'left', x: ML + 110 });
doc.moveDown(0.2);
tx('ATRIBUTO SOLICITADO:', 8.5, { b: true, c: '#333', a: 'left', x: ML, w: 100, space: 0 });
tx('  Habilitaci\u00F3n General con el Atributo de Servicios de Internet', 8.5, { a: 'left', x: ML + 100 });
doc.moveDown(0.2);
tx('Nota: El representante legal, CARLOS MATTAR, es menor de edad. Act\u00FAa bajo la representaci\u00F3n y autorizaci\u00F3n de sus padres OMAR ANTONIO MATTAR FANIANOS (V-9.488.296) y MAR\u00CDA TERESA HERN\u00C1NDEZ BASTIDAS (V-13.374.121), conforme al C\u00F3digo Civil Venezolano.', 7.5, { i: true, c: '#666' });

// ============== P\u00C1G 2: LEGAL ==============
np();
encabezado('SECCI\u00D3N A: RECAUDOS LEGALES');
tx('El proyecto legal deber\u00E1 estar certificado por el profesional responsable, debidamente registrado en el Colegio de Abogados de Venezuela.', 9, { i: true });
doc.moveDown(0.4);

stit('DATOS DEL PROFESIONAL LEGAL');
const ly1 = doc.y;
bf('Nombre y Apellido:', 'Jos\u00E9 Herrera');
bf('C\u00E9dula de Identidad:', 'V-12.459.024');
bf('INPREABOGADO:', '81.048');
bf('Tel\u00E9fono:', '0424-1063710');
bf('Correo Electr\u00F3nico:', 'jjhb24@gmail.com');
doc.rect(ML, ly1, CW, doc.y - ly1 + 4).lineWidth(0.3).stroke('#bbb');
doc.moveDown(0.4);

stit('RECAUDOS LEGALES ADJUNTOS');
tx('El interesado en la obtenci\u00F3n de la Habilitaci\u00F3n General con el Atributo de Servicios de Internet adjunta los siguientes recaudos:', 8.5, { a: 'left' });
const leg = [
  '1. Zona de cobertura: Estado La Guaira (Catia La Mar, Maiquet\u00EDa, Caraballeda, Macuto). Expansi\u00F3n progresiva al \u00C1rea Metropolitana de Caracas y Estado Miranda.',
  '2. Modalidad: Con fines de lucro. Prestaci\u00F3n de servicios de telecomunicaciones a terceros (Art. 6 del Reglamento de la LOT).',
  '3. El atributo se solicita para la prestaci\u00F3n de servicios a terceros (Art. 8 del Reglamento de la LOT).',
  '4. Archivo PDF del Registro de Informaci\u00F3n Fiscal (RIF): J-50832149-9 (se adjunta).',
];
leg.forEach(t => tx(t, 8.5, { indent: 10 }));
doc.moveDown(0.2);
tx('Secci\u00F3n B (Personas Naturales): NO APLICA.  |  Secci\u00F3n C (Personas Jur\u00EDdicas): SE ADJUNTA Documento Constitutivo y Estatutos de la sociedad, debidamente registrados.', 8.5, { a: 'left' });
tx('Secci\u00F3n D (Personas Jur\u00EDdicas P\u00FAblicas): NO APLICA.  |  Secci\u00F3n E (Sin fines de lucro): NO APLICA.  |  Secci\u00F3n F (Cooperativas): NO APLICA.', 8.5, { a: 'left' });
doc.moveDown(0.2);
tx('NOTA: El representante legal, CARLOS MATTAR, es menor de edad. Act\u00FAa bajo la representaci\u00F3n y autorizaci\u00F3n de sus padres OMAR ANTONIO MATTAR FANIANOS (C.I. V-9.488.296) y MAR\u00CDA TERESA HERN\u00C1NDEZ BASTIDAS (C.I. V-13.374.121), conforme a lo establecido en el C\u00F3digo Civil Venezolano. Se adjunta documento de autorizaci\u00F3n debidamente notariado.', 8.5, { i: true, a: 'left' });

// ============== P\u00C1G 3: ECON\u00D3MICO ==============
np();
encabezado('SECCI\u00D3N B: RECAUDOS ECON\u00D3MICOS');
tx('El proyecto econ\u00F3mico deber\u00E1 estar certificado por un Contador, Administrador o Economista, debidamente registrado en el Colegio que corresponda.', 9, { i: true });
doc.moveDown(0.4);

stit('DATOS DEL PROFESIONAL EN EL \u00C1REA ECON\u00D3MICA');
const ly2 = doc.y;
bf('Nombre y Apellido:', 'Franco D. Miguel G.');
bf('Registro CPC:', '180.935');
bf('C\u00E9dula de Identidad:', '(PENDIENTE \u2014 ser\u00E1 suministrado)');
bf('Tel\u00E9fono / Correo:', '(PENDIENTE \u2014 ser\u00E1 suministrado)');
doc.rect(ML, ly2, CW, doc.y - ly2 + 4).lineWidth(0.3).stroke('#bbb');
doc.moveDown(0.4);

stit('PERSONA JUR\u00CDDICA \u2014 PRESTACI\u00D3N DE SERVICIOS A TERCEROS');
tx('La empresa EMPRENDIMIENTO CARLOS MATTAR (System Kyron) presenta los siguientes recaudos econ\u00F3micos para la obtenci\u00F3n de la Habilitaci\u00F3n General:', 8.5);
const eco = [
  'a) Aspectos generales del proyecto y descripci\u00F3n del servicio de telecomunicaciones a ofrecer.',
  'b) An\u00E1lisis de mercado: localizaci\u00F3n y sectorizaci\u00F3n, demanda (mercado potencial y meta), oferta y competidores.',
  'c) Determinaci\u00F3n de precios y proyecci\u00F3n estimada de ingresos.',
  'd) Cronograma de inversiones con indicaci\u00F3n de inversi\u00F3n inicial y total (Anexo E-1).',
  'e) Listado de equipos de telecomunicaciones requeridos para la operatividad (Anexo E-2).',
  'f) Estructura de costos asociados a la prestaci\u00F3n del servicio (Anexo E-3).',
  'g) Gastos de personal detallados por cargo (Anexo E-3A).',
  'h) Estado de ganancias y p\u00E9rdidas proyectado a cinco (5) a\u00F1os (Anexo E-4).',
  'i) Flujo de caja proyectado a cinco (5) a\u00F1os (Anexo E-5).',
  'j) Relaci\u00F3n de ingresos y egresos proyectada (Anexo E-6).',
];
eco.forEach(t => tx(`\u2022 ${t}`, 8, { indent: 15 }));

// ============== P\u00C1GS 4-10: ANEXOS ECON\u00D3MICOS ==============
// E-1
np();
encabezado('ANEXO E-1: PLAN O CRONOGRAMA DE INVERSI\u00D3N');
tx('(Expresado en USD \u2014 Tasa de cambio BCV vigente al momento de la consignaci\u00F3n)', 8, { i: true });
doc.moveDown(0.3);
const e1W = [108, 50, 50, 50, 50, 50, 50, 53];
th(['Rubros', 'Inversi\u00F3n', 'A\u00F1o 1', 'A\u00F1o 2', 'A\u00F1o 3', 'A\u00F1o 4', 'A\u00F1o 5', 'Total'], e1W);
[
  ['INV. TANGIBLES', '', '', '', '', '', '', ''],
  ['  Terreno', '0', '0', '0', '0', '0', '0', '0'],
  ['  Construcciones', '2.000', '500', '500', '500', '500', '500', '4.500'],
  ['  Equipos Telecom.', '18.500', '5.000', '6.000', '8.000', '10.000', '12.000', '59.500'],
  ['  Muebles y Eq. Of.', '2.500', '500', '500', '500', '500', '500', '5.000'],
  ['  Instalac. y Montaje', '3.000', '1.000', '1.000', '1.000', '1.000', '1.000', '8.000'],
  ['INV. INTANGIBLES', '', '', '', '', '', '', ''],
  ['  Estudios y Proy.', '2.000', '500', '500', '500', '500', '500', '4.500'],
  ['  Org. y Promoci\u00F3n', '3.500', '1.500', '2.000', '2.500', '3.000', '3.500', '16.000'],
  ['  Tasas CONATEL', '500', '100', '100', '150', '150', '150', '1.150'],
  ['CAPITAL TRABAJO', '', '', '', '', '', '', ''],
  ['  Capital de Trabajo', '5.000', '1.000', '1.500', '2.000', '2.500', '3.000', '15.000'],
  ['  Imprevistos (5%)', '1.850', '500', '600', '750', '900', '1.050', '5.650'],
  ['TOTAL INVERSI\u00D3N', '38.850', '10.600', '12.700', '15.900', '19.050', '22.200', '119.300'],
].forEach((r, i) => tr(r, e1W, i % 2 === 0));
tx('Nota: La inversi\u00F3n inicial ser\u00E1 financiada \u00EDntegramente con capital propio de los accionistas. Cifras expresadas en USD a la tasa de cambio oficial del BCV.', 7.5, { i: true });

// E-2
np();
encabezado('ANEXO E-2: LISTADO DE EQUIPOS');
tx('(Expresado en USD)', 8, { i: true });
doc.moveDown(0.3);
const e2W = [16, 118, 46, 36, 40, 40, 40, 40, 40, 46];
th(['N\u00B0', 'EQUIPO', 'Costo', 'Vida \u00DAtil', 'A\u00F1o 1', 'A\u00F1o 2', 'A\u00F1o 3', 'A\u00F1o 4', 'A\u00F1o 5', 'Total Dep.'], e2W);
[
  ['1', 'Servidor Principal Dell', '4.500', '5', '900', '900', '900', '900', '900', '4.500'],
  ['2', 'Router Core MikroTik CCR', '2.200', '5', '440', '440', '440', '440', '440', '2.200'],
  ['3', 'Switches Cisco 2960 (x3)', '1.800', '5', '360', '360', '360', '360', '360', '1.800'],
  ['4', 'Access Points UniFi (x10)', '2.500', '3', '833', '833', '834', '0', '0', '2.500'],
  ['5', 'Antenas Sectoriales (x4)', '1.600', '5', '320', '320', '320', '320', '320', '1.600'],
  ['6', 'Fibra \u00D3ptica (\u00FAltima milla)', '2.000', '5', '400', '400', '400', '400', '400', '2.000'],
  ['7', 'UPS APC 3000VA (x2)', '1.200', '4', '300', '300', '300', '300', '0', '1.200'],
  ['8', 'Rack 42U + Cableado', '800', '5', '160', '160', '160', '160', '160', '800'],
  ['9', 'Sist. Respaldo Bater\u00EDas', '600', '3', '200', '200', '200', '0', '0', '600'],
  ['10', 'Equipos Cliente CPE (x50)', '1.500', '3', '500', '500', '500', '0', '0', '1.500'],
].forEach((r, i) => tr(r, e2W, i % 2 === 0));
tx('Nota: Depreciaci\u00F3n calculada mediante el m\u00E9todo de l\u00EDnea recta. Los equipos se adquirir\u00E1n progresivamente seg\u00FAn el cronograma del Anexo E-1.', 7.5, { i: true });

// E-3
np();
encabezado('ANEXO E-3: ESTRUCTURA DE COSTOS');
tx('(Expresado en USD)', 8, { i: true });
doc.moveDown(0.3);
const e3W = [158, 72, 72, 72, 72, 72];
th(['Conceptos', 'A\u00F1o 1', 'A\u00F1o 2', 'A\u00F1o 3', 'A\u00F1o 4', 'A\u00F1o 5'], e3W);
[
  ['Insumos y Materiales', '1.200', '1.800', '2.400', '3.000', '3.600'],
  ['Material de Oficina', '600', '720', '864', '1.037', '1.245'],
  ['Gastos Venta y Publicidad', '2.400', '3.600', '5.000', '6.500', '8.000'],
  ['Mantenimiento', '1.800', '2.400', '3.200', '4.000', '5.000'],
  ['Impuestos Telecom.', '500', '800', '1.200', '1.600', '2.000'],
  ['Electricidad y Servicios', '2.400', '3.000', '3.600', '4.200', '4.800'],
  ['Agua y Aseo', '600', '720', '864', '1.037', '1.245'],
  ['Tel\u00E9fono / Internet', '1.200', '1.440', '1.728', '2.074', '2.489'],
  ['Alquiler del Local', '3.600', '4.000', '4.400', '4.800', '5.200'],
  ['Gastos de Personal', '18.000', '28.800', '43.200', '57.600', '72.000'],
  ['Depreciaci\u00F3n Equipos', '4.413', '4.413', '4.414', '2.880', '2.580'],
  ['Gastos de Administraci\u00F3n', '1.800', '2.400', '3.000', '3.600', '4.200'],
  ['Imprevistos (5%)', '1.826', '2.381', '3.087', '3.780', '4.611'],
  ['TOTAL COSTOS ANUALES', '40.339', '56.474', '76.957', '96.108', '116.970'],
].forEach((r, i) => tr(r, e3W, i % 2 === 0));

// E-3A
np();
encabezado('ANEXO E-3A: GASTOS DE PERSONAL');
tx('(Expresado en USD \u2014 Proyecci\u00F3n A\u00F1o 1)', 8, { i: true });
doc.moveDown(0.3);
const e3aW = [92, 30, 52, 52, 46, 46, 46, 52];
th(['Descripci\u00F3n', 'N\u00B0', 'Sueldo/Mes', 'Sueldo/A\u00F1o', 'Otras Rem.', 'Prestac.', 'Otros Ben.', 'TOTAL'], e3aW);
[
  ['PERSONAL T\u00C9CNICO', '', '', '', '', '', '', ''],
  ['  Ingeniero', '1', '500', '6.000', '1.800', '900', '600', '9.300'],
  ['  T\u00E9cnicos', '2', '350', '8.400', '2.520', '1.260', '840', '13.020'],
  ['  Ayudante/Instalador', '1', '250', '3.000', '900', '450', '300', '4.650'],
  ['  Vendedor', '1', '300', '3.600', '1.080', '540', '360', '5.580'],
  ['PERSONAL ADMINISTRATIVO', '', '', '', '', '', '', ''],
  ['  Gerente General', '1', '600', '7.200', '2.160', '1.080', '720', '11.160'],
  ['  Administrador', '1', '400', '4.800', '1.440', '720', '480', '7.440'],
  ['  Secretaria', '1', '250', '3.000', '900', '450', '300', '4.650'],
  ['TOTAL GENERAL', '9', '', '39.000', '11.700', '5.850', '3.900', '60.450'],
].forEach((r, i) => tr(r, e3aW, i % 2 === 0));
tx('Nota: Los a\u00F1os siguientes incluir\u00E1n incrementos salariales por ajuste inflacionario (15-20% anual estimado). Se aplicar\u00E1 la legislaci\u00F3n laboral venezolana vigente (LOTTT).', 7.5, { i: true });

// E-4
np();
encabezado('ANEXO E-4: ESTADO DE GANANCIAS Y P\u00C9RDIDAS PROYECTADO');
tx('(Expresado en USD)', 8, { i: true });
doc.moveDown(0.3);
const e4W = [118, 56, 56, 56, 56, 56, 56];
th(['Rubros', 'A\u00F1o 0', 'A\u00F1o 1', 'A\u00F1o 2', 'A\u00F1o 3', 'A\u00F1o 4', 'A\u00F1o 5'], e4W);
[
  ['A. INGRESOS', '', '', '', '', '', ''],
  ['  Clientes Residenciales', '0', '15.000', '30.000', '52.500', '75.000', '105.000'],
  ['  Clientes Corporativos', '0', '9.000', '18.000', '31.500', '45.000', '63.000'],
  ['Total Ingresos (A)', '0', '24.000', '48.000', '84.000', '120.000', '168.000'],
  ['B. EGRESOS', '', '', '', '', '', ''],
  ['  Costos Operativos', '0', '15.902', '23.660', '32.943', '42.828', '53.959'],
  ['  Gastos de Personal', '0', '18.000', '28.800', '43.200', '57.600', '72.000'],
  ['Total Egresos (B)', '0', '40.339', '56.474', '76.957', '96.108', '116.970'],
  ['C. Utilidad Operac. (A-B)', '0', '-16.339', '-8.474', '7.043', '23.892', '51.030'],
  ['D. ISLR (25%)', '0', '0', '0', '1.761', '5.973', '12.758'],
  ['E. Utilidad Neta (C-D)', '0', '-16.339', '-8.474', '5.282', '17.919', '38.273'],
].forEach((r, i) => tr(r, e4W, i % 2 === 0));
tx('Punto de equilibrio operativo proyectado: A\u00F1o 3.  |  Flujo de caja positivo a partir del A\u00F1o 4.', 8, { b: true, a: 'center' });

// E-5
np();
encabezado('ANEXO E-5: FLUJO DE CAJA PROYECTADO');
tx('(Expresado en USD)', 8, { i: true });
doc.moveDown(0.3);
th(['Rubros', 'A\u00F1o 0', 'A\u00F1o 1', 'A\u00F1o 2', 'A\u00F1o 3', 'A\u00F1o 4', 'A\u00F1o 5'], e4W);
[
  ['A. Saldo Inicial', '0', '-38.850', '-50.776', '-51.087', '-37.528', '-11.370'],
  ['  Ingresos Operativos', '0', '24.000', '48.000', '84.000', '120.000', '168.000'],
  ['B. Total Ingresos', '0', '24.000', '48.000', '84.000', '120.000', '168.000'],
  ['C. Inversiones', '38.850', '10.600', '12.700', '15.900', '19.050', '22.200'],
  ['  Costos Operativos', '0', '15.902', '23.660', '32.943', '42.828', '53.959'],
  ['  Gastos de Personal', '0', '18.000', '28.800', '43.200', '57.600', '72.000'],
  ['D. Total Egresos', '38.850', '44.502', '65.160', '92.043', '119.478', '148.159'],
  ['E. Flujo Neto (B-D)', '-38.850', '-20.502', '-17.160', '-8.043', '522', '19.841'],
  ['F. Saldo Acumulado', '-38.850', '-59.352', '-76.512', '-84.555', '-84.033', '-64.192'],
].forEach((r, i) => tr(r, e4W, i % 2 === 0));
tx('Nota: Se requiere capital de trabajo suficiente para cubrir el d\u00E9ficit de los primeros a\u00F1os. Punto de equilibrio financiero proyectado en el A\u00F1o 4.', 7.5, { i: true });

// E-6
np();
encabezado('ANEXO E-6: RELACI\u00D3N DE INGRESOS Y EGRESOS');
tx('(Expresado en USD)', 8, { i: true });
doc.moveDown(0.3);
th(['Rubros', 'A\u00F1o 0', 'A\u00F1o 1', 'A\u00F1o 2', 'A\u00F1o 3', 'A\u00F1o 4', 'A\u00F1o 5'], e4W);
[
  ['A. INGRESOS', '', '', '', '', '', ''],
  ['  Ingresos Recurrentes', '0', '24.000', '48.000', '84.000', '120.000', '168.000'],
  ['Total A', '0', '24.000', '48.000', '84.000', '120.000', '168.000'],
  ['B. EGRESOS', '', '', '', '', '', ''],
  ['  Inversiones', '38.850', '10.600', '12.700', '15.900', '19.050', '22.200'],
  ['  Costos y Gastos', '0', '35.902', '52.460', '76.143', '100.428', '125.959'],
  ['Total B', '38.850', '46.502', '65.160', '92.043', '119.478', '148.159'],
  ['C. SALDO (A-B)', '-38.850', '-22.502', '-17.160', '-8.043', '522', '19.841'],
].forEach((r, i) => tr(r, e4W, i % 2 === 0));

// ============== P\u00C1G 11: T\u00C9CNICO ==============
np();
encabezado('SECCI\u00D3N C: RECAUDOS T\u00C9CNICOS');
tx('El proyecto t\u00E9cnico deber\u00E1 estar certificado por el profesional responsable, debidamente registrado en el Colegio de Ingenieros de Venezuela.', 9, { i: true });
doc.moveDown(0.4);

stit('DATOS DEL INGENIERO RESPONSABLE');
const ly3 = doc.y;
bf('Nombre y Apellido:', '(PENDIENTE \u2014 se asignar\u00E1 profesional responsable)');
bf('C\u00E9dula de Identidad:', '(PENDIENTE)');
bf('Registro CIV:', '(PENDIENTE)');
bf('Tel\u00E9fono / Correo:', '(PENDIENTE)');
doc.rect(ML, ly3, CW, doc.y - ly3 + 4).lineWidth(0.3).stroke('#bbb');
doc.moveDown(0.5);

stit('DESCRIPCI\u00D3N GENERAL DEL PROYECTO');
tx('System Kyron es un ecosistema de inteligencia corporativa que, dentro de su m\u00F3dulo de telecomunicaciones \u201CMi L\u00EDnea\u201D, ofrece servicios de conectividad a Internet a usuarios residenciales y corporativos. El presente proyecto t\u00E9cnico describe la infraestructura necesaria para la prestaci\u00F3n del servicio de telecomunicaciones en el Estado La Guaira, con proyecci\u00F3n de expansi\u00F3n al \u00C1rea Metropolitana de Caracas y Estado Miranda.', 8.5);
tx('La red se basa en una topolog\u00EDa h\u00EDbrida que combina fibra \u00F3ptica como backhaul principal con distribuci\u00F3n inal\u00E1mbrica en la \u00FAltima milla (tecnolog\u00EDa WiFi de alta capacidad) y fibra hasta el hogar (FTTH) donde sea viable.', 8.5);

stit('CARACTER\u00CDSTICAS DE LA RED');
[
  '\u2022 Topolog\u00EDa: H\u00EDbrida (fibra \u00F3ptica + inal\u00E1mbrica punto a multipunto)',
  '\u2022 Conexi\u00F3n upstream: Fibra \u00F3ptica dedicada, 1 Gbps sim\u00E9trico (escalable a 10 Gbps)',
  '\u2022 Velocidades de acceso: 5 Mbps a 100 Mbps sim\u00E9tricos en fibra; hasta 50 Mbps en inal\u00E1mbrico',
  '\u2022 Relaci\u00F3n de contenci\u00F3n: 1:4',
  '\u2022 Capacidad inicial: 200 usuarios concurrentes (escalable a 1.000+ sin cambios de infraestructura core)',
  '\u2022 NOC central: Catia La Mar, Estado La Guaira',
  '\u2022 Equipos: Servidores Dell, routers MikroTik, switches Cisco, access points Ubiquiti UniFi',
  '\u2022 Est\u00E1ndares: IEEE 802.11ac/ax (WiFi 5/6), IEEE 802.3ab (Gigabit Ethernet)',
].forEach(t => tx(t, 8, { indent: 15 }));

// T-4
np();
encabezado('ANEXO T-4: CRONOGRAMA DE EJECUCI\u00D3N');
tx('(A partir del otorgamiento de la Habilitaci\u00F3n General)', 8, { i: true });
doc.moveDown(0.3);
const t4W = [128, 62, 62, 62, 62, 62, 62];
th(['Actividades', 'Mes 1-2', 'Mes 3-4', 'Mes 5-6', 'Mes 7-8', 'Mes 9-10', 'Mes 11-12'], t4W);
[
  ['1. Constituci\u00F3n legal y permisos', 'X', '', '', '', '', ''],
  ['2. Adecuaci\u00F3n del NOC', 'X', 'X', '', '', '', ''],
  ['3. Adquisici\u00F3n de equipos', 'X', 'X', '', '', '', ''],
  ['4. Instalaci\u00F3n infraestructura core', '', 'X', 'X', '', '', ''],
  ['5. Despliegue red de acceso Fase 1', '', '', 'X', 'X', '', ''],
  ['6. Pruebas y certificaci\u00F3n', '', '', '', 'X', 'X', ''],
  ['7. Activaci\u00F3n comercial', '', '', '', '', 'X', ''],
  ['8. Inicio de prestaci\u00F3n del servicio', '', '', '', '', '', 'X'],
  ['9. Expansi\u00F3n Fase 2', '', '', '', '', '', 'X'],
].forEach((r, i) => tr(r, t4W, i % 2 === 0));
tx('Fase 1: Cobertura en Catia La Mar, Maiquet\u00EDa y Caraballeda (Estado La Guaira). Fase 2: Macuto, La Guaira ciudad y \u00C1rea Metropolitana de Caracas.', 7.5, { i: true });

// T-6
np();
encabezado('ANEXO T-6: ENLACES DE LA RED');
stit('ENLACES PUNTO A PUNTO \u2014 BANDA 5.8 GHz (Libre)');
const t6W = [14, 50, 40, 40, 50, 40, 40, 40, 30, 33, 33];
th(['N\u00B0', 'Estaci\u00F3n 1', 'Lat. Norte', 'Long. Oeste', 'Estaci\u00F3n 2', 'Lat. Norte', 'Long. Oeste', 'F1 (MHz)', 'AB', 'Tx dBm', 'Ant. dBi'], t6W);
[
  ['01', 'NOC Catia La Mar', '10\u00B036\'07"', '67\u00B001\'50"', 'Nodo Maiquet\u00EDa', '10\u00B036\'18"', '67\u00B000\'15"', '5.800', '20', '23', '18'],
  ['02', 'NOC Catia La Mar', '10\u00B036\'07"', '67\u00B001\'50"', 'Nodo Caraballeda', '10\u00B036\'40"', '66\u00B051\'25"', '5.800', '20', '23', '18'],
  ['03', 'NOC Catia La Mar', '10\u00B036\'07"', '67\u00B001\'50"', 'Nodo Macuto', '10\u00B036\'33"', '66\u00B055\'10"', '5.800', '20', '23', '18'],
].forEach((r, i) => tr(r, t6W, i % 2 === 0));
tx('Backhaul principal: Fibra \u00F3ptica dedicada 1 Gbps sim\u00E9trico. Coordenadas geogr\u00E1ficas referenciales a precisar durante la ingenier\u00EDa de detalle.', 7.5, { i: true });

// ============== P\u00C1G 14: DECLARACI\u00D3N ==============
np();
encabezado('DECLARACI\u00D3N JURADA');
doc.moveTo(ML + 40, doc.y).lineTo(ML + CW - 40, doc.y).lineWidth(2).stroke(AZUL);
doc.moveDown(0.7);

tx('Nosotros, OMAR ANTONIO MATTAR FANIANOS, venezolano, mayor de edad, titular de la c\u00E9dula de identidad N\u00B0 V-9.488.296, y MAR\u00CDA TERESA HERN\u00C1NDEZ BASTIDAS, venezolana, mayor de edad, titular de la c\u00E9dula de identidad N\u00B0 V-13.374.121, actuando en nuestro car\u00E1cter de padres y representantes legales del menor CARLOS MATTAR, titular de la c\u00E9dula de identidad N\u00B0 V-32.855.496, y por ende de la empresa EMPRENDIMIENTO CARLOS MATTAR (System Kyron), debidamente inscrita en el Registro de Informaci\u00F3n Fiscal (RIF) bajo el N\u00B0 J-50832149-9,', 9);
doc.moveDown(0.5);

tx('DECLARAMOS BAJO JURAMENTO:', 10, { b: true, a: 'center' });
doc.moveDown(0.4);

tx('Que todos los datos, documentos e informaci\u00F3n suministrados en la presente solicitud y sus anexos son ciertos, veraces y corresponden fielmente a la realidad. Que nos comprometemos a mantener actualizada la informaci\u00F3n suministrada y a notificar a la Comisi\u00F3n Nacional de Telecomunicaciones (CONATEL) cualquier modificaci\u00F3n que se produzca en la misma.', 9);
doc.moveDown(0.4);

tx('Asimismo, declaramos conocer y aceptar las condiciones establecidas en la Ley Org\u00E1nica de Telecomunicaciones, su Reglamento, y dem\u00E1s normas aplicables para la obtenci\u00F3n y mantenimiento de la Habilitaci\u00F3n General con el Atributo de Servicios de Internet, asumiendo la responsabilidad solidaria que como representantes del menor nos corresponde.', 9);
doc.moveDown(1.2);

// Firma padre
doc.moveTo(ML + 100, doc.y).lineTo(ML + CW - 100, doc.y).lineWidth(0.5).stroke('#000');
doc.moveDown(0.25);
tx('Omar Antonio Mattar Fanianos', 9, { b: true, a: 'center' });
tx('C.I. V-9.488.296 \u2014 Padre y Representante Legal', 8, { a: 'center', c: '#555' });
doc.moveDown(0.8);

// Firma madre
doc.moveTo(ML + 100, doc.y).lineTo(ML + CW - 100, doc.y).lineWidth(0.5).stroke('#000');
doc.moveDown(0.25);
tx('Mar\u00EDa Teresa Hern\u00E1ndez Bastidas', 9, { b: true, a: 'center' });
tx('C.I. V-13.374.121 \u2014 Madre y Representante Legal', 8, { a: 'center', c: '#555' });
doc.moveDown(0.8);

tx('Carlos Mattar (menor de edad)', 9, { a: 'center' });
tx('C.I. V-32.855.496', 8, { a: 'center', c: '#555' });
doc.moveDown(0.5);
tx('Catia La Mar, Estado La Guaira, ______ de ________________ de 2026.', 9, { a: 'center' });

// FINAL
pie();
doc.end();

stream.on('finish', () => {
  const kb = (fs.statSync(TMP).size / 1024).toFixed(1);
  console.log(`PDF generado: ${kb} KB \u2014 ${pg} p\u00E1ginas`);
  console.log(`Ruta: ${TMP}`);
});
