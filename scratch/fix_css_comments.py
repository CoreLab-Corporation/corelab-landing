import os
import re

css_dir = r'c:\Users\Aluno\Documents\corelab-landing\css'

def fix_css_content(content):
    # This function will replace // comments with /* */ while avoiding nested comments
    lines = content.splitlines()
    new_lines = []
    for line in lines:
        if '//' in line:
            # Skip URLs
            if 'http://' in line or 'https://' in line:
                new_lines.append(line)
                continue
            
            parts = line.split('//', 1)
            code_part = parts[0]
            comment_part = parts[1].strip()
            
            # If code_part already has an open /*, just append the comment text
            if '/*' in code_part and '*/' not in code_part:
                new_lines.append(f"{code_part} {comment_part}")
            else:
                # Wrap in /* */
                # But ensure we don't create */ */
                if comment_part.endswith('*/'):
                    comment_part = comment_part[:-2].strip()
                new_lines.append(f"{code_part} /* {comment_part} */")
        else:
            new_lines.append(line)
    return '\n'.join(new_lines)

for filename in os.listdir(css_dir):
    if filename.endswith('.css'):
        path = os.path.join(css_dir, filename)
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        new_content = fix_css_content(content)
        
        with open(path, 'w', encoding='utf-8') as f:
            f.write(new_content)
