import { NextResponse, NextRequest } from 'next/server';
import { getSession } from '@/lib/auth';
import { query, transaction } from '@/lib/db';
import * as XLSX from 'xlsx';

export const dynamic = 'force-dynamic';

const COLUMN_ALIASES: Record<string, string[]> = {
  fecha_operacion: ['fecha', 'date', 'fecha_operacion', 'fecha operacion', 'fecha de operacion', 'f. operación', 'f. operacion', 'fecha valor', 'fecha_valor'],
  concepto: ['concepto', 'descripcion', 'descripción', 'detalle', 'description', 'concepto/descripcion', 'referencia_descripcion', 'observacion'],
  monto: ['monto', 'amount', 'importe', 'valor', 'cantidad', 'monto bs', 'monto_bs', 'monto bs.'],
  tipo: ['tipo', 'type', 'naturaleza', 'mov', 'movimiento', 'tipo_movimiento', 'tipo movimiento'],
  referencia: ['referencia', 'ref', 'reference', 'nro referencia', 'nro_referencia', 'numero', 'nro', 'comprobante', 'nro. referencia'],
  categoria: ['categoria', 'categoría', 'category', 'rubro', 'clasificacion'],
  debito: ['debito', 'débito', 'debe', 'cargo', 'debit', 'egreso', 'salida'],
  credito: ['credito', 'crédito', 'haber', 'abono', 'credit', 'ingreso', 'entrada', 'deposito', 'depósito'],
};

function normalizeHeader(h: string): string {
  return h.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9_ ]/g, '').trim();
}

function matchColumn(header: string): string | null {
  const normalized = normalizeHeader(header);
  for (const [field, aliases] of Object.entries(COLUMN_ALIASES)) {
    for (const alias of aliases) {
      if (normalized === normalizeHeader(alias)) return field;
    }
  }
  return null;
}

function isValidCalendarDate(y: number, m: number, d: number): boolean {
  const date = new Date(y, m - 1, d);
  return date.getFullYear() === y && date.getMonth() === m - 1 && date.getDate() === d;
}

function formatValidDate(y: number, m: number, d: number): string | null {
  if (!isValidCalendarDate(y, m, d) || y < 1900 || y > 2100) return null;
  return `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
}

function parseDate(val: unknown): string | null {
  if (val == null) return null;
  if (val instanceof Date) {
    const y = val.getFullYear();
    const m = val.getMonth() + 1;
    const d = val.getDate();
    return formatValidDate(y, m, d);
  }
  if (typeof val === 'number') {
    const d = XLSX.SSF.parse_date_code(val);
    if (d) return formatValidDate(d.y, d.m, d.d);
  }
  const s = String(val).trim();
  const isoMatch = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
  if (isoMatch) return formatValidDate(Number(isoMatch[1]), Number(isoMatch[2]), Number(isoMatch[3]));
  const dmySlash = s.match(/^(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{2,4})$/);
  if (dmySlash) {
    const y = dmySlash[3].length === 2 ? 2000 + Number(dmySlash[3]) : Number(dmySlash[3]);
    return formatValidDate(y, Number(dmySlash[2]), Number(dmySlash[1]));
  }
  return null;
}

function parseMonto(val: unknown): number | null {
  if (val == null) return null;
  if (typeof val === 'number') return Math.abs(val);
  const s = String(val).replace(/[^0-9.,\-]/g, '').trim();
  if (!s) return null;
  const hasCommaDecimal = /\d\.\d{3},\d{2}$/.test(s) || /\d,\d{2}$/.test(s);
  let cleaned: string;
  if (hasCommaDecimal) {
    cleaned = s.replace(/\./g, '').replace(',', '.');
  } else {
    cleaned = s.replace(/,/g, '');
  }
  const n = parseFloat(cleaned);
  return isNaN(n) ? null : Math.abs(n);
}

function inferTipo(row: Record<string, unknown>, mappedFields: Record<string, string>): string | null {
  if (mappedFields.tipo) {
    const v = normalizeHeader(String(row[mappedFields.tipo] ?? ''));
    if (['credito', 'credit', 'haber', 'abono', 'ingreso', 'entrada', 'deposito', 'cr', 'c'].includes(v)) return 'credito';
    if (['debito', 'debit', 'debe', 'cargo', 'egreso', 'salida', 'dr', 'd'].includes(v)) return 'debito';
  }
  if (mappedFields.debito && mappedFields.credito) {
    const d = parseMonto(row[mappedFields.debito]);
    const c = parseMonto(row[mappedFields.credito]);
    if (c && (!d || d === 0)) return 'credito';
    if (d && (!c || c === 0)) return 'debito';
  }
  if (mappedFields.monto) {
    const raw = row[mappedFields.monto];
    const s = String(raw ?? '').replace(/[^0-9.,\-]/g, '').trim();
    if (s.startsWith('-')) return 'debito';
    if (typeof raw === 'number' && raw < 0) return 'debito';
    return 'credito';
  }
  return null;
}

function inferMonto(row: Record<string, unknown>, mappedFields: Record<string, string>, tipo: string): number | null {
  if (mappedFields.debito && mappedFields.credito) {
    const d = parseMonto(row[mappedFields.debito]);
    const c = parseMonto(row[mappedFields.credito]);
    if (tipo === 'credito' && c && c > 0) return c;
    if (tipo === 'debito' && d && d > 0) return d;
    return c || d || null;
  }
  if (mappedFields.monto) return parseMonto(row[mappedFields.monto]);
  return null;
}

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const cuentaIdStr = formData.get('cuenta_id') as string | null;
    const cuentaId = cuentaIdStr ? parseInt(cuentaIdStr, 10) : null;

    if (cuentaId !== null && (!Number.isInteger(cuentaId) || cuentaId <= 0)) {
      return NextResponse.json({ error: 'ID de cuenta bancaria inválido' }, { status: 400 });
    }

    if (!file) {
      return NextResponse.json({ error: 'No se proporcionó un archivo' }, { status: 400 });
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json({ error: 'El archivo excede el tamaño máximo permitido (5 MB)' }, { status: 400 });
    }

    const fileName = file.name.toLowerCase();
    const isCSV = fileName.endsWith('.csv');
    const isExcel = fileName.endsWith('.xlsx') || fileName.endsWith('.xls');
    if (!isCSV && !isExcel) {
      return NextResponse.json({ error: 'Formato no soportado. Use archivos .xlsx, .xls o .csv' }, { status: 400 });
    }

    if (cuentaId) {
      const check = await query('SELECT id FROM cuentas_bancarias WHERE id = $1 AND user_id = $2', [cuentaId, session.userId]);
      if (!check.length) {
        return NextResponse.json({ error: 'Cuenta bancaria no encontrada' }, { status: 404 });
      }
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const workbook = XLSX.read(buffer, { type: 'buffer', cellDates: true, dateNF: 'yyyy-mm-dd' });
    const sheetName = workbook.SheetNames[0];
    if (!sheetName) {
      return NextResponse.json({ error: 'El archivo no contiene hojas de datos' }, { status: 400 });
    }

    const rows: Record<string, unknown>[] = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { defval: null });
    if (!rows.length) {
      return NextResponse.json({ error: 'El archivo está vacío o no tiene datos' }, { status: 400 });
    }

    if (rows.length > 5000) {
      return NextResponse.json({ error: 'Máximo 5,000 movimientos por importación' }, { status: 400 });
    }

    const headers = Object.keys(rows[0]);
    const mappedFields: Record<string, string> = {};
    for (const h of headers) {
      const field = matchColumn(h);
      if (field) mappedFields[field] = h;
    }

    const hasFecha = !!mappedFields.fecha_operacion;
    const hasConcepto = !!mappedFields.concepto;
    const hasMonto = !!mappedFields.monto || (!!mappedFields.debito && !!mappedFields.credito);

    if (!hasFecha || !hasConcepto || !hasMonto) {
      const missing: string[] = [];
      if (!hasFecha) missing.push('fecha');
      if (!hasConcepto) missing.push('concepto/descripción');
      if (!hasMonto) missing.push('monto (o columnas débito/crédito)');
      return NextResponse.json({
        error: `Columnas requeridas no encontradas: ${missing.join(', ')}`,
        columnas_detectadas: headers,
        columnas_mapeadas: mappedFields,
        sugerencia: 'El archivo debe tener al menos columnas de fecha, concepto/descripción, y monto (o débito y crédito separados).',
      }, { status: 400 });
    }

    const processed: { fecha_operacion: string; concepto: string; monto: number; tipo: string; referencia: string | null; categoria: string | null }[] = [];
    const errors: { fila: number; error: string }[] = [];

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const rowNum = i + 2;

      const concepto = mappedFields.concepto ? String(row[mappedFields.concepto] ?? '').trim() : '';
      if (!concepto) {
        errors.push({ fila: rowNum, error: 'Concepto vacío' });
        continue;
      }

      const fecha = parseDate(row[mappedFields.fecha_operacion]);
      if (!fecha) {
        errors.push({ fila: rowNum, error: `Fecha inválida: "${row[mappedFields.fecha_operacion]}"` });
        continue;
      }

      const tipo = inferTipo(row, mappedFields);
      if (!tipo) {
        errors.push({ fila: rowNum, error: 'No se pudo determinar el tipo (crédito/débito)' });
        continue;
      }

      const monto = inferMonto(row, mappedFields, tipo);
      if (!monto || monto <= 0) {
        errors.push({ fila: rowNum, error: `Monto inválido: "${row[mappedFields.monto] ?? row[mappedFields.debito] ?? row[mappedFields.credito]}"` });
        continue;
      }

      const referencia = mappedFields.referencia ? String(row[mappedFields.referencia] ?? '').trim() || null : null;
      const categoria = mappedFields.categoria ? String(row[mappedFields.categoria] ?? '').trim() || null : null;

      processed.push({ fecha_operacion: fecha, concepto, monto, tipo, referencia, categoria });
    }

    if (processed.length === 0) {
      return NextResponse.json({
        error: 'No se pudo procesar ningún movimiento del archivo',
        errores: errors.slice(0, 20),
        total_filas: rows.length,
      }, { status: 400 });
    }

    const insertedCount = await transaction(async (client) => {
      let count = 0;
      for (const mov of processed) {
        await client.query(
          `INSERT INTO movimientos_bancarios (user_id, cuenta_id, fecha_operacion, concepto, monto, tipo, referencia, categoria)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
          [session.userId, cuentaId, mov.fecha_operacion, mov.concepto, mov.monto, mov.tipo, mov.referencia, mov.categoria]
        );
        count++;
      }
      return count;
    });

    return NextResponse.json({
      success: true,
      importados: insertedCount,
      errores: errors.length,
      detalle_errores: errors.slice(0, 20),
      total_filas: rows.length,
      columnas_detectadas: mappedFields,
    });
  } catch (err) {
    console.error('[contabilidad/import] Error:', err);
    return NextResponse.json({ error: 'Error al procesar el archivo' }, { status: 500 });
  }
}
