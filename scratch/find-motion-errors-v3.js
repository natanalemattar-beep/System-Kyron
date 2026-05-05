const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else if (file.endsWith('.tsx')) {
            results.push(file);
        }
    });
    return results;
}

const files = walk('./src');
files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    // Check for "motion." or "<motion" or "motion{"
    const usesMotion = /\bmotion\./.test(content) || /<motion\b/.test(content);
    const importsMotion = /from ['"]framer-motion['"]/.test(content);
    const definesMotion = /\bconst motion =/.test(content) || /\blet motion =/.test(content) || /\bvar motion =/.test(content) || /\bimport {.*motion.*} from/.test(content);

    if (usesMotion && !definesMotion) {
        console.log(`FOUND: ${file}`);
    }
});
