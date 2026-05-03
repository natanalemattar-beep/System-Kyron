const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory() && !file.includes('node_modules') && !file.includes('.next')) {
            results = results.concat(walk(file));
        } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
            results.push(file);
        }
    });
    return results;
}

const files = walk('src');
console.log(`Analizando ${files.length} archivos...`);

files.forEach(f => {
    const c = fs.readFileSync(f, 'utf8');
    // Check if <Download is used but not imported
    if (c.includes('<Download') && !/import\s*{[^}]*Download[^}]*}\s*from\s*['"]lucide-react['"]/.test(c)) {
        console.log('FALTA IMPORTACION EN: ' + f);
    }
});
