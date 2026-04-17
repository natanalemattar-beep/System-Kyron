const fs = require('fs');

function checkCSS(path) {
  console.log(`Checking CSS ${path}...`);
  const content = fs.readFileSync(path, 'utf8');
  let openBraces = 0;
  let inComment = false;
  const lines = content.split('\n');
  
  lines.forEach((line, i) => {
    for (let j = 0; j < line.length; j++) {
      if (!inComment && line[j] === '/' && line[j+1] === '*') {
        inComment = true;
        j++;
      } else if (inComment && line[j] === '*' && line[j+1] === '/') {
        inComment = false;
        j++;
      } else if (!inComment) {
        if (line[j] === '{') openBraces++;
        if (line[j] === '}') openBraces--;
      }
    }
    if (openBraces < 0) {
      console.log(`Error: Extra closing brace at line ${i + 1}`);
      openBraces = 0;
    }
  });
  console.log(`Final count for ${path}: Braces ${openBraces}, InComment ${inComment}`);
}

checkCSS('src/app/globals.css');
