import os
import re

css_dir = r'c:\Users\Aluno\Documents\corelab-landing\css'

for filename in os.listdir(css_dir):
    if filename.endswith('.css'):
        path = os.path.join(css_dir, filename)
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 1. Fix double opening comments in headers
        # From: /* ==================================================== /* Início do bloco de ... */
        # To:   /* ==================================================== 
        #          ...
        content = re.sub(r'/\* ==================================================== /\* (.*?) \*/', r'/* ==================================================== \n   \1', content)
        
        # 2. Fix broken closing headers
        # From: ==================================================== */ /* Fim do bloco de cabeçalho */
        # To:   ==================================================== */
        content = re.sub(r'==================================================== \*/ /\* Fim do bloco de cabeçalho \*/', r'==================================================== */', content)
        
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
