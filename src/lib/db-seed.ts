import { query, transaction, batchInsert } from '@/lib/db';
import { PoolClient } from 'pg';

export async function seedDemoData(userId: number): Promise<{ seeded: string[]; errors: string[] }> {
  const seeded: string[] = [];
  const errors: string[] = [];

  const safeSeed = async (label: string, fn: () => Promise<void>) => {
    try {
      await fn();
      seeded.push(label);
    } catch (err: any) {
      errors.push(`${label}: ${err.message}`);
    }
  };

  await safeSeed('clientes', () => seedClientes(userId));
  await safeSeed('proveedores', () => seedProveedores(userId));
  await safeSeed('cuentas_bancarias', () => seedCuentasBancarias(userId));
  await safeSeed('inventario', () => seedInventario(userId));
  await safeSeed('facturas', () => seedFacturas(userId));
  await safeSeed('empleados', () => seedEmpleados(userId));
  await safeSeed('tasas_bcv', () => seedTasasBCV());
  await safeSeed('plan_cuentas', () => seedPlanCuentas(userId));
  await safeSeed('movimientos_bancarios', () => seedMovimientos(userId));
  await safeSeed('notificaciones', () => seedNotificaciones(userId));

  return { seeded, errors };
}

async function seedClientes(userId: number) {
  const existing = await query(`SELECT id FROM clientes WHERE user_id = $1 LIMIT 1`, [userId]);
  if (existing.length > 0) return;

  await batchInsert('clientes',
    ['user_id','tipo','razon_social','rif','nombre_contacto','telefono','email','direccion','estado','municipio'],
    [
      [userId,'juridico','Tech Solutions Venezuela, C.A.','J-40123456-7','Carlos Mendoza','0414-1234567','contacto@techsol.com.ve','Av. Libertador, Torre Capriles, Piso 8','Distrito Capital','Libertador'],
      [userId,'juridico','Inversiones Epsilon, C.A.','J-40234567-8','María González','0412-9876543','mgonzalez@epsilon.com.ve','C.C. Sambil, Nivel 3, Ofic. 312','Miranda','Chacao'],
      [userId,'juridico','Constructora Bolívar, C.A.','J-30345678-9','Pedro Ramírez','0416-5551234','pramirez@cbolivar.com.ve','Zona Industrial Los Cortijos','Carabobo','Valencia'],
      [userId,'natural','Ana Lucía Herrera','V-18456789','Ana Lucía Herrera','0424-7778899','aherrera@gmail.com','Urb. La Castellana, Res. Altamira','Distrito Capital','Chacao'],
      [userId,'juridico','Marketing Digital Caracas, C.A.','J-41567890-1','Roberto Silva','0412-3334455','rsilva@mdcaracas.com.ve','Av. Francisco de Miranda, Torre Europa','Distrito Capital','Chacao'],
      [userId,'juridico','Alimentos del Valle, C.A.','J-29678901-2','Luisa Martínez','0414-6667788','lmartinez@alvalle.com.ve','Zona Industrial La Yaguara','Distrito Capital','Libertador'],
      [userId,'proveedor','Suministros Costa, C.A.','J-40789012-3','Fernando Costa','0416-1112233','fcosta@sumicostavenezuela.com','Av. Casanova, Edif. El Rosal','Distrito Capital','Libertador'],
      [userId,'juridico','Logística Express VE, C.A.','J-41890123-4','Diana Morales','0424-4445566','dmorales@logexve.com.ve','Autopista Regional del Centro, Km 5','Aragua','Girardot'],
    ]
  );
}

async function seedProveedores(userId: number) {
  const existing = await query(`SELECT id FROM proveedores WHERE user_id = $1 LIMIT 1`, [userId]);
  if (existing.length > 0) return;

  await batchInsert('proveedores',
    ['user_id','razon_social','rif','nombre_contacto','telefono','email','categoria','condiciones_pago','calificacion'],
    [
      [userId,'Papelería Nacional, C.A.','J-30111222-3','Jorge Blanco','0414-1111111','jblanco@papnac.com.ve','insumos','30 días',4],
      [userId,'Servicios Cloud VE, C.A.','J-41222333-4','Andrea Ruiz','0412-2222222','aruiz@cloudve.com','tecnología','inmediato',5],
      [userId,'Seguros La Previsora, C.A.','J-07333444-5','Manuel Ochoa','0800-7737847','mochoa@laprevisora.com','seguros','mensual',4],
      [userId,'Electricidad Total, C.A.','J-40444555-6','Carmen Díaz','0416-3333333','cdiaz@electotal.com.ve','servicios','15 días',3],
      [userId,'Transporte Rápido VE, C.A.','J-41555666-7','Luis Paredes','0424-4444444','lparedes@transrapido.com.ve','logística','contra entrega',4],
    ]
  );
}

async function seedCuentasBancarias(userId: number) {
  const existing = await query(`SELECT id FROM cuentas_bancarias WHERE user_id = $1 LIMIT 1`, [userId]);
  if (existing.length > 0) return;

  await batchInsert('cuentas_bancarias',
    ['user_id','banco','codigo_banco','numero_cuenta','tipo_cuenta','titular','saldo_actual','saldo_disponible'],
    [
      [userId,'Banesco','0134','01340123456789012345','corriente','System Kyron, C.A.',185420.50,182300.00],
      [userId,'Mercantil','0105','01050987654321098765','corriente','System Kyron, C.A.',94750.25,94750.25],
      [userId,'Provincial','0108','01080246813579024680','ahorro','System Kyron, C.A.',12500.00,12500.00],
      [userId,'Banesco','0134','01340111222333444555','corriente_en_dolares','System Kyron, C.A.',28450.00,28450.00],
    ]
  );
}

async function seedInventario(userId: number) {
  const existing = await query(`SELECT id FROM inventario WHERE user_id = $1 LIMIT 1`, [userId]);
  if (existing.length > 0) return;

  await batchInsert('inventario',
    ['user_id','codigo','nombre','categoria','unidad_medida','precio_costo','precio_venta','stock_actual','stock_minimo'],
    [
      [userId,'SRV-001','Consultoría Empresarial (hora)','servicios','hora',35.00,75.00,999,0],
      [userId,'SRV-002','Desarrollo de Software (hora)','servicios','hora',45.00,120.00,999,0],
      [userId,'SRV-003','Soporte Técnico Mensual','servicios','mes',150.00,350.00,999,0],
      [userId,'SRV-004','Auditoría Fiscal SENIAT','servicios','proyecto',500.00,1200.00,999,0],
      [userId,'LIC-001','Licencia System Kyron Básico','licencias','unidad',0,99.00,100,10],
      [userId,'LIC-002','Licencia System Kyron Enterprise','licencias','unidad',0,299.00,50,5],
      [userId,'LIC-003','Módulo IA Legal Add-on','licencias','unidad',0,49.00,200,20],
      [userId,'HW-001','Laptop Dell Latitude 5540','hardware','unidad',750.00,950.00,15,3],
      [userId,'HW-002','Monitor Samsung 27" 4K','hardware','unidad',280.00,380.00,20,5],
      [userId,'INS-001','Resma Papel Bond Carta','insumos','resma',3.50,5.00,200,50],
      [userId,'INS-002','Tóner HP LaserJet','insumos','unidad',35.00,55.00,30,5],
      [userId,'INS-003','Cable UTP Cat6 (metro)','insumos','metro',0.40,0.80,500,100],
    ]
  );
}

async function seedFacturas(userId: number) {
  const existing = await query(`SELECT id FROM facturas WHERE user_id = $1 LIMIT 1`, [userId]);
  if (existing.length > 0) return;

  const clientes = await query<{id:number}>(`SELECT id FROM clientes WHERE user_id = $1 ORDER BY id LIMIT 8`, [userId]);
  if (clientes.length === 0) return;

  const cids = clientes.map(c => c.id);
  const today = new Date();
  const factData: unknown[][] = [];

  const estados: string[] = ['pagada','pagada','emitida','pendiente','cobrada','pagada','emitida','vencida','pagada','cobrada','emitida','pendiente'];
  const montos = [5000,12000,2500,7500,800,15000,45000,3200,9800,6400,18500,4300];

  for (let i = 0; i < 12; i++) {
    const fecha = new Date(today);
    fecha.setDate(fecha.getDate() - (i * 8 + Math.floor(Math.random() * 5)));
    const venc = new Date(fecha);
    venc.setDate(venc.getDate() + 30);
    const sub = montos[i];
    const iva = sub * 0.16;
    const total = sub + iva;

    factData.push([
      userId, cids[i % cids.length], `FAC-2026-${String(i+1).padStart(4,'0')}`, 'venta',
      fecha.toISOString().split('T')[0], venc.toISOString().split('T')[0],
      'VES', sub, iva, 16.00, 0, 3.00, total, 36.50, +(total/36.50).toFixed(2),
      estados[i], `Factura de servicios profesionales #${i+1}`
    ]);
  }

  await batchInsert('facturas',
    ['user_id','cliente_id','numero_factura','tipo','fecha_emision','fecha_vencimiento',
     'moneda','subtotal','monto_iva','porcentaje_iva','monto_igtf','porcentaje_igtf','total','tasa_bcv','total_usd',
     'estado','descripcion'],
    factData
  );
}

async function seedEmpleados(userId: number) {
  const existing = await query(`SELECT id FROM empleados WHERE user_id = $1 LIMIT 1`, [userId]);
  if (existing.length > 0) return;

  await batchInsert('empleados',
    ['user_id','nombre','apellido','cedula','cargo','departamento','fecha_ingreso','salario_base','tipo_contrato','telefono','email'],
    [
      [userId,'Carlos','Mendoza','V-18234567','Director General','Dirección','2020-01-15',4500.00,'tiempo_indeterminado','0414-1234567','cmendoza@kyron.com.ve'],
      [userId,'María','González','V-20345678','Gerente de Finanzas','Finanzas','2020-03-01',3800.00,'tiempo_indeterminado','0412-2345678','mgonzalez@kyron.com.ve'],
      [userId,'Pedro','Ramírez','V-22456789','Desarrollador Senior','Tecnología','2021-06-15',3200.00,'tiempo_indeterminado','0416-3456789','pramirez@kyron.com.ve'],
      [userId,'Ana','Herrera','V-24567890','Diseñadora UX/UI','Tecnología','2022-01-10',2800.00,'tiempo_indeterminado','0424-4567890','aherrera@kyron.com.ve'],
      [userId,'Roberto','Silva','V-19678901','Ejecutivo de Ventas','Comercial','2021-09-01',2500.00,'tiempo_indeterminado','0412-5678901','rsilva@kyron.com.ve'],
      [userId,'Luisa','Martínez','V-21789012','Contadora','Finanzas','2020-07-20',3000.00,'tiempo_indeterminado','0414-6789012','lmartinez@kyron.com.ve'],
      [userId,'Fernando','Costa','V-23890123','Soporte Técnico','Tecnología','2022-04-05',2200.00,'tiempo_indeterminado','0416-7890123','fcosta@kyron.com.ve'],
      [userId,'Diana','Morales','V-25901234','Coordinadora RRHH','Recursos Humanos','2021-02-15',2800.00,'tiempo_indeterminado','0424-8901234','dmorales@kyron.com.ve'],
      [userId,'Jorge','Blanco','V-20012345','Analista Legal','Legal','2022-08-01',2600.00,'tiempo_indeterminado','0414-9012345','jblanco@kyron.com.ve'],
      [userId,'Andrea','Ruiz','V-26123456','Pasante Marketing','Comercial','2025-09-01',800.00,'pasante','0412-0123456','aruiz@kyron.com.ve'],
    ]
  );
}

async function seedTasasBCV() {
  const existing = await query(`SELECT id FROM tasas_bcv ORDER BY fecha DESC LIMIT 1`);
  if (existing.length > 0) return;

  const today = new Date();
  const tasasData: unknown[][] = [];

  for (let i = 0; i < 90; i++) {
    const fecha = new Date(today);
    fecha.setDate(fecha.getDate() - i);
    if (fecha.getDay() === 0 || fecha.getDay() === 6) continue;

    const baseRate = 36.50 + (Math.random() * 2 - 1) * 0.5;
    const eurRate = baseRate * 1.08;

    tasasData.push([
      fecha.toISOString().split('T')[0],
      +baseRate.toFixed(4),
      +eurRate.toFixed(4),
      null, null, 'BCV'
    ]);
  }

  await batchInsert('tasas_bcv',
    ['fecha','tasa_usd_ves','tasa_eur_ves','tasa_cop_ves','tasa_usdt_ves','fuente'],
    tasasData
  );
}

async function seedPlanCuentas(userId: number) {
  const existing = await query(`SELECT id FROM plan_cuentas WHERE user_id = $1 LIMIT 1`, [userId]);
  if (existing.length > 0) return;

  const cuentas: unknown[][] = [
    [userId,'1','Activo','activo',1,null,true,'Grupo de cuentas de activos'],
    [userId,'1.1','Activo Circulante','activo',2,null,true,null],
    [userId,'1.1.01','Caja','activo',3,null,true,null],
    [userId,'1.1.02','Bancos','activo',3,null,true,null],
    [userId,'1.1.03','Cuentas por Cobrar','activo',3,null,true,null],
    [userId,'1.1.04','Inventario','activo',3,null,true,null],
    [userId,'1.2','Activo No Circulante','activo',2,null,true,null],
    [userId,'1.2.01','Mobiliario y Equipo','activo',3,null,true,null],
    [userId,'1.2.02','Equipos de Computación','activo',3,null,true,null],
    [userId,'1.2.03','Depreciación Acumulada','activo',3,null,true,null],
    [userId,'2','Pasivo','pasivo',1,null,true,'Grupo de cuentas de pasivos'],
    [userId,'2.1','Pasivo Circulante','pasivo',2,null,true,null],
    [userId,'2.1.01','Cuentas por Pagar','pasivo',3,null,true,null],
    [userId,'2.1.02','IVA por Pagar','pasivo',3,null,true,null],
    [userId,'2.1.03','ISLR por Pagar','pasivo',3,null,true,null],
    [userId,'2.1.04','Retenciones por Pagar','pasivo',3,null,true,null],
    [userId,'2.1.05','SSO por Pagar','pasivo',3,null,true,null],
    [userId,'2.1.06','FAOV por Pagar','pasivo',3,null,true,null],
    [userId,'2.2','Pasivo No Circulante','pasivo',2,null,true,null],
    [userId,'2.2.01','Prestaciones Sociales','pasivo',3,null,true,null],
    [userId,'3','Patrimonio','patrimonio',1,null,true,'Grupo de cuentas de patrimonio'],
    [userId,'3.1','Capital Social','patrimonio',2,null,true,null],
    [userId,'3.2','Reserva Legal','patrimonio',2,null,true,null],
    [userId,'3.3','Utilidades No Distribuidas','patrimonio',2,null,true,null],
    [userId,'4','Ingresos','ingreso',1,null,true,'Grupo de cuentas de ingresos'],
    [userId,'4.1','Ingresos por Servicios','ingreso',2,null,true,null],
    [userId,'4.2','Ingresos por Ventas','ingreso',2,null,true,null],
    [userId,'4.3','Ingresos por Licencias','ingreso',2,null,true,null],
    [userId,'4.4','Otros Ingresos','ingreso',2,null,true,null],
    [userId,'5','Gastos','gasto',1,null,true,'Grupo de cuentas de gastos'],
    [userId,'5.1','Gastos de Personal','gasto',2,null,true,null],
    [userId,'5.2','Gastos de Operación','gasto',2,null,true,null],
    [userId,'5.3','Gastos de Administración','gasto',2,null,true,null],
    [userId,'5.4','Gastos Financieros','gasto',2,null,true,null],
    [userId,'6','Costos','costo',1,null,true,'Grupo de cuentas de costos'],
    [userId,'6.1','Costo de Ventas','costo',2,null,true,null],
    [userId,'6.2','Costo de Servicios','costo',2,null,true,null],
  ];

  await batchInsert('plan_cuentas',
    ['user_id','codigo','nombre','tipo','nivel','cuenta_padre','activa','descripcion'],
    cuentas
  );
}

async function seedMovimientos(userId: number) {
  const existing = await query(`SELECT id FROM movimientos_bancarios WHERE user_id = $1 LIMIT 1`, [userId]);
  if (existing.length > 0) return;

  const cuentas = await query<{id:number}>(`SELECT id FROM cuentas_bancarias WHERE user_id = $1 ORDER BY id LIMIT 4`, [userId]);
  if (cuentas.length === 0) return;

  const today = new Date();
  const movData: unknown[][] = [];
  const conceptos = [
    { c:'Cobro factura cliente', t:'credito', min:800, max:15000 },
    { c:'Pago nómina quincenal', t:'debito', min:8000, max:25000 },
    { c:'Pago proveedor insumos', t:'debito', min:200, max:3000 },
    { c:'Cobro licencia software', t:'credito', min:99, max:5000 },
    { c:'Pago servicios cloud', t:'debito', min:50, max:500 },
    { c:'Cobro consultoría', t:'credito', min:1500, max:8000 },
    { c:'Pago alquiler oficina', t:'debito', min:800, max:2000 },
    { c:'Transferencia entre cuentas', t:'debito', min:500, max:10000 },
    { c:'Depósito efectivo', t:'credito', min:1000, max:5000 },
    { c:'Pago IVSS/FAOV/INCES', t:'debito', min:1200, max:4000 },
  ];

  for (let i = 0; i < 30; i++) {
    const fecha = new Date(today);
    fecha.setDate(fecha.getDate() - i * 2 - Math.floor(Math.random() * 3));
    const c = conceptos[i % conceptos.length];
    const monto = +(c.min + Math.random() * (c.max - c.min)).toFixed(2);
    const ref = `REF-${Date.now().toString(36).toUpperCase()}-${i}`;

    movData.push([
      userId, cuentas[i % cuentas.length].id, fecha.toISOString().split('T')[0],
      c.c, monto, c.t, ref, i % 3 === 0, c.c.split(' ')[0].toLowerCase()
    ]);
  }

  await batchInsert('movimientos_bancarios',
    ['user_id','cuenta_id','fecha_operacion','concepto','monto','tipo','referencia','conciliado','categoria'],
    movData
  );
}

async function seedNotificaciones(userId: number) {
  const existing = await query(`SELECT id FROM notificaciones WHERE user_id = $1 LIMIT 1`, [userId]);
  if (existing.length > 0) return;

  await batchInsert('notificaciones',
    ['user_id','tipo','titulo','mensaje','leida','accion_url'],
    [
      [userId,'fiscal','Declaración IVA pendiente','La declaración de IVA del período actual vence en 5 días. Revise su libro de ventas y compras.',false,'/es/admin/impuestos'],
      [userId,'alerta','Factura vencida','La factura FAC-2026-0008 de Marketing Digital Caracas está vencida desde hace 15 días.',false,'/es/admin/facturas'],
      [userId,'info','Nueva tasa BCV publicada','La tasa USD/VES del BCV se actualizó a Bs. 36.52. Sus facturas en divisas se han recalculado.',true,'/es/admin/contabilidad'],
      [userId,'exito','Nómina procesada','La nómina quincenal de Marzo 2026 fue procesada exitosamente para 10 empleados.',true,'/es/rrhh/nomina'],
      [userId,'advertencia','Stock bajo','El inventario de "Tóner HP LaserJet" está por debajo del mínimo (3 unidades restantes).',false,'/es/admin/inventario'],
      [userId,'vencimiento','Permiso municipal por vencer','El permiso municipal de funcionamiento vence en 30 días. Inicie el proceso de renovación.',false,'/es/admin/permisos'],
      [userId,'info','Respaldo automático completado','Se realizó un respaldo completo de la base de datos. 245 MB almacenados correctamente.',true,null],
      [userId,'exito','Nuevo cliente registrado','Logística Express VE, C.A. se registró como nuevo cliente. RIF: J-41890123-4.',true,'/es/admin/clientes'],
    ]
  );
}
