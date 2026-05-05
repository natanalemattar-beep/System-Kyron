const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            if (!file.includes('node_modules') && !file.includes('.next')) {
                results = results.concat(walk(file));
            }
        } else {
            if (file.endsWith('.tsx') || file.endsWith('.ts')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk('./src');
files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    if (content.includes('motion.') || content.includes('<motion')) {
        if (!content.includes('import { motion') && !content.includes('import { motion as')) {
            // Check if it's imported from somewhere else like '@/components/ui/motion'
            if (!content.includes("from 'framer-motion'") && !content.includes("from \"framer-motion\"")) {
                 console.log(`Potential issue in ${file}: Uses motion but doesn't import from framer-motion`);
            }
        }
    }
});
