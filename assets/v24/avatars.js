/* Existing portrait identities reused locally; no account access. */
(function(){var T=THREE;function wiBatch(root,protectedObjects){
 var groups={};root.updateMatrixWorld(true);var inverse=new T.Matrix4().copy(root.matrixWorld).invert();
 function visit(o){if(protectedObjects.indexOf(o)>=0||!o.visible)return;if(o.isMesh&&!o.isInstancedMesh&&o.children.length===0&&!Array.isArray(o.material)&&o.material.visible!==false){var key=o.geometry.type+JSON.stringify(o.geometry.parameters)+o.material.uuid;(groups[key]||(groups[key]=[])).push(o)}o.children.slice().forEach(visit)}
 root.children.slice().forEach(visit);Object.keys(groups).forEach(function(key){var items=groups[key];if(items.length<3)return;var first=items[0],batch=new T.InstancedMesh(first.geometry,first.material,items.length);batch.receiveShadow=true;batch.castShadow=items.some(function(m){return m.castShadow});items.forEach(function(m,i){batch.setMatrixAt(i,new T.Matrix4().multiplyMatrices(inverse,m.matrixWorld));m.parent.remove(m);if(m.geometry!==first.geometry)m.geometry.dispose()});batch.instanceMatrix.needsUpdate=true;root.add(batch)});
}

var WI_AVATARS={
 adv:{label:'冒險家',hair:0x74492e,coat:0x2868a5,scarf:0x2868a5,eye:0x487eae,gear:'goggles'},
 blue:{label:'藍髮耳機',hair:0x203862,coat:0x275a94,scarf:0x204d85,eye:0x218bb8,gear:'headphones'},
 star:{label:'星帽少年',hair:0xc49a63,coat:0x2e4670,scarf:0x28436c,eye:0x467ba4,gear:'cap'},
 ninja:{label:'銀髮忍者',hair:0xcbd2e6,coat:0x52627e,scarf:0xa93643,eye:0x258db7,gear:'mask'},
 black:{label:'黑髮戰士',hair:0x263042,coat:0x243e62,scarf:0x2b486a,eye:0x507696,gear:'circlet'},
 knight:{label:'鋼鐵騎士',hair:0x624735,coat:0x8995a9,scarf:0xc29b50,eye:0x625347,gear:'helmet'},
 wizard:{label:'魔法師',hair:0xbf995e,coat:0x334c9c,scarf:0x2c448d,eye:0x4d759d,gear:'wizard'},
 archer:{label:'森林弓箭手',hair:0x60412e,coat:0x397e64,scarf:0x3b6d55,eye:0x5b6752,gear:'hood'},
 pirate:{label:'小海盜',hair:0x854b35,coat:0x304f58,scarf:0x446862,eye:0x664732,gear:'pirate'},
 tech:{label:'科技護目鏡',hair:0x283141,coat:0x294e78,scarf:0x31587e,eye:0x3187ae,gear:'visor'},
 red:{label:'紅髮勇者',hair:0x9a3e43,coat:0x4a4d69,scarf:0xa83a46,eye:0x74524e,gear:'scarf'},
 prince:{label:'金髮王子',hair:0xd8b572,coat:0x34486b,scarf:0xa04453,eye:0x3e83b4,gear:'crown'},
 cat:{label:'獸耳少年',hair:0xc5cce3,coat:0x40506e,scarf:0x35475f,eye:0x4299c8,gear:'ears'},
 astro:{label:'太空探險家',hair:0x293344,coat:0xe7ecf1,scarf:0x30456c,eye:0x76513c,gear:'space'},
 stargirl:{label:'星光魔法女孩',hair:0x7d492d,coat:0x364fa0,scarf:0x344b98,eye:0x68462f,gear:'girl'},
 horn:{label:'魔角戰士',hair:0x82404a,coat:0x45435b,scarf:0x9b404a,eye:0x8b5e48,gear:'horns'}
};
function wiAvatarModel(id,col,name){
 var p=WI_AVATARS[id]||WI_AVATARS.adv,g=new T.Group(),head=new T.Group();head.position.y=1.20;g.add(head);
 function mat(c,metal){var m=new T.MeshStandardMaterial({color:c,roughness:metal?.40:.66,metalness:metal?.35:0});m.color.convertSRGBToLinear();m.userData.wiLinear=true;return m}
 var skin=mat(0xffd9bd),hair=mat(p.hair),coat=mat(p.coat),scarf=mat(p.scarf),navy=mat(0x283953),ivory=mat(0xfff4db),gold=mat(0xd9b56b,true),steel=mat(0xb2bdcf,true),ink=mat(0x202938),iris=mat(p.eye),glass=mat(0x55b4df,true),pink=mat(0xeaa08e);
 function mesh(geo,m,x,y,z,par){var q=new T.Mesh(geo,m);q.position.set(x,y,z);(par||g).add(q);q.castShadow=true;q.receiveShadow=true;return q}
 function orb(r,m,x,y,z,sx,sy,sz,par){var q=mesh(new T.SphereGeometry(1,24,18),m,x,y,z,par);q.scale.set(r*(sx||1),r*(sy||1),r*(sz||1));return q}
 function ring(r,t,m,x,y,z,par){return mesh(new T.TorusGeometry(r,t,7,28),m,x,y,z,par)}
 function star(r,m,x,y,z,par){var s=new T.Shape();for(var i=0;i<10;i++){var a=Math.PI/2+i*Math.PI/5,k=i%2?r*.46:r;if(i===0)s.moveTo(Math.cos(a)*k,Math.sin(a)*k);else s.lineTo(Math.cos(a)*k,Math.sin(a)*k)}s.closePath();return mesh(new T.ExtrudeGeometry(s,{depth:.022,bevelEnabled:false}),m,x,y,z,par)}
 orb(.37,skin,0,0,0,1,1,.94,head);[-1,1].forEach(function(s){orb(.075,skin,s*.355,-.01,-.01,.65,1,.75,head);orb(.039,pink,s*.135,-.08,.313,1,.45,.22,head);orb(.071,ivory,s*.122,.045,.321,1,1.23,.45,head);orb(.044,iris,s*.122,.04,.350,1,1.20,.4,head);orb(.025,ink,s*.121,.041,.365,1,1.23,.4,head);orb(.016,ivory,s*.122-.014,.064,.378,1,1,.3,head);orb(.075,hair,s*.13,.153,.307,1,.15,.23,head)});orb(.030,skin,0,-.032,.354,1,.8,.75,head);orb(.060,ink,0,-.142,.315,1,.40,.22,head);orb(.045,ivory,0,-.128,.328,1,.16,.18,head);
 orb(.38,hair,0,.18,-.045,1.04,.72,1,head);orb(.30,hair,0,.015,-.19,1.10,.97,.66,head);
 for(var i=0;i<5;i++){var s=(i-2),bang=orb(.14,hair,s*.118,.21-Math.abs(s)*.023,.225,1.0,.63,.56,head);bang.rotation.z=.25+s*.20}
 if(['helmet','pirate','wizard','girl','hood','cap','space'].indexOf(p.gear)<0){for(i=0;i<5;i++){var tuft=mesh(new T.ConeGeometry(.12,.27,7),hair,(i-2)*.12,.39-Math.abs(i-2)*.018,-.02,head);tuft.rotation.z=-(i-2)*.26;tuft.rotation.x=-.25}}
 orb(.26,coat,0,.73,0,1,1.08,.78);orb(.23,navy,0,.44,0,1.05,.42,.83);var collar=ring(.17,.065,scarf,0,.98,0);collar.rotation.x=Math.PI/2;var belt=ring(.21,.027,gold,0,.53,0);belt.rotation.x=Math.PI/2;orb(.085,gold,0,.78,.22,.8,.8,.3);star(.06,glass,0,.78,.244);
 var cape=mesh(new T.PlaneGeometry(.57,.55,3,3),scarf,0,.74,-.25);cape.material.side=T.DoubleSide;cape.rotation.x=.18;
 function limb(x,y,len,r,m,leg){var pivot=new T.Group();pivot.position.set(x,y,0);g.add(pivot);mesh(new T.CylinderGeometry(r,r*.87,len,12),m,0,-len/2,0,pivot);orb(r,m,0,-len,0,1,1,1,pivot);if(leg){orb(r*1.35,navy,0,-len-.005,.045,1.1,.65,1.45,pivot);orb(r*.70,gold,0,-len+.045,.12,1,.2,.3,pivot)}else{orb(r*1.1,ivory,0,-len+.055,0,1,.45,1,pivot);orb(r*1.1,skin,0,-len,0,1,1,1,pivot)}return pivot}
 var model={g:g,la:limb(-.30,.94,.34,.087,coat,false),ra:limb(.30,.94,.34,.087,coat,false),ll:limb(-.12,.43,.32,.095,navy,true),rl:limb(.12,.43,.32,.095,navy,true),ph:0,skinId:id,skinLabel:p.label,cape:cape};
 var gear=p.gear;
 if(gear==='goggles'){mesh(new T.CylinderGeometry(.375,.375,.055,24),navy,0,.265,-.01,head);[-.14,.14].forEach(function(x){ring(.101,.020,gold,x,.29,.278,head);orb(.085,glass,x,.29,.282,1,.78,.22,head)});}
 if(gear==='headphones'||gear==='visor'||gear==='space'){var band=mesh(new T.TorusGeometry(.395,.035,6,26,Math.PI),gear==='space'?ivory:steel,0,.035,-.04,head);[-1,1].forEach(function(s){orb(.13,gear==='space'?ivory:steel,s*.37,0,-.01,.48,1,1,head);orb(.095,glass,s*.418,0,-.01,.20,.85,.9,head)})}
 if(gear==='cap'){mesh(new T.SphereGeometry(.39,20,12,0,Math.PI*2,0,Math.PI/2),navy,0,.17,-.03,head);orb(.28,navy,0,.18,.25,1.35,.13,.75,head);star(.065,gold,-.13,.34,.29,head);star(.083,gold,.11,.38,.26,head)}
 if(gear==='wizard'||gear==='girl'){mesh(new T.CylinderGeometry(.46,.46,.035,28),coat,0,.32,0,head);var hat=mesh(new T.ConeGeometry(.33,.65,24),coat,-.035,.66,-.025,head);hat.rotation.z=-.14;mesh(new T.CylinderGeometry(.315,.33,.055,24),gold,0,.375,-.01,head);orb(.048,gold,.015,.985,-.02,1,1,1,head);star(.10,gold,0,.52,.284,head);star(.062,glass,0,.52,.31,head);if(gear==='girl'){[-1,1].forEach(function(s){orb(.145,hair,s*.36,-.15,-.12,.8,1.2,.9,head);orb(.095,hair,s*.36,-.32,-.13,1,1.1,1,head);orb(.065,gold,s*.36,-.08,-.11,1,.4,1,head)});var bow=orb(.08,glass,-.37,.31,.03,1.5,.6,.5,head);bow.rotation.z=.5}}
 if(gear==='mask'||gear==='scarf'){orb(.23,scarf,0,-.16,.13,1.25,.40,.9,head);var tail=mesh(new T.PlaneGeometry(.18,.47),scarf,.23,.92,-.22);tail.rotation.z=-.6;tail.material.side=T.DoubleSide}
 if(gear==='circlet'){mesh(new T.CylinderGeometry(.375,.375,.065,24),steel,0,.16,-.01,head);orb(.067,mat(0xf1a64b,true),0,.16,.37,.8,1,.35,head);[-1,1].forEach(function(s){orb(.14,gold,s*.29,.92,0,1,.5,.85)})}
 if(gear==='helmet'){mesh(new T.SphereGeometry(.395,20,12,0,Math.PI*2,0,Math.PI/2),steel,0,.10,-.025,head);[-1,1].forEach(function(s){orb(.16,steel,s*.32,-.01,-.015,.42,1.3,.9,head)});orb(.30,steel,0,.20,.26,1.05,.40,.34,head);for(i=-2;i<=2;i++)mesh(new T.BoxGeometry(.035,.13,.014),ink,i*.082,.20,.36,head);}
 if(gear==='hood'){var hood=mesh(new T.ConeGeometry(.43,.47,16),coat,0,.41,-.06,head);hood.rotation.z=-.16;orb(.37,coat,0,.23,.04,1.12,.13,.95,head);star(.085,gold,.29,.35,.18,head);var quiver=mesh(new T.CylinderGeometry(.11,.12,.6,10),mat(0x87613d),.23,.77,-.28);quiver.rotation.z=-.22;for(i=0;i<3;i++){mesh(new T.CylinderGeometry(.012,.012,.65,5),gold,.18+i*.065,1.20,-.31);orb(.055,ivory,.18+i*.065,1.49,-.31,.40,1,.25)}}
 if(gear==='pirate'){var shape=new T.Shape();shape.moveTo(-.52,0);shape.quadraticCurveTo(-.30,.06,-.23,.28);shape.quadraticCurveTo(0,.53,.23,.28);shape.quadraticCurveTo(.30,.06,.52,0);shape.quadraticCurveTo(.30,-.12,0,-.09);shape.quadraticCurveTo(-.3,-.12,-.52,0);var geo=new T.ExtrudeGeometry(shape,{depth:.13,bevelEnabled:true,bevelThickness:.02,bevelSize:.02,bevelSegments:1});var trim=mesh(geo,gold,0,.30,-.02,head);trim.scale.set(1.045,1.045,1);mesh(geo,navy,0,.30,.012,head);orb(.080,ivory,0,.49,.165,1,1,.28,head);[-.026,.026].forEach(function(x){orb(.018,ink,x,.50,.188,1,1,.25,head)});for(i=-1;i<=1;i+=2){var bone=mesh(new T.CylinderGeometry(.014,.014,.24,5),ivory,0,.39,.17,head);bone.rotation.z=i*.88}}
 if(gear==='visor'){orb(.40,ivory,0,.035,.28,1,.43,.28,head);orb(.37,glass,0,.035,.34,1,.38,.18,head);orb(.32,mat(0x1675b7,true),0,.035,.38,1,.36,.12,head);var shine=orb(.20,ivory,-.08,.11,.41,1,.06,.08,head);shine.rotation.z=.06}
 if(gear==='crown'){mesh(new T.CylinderGeometry(.32,.34,.095,16),gold,0,.34,-.025,head);for(i=0;i<5;i++){var a=i*Math.PI*2/5;mesh(new T.ConeGeometry(.075,.24,8),gold,Math.sin(a)*.28,.49,Math.cos(a)*.28-.025,head)}orb(.069,mat(0xaa568c,true),0,.39,.308,.8,1,.35,head)}
 if(gear==='ears'){[-1,1].forEach(function(s){var ear=mesh(new T.ConeGeometry(.145,.29,4),hair,s*.27,.45,-.02,head);ear.rotation.z=-s*.30;var inside=mesh(new T.ConeGeometry(.09,.18,3),pink,s*.27,.45,.065,head);inside.rotation.z=-s*.30})}
 if(gear==='space'){ring(.40,.055,ivory,0,.015,.075,head);mesh(new T.SphereGeometry(.41,20,12,0,Math.PI*2,0,Math.PI/2),ivory,0,.09,-.03,head);var bubble=mat(0xc5edff,true);bubble.transparent=true;bubble.opacity=.10;bubble.depthWrite=false;orb(.435,bubble,0,.015,.025,1,1,1,head);orb(.23,ivory,0,.73,-.25,1,.95,.55);orb(.065,glass,.12,.74,.21,1,1,.3)}
 if(gear==='horns'){[-1,1].forEach(function(s){var h=mesh(new T.ConeGeometry(.115,.45,10),gold,s*.33,.49,-.015,head);h.rotation.z=-s*.35;var tip=mesh(new T.ConeGeometry(.06,.21,9),gold,s*.41,.76,-.015,head);tip.rotation.z=s*.22})}
 if(name){var sp=new T.Sprite(new T.SpriteMaterial({map:tex(function(c,s){c.fillStyle='rgba(25,54,88,.88)';rr(c,8,s*.32,s-16,s*.34,25);c.fill();c.fillStyle='#fff9e5';c.font='700 '+s*.18+'px system-ui';c.textAlign='center';c.textBaseline='middle';c.fillText(name,s/2,s*.5)},256),depthTest:false}));sp.scale.set(2,2,1);sp.position.y=2.40;g.add(sp)}
 wiBatch(head,[]);g.userData.wiAvatarId=id;return model;
}

window.ForestAvatar=wiAvatarModel;})();
