#!/usr/bin/env python3
"""Keep the native account bridge synchronized with its maintained source."""
from pathlib import Path
root=Path(__file__).resolve().parents[1]
p=root/'index.html';s=p.read_text(encoding='utf-8')
start='/* WORD_ISLAND_V24_START */';end='/* WORD_ISLAND_V24_END */'
assert s.count(start)==s.count(end)==1
a=s.index(start);b=s.index(end,a)+len(end)
s=s[:a]+start+'\n'+(root/'assets/v24/bridge-source.js').read_text(encoding='utf-8').strip()+'\n'+end+s[b:]
p.write_text(s,encoding='utf-8')
print('Word Island v24 bridge synchronized.')
