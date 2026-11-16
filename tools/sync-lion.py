#!/usr/bin/env python3
"""Embed the maintained presentation extension inside the original social adventure closure."""
from pathlib import Path
root=Path(__file__).resolve().parents[1];p=root/'assets/v15/adv.js';s=p.read_text(encoding='utf-8')
a='/* LION_PREMIUM_START */';b='/* LION_PREMIUM_END */'
block=a+'\n'+(root/'assets/v15/adv-premium-source.js').read_text(encoding='utf-8')+'\n'+b+'\n'
if a in s:
 start=s.index(a);end=s.index(b,start)+len(b)+1;s=s[:start]+block+s[end:]
else:
 marker='global.AdvFactory=function(ctx)';assert s.count(marker)==1;s=s.replace(marker,block+marker)
p.write_text(s,encoding='utf-8');print('Lion presentation source synchronized.')
