import fs from 'fs';
import * as pdfjs from 'pdfjs-dist/legacy/build/pdf.mjs';

const buf = fs.readFileSync('public/uploads/RECAUDOS_SERVICIOS_INTERNET_sigestel.pdf');
const data = new Uint8Array(buf);
const doc = await pdfjs.getDocument({ data }).promise;

console.log('Pages:', doc.numPages);

let firstPageText = '';
const page = await doc.getPage(1);
const tc = await page.getTextContent();
firstPageText = tc.items.map(x => x.str).join(' ');

console.log('Page 1 text:', firstPageText.substring(0, 500));

// Also try to extract raw page content
const opList = await page.getOperatorList();
console.log('Operators on page 1:', opList.fnArray.length);

for (let i = 0; i < Math.min(opList.fnArray.length, 20); i++) {
  const fn = opList.fnArray[i];
  const name = Object.entries(pdfjs.OPS || {}).find(([,v]) => v === fn)?.[0] || `OP_${fn}`;
  console.log(`  ${i}: ${name}`);
}

doc.destroy();
