import os
import re

css_dir = r'c:\Users\Aluno\Documents\corelab-landing\css'

def clean_header(content):
    # This regex finds blocks between /* ===== and ===== */ and removes internal /* and */
    def sub_func(match):
        header_content = match.group(0)
        # Remove internal /* and */ that are not at the very start/end
        # Actually, just strip all /* and */ and then wrap the whole thing
        inner = header_content.strip()
        if inner.startswith('/*'): inner = inner[2:]
        if inner.endswith('*/'): inner = inner[:-2]
        
        # Clean internal /* and */
        cleaned = inner.replace('/*', '').replace('*/', '')
        return f"/* {cleaned.strip()} */"

    # Multi-line match for headers
    return re.sub(r'/\* =+.*?\=+ \*/', sub_func, content, flags=re.DOTALL)

for filename in os.listdir(css_dir):
    if filename.endswith('.css'):
        path = os.path.join(css_dir, filename)
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Also fix any remaining // comments just in case
        content = re.sub(r'(?<!:)\/\/.*', lambda m: f" /* {m.group(0)[2:].strip()} */", content)
        
        new_content = clean_header(content)
        
        with open(path, 'w', encoding='utf-8') as f:
            f.write(new_content)
