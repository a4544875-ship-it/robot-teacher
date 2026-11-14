#!/usr/bin/env python3
"""從 index.html（GitHub 版）自動產生 robot-teacher.html（Claude 正式版）。
差別只有：拿掉 <head> 裡 GitHub 才需要的部分（離線快取、Firebase 雲端設定、manifest），
因為 Claude Artifact 會自己包一層 <html><head><body>，雲端改用 Claude 的資料庫。
以後只改 index.html，再跑這支程式即可，兩個版本不會再不同步。"""
import os, sys
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
src=open(os.path.join(ROOT,'index.html'),encoding='utf-8').read().split('\n')
def find(t,start=0):
    for i in range(start,len(src)):
        if src[i].strip()==t: return i
    sys.exit('找不到：'+t)
t=find('<title>奇蹟知識島</title>'); he=find('</head>',t); bo=find('<body>',he); end=find('</body>',bo)
body_start=bo+1
if src[body_start].strip().startswith('<title>'): body_start+=1
out=['<title>機器人老師</title>',"<script>window.__SOC_BUNDLE_URL='assets/v15/soc-img.js'</script>"]+src[t+1:he]+src[body_start:end]
txt='\n'.join(out)+'\n'
for bad in ['serviceWorker','firebase-app-compat','firebaseConfig','manifest.webmanifest']:
    if bad in txt: sys.exit('產生的 Artifact 版還含有 GitHub 專用內容：'+bad)
open(os.path.join(ROOT,'robot-teacher.html'),'w',encoding='utf-8').write(txt)
print('robot-teacher.html',len(txt.encode()),'bytes（index.html 第',t+2,'～',he,'行＋第',body_start+1,'～',end,'行）')

# 社會島的圖片很多，Artifact 一個版本最多只能放 511 個檔案，所以打包成一個檔（進社會島時才載入）
import re, json, base64
s=open(os.path.join(ROOT,'assets/v15/social.js'),encoding='utf-8').read()
m=re.search(r'var SOCI=/\*SOCI\*/(\{[^;]*\});',s)
if m:
    soci=json.loads(m.group(1)); D={}
    for k,p in soci.items():
        if k=='gate': continue
        D[k]='data:image/webp;base64,'+base64.b64encode(open(os.path.join(ROOT,p),'rb').read()).decode()
    js='window.__SOC_IMG='+json.dumps(D,separators=(',',':'))+';\n'
    open(os.path.join(ROOT,'assets/v15/soc-img.js'),'w').write(js)
    print('assets/v15/soc-img.js',len(D),'張',len(js),'bytes')
