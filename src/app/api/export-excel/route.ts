import { NextRequest, NextResponse } from 'next/server';
import * as XLSX from 'xlsx';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
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

    const wb = XLSX.utils.book_new();

    for (const sheet of sheets) {
      const wsData: unknown[][] = [];

      if (title) {
        wsData.push([title]);
        wsData.push([]);
      }

      wsData.push(sheet.headers);

      for (const row of sheet.rows) {
        wsData.push(sheet.keys.map(k => row[k] ?? ''));
      }

      const ws = XLSX.utils.aoa_to_sheet(wsData);

      const colWidths = sheet.headers.map((h, i) => {
        const maxLen = Math.max(
          h.length,
          ...sheet.rows.map(r => String(r[sheet.keys[i]] ?? '').length)
        );
        return { wch: Math.min(Math.max(maxLen, 10), 40) };
      });
      ws['!cols'] = colWidths;

      if (title) {
        ws['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: sheet.headers.length - 1 } }];
      }

      XLSX.utils.book_append_sheet(wb, ws, sheet.name.substring(0, 31));
    }

    const buf = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
    const safeFilename = (filename || 'exportacion').replace(/[^a-z0-9_\-]/gi, '_');

    return new NextResponse(buf, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="${safeFilename}.xlsx"`,
        'Content-Length': buf.length.toString(),
      },
    });
  } catch (err) {
    console.error('[export-excel] error:', err);
    return NextResponse.json({ error: 'Error al generar el archivo Excel' }, { status: 500 });
  }
}
