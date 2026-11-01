#!/usr/bin/env python3
"""把 index.html 裡較大的 base64 圖片搬到 assets/img/（檔名含內容雜湊，可長期快取）。
小於 MIN 位元組的小圖留在原地，避免太多零碎請求。可以重複執行：已經搬過的不會再動。"""
import re, base64, hashlib, os, sys, json
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC=os.path.join(ROOT,'index.html'); OUT=os.path.join(ROOT,'assets','img'); MIN=1500
s=open(SRC,encoding='utf-8').read(); os.makedirs(OUT,exist_ok=True)
pat=re.compile(r'data:image/(webp|png|jpeg|gif);base64,([A-Za-z0-9+/=]+)')
def slug(pos):
    i=s.rfind('\nvar ',0,pos); v=s[i+5:s.find('=',i)].strip().lower() if i>=0 else 'css'
    if not re.match(r'^[a-z0-9_]{1,12}$',v): v='css'
    k=re.search(r'"([A-Za-z0-9_\-]{1,30})"\s*:\s*"$',s[max(0,pos-60):pos])
    return v+'-'+(k.group(1).lower() if k else 'x')
moved=0; saved=0; manifest={}
def rep(m):
    global moved,saved
    if len(m.group(0))<MIN: return m.group(0)
    raw=base64.b64decode(m.group(2)); h=hashlib.sha1(raw).hexdigest()[:10]
    name='%s-%s.%s'%(slug(m.start()),h,m.group(1)); path=os.path.join(OUT,name)
    if not os.path.exists(path): open(path,'wb').write(raw)
    moved+=1; saved+=len(m.group(0)); manifest[name]=len(raw)
    return 'assets/img/'+name
s2=pat.sub(rep,s)
open(SRC,'w',encoding='utf-8').write(s2)
json.dump(sorted(manifest),open(os.path.join(OUT,'manifest.json'),'w'),indent=0)
print('moved',moved,'images, removed',saved,'bytes; index.html now',len(s2.encode()),'bytes')
