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
    // Look for motion.something but NOT import { motion
    if (content.match(/motion\.[a-z]+/i) || content.includes('<motion.')) {
        if (!content.includes('import { motion') && 
            !content.includes('import { motion as') && 
            !content.includes('const motion =')) {
            console.log(`CRITICAL: ${file} uses motion but it is not defined/imported!`);
        }
    }
});
