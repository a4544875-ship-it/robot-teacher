const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),cp=require('node:child_process'),assert=require('node:assert/strict');
const root=path.join(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8').replace(/\r\n/g,'\n');
const baseline=p=>cp.execFileSync('git',['show','8e7cbf0:'+p],{cwd:root,encoding:'utf8',maxBuffer:20e6}).replace(/\r\n/g,'\n');
const page=read('index.html'),oldPage=baseline('index.html');
for(const [i,m] of [...page.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].entries())if(m[1].trim())new vm.Script(m[1],{filename:'inline-'+i});
for(const p of ['assets/v23/adventure.js','assets/v23/questions.js','assets/math-v4.js','assets/velocity-v4.js','assets/v15/social.js','assets/v9/lab.js','assets/v9/lab-studio.js','sw.js'])new vm.Script(read(p),{filename:p});
function part(s,a,b){const i=s.indexOf(a),j=s.indexOf(b,i);assert(i>=0&&j>i,a);return s.slice(i,j)}
for(const [a,b] of [['var Store=(function()','var who=null'],['function growth(','var Store=(function()'],['var Learn=(function()','function renderDay('],['function mq(R,kind,b,tb,n)','  function mqs(']])assert.equal(part(page,a,b),part(oldPage,a,b),'Persistence, rewards, growth and curriculum unchanged: '+a);
assert.equal(read('assets/v21/music.js'),baseline('assets/v21/music.js'));
const sandbox={window:{},document:{createElement:()=>({}),head:{appendChild(){}},getElementById:()=>null}};vm.createContext(sandbox);
vm.runInContext(read('assets/v23/adventure.js'),sandbox);vm.runInContext(read('assets/v23/questions.js'),sandbox);
const A=sandbox.window.Adventure23,Q=sandbox.window.Adventure23Questions;
assert.equal(A.stage(0),0);assert.equal(A.stage(3),1);assert.equal(A.stage(6),2);assert.equal(A.stage(100),2);
for(const length of [1,3,7,10]){const pool=Array.from({length},(_,i)=>['word'+i]);const deck=A.wordDeck(pool,pool,a=>a.slice(),10);assert.equal(deck.length,10);assert(deck.every(w=>pool.includes(w)));if(length>1)for(let i=1;i<10;i++)assert.notEqual(deck[i],deck[i-1])}
assert.equal(A.wordDeck([],[],a=>a,10).length,0);
const sideQ=['2','','一個角有幾條邊',0];sideQ.os=[sideQ,['102'],['4'],['1']];const checked=A.plausibleOptions(sideQ);assert(!checked.os.some(q=>q[0]==='102'));assert.equal(checked.os.length,4);assert.equal(A.mathText(sideQ),'一個角有幾條邊？');
const dinerSource=read('assets/english-premium-v3-source.js');const orderSource=part(dinerSource,'function v3Order(','var v3DinerClassic=');
const dc={DN_IDS:['burger','milk','ra','ga'],DN_F:{burger:['burger','','漢堡',false],milk:['milk','','牛奶',true],ra:['apple','','蘋果',false,'red'],ga:['apple','','蘋果',false,'green']},dnNp:(k,n)=>({en:n+' '+k,zh:n+'份'+k})};vm.createContext(dc);vm.runInContext(orderSource,dc);
for(const grade of [1,2,3,4,5]){let sequence=0,R=()=>{sequence=(sequence+.37)%1;return sequence};const early=dc.v3Order(R,grade,0,0),late=dc.v3Order(R,grade,9,0);assert.equal(early.words.length,1);assert.equal(late.words.length,2);assert.equal(late.phase,2);assert(late.en.includes(' and '));assert(Object.values(late.need).reduce((a,b)=>a+b,0)<=7);if(grade===1)assert.equal(late.service,'dine')}
for(const [a,op,b,ans] of [[5,'+',9,14],[14,'−',5,9],[6,'×',7,42],[42,'÷',6,7]])for(const side of [0,.9]){
 const q=[String(ans),'',`${a} ${op} ${b}`,0];q.pg={s:'allowed'};
 const inv=A.inverse(q,()=>side),correct=+inv[0],m=inv[2].replace('□',correct).match(/^(\d+) ([+−×÷]) (\d+) = (\d+)$/);
 const x=+m[1],y=+m[3],z=+m[4];assert.equal({'+':x+y,'−':x-y,'×':x*y,'÷':x/y}[op],z);
 assert.equal(inv.pg,q.pg);assert.equal(inv.os.filter(w=>w[0]===inv[0]).length,1);assert.equal(new Set(inv.os.map(w=>w[0])).size,4);
}
let counter=0;const seen={},C={mq(){const n=++counter,q=[String(n+1),'',`${n} + 1`,0];q.m=1;q.os=[q,[String(n+2)],['0'],['-1']];q.pg='allowed';return q}},X={R:()=>.3,b:2};
const generated=Array.from({length:10},(_,i)=>A.mathQuestion(C,X,{},i,seen));assert.equal(new Set(generated.map(q=>q[2])).size,10);assert(generated.every(q=>q.pg==='allowed'));assert(generated.some(q=>q.blank));
assert(A.diagram(['45','','長方形排了 5 排、每排 9 個 1 平方公分，面積是幾平方公分']).includes('repeat(9,1fr)'));
let magnetic=0;
for(const g of [2,3,4]){const qs=Q.magnet(g);magnetic+=qs.length;assert.equal(qs.length,g===2?6:18);assert.equal(new Set(qs.map(q=>q.id)).size,qs.length);for(const q of qs){assert.equal(q.w.length,3);assert(!q.w.includes(q.a));assert(q.e&&q.q&&q.v);if(g===2)assert.equal(q.level,0)}}
let social=0;for(const [lesson,qs] of Object.entries(Q.social)){social+=qs.length;for(const q of qs){assert(!q.o.includes(q.a));assert.equal(new Set([q.a,...q.o]).size,4);assert(q.e&&q.scene.after&&q.scene.before);assert(q.level>=2)}}assert.equal(social,24);
function socialBank(src,questions){const ctx={window:{Adventure23Questions:questions},document:{createElement:()=>({}),head:{appendChild(){}},getElementById:()=>null}};vm.createContext(ctx);vm.runInContext(src,ctx);return ctx.window.SocialFactory({})._bank}
const before=socialBank(baseline('assets/v15/social.js')),after=socialBank(read('assets/v15/social.js'),Q);
for(const [key,qs] of Object.entries(before)){assert(after[key]);qs.forEach((q,i)=>assert.equal(JSON.stringify(after[key][i]),JSON.stringify(q),'Existing social question ID/content moved: '+q.id));}
assert.equal(Object.values(after).reduce((n,q)=>n+q.length,0)-Object.values(before).reduce((n,q)=>n+q.length,0),24);
const fakeChoices=(title,a,w,why,visual,key)=>({title,a,w,why,visual,key});let wind=0;
for(const g of [2,3,4,5,6])for(const level of [0,1,2]){let keys=new Set;for(let i=0;i<5;i++){let q=A.windQuestions(level,i,g,A.windScene,fakeChoices,()=>.25);assert(q.title&&q.why&&q.key);assert(!keys.has(q.key),'Repeated wind task within one run');keys.add(q.key);if(q.w)assert(!q.w.includes(q.a));wind++}}
for(let offset=0;offset<8;offset++)for(let level=0;level<3;level++){const plan={force:[3,1,0,2],dirs:[2,0,3,1],offset},keys=new Set;for(let i=0;i<5;i++){let q=A.windQuestions(level,i,3,A.windScene,fakeChoices,()=>.25,plan);assert(!keys.has(q.key));keys.add(q.key);if(q.kind==='wind')assert(q.target>=0&&q.target<=3)}}
for(const source of ['island-v2-source.js','english-premium-v3-source.js'])assert(page.includes(read('assets/'+source).trim()),'Embedded source out of sync: '+source);
const sw=read('sw.js'),cache=vm.runInNewContext(sw.slice(0,sw.indexOf('self.addEventListener'))+';CORE.concat(HABITAT,HABITAT_V2)',{});
for(const asset of cache){if(asset==='./'||/^(https?:)/.test(asset))continue;assert(fs.existsSync(path.join(root,asset.split('?')[0])),'Missing offline asset '+asset)}
const report={syntax:'all changed scripts and page inline scripts parse',data:'account persistence, rewards, growth, curriculum generator and music byte-identical to baseline',questions:{social,magneticAcrossGrades:magnetic,windCasesValidated:wind},compatibility:'all original social question IDs/content preserved; embedded sources match; offline assets exist',math:'four inverse operations validated on both operand sides; unique options and curriculum metadata preserved'};
if(process.env.ADVENTURE23_REPORT)fs.writeFileSync(process.env.ADVENTURE23_REPORT,JSON.stringify(report,null,2));console.log(report);
