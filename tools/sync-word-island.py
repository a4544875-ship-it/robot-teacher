#!/usr/bin/env python3
"""Embed the maintained Word Island source in the existing OB closure."""
from pathlib import Path
root=Path(__file__).resolve().parents[1]
p=root/'index.html';s=p.read_text(encoding='utf-8')
start='/* WORD_ISLAND_V4_START */';end='/* WORD_ISLAND_V4_END */'
block=start+'\n'+(root/'assets/word-island-v4-source.js').read_text(encoding='utf-8')+'\n'+end+'\n'
if start in s:
 a=s.index(start);b=s.index(end,a)+len(end)+1;s=s[:a]+block+s[b:]
else:
 marker='  return {map:map,stop:stop,STG:STG,WORLDS:WORLDS,ft:ft,menu:menu,st:stPlay,mb:mbPlay,MB_G:MB_G,mbQs:mbQs};'
 assert s.count(marker)==1;s=s.replace(marker,block+marker)
p.write_text(s,encoding='utf-8')
print('Word Island source synchronized.')
