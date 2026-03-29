import { NextRequest, NextResponse } from 'next/server';
import ExcelJS from 'exceljs';
import { getSession } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, sheets, filename } = body as {
      title?: string;
      filename?: string;
      sheets: Array<{
        name: string;
        headers: string[];
        rows: Array<Record<string, unknown>>;
        keys: string[];
      }>;
    };

    if (!sheets || !Array.isArray(sheets) || sheets.length === 0) {
      return NextResponse.json({ error: 'Se requiere al menos una hoja de datos' }, { status: 400 });
    }

    const wb = new ExcelJS.Workbook();

    for (const sheet of sheets) {
      const ws = wb.addWorksheet(sheet.name.substring(0, 31));

      if (title) {
        const titleRow = ws.addRow([title]);
        titleRow.font = { bold: true, size: 14 };
        if (sheet.headers.length > 1) {
          ws.mergeCells(1, 1, 1, sheet.headers.length);
        }
        ws.addRow([]);
      }

      const headerRow = ws.addRow(sheet.headers);
      headerRow.font = { bold: true };
      headerRow.eachCell((cell) => {
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE0E0E0' } };
        cell.border = { bottom: { style: 'thin' } };
      });

      for (const row of sheet.rows) {
        ws.addRow(sheet.keys.map(k => row[k] ?? ''));
      }

      sheet.headers.forEach((h, i) => {
        const maxLen = Math.max(
          h.length,
          ...sheet.rows.map(r => String(r[sheet.keys[i]] ?? '').length)
        );
        ws.getColumn(i + 1).width = Math.min(Math.max(maxLen, 10), 40);
      });
    }

    const buffer = await wb.xlsx.writeBuffer();
    const safeFilename = (filename || 'exportacion').replace(/[^a-z0-9_\-]/gi, '_');

    const uint8 = new Uint8Array(buffer as ArrayBuffer);
    return new NextResponse(uint8, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="${safeFilename}.xlsx"`,
        'Content-Length': uint8.byteLength.toString(),
      },
    });
  } catch (err) {
    console.error('[export-excel] error:', err);
    return NextResponse.json({ error: 'Error al generar el archivo Excel' }, { status: 500 });
  }
}
