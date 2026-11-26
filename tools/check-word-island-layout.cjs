const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const Layout=require('../assets/v24/layout.js'),Core=require('../assets/v24/core.js');
const fixtures=[
 {size:[320,675],mission:{x:12,y:65,w:296,h:271},controls:[{x:15,y:547,w:105,h:114},{x:45,y:480,w:230,h:70},{x:179,y:572,w:126,h:89}]},
 {size:[568,320],mission:{x:14,y:56,w:204,h:145},controls:[{x:15,y:213,w:110,h:97},{x:187,y:249,w:194,h:56},{x:423,y:241,w:130,h:69}]},
 {size:[844,391],mission:{x:14,y:56,w:304,h:204},controls:[{x:15,y:284,w:110,h:97},{x:300,y:316,w:240,h:65},{x:699,y:313,w:130,h:68}]},
 {size:[768,1024],mission:{x:80,y:75,w:330,h:294},controls:[{x:20,y:878,w:155,h:128},{x:270,y:920,w:220,h:75},{x:581,y:920,w:167,h:87}]}
];
let placedCount=0,probes=0;
for(const f of fixtures){const [w,h]=f.size,bounds={x:8,y:56,w:w-16,h:h-64},blocks=[f.mission,...f.controls];
 for(let x=0;x<=w;x+=23)for(let y=0;y<=h;y+=19){const r=Layout.place(x,y,100,44,bounds,blocks);probes++;assert(r,'The main task label must remain reachable');assert(r.x>=bounds.x&&r.y>=bounds.y);assert(r.x+r.w<=bounds.x+bounds.w+.001&&r.y+r.h<=bounds.y+bounds.h+.001);assert(!blocks.some(b=>Layout.overlaps(r,b)));}
 const occupied=blocks.slice();for(let i=0;i<8;i++){const r=Layout.place(w*.57+(i%3)*25,h*.55+Math.floor(i/3)*20,90,44,bounds,occupied);if(!r)continue;assert(!occupied.some(b=>Layout.overlaps(r,b)));occupied.push(r);placedCount++;}
}
for(let i=0;i<20;i++){const C=Core.make(i);assert(!/plank|water jar|crystal/.test(C.mission(C.fresh()).title),'Chinese material nouns must be translated');}
const root=path.resolve(__dirname,'..'),child=fs.readFileSync(path.join(root,'assets/v24/index.html'),'utf8');assert(child.indexOf('id="resume"')<child.indexOf('id="chapter-stops"'));assert(child.indexOf('id="next-level"')<child.indexOf('class="word-recap"'));assert(child.indexOf('id="memory-replay"')<child.indexOf('id="task"'));
console.log(JSON.stringify({probes,packedLabels:placedCount,checks:'labels fit viewport, avoid task/touch controls and each other; primary dialog actions precede long content; Chinese material names translated'},null,2));
