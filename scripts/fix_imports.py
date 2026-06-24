import os
import re

def fix_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Match lucide-react imports
    match = re.search(r'import \{(.*)\} from "lucide-react";', content)
    if match:
        imports_str = match.group(1)
        imports = [i.strip() for i in imports_str.split(',')]
        # Remove duplicates while preserving order
        seen = set()
        unique_imports = []
        for i in imports:
            if i and i not in seen:
                unique_imports.append(i)
                seen.add(i)
        
        new_imports_str = ', '.join(unique_imports)
        new_content = content.replace(imports_str, new_imports_str)
        
        if new_content != content:
            with open(path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Fixed: {path}")

files = [
    r"c:\Users\Carlos\.gemini\antigravity\scratch\System-Kyron-Git\src\app\[locale]\(ventas)\cobros\page.tsx",
    r"c:\Users\Carlos\.gemini\antigravity\scratch\System-Kyron-Git\src\app\[locale]\(telecom)\portabilidad\page.tsx",
    r"c:\Users\Carlos\.gemini\antigravity\scratch\System-Kyron-Git\src\app\[locale]\(telecom)\roaming\page.tsx",
    r"c:\Users\Carlos\.gemini\antigravity\scratch\System-Kyron-Git\src\app\[locale]\(ventas)\ordenes-compra\page.tsx",
    r"c:\Users\Carlos\.gemini\antigravity\scratch\System-Kyron-Git\src\app\[locale]\(telecom)\paquetes-adicionales\page.tsx",
    r"c:\Users\Carlos\.gemini\antigravity\scratch\System-Kyron-Git\src\app\[locale]\(ventas)\cotizaciones\page.tsx",
    r"c:\Users\Carlos\.gemini\antigravity\scratch\System-Kyron-Git\src\app\[locale]\(admin)\directorio-corporativo\page.tsx",
    r"c:\Users\Carlos\.gemini\antigravity\scratch\System-Kyron-Git\src\app\[locale]\(admin)\proveedores\page.tsx",
    r"c:\Users\Carlos\.gemini\antigravity\scratch\System-Kyron-Git\src\app\[locale]\(natural)\seguros\page.tsx",
    r"c:\Users\Carlos\.gemini\antigravity\scratch\System-Kyron-Git\src\app\[locale]\(natural)\historial-medico\page.tsx",
    r"c:\Users\Carlos\.gemini\antigravity\scratch\System-Kyron-Git\src\app\[locale]\(legal)\poderes\page.tsx",
    r"c:\Users\Carlos\.gemini\antigravity\scratch\System-Kyron-Git\src\app\[locale]\(legal)\cumplimiento\page.tsx",
]

for f in files:
    if os.path.exists(f):
        fix_file(f)
    else:
        print(f"Not found: {f}")
