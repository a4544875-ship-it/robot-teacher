/* English Premium v3.0. Inserted within OB's closure; original physics and Net remain authoritative. */
var V3_IMAGES={};
function v3Image(src){if(!V3_IMAGES[src]){var im=new Image();im.src=src;V3_IMAGES[src]=im}return V3_IMAGES[src]}
var V3_WORDS={};
['cat','dog','pig','fish','bird','cow','duck','bee','egg','cake','book','bag','hat','car','ball','cup'].forEach(function(w){V3_WORDS[w]='assets/word-'+w+'.webp';v3Image(V3_WORDS[w])});
var v3Sign0=signTex;
signTex=function(txt,emo,bg){
  if(!emo)return v3Sign0(txt,emo,bg);
  var word=WORDS.filter(function(w){return w[1]===txt})[0],key=word&&word[0],src=key&&V3_WORDS[key];
  if(!src&&key){var food=DN_IDS.filter(function(k){return DN_F[k][0]===key})[0];if(food)src=DNP[food];else if(SIMG[key])src=SIMG[key]}
  if(!src)return v3Sign0(txt,emo,bg);
  var canvas=document.createElement('canvas');canvas.width=canvas.height=512;var c=canvas.getContext('2d'),im=v3Image(src),texture=new T.CanvasTexture(canvas);
  function draw(){c.clearRect(0,0,512,512);var gr=c.createLinearGradient(0,0,0,512);gr.addColorStop(0,'#fffdf5');gr.addColorStop(1,'#dcefee');c.fillStyle=gr;rr(c,12,12,488,488,48);c.fill();c.strokeStyle='#587c84';c.lineWidth=8;c.stroke();if(im.complete&&im.naturalWidth){var scale=Math.min(420/im.naturalWidth,420/im.naturalHeight),w=im.naturalWidth*scale,h=im.naturalHeight*scale;c.drawImage(im,(512-w)/2,(512-h)/2,w,h)}else{c.font='280px "Apple Color Emoji","Segoe UI Emoji",sans-serif';c.textAlign='center';c.textBaseline='middle';c.fillText(txt,256,270)}texture.needsUpdate=true}
  draw();if(!im.complete)im.addEventListener('load',draw,{once:true});return texture;
};
var v3Avatar0=avatar;
avatar=function(col,name){
  var gp=new T.Group(),skin=new T.MeshStandardMaterial({color:0xffdec0,roughness:.8}),shirt=new T.MeshStandardMaterial({color:col,roughness:.6}),navy=new T.MeshStandardMaterial({color:0x354465,roughness:.7}),white=new T.MeshStandardMaterial({color:0xfffcf1,roughness:.75});
  function sphere(r,mat,x,y,z,sx,sy,sz,par){var m=new T.Mesh(new T.SphereGeometry(r,14,10),mat);m.position.set(x,y,z);m.scale.set(sx||1,sy||1,sz||1);(par||gp).add(m);return m}
  var head=sphere(.27,skin,0,1.2,0,1,.94,.96);sphere(.27,navy,0,1.36,-.035,1.04,.45,1.02);sphere(.11,shirt,0,1.35,.22,1.9,.25,.85);
  var black=new T.MeshStandardMaterial({color:0x20354d,roughness:.3});[-.085,.085].forEach(function(x){sphere(.032,black,x,1.23,.252,1,1.5,.35);sphere(.008,white,x-.006,1.245,.266,1,1,.35)});
  sphere(.025,new T.MeshStandardMaterial({color:0xe98679}),0,1.12,.26,1.6,.5,.35);[-.14,.14].forEach(function(x){sphere(.025,new T.MeshStandardMaterial({color:0xf5b8a0}),x,1.13,.226,1,.65,.2)});
  sphere(.31,shirt,0,.79,0,1,.96,.62);sphere(.13,white,0,.84,.19,.85,.75,.2);sphere(.105,new T.MeshStandardMaterial({color:0xffd66e,metalness:.25,roughness:.45}),0,.83,.22,.65,.65,.2);
  sphere(.21,navy,0,.48,-.02,1.2,.45,.75);sphere(.2,shirt,0,.85,-.22,.85,1.1,.5);
  function limb(x,y,len,r,mat,isLeg){var pivot=new T.Group();pivot.position.set(x,y,0);var tube=new T.Mesh(new T.CylinderGeometry(r,r*.92,len,10),mat);tube.position.y=-len/2;pivot.add(tube);sphere(r,mat,0,-len,0,1,1,1,pivot);if(isLeg)sphere(r*1.35,white,0,-len-.01,.035,1.1,.62,1.55,pivot);else sphere(r*1.1,skin,0,-len,0,1,1,1,pivot);gp.add(pivot);return pivot}
  var a={g:gp,la:limb(-.33,1,.38,.09,shirt,false),ra:limb(.33,1,.38,.09,shirt,false),ll:limb(-.135,.49,.35,.105,navy,true),rl:limb(.135,.49,.35,.105,navy,true),ph:0};
  if(name){var sp=new T.Sprite(new T.SpriteMaterial({map:tex(function(c,s){c.fillStyle='rgba(29,51,74,.85)';rr(c,8,s*.32,s-16,s*.34,25);c.fill();c.fillStyle='#fff';c.font='700 '+s*.18+'px system-ui';c.textAlign='center';c.textBaseline='middle';c.fillText(name,s/2,s*.5)},256),depthTest:false}));sp.scale.set(2,2,1);sp.position.y=1.9;gp.add(sp)}
  return a;
};
function v3Mat(c,metal){return new T.MeshStandardMaterial({color:c,roughness:metal?.42:.82,metalness:metal?.28:0})}
function v3Mesh(geo,mat,x,y,z,parent){var m=new T.Mesh(geo,mat);m.position.set(x,y,z);parent.add(m);return m}
function v3Sphere(r,c,x,y,z,parent){return v3Mesh(new T.SphereGeometry(r,12,8),v3Mat(c),x,y,z,parent)}
function v3Box(w,h,d,c,x,y,z,parent){return v3Mesh(new T.BoxGeometry(w,h,d),v3Mat(c),x,y,z,parent)}
function v3Ring(r,c,x,y,z,parent){var m=v3Mesh(new T.TorusGeometry(r,.055,6,28),new T.MeshBasicMaterial({color:c}),x,y,z,parent);return m}
function v3Renderer(rd){rd.setPixelRatio(Math.min(window.devicePixelRatio||1,1.6))}
function v3Glow(c){return tex(function(g,s){var grad=g.createRadialGradient(s/2,s/2,0,s/2,s/2,s/2);grad.addColorStop(0,c);grad.addColorStop(.25,c);grad.addColorStop(1,'rgba(255,255,255,0)');g.fillStyle=grad;g.fillRect(0,0,s,s)},64)}
function v3Cloud(x,y,z,scale,parent,motion){var gp=new T.Group(),mat=v3Mat(0xfffdf8);[-1,0,1].forEach(function(k){var m=v3Mesh(new T.SphereGeometry(1,10,7),mat,k*.9,k===0?.3:0,0,gp);m.scale.set(k===0?1.2:1,.65,.75)});gp.position.set(x,y,z);gp.scale.setScalar(scale);parent.add(gp);if(motion)motion.push({m:gp,type:'cloud',x:x,y:y,z:z,p:Math.random()*6})}
function v3Tree(x,y,z,color,parent){var g=new T.Group();v3Mesh(new T.CylinderGeometry(.09,.15,1.3,8),v3Mat(0x9b7957),0,.65,0,g);[[0,1.7,0],[-.45,1.45,0],[.4,1.55,.1]].forEach(function(p){var leaf=v3Sphere(.66,color,p[0],p[1],p[2],g);leaf.scale.y=.85});g.position.set(x,y,z);parent.add(g)}
function v3InitState(a){a.v3={motion:[],lastCP:-1,trail:[],pool:[],time:0,points:null};return a.v3}
function v3SparkField(a,color,count){var points=[];for(var i=0;i<count;i++)points.push((Math.random()-.5)*16,Math.random()*9,-Math.random()*30);var geometry=new T.BufferGeometry();geometry.setAttribute('position',new T.Float32BufferAttribute(points,3));var dots=new T.Points(geometry,new T.PointsMaterial({color:color,size:.06,transparent:true,opacity:.65}));a.sc.add(dots);a.v3.points=dots}
function v3Obby(a){
  if(!a||a.v3)return;var v=v3InitState(a),W=WORLDS[Math.floor(a.stage/5)],world=Math.floor(a.stage/5),R=rng(a.o.seed+721),scene=a.sc;v3Renderer(a.rd);a.el.classList.add('v3-play','v3-obby');
  // All ornaments are below platforms or beyond the walkable path; collision bounds are unchanged.
  a.boxes.forEach(function(b,i){
    if(b.hh>.3&&b.hw>1){var radius=Math.min(b.hw,b.hd)*.8,rock=v3Mesh(new T.ConeGeometry(radius,1.6+radius*.5,7),v3Mat(world===2?0x8eacd0:world===3?0x675275:0xb39b78),0,-b.hh-.5,0,b.m);rock.rotation.x=Math.PI;rock.scale.z=b.hd/b.hw;
      if(i%4===0){[-1,1].forEach(function(side){var crystal=v3Mesh(new T.OctahedronGeometry(.18,0),new T.MeshStandardMaterial({color:world===3?0xffb76c:0x72e2dd,emissive:world===3?0x82401b:0x16434b,roughness:.45}),side*(b.hw-.22),b.hh+.18,b.hd-.25,b.m);v.motion.push({m:crystal,type:'spin',p:R()*6})})}
    }
  });
  a.cps.forEach(function(cp,i){var ring=v3Ring(.7,0xb7fff0,cp.x,cp.y+.035,cp.z,scene);ring.rotation.x=-Math.PI/2;ring.material.transparent=true;ring.material.opacity=.65;v.motion.push({m:ring,type:'checkpoint',index:i,p:R()*6});
    if(i>0){v3Box(.08,2,.08,0xf7dfa6,cp.x+1.75,cp.y+1,cp.z+.7,scene);var lamp=v3Sphere(.19,0xffe8a1,cp.x+1.75,cp.y+2,cp.z+.7,scene);lamp.material.emissive.setHex(0x775320)}
  });
  for(var i=0;i<14;i++){var side=i%2?-1:1,z=a.z1*(i+.4)/14,x=side*(10+R()*6),y=1+R()*5;v3Cloud(x,y+5,z,1+R()*.7,scene,v.motion);
    var island=new T.Group();v3Mesh(new T.CylinderGeometry(2.2,.4,3.4,9),v3Mat(world===2?0xa4c4da:world===3?0x5b4a70:0xa78f71),0,-1.7,0,island);v3Mesh(new T.CylinderGeometry(2.2,2.2,.25,16),v3Mat(W.top),0,.08,0,island);v3Tree(0,.2,0,W.leaf,island);island.position.set(x,y-2,z);scene.add(island);v.motion.push({m:island,type:'island',y:y-2,p:R()*6});
    if(world===0&&i%3===0){var fall=v3Box(.28,4.5,.11,0x89dcec,x+1.7,y-4,z,scene);fall.material.transparent=true;fall.material.opacity=.55;v.motion.push({m:fall,type:'water',y:y-4,p:R()*6})}
    if(world===1&&i%3===0){v3Mesh(new T.CylinderGeometry(.17,.2,2.2,8),v3Mat(0x5eaf8c),1,.9,0,island)}
  }
  var portal=new T.Group(),goal=a.goal,gy=goal.y+goal.hh;[-1,1].forEach(function(k){v3Box(.45,4,.6,world===3?0x8879ba:0xf5e4b2,k*2,2,0,portal);v3Mesh(new T.ConeGeometry(.55,.8,5),v3Mat(0x8ddace),k*2,4.3,0,portal)});var ring=v3Ring(1.7,0x9fece3,0,2.2,0,portal);ring.material.transparent=true;ring.material.opacity=.82;portal.position.set(goal.x,gy,goal.z-.8);scene.add(portal);v.motion.push({m:ring,type:'portal',p:0});
  a.el.insertAdjacentHTML('beforeend','<div class="v3-route" id="v3Route"><span>🌿 存檔 '+(a.cp+1)+' / '+a.cps.length+'</span><i><b></b></i><small>前往魔法傳送門</small></div>');
  v3SparkField(a,world===3?0xffcc83:0xc3fff1,28);
}
function v3ArcScene(a,id){
  if(a.v3||['tower','shoot'].indexOf(id)<0)return;var v=v3InitState(a);v3Renderer(a.rd);a.el.classList.add('v3-play','v3-'+id);
  if(id==='tower'){
    var sc=a.sc;sc.background=new T.Color(0x8fd0ff);sc.fog=new T.Fog(0x8fd0ff,30,90);
    [-2.2,2.2].forEach(function(x,side){var castle=new T.Group(),stone=v3Mat(side?0xf2dcd4:0xc4dce9);v3Mesh(new T.CylinderGeometry(1.14,1.4,23.3,12),stone,0,11.2,-1.5,castle);
      for(var y=1;y<24;y+=3.8){var rim=v3Mesh(new T.CylinderGeometry(1.3,1.3,.22,16),v3Mat(0xffefc9),0,y,-1.5,castle);v3Box(.5,.95,.1,0x54657c,0,y+1,-.35,castle);var light=v3Box(.3,.65,.12,0xffdf7c,0,y+1,-.26,castle);light.material.emissive.setHex(0x685129)}
      var roof=v3Mesh(new T.ConeGeometry(1.8,3,12),v3Mat(side?0xc27e97:0x5c8fb8),0,25,-1.5,castle);v3Sphere(.17,0xffd35b,0,26.65,-1.5,castle);
      castle.position.x=x;sc.add(castle);
    });
    for(var i=0;i<10;i++)v3Cloud((i%2?-1:1)*(8+Math.random()*6),i*3, -7-Math.random()*8,1+Math.random(),sc,v.motion);
    var crown=v3Mesh(new T.TorusGeometry(.7,.13,8,20),v3Mat(0xffd165,true),0,25,0,sc);crown.rotation.x=Math.PI/2;v.motion.push({m:crown,type:'crown',y:25,p:0});v3SparkField(a,0xffdc8e,20);
    a.el.insertAdjacentHTML('beforeend','<div class="v3-caption">✨ 拼對字母，讓魔法電梯帶你登頂</div>');
  }else{
    var sc=a.sc;sc.background=new T.Color(0x9fd8ff);sc.fog=new T.Fog(0x9fd8ff,24,80);
    // Booth stays behind target planes at z=-6 and outside ray hit lists.
    v3Box(19,.45,8,0xb99678,0,-2,-8,sc);[-9.2,9.2].forEach(function(x){v3Mesh(new T.CylinderGeometry(.26,.32,12,10),v3Mat(0xb49471),x,3.5,-10,sc);v3Sphere(.44,0xffd884,x,9.7,-10,sc)});
    v3Box(19,.55,.7,0x91c3ba,0,9,-10,sc);v3Box(19,.2,.7,0xffe0a2,0,8.6,-10,sc);
    for(var i=0;i<14;i++){var bulb=v3Sphere(.105,i%2?0xffe79b:0xffb7b3,-8.7+i*1.34,8.7,-9.5,sc);bulb.material.emissive.setHex(0x6c512e)}
    for(var j=0;j<9;j++)v3Box(.32,.1,4,0xeee5d6,(j-4)*2,-1.72,-8,sc);
    // Rounded toy bubble launcher, replacing the visible square barrel silhouette.
    var oldLauncher=sc.children.filter(function(m){return m.type==='Group'&&m.position.z===5&&m.position.y===-1.5})[0];if(oldLauncher){oldLauncher.visible=false;v.originalLauncher=oldLauncher}
    var launcher=new T.Group();v3Sphere(.66,0x7186bd,0,0,0,launcher);var barrel=v3Mesh(new T.CylinderGeometry(.29,.4,1.6,14),v3Mat(0x7ed4ca),0,.35,-.6,launcher);barrel.rotation.x=Math.PI/2;v3Ring(.31,0xffda79,0,.35,-1.43,launcher);launcher.position.set(0,-1.3,5);sc.add(launcher);v.launcher=launcher;
    var wheel=new T.Group();v3Ring(4,0xf6dd9d,0,0,0,wheel);for(i=0;i<10;i++){var t=i*Math.PI/5;v3Sphere(.3,i%2?0xe5a0ba:0x96cdbd,Math.cos(t)*4,Math.sin(t)*4,0,wheel)}wheel.position.set(-13,5,-24);sc.add(wheel);v.motion.push({m:wheel,type:'wheel',p:0});v3SparkField(a,0xffe7a1,22);
    a.el.insertAdjacentHTML('beforeend','<div class="v3-caption">🫧 點選正確氣球，發射魔法泡泡</div>');
  }
}
function v3Burst(a,pos,color){var v=a.v3,holder=v.pool.filter(function(x){return !x.live})[0];
  if(!holder){var geo=new T.BufferGeometry(),values=new Float32Array(36);geo.setAttribute('position',new T.Float32BufferAttribute(values,3));var points=new T.Points(geo,new T.PointsMaterial({color:color,size:.16,transparent:true,opacity:1}));a.sc.add(points);holder={m:points,vel:[],live:false};v.pool.push(holder)}
  holder.live=true;holder.age=0;holder.m.visible=true;holder.m.position.copy(pos);holder.m.material.color.setHex(color);holder.vel=[];var arr=holder.m.geometry.attributes.position.array;for(var i=0;i<12;i++){arr[i*3]=arr[i*3+1]=arr[i*3+2]=0;holder.vel.push([(Math.random()-.5)*3,Math.random()*3,(Math.random()-.5)*2])}holder.m.geometry.attributes.position.needsUpdate=true;
}
function v3Tick(a,dt){
  if(!a||!a.v3)return;var v=a.v3;v.time+=dt;var t=v.time,still=REDUCED;
  v.motion.forEach(function(o){if(still)return;var m=o.m;
    if(o.type==='cloud')m.position.x=o.x+Math.sin(t*.12+o.p)*.8;
    else if(o.type==='island')m.position.y=o.y+Math.sin(t*.35+o.p)*.12;
    else if(o.type==='water'){m.material.opacity=.45+Math.sin(t*2+o.p)*.1}
    else if(o.type==='spin'){m.rotation.y+=dt*.7}
    else if(o.type==='checkpoint'){var k=1+Math.sin(t*2+o.p)*.03;m.scale.set(k,k,k)}
    else if(o.type==='portal'){m.rotation.z+=dt*.1;m.material.opacity=.72+Math.sin(t*2)*.1}
    else if(o.type==='crown'){m.rotation.z+=dt*.5;m.position.y=o.y+Math.sin(t)*.16}
    else if(o.type==='wheel')m.rotation.z+=dt*.05;
  });
  if(v.points&&!still){v.points.rotation.y+=dt*.025;if(a.p)v.points.position.z=a.p.z}
  if(v.launcher&&v.originalLauncher)v.launcher.rotation.copy(v.originalLauncher.rotation);
  if(a.g&&a.g.id==='shoot'&&a.dbg){var debug=a.dbg();(debug.tg||[]).forEach(function(target){if(!target.v3Decor){target.v3Decor=true;target.g.children.slice().forEach(function(m){if(m.geometry&&m.geometry.type==='SphereGeometry'){var radius=m.geometry.parameters.radius;m.geometry.dispose();m.geometry=new T.SphereGeometry(radius,24,16);var color=m.material.color.getHex();m.material.dispose();m.material=v3Mat(color);m.material.roughness=.35;var shine=v3Sphere(radius*.13,0xfffdf3,-radius*.3,radius*.34,radius*.85,m);shine.scale.z=.2}})}if(target.pop>0&&!target.v3Popped){target.v3Popped=true;if(!still)v3Burst(a,target.g.position,0xffda7b)}});var caption=a.el.querySelector('.v3-caption');if(caption)caption.textContent=v.combo>=2?'🔥 連續命中 '+v.combo+' 次 · 三連擊開始有連擊加分':'🫧 點選正確氣球，發射魔法泡泡'}
  if(a.g&&a.g.id==='tower'){var caption=a.el.querySelector('.v3-caption');if(caption)caption.textContent='✨ 字母能量 '+(v.combo||0)+' · '+(v.shield?'🛡️ 護盾已準備':'連對三題獲得護盾')}
  v.pool.forEach(function(p){if(!p.live)return;p.age+=dt;var arr=p.m.geometry.attributes.position.array;for(var i=0;i<12;i++){arr[i*3]+=p.vel[i][0]*dt;arr[i*3+1]+=p.vel[i][1]*dt;arr[i*3+2]+=p.vel[i][2]*dt;p.vel[i][1]-=dt*3}p.m.material.opacity=Math.max(0,1-p.age/.65);p.m.geometry.attributes.position.needsUpdate=true;if(p.age>.65){p.live=false;p.m.visible=false}});
  if(a.p){var route=a.el.querySelector('#v3Route');if(route){route.querySelector('span').textContent='✦ 存檔 '+(a.cp+1)+' / '+a.cps.length;route.querySelector('b').style.width=Math.round(clamp((a.z0-a.p.z)/(a.z0-a.z1),0,1)*100)+'%'}
    if(v.lastCP!==a.cp){v.lastCP=a.cp;var rt=a.el.querySelector('#v3Route');if(rt){rt.classList.add('show');clearTimeout(v.rtT);v.rtT=setTimeout(function(){rt.classList.remove('show')},2600)}if(a.cp>0){var pulse=document.createElement('div');pulse.className='v3-checkpoint';pulse.textContent='✦ 已儲存探險進度';a.el.appendChild(pulse);setTimeout(function(){pulse.remove()},1600)}}
  }
}
var v3Build0=build;build=function(){v3Build0();if(S)v3Obby(S)};
var v3Arc0=arc;arc=function(g,o,setup){v3Arc0(g,o,function(a){setup(a);v3ArcScene(a,g.id)})};
var v3Map0=map;map=function(g){v3Map0(g);var container=gBody.querySelector('.obmap');if(container)container.insertAdjacentHTML('afterbegin','<div class="v3-cover" style="background-image:linear-gradient(transparent,#153b4cc9),url(assets/adventure-island.webp)"><span>ENGLISH ADVENTURE · 3.0</span><h2>單字闖關島</h2><p>四個世界、二十關，穿越漂浮島與魔法傳送門。</p></div>')};
var v3Menu0=menu;menu=function(g){v3Menu0(g);if(['tower','shoot','diner'].indexOf(g.id)<0)return;var container=gBody.querySelector('.obmap');if(container)container.insertAdjacentHTML('afterbegin','<div class="v3-cover" style="background-image:linear-gradient(transparent,#153b4cc9),url(assets/adventure-'+g.id+'.webp)"><span>ENGLISH ADVENTURE · 3.0</span><h2>'+esc(g.zh)+'</h2><p>'+esc(g.id==='diner'?'管理多桌訂單、製作熱食，完成內用與外帶配餐。':g.id==='tower'?'補上字母，搭上魔法電梯，登上雲端城堡。':'在嘉年華靶場聽單字、選目標，發射彩色泡泡。')+'</p></div>');
  if(g.id==='diner'){var solo=$('#mSolo .nm b'),how=gBody.querySelector('.obtip');if(solo)solo.textContent='開店經營 · 多桌配餐';if(how)how.textContent='選一桌客人，依英文訂單把食物放到托盤；熱食先製作，再選內用、外帶或外送並上菜。二年級先認單字，越高年級訂單種類越多。自己玩不倒數，連線以 120 秒比積分。';container.insertAdjacentHTML('beforeend','<button class="btn ghost" id="v3DinerClassic">原版餐廳練習</button>');$('#v3DinerClassic').addEventListener('click',function(){launch(g,{classic:true})})}
};

/* New restaurant orders: seeded generation, bounded quantities, unique food names. */
function v3Order(R,b,index){
  function r(n){return Math.floor(R()*n)}
  var foods=DN_IDS.filter(function(k){return k!=='ga'}),hot={burger:1,hotdog:1,pizza:1,fries:1,toast:1,egg:1},first=foods[r(foods.length)],need={},color=b>=3&&!!DN_F[first][4]&&index%3===1;
  if(color&&first==='ra'&&R()<.5)first='ga';
  var quantity=b<=1?1:b<=2?1+r(2):1+r(3);if(DN_F[first][3])quantity=1;need[first]=quantity;
  var items=[first];if(b>=3&&index%2===1){var second=foods.filter(function(k){return DN_F[k][0]!==DN_F[first][0]});second=second[r(second.length)];need[second]=DN_F[second][3]?1:b>=5?1+r(2):1;items.push(second)}
  var service=b<=1?'dine':b===2?(index%3===2?'takeout':'dine'):['dine','takeout','delivery'][index%3];
  var words=items.map(function(k){return dnNp(k,need[k],color&&k===first).en});
  var sentence=(b<=1?'A ':b>=4?'Could I have ':'I would like ')+words.join(' and ')+', please.';
  if(b<=1)sentence=DN_F[first][0].charAt(0).toUpperCase()+DN_F[first][0].slice(1)+', please.';
  sentence+=' '+({dine:'For here.',takeout:'To go.',delivery:'For delivery.'}[service]);
  var translated=items.map(function(k){return dnNp(k,need[k],color&&k===first).zh}).join('和')+'，'+({dine:'在這裡吃',takeout:'外帶',delivery:'外送'}[service])+'。';
  return {id:index,need:need,words:items,en:sentence,zh:translated,service:service,hot:items.some(function(k){return !!hot[k]}),tray:[],cooked:false,cooking:0,chosenService:'',tries:0,age:0,delivered:false,color:color};
}
var v3DinerClassic=IMPL.diner;
IMPL.diner=function(g,o){if(o.classic)return v3DinerClassic(g,o);var X=seeded(o),b=X.b,vs=!!o.tok,N=12,TL=120;
  pad(g,o,function(a){
    var B=$('#pdB'),original=isKid()?Store.kid(who):{},dn0=+original.dn||0,queue=[],nextId=0,selected=0,served=0,correct=0,combo=0,bestCombo=0,tipTotal=0,busy=false,done=false,seen={},missed={},myF=isKid()?facOf(who):'',customers=['fox','bear','owl','panda','unicorn','eagle','dragon'],hintOpen=false;
    a.el.classList.add('v3-diner');$('#pdQ').hidden=true;
    var maxTables=b<=1?2:3;
    function fill(){while(queue.length<maxTables&&nextId<N){var order=v3Order(X.R,b,nextId++);order.customer=customers[order.id%customers.length];queue.push(order)}}
    function current(){return queue[selected]||queue[0]}
    function image(k){return DNP[k]||DNP.ra}
    function draw(){if(done)return;var q=current();if(!q)return end();hintOpen=false;B.classList.remove('v3-delivered');if(b<=1)q.chosenService='dine';
      B.innerHTML='<section class="v3-restaurant"><div class="v3-diner-scene" style="background-image:linear-gradient(#122d4910,#122d4950),url(assets/adventure-diner.webp)"><div class="v3-shop-sign"><b>魔法星餐廳</b><span>主廚 '+esc(nm())+' · '+served+'/'+N+' 桌完成</span></div><div class="v3-tables">'+queue.map(function(order,j){return '<button class="v3-table '+(j===selected?'active':'')+'" data-table="'+j+'" aria-pressed="'+(j===selected)+'"><img src="'+image('c_'+order.customer)+'" alt="'+esc(DN_C[order.customer][0])+'"><b>第 '+(j+1)+' 桌</b><small>'+({dine:'🍽️',takeout:'🛍️',delivery:'🚲'}[order.service])+' '+(order.tray.length?'已配 '+order.tray.length+' 份':'等待點餐')+'</small><i><em style="width:'+Math.max(20,100-order.age)+'%"></em></i></button>'}).join('')+'</div><div class="v3-chef"><img src="assets/fox.webp" alt="狐狸主廚"><span>🔥 連續上對 '+combo+' 桌<br>✦ 小費 '+tipTotal+' 分</span></div></div>'+
      '<div class="v3-order-ticket"><div><span>ORDER '+String(q.id+1).padStart(2,'0')+'</span><b>'+esc(DN_C[q.customer][0])+'</b></div><p lang="en">'+esc(q.en)+'</p><small id="v3OrderZh" hidden>'+esc(q.zh)+'</small><div class="v3-ticket-actions"><button id="v3DinerSpeak" aria-label="朗讀訂單">🔊 聽訂單</button><button id="v3DinerHint">💡 中文提示</button></div></div>'+
      '<div class="v3-kitchen-tabs"><b>① 配餐檯</b><span>點食物放入托盤，點托盤食物可收回</span></div><div class="v3-food-grid" id="v3FoodGrid"></div><div class="v3-tray" id="v3Tray" aria-label="配餐托盤"></div><div class="v3-prep"><button id="v3Cook" '+(!q.hot?'disabled':'')+'>'+(!q.hot?'這桌不用加熱':q.cooked?'✅ 熱食已完成':q.cooking?'🔥 製作中…':'② 製作熱食')+'</button><div class="v3-cook-meter"><i id="v3CookBar"></i></div></div>'+
      '<div class="v3-service" aria-label="③ 選擇用餐方式">'+['dine','takeout','delivery'].map(function(k){return '<button data-service="'+k+'" aria-pressed="'+(q.chosenService===k)+'"'+(b<=1&&k!=='dine'?' hidden':'')+'>'+({dine:'🍽️ 內用',takeout:'🛍️ 外帶',delivery:'🚲 外送'}[k])+'</button>'}).join('')+'</div><button class="v3-serve" id="v3Serve">③ '+(q.service==='dine'?'上菜':'交付餐點')+' ✦</button><div class="v3-diner-feedback" id="v3DinerFeedback" role="status" aria-live="polite"></div></section>';
      var tiles=q.words.slice();if(q.color&&q.words.indexOf('ra')>=0)tiles.push('ga');if(q.color&&q.words.indexOf('ga')>=0)tiles.push('ra');var distractors=X.sh(DN_IDS.filter(function(k){return tiles.indexOf(k)<0&&(q.color||k!=='ga')}));while(tiles.length<(b<=1?4:b<=2?6:8)&&distractors.length)tiles.push(distractors.shift());tiles=X.sh(tiles);
      $('#v3FoodGrid').innerHTML=tiles.map(function(k){return '<button data-food="'+k+'" aria-label="'+esc(DN_F[k][2])+'"><img src="'+image(k)+'" alt=""><span lang="en">'+esc(q.color&&DN_F[k][4]?DN_F[k][4]+' '+DN_F[k][0]:DN_F[k][0])+'</span></button>'}).join('');
      B.querySelectorAll('[data-table]').forEach(function(btn){btn.addEventListener('click',function(){if(busy||done)return;selected=+btn.dataset.table;sfx('tap');draw()})});
      B.querySelectorAll('[data-food]').forEach(function(btn){btn.addEventListener('click',function(){if(busy||done||q.cooking)return;if(q.tray.length>=7)return;q.tray.push(btn.dataset.food);q.cooked=false;q.cooking=0;sfx('tap');drawTray()})});
      B.querySelectorAll('[data-service]').forEach(function(btn){btn.addEventListener('click',function(){if(busy||done)return;q.chosenService=btn.dataset.service;B.querySelectorAll('[data-service]').forEach(function(x){x.setAttribute('aria-pressed',String(x===btn))});sfx('tap')})});
      $('#v3DinerSpeak').addEventListener('click',function(){speak(q.en)});$('#v3DinerHint').addEventListener('click',function(){hintOpen=true;$('#v3OrderZh').hidden=false});
      $('#v3Cook').addEventListener('click',function(){if(busy||done||q.cooked||q.cooking)return;if(!q.tray.length){feedback('先把食物放進托盤，再製作熱食。',false);return}q.cooking=.001;sfx('tap');$('#v3Cook').textContent='🔥 製作中…';$('#v3Cook').disabled=true});
      $('#v3Serve').addEventListener('click',serve);drawTray();drawCooking();if(b<=1)q.chosenService='dine';
    }
    function drawTray(){var q=current();if(!q)return;var node=$('#v3Tray');node.innerHTML=q.tray.length?q.tray.map(function(k,j){return '<button data-remove="'+j+'" aria-label="收回 '+esc(DN_F[k][2])+'"><img src="'+image(k)+'" alt=""><small>×</small></button>'}).join(''):'<span>🍽️ 托盤還是空的</span>';node.querySelectorAll('[data-remove]').forEach(function(btn){btn.addEventListener('click',function(){if(busy||done||q.cooking)return;q.tray.splice(+btn.dataset.remove,1);q.cooked=false;sfx('tap');drawTray();drawCooking()})});drawCooking()}
    function drawCooking(){var q=current(),bar=$('#v3CookBar'),button=$('#v3Cook');if(!q||!bar||!button)return;bar.style.width=(q.cooked?100:q.cooking?Math.min(100,q.cooking/1.5*100):0)+'%';button.disabled=!q.hot||q.cooked||q.cooking>0;button.textContent=!q.hot?'這桌不用加熱':q.cooked?'✅ 熱食已完成':q.cooking?'🔥 製作中…':'② 製作熱食'}
    function feedback(text,ok){var node=$('#v3DinerFeedback');if(!node)return;node.textContent=text;node.className='v3-diner-feedback '+(ok?'good':'bad');node.scrollIntoView({block:'nearest',behavior:REDUCED?'auto':'smooth'})}
    function serve(){var q=current();if(busy||done||!q)return;if(!q.tray.length){feedback('托盤是空的，先依訂單配餐。',false);return}
      var counts={};q.tray.forEach(function(k){counts[k]=(counts[k]||0)+1});var foodOK=Object.keys(q.need).every(function(k){return counts[k]===q.need[k]})&&Object.keys(counts).every(function(k){return !!q.need[k]});
      if(!foodOK){q.tries++;combo=0;q.words.forEach(function(f){Learn.bad(dnW(f));missed[f]=1;seen[f]=1});sfx('no');feedback('再聽一次：確認種類、顏色和份數。'+(q.tries>=2?q.zh:''),false);if(q.tries>=2)$('#v3OrderZh').hidden=false;return}
      if(q.hot&&!q.cooked){feedback('配餐對了！這桌有熱食，請先按「製作熱食」。',false);return}
      if(q.chosenService!==q.service){q.tries++;combo=0;sfx('no');feedback('聽最後一句：For here 是內用、To go 是外帶、For delivery 是外送。',false);return}
      busy=true;var first=q.tries===0,faction=DN_C[q.customer][1],mul=myF&&faction===myF?2:1;
      if(first){correct++;combo++;bestCombo=Math.max(bestCombo,combo);award(mul);q.words.forEach(function(f){Learn.ok(dnW(f));seen[f]=1});if(combo>=3&&tipTotal<50){award(.5);tipTotal+=5}}
      else{award(.5);combo=0;q.words.forEach(function(f){Learn.ok(dnW(f));seen[f]=1})}
      served++;sfx('ok');confetti($('#v3Tray'),22);a.my=Math.round(roundPts/10);B.classList.add('v3-delivered');feedback('✦ 客人滿意！'+(mul===2?'同陣營 ×2 分數！ ':'')+(first?'訂單一次就做對了。':'照提示完成了，學會新方法！'),true);
      setTimeout(function(){if(A!==a||done)return;queue.splice(selected,1);fill();selected=Math.min(selected,queue.length-1);busy=false;if(served>=N)end();else draw()},900);
    }
    function end(){if(done)return;done=true;if(isKid())Store.mut(who,function(k){k.dn=(+k.dn||0)+served});a.my=Math.round(roundPts/10);
      var upgraded=dnTier(dn0+served)>dnTier(dn0),review=Object.keys(seen).map(function(f){return DN_F[f][0]+(missed[f]?'（可再複習）':'')});
      padEnd(a,{win:true,score:correct,total:vs?Math.max(1,served):N,icon:upgraded?'🏰':correct>=10?'🏆':'🍽️',title:upgraded?'餐廳招牌升級了！':'營業完成！接待 '+served+' 桌客人',text:'首次上對 '+correct+' 桌，最高連續 '+bestCombo+' 桌，小費 '+tipTotal+' 分。'+(review.length?'本輪單字：'+review.join('、')+'。':''),say:correct>=10?'你是魔法餐廳五星主廚！':'做得好！再開店練習不同的訂單吧！'});
    }
    fill();draw();say('主廚上班！先選一桌客人，配餐、做熱食，再把餐點送出去！','happy');
    a.net=function(){return {sc:Math.round(roundPts/10)}};
    a.step=function(dt){queue.forEach(function(q){q.age+=dt*.65;if(q.cooking&&!q.cooked){q.cooking+=dt;if(q.cooking>=1.5){q.cooking=0;q.cooked=true;if(q===current()){sfx('pop');drawCooking()}}}});drawCooking();$('#arInfo').textContent='完成 '+served+'/'+N+' 桌'+(vs?' · '+Math.max(0,Math.ceil(TL-a.t))+' 秒':' · 不倒數');var tableButtons=B.querySelectorAll('[data-table]');tableButtons.forEach(function(btn,j){if(queue[j])btn.querySelector('em').style.width=Math.max(20,100-queue[j].age)+'%'});if(vs&&a.t>=TL)end()};
  });
};
