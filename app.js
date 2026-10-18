const $=s=>document.querySelector(s);
function h(t,p={},...k){const e=document.createElement(t);for(const[a,v]of Object.entries(p))a in e?e[a]=v:e.setAttribute(a,v);e.append(...k);return e}
function report(m){const b=$('#hata');if(b){b.hidden=false;b.textContent='Hata: '+m}}
function on(s,ev,fn){const e=$(s);if(e)e['on'+ev]=fn;else report('Eksik öğe: '+s+' (sayfayı yenile)')}
let uid=0,root,selId;
const nid=()=>'n'+(++uid);
const tag=n=>{n._id=nid();if(n.type===undefined)n.type='';(n.children||[]).forEach(tag);return n};
const parseVal=s=>{try{return JSON.parse(s)}catch{return s}};
function mk(type){const d=def(type),n={type,...structuredClone(d.defaults||{})};if(d.container)n.children=[];return tag(n)}
function find(id,n=root,p=null){if(n._id===id)return{n,p};for(const c of n.children||[]){const r=find(id,c,n);if(r)return r}return null}
function clean(n){const o={};for(const[k,v]of Object.entries(n)){if(k==='_id'||k==='children'||v===''||v==null)continue;o[k]=v}if(n.children&&n.children.length)o.children=n.children.map(clean);return o}
function set(n,k,v){if(v===''||v==null||v!==v)delete n[k];else n[k]=v;out()}
function load(n,pre='',post=''){root=tag(n);selId=root._id;$('#preT').value=pre;$('#postT').value=post;props();out()}
// Mesaj ayrıştırma: kartın önünde/arkasında yazı olabilir
function parseMsg(s){
  const i=s.indexOf('~{'),a=i<0?s.indexOf('{'):i+1;
  if(a<0)throw Error('{ bulunamadı');
  let d=0,q=false,e=false,j=-1;
  for(let k=a;k<s.length;k++){const c=s[k];
    if(q){if(e)e=false;else if(c==='\\')e=true;else if(c==='"')q=false;continue}
    if(c==='"')q=true;else if(c==='{')d++;else if(c==='}'&&--d===0){j=k;break}}
  if(j<0)throw Error('süslü parantez kapanmıyor');
  return{o:JSON.parse(s.slice(a,j+1)),pre:s.slice(0,i<0?a:i).trim(),post:s.slice(j+1).trim()};
}
// Mini markdown önizleme: **kalın** ve [yazı](https://bağlantı)
function md(s){const f=document.createDocumentFragment();
  String(s).split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/).forEach(p=>{let m;
    if(m=p.match(/^\*\*([^*]+)\*\*$/))f.append(h('b',{},md(m[1])));
    else if(m=p.match(/^\[([^\]]+)\]\(([^)]+)\)$/))f.append(/^https?:\/\//.test(m[2])?h('a',{href:m[2],target:'_blank',rel:'noopener'},m[1]):m[1]);
    else if(p)f.append(p)});return f}
const U=n=>String(n.ui||'').split(',').map(x=>x.trim()).filter(Boolean);
function view(n){
  const u=U(n),t=n.type||'';
  const el=t==='input'?h('input',{class:'pv',disabled:true,placeholder:n.placeholder||n.text||''})
    :t==='icon'?h('img',{class:'pv',src:n.src||''}):h('div',{class:'pv'});
  const s=el.style,isDiv=el.tagName==='DIV';
  if(t==='icon'){s.height=u.includes('size-2')?'2.4em':'1.4em';el.onerror=()=>{s.visibility='hidden'}}
  const row=t==='flex-x'||t==='flex-cx'||u.includes('flex-x')||u.includes('flex-cx');
  if(t==='grid'){s.display='grid';s.gridTemplateColumns='repeat(auto-fit,minmax(5.5em,1fr))'}else if(isDiv)s.flexDirection=row?'row':'column';
  if(t==='flex-cx'||u.includes('flex-cx'))s.alignItems='center';
  if(u.includes('flex-center')){s.justifyContent='center';s.alignItems='center';s.textAlign='center'}
  if(u.includes('box'))el.classList.add('bx');
  if(t==='bumote')el.classList.add('bm');
  if(u.includes('muted'))el.classList.add('mu');
  if(t==='space'||u.includes('space'))s.flex='1';
  if(t==='box'&&u.includes('space')){s.padding='.6em .8em';s.borderRadius='.4em'}
  const g=parseFloat(n.gap);if(g)s.gap=g+'em';
  const z=parseFloat(n.size);if(z)s.fontSize=z+'em';
  if(n.background)s.background=n.background;if(n.color)s.color=n.color;
  if(t==='progress'){const m=String(n.progress||'').match(/^\s*([\d.]+)\s*%?\s*;?\s*(.*)$/);
    if(m){const p=Math.min(100,+m[1]),c=m[2]||'#1AF';s.background='linear-gradient(90deg,'+c+' '+p+'%,#1c2230 '+p+'%)'}}
  if(isDiv){s.whiteSpace='pre-line';if(n.text!=null&&n.text!=='')el.append(String(n.text));(n.children||[]).forEach(c=>el.append(view(c)))}
  return el;
}
function renderTree(){
  const t=$('#tree');t.innerHTML='';
  (function w(n,d){t.append(h('button',{class:'ti'+(n._id===selId?' sel':''),style:'padding-left:'+(8+d*16)+'px',onclick:()=>{selId=n._id;renderTree();props()}},h('b',{},def(n.type).label),String(n.text||n.value||n.name||n.progress||'').slice(0,28)));(n.children||[]).forEach(c=>w(c,d+1))})(root,0);
}
function info(ok,m){const i=$('#info');i.className=ok?'ok':'bad';i.textContent=ok?'✓ Geçerli · '+m+' karakter':'✗ '+m}
function msg(){const a=$('#preT').value.trim(),b=$('#postT').value.trim();
  return(a?a+'\n':'')+'~'+JSON.stringify(clean(root),null,$('#min').checked?0:2)+(b?'\n'+b:'')}
function out(keep){
  renderTree();$('#pv').replaceChildren(view(root));
  $('#preV').replaceChildren(md($('#preT').value.trim()));$('#postV').replaceChildren(md($('#postT').value.trim()));
  const t=msg();if(!keep)$('#out').value=t;
  $('#out').classList.remove('bad');info(true,t.length);
  try{localStorage.setItem('tasarliyo',JSON.stringify({v:2,root:clean(root),pre:$('#preT').value,post:$('#postT').value}))}catch{}
}
const row=(l,c)=>h('div',{class:'f'},h('span',{},l),c);
const HEX=/^#[0-9a-f]{6}$/i;
function multi(n,fl,v){
  const cur=()=>String(n[fl.key]||'').split(',').map(x=>x.trim()).filter(Boolean),bs=[];
  const sync=()=>bs.forEach(([o,b])=>b.classList.toggle('on',cur().includes(o.v)));
  const t=h('input',{value:v,placeholder:'örn. flex-y,box',oninput:()=>{set(n,fl.key,t.value);sync()}});
  fl.options.forEach(o=>{const b=h('button',{class:'chip',title:o.l,onclick:()=>{const c=cur();t.value=(c.includes(o.v)?c.filter(x=>x!==o.v):[...c,o.v]).join(',');set(n,fl.key,t.value);sync()}},o.v);bs.push([o,b])});
  sync();return h('div',{},t,h('div',{class:'chips'},...bs.map(x=>x[1])));
}
function prog(n,fl,v){
  const m=String(v).match(/^\s*([\d.]+)\s*%?\s*;?\s*(.*)$/)||[];
  const p=h('input',{type:'number',min:0,max:100,placeholder:'%',value:m[1]??''}),c=h('input',{value:m[2]||'#1AF',placeholder:'#1AF'});
  const up=()=>set(n,fl.key,p.value===''?'':p.value+'%;'+(c.value||'#1AF'));
  p.oninput=up;c.oninput=up;return h('span',{class:'cr'},p,c);
}
function field(n,fl){
  const v=n[fl.key]??'';
  if(fl.kind==='multi')return multi(n,fl,v);
  if(fl.kind==='progress')return prog(n,fl,v);
  if(fl.kind==='number')return h('input',{type:'number',step:fl.step||1,value:v,oninput:e=>set(n,fl.key,e.target.value===''?'':parseFloat(e.target.value))});
  const isC=fl.kind==='color',isA=fl.kind==='area';
  const t=h(isA?'textarea':'input',{value:v,oninput:()=>{set(n,fl.key,t.value);if(cp)cp.value=HEX.test(t.value)?t.value:'#000000'}});
  if(isA)t.rows=2;
  const cp=isC?h('input',{type:'color',value:HEX.test(v)?v:'#000000',oninput:()=>{t.value=cp.value;set(n,fl.key,cp.value)}}):null;
  const ch=h('div',{class:'chips'},...(fl.chips||[]).map(s=>h('button',{class:'chip',title:s,style:isC?'background:'+s:'',onclick:()=>{t.value=isC?s:t.value+s;if(cp)cp.value=HEX.test(s)?s:'#000000';set(n,fl.key,t.value)}},isC?'':s)));
  return h('div',{},isC?h('span',{class:'cr'},cp,t):t,ch);
}
const lbl=t=>REGISTRY[t].label+(t?' ('+t+')':'');
function typeSel(n){
  const s=h('select',{onchange:()=>{let v=s.value;if(v==='__'){v=(prompt('Tür adı (ör. button):')||'').trim();if(!v){props();return}}n.type=v;props();out()}});
  const ts=Object.keys(REGISTRY);if(!ts.includes(n.type))ts.push(n.type);
  ts.forEach(t=>s.append(h('option',{value:t,selected:t===n.type},REGISTRY[t]?lbl(t):t)));
  s.append(h('option',{value:'__'},'Özel tür…'));return s;
}
// Ekstra özellikler: listede olmayan her alan (Topluyo'nun desteklediği başka anahtarlar) burada eklenir
function extras(n,known){
  const box=h('div',{class:'f'},h('span',{},'Ekstra özellikler (ad + değer, sayı/true/false/JSON de olur)'));
  Object.keys(n).filter(k=>!known.has(k)).forEach(k=>{
    box.append(h('div',{class:'kv'},
      h('input',{value:k,disabled:true}),
      h('input',{value:typeof n[k]==='string'?n[k]:JSON.stringify(n[k]),oninput:e=>{n[k]=parseVal(e.target.value);out()}}),
      h('button',{class:'red',onclick:()=>{delete n[k];props();out()}},'✕')));
  });
  const kk=h('input',{placeholder:'özellik adı'}),vv=h('input',{placeholder:'değer'});
  box.append(h('div',{class:'kv'},kk,vv,h('button',{onclick:()=>{const k=kk.value.trim();if(!k||known.has(k))return;n[k]=parseVal(vv.value);props();out()}},'+ Ekle')));
  return box;
}
function props(){
  const b=$('#props');b.innerHTML='';const f=find(selId);if(!f)return;
  const n=f.n,d=def(n.type);
  b.append(row('Tür',typeSel(n)));
  d.fields.forEach(fl=>b.append(row(fl.label,field(n,fl))));
  b.append(extras(n,new Set(['_id','type','children',...d.fields.map(x=>x.key)])));
}
function mv(d){const f=find(selId);if(!f.p)return;const a=f.p.children,i=a.indexOf(f.n),j=i+d;if(j<0||j>=a.length)return;[a[i],a[j]]=[a[j],a[i]];out()}
async function copy(btn,label){
  const t=$('#out');try{await navigator.clipboard.writeText(t.value)}catch{t.select();document.execCommand('copy')}
  btn.textContent='Kopyalandı ✓';setTimeout(()=>btn.textContent=label,1200);
}
// Başlat
document.querySelectorAll('.tab').forEach(b=>b.onclick=()=>{
  document.querySelectorAll('.tab').forEach(x=>x.classList.toggle('on',x===b));
  $('#metin').hidden=b.dataset.t!=='metin';$('#arayuz').hidden=b.dataset.t!=='arayuz'});
TEMPLATES.forEach(t=>$('#sablon').append(h('button',{onclick:()=>load(t.kur(),t.pre||'',t.post||'')},t.ad)));
Object.keys(REGISTRY).forEach(t=>$('#addType').append(h('option',{value:t},lbl(t))));
$('#addType').append(h('option',{value:'__'},'Özel tür…'));
// Ekleme: 'in' = seçilenin içine (alt öğe), 'after' = aynı seviyede hemen altına
function add(n,mode){
  const f=find(selId);
  if(mode==='after'&&f.p){const a=f.p.children;a.splice(a.indexOf(f.n)+1,0,n)}
  else{const p=def(f.n.type).container?f.n:(f.p||root);(p.children=p.children||[]).push(n)}
  selId=n._id;props();out();
}
function addType(mode){let t=$('#addType').value;if(t==='__'){t=(prompt('Tür adı:')||'').trim();if(!t)return}add(mk(t),mode)}
on('#bIn','click',()=>addType('in'));
on('#bAfter','click',()=>addType('after'));
on('#bRow','click',()=>{
  const n=tag(rowOf(['Başlık','#f97316'],['Açıklama',G])),f=find(selId);
  if(f.p){let c=f;while(c.p!==root)c=find(c.p._id);const a=root.children;a.splice(a.indexOf(c.n)+1,0,n)}
  else(root.children=root.children||[]).push(n);
  zebra(root);selId=n._id;props();out();
});
on('#bZebra','click',()=>{zebra(root);props();out()});
on('#bUp','click',()=>mv(-1));on('#bDown','click',()=>mv(1));
on('#bInd','click',()=>{const f=find(selId);if(!f.p)return;const a=f.p.children,i=a.indexOf(f.n);if(i<1||!def(a[i-1].type).container)return;a.splice(i,1);(a[i-1].children=a[i-1].children||[]).push(f.n);props();out()});
on('#bOut','click',()=>{const f=find(selId);if(!f.p||f.p===root)return;const g=find(f.p._id);f.p.children.splice(f.p.children.indexOf(f.n),1);g.p.children.splice(g.p.children.indexOf(g.n)+1,0,f.n);props();out()});
on('#bDup','click',()=>{const f=find(selId);if(!f.p)return;const c=structuredClone(f.n);tag(c);f.p.children.splice(f.p.children.indexOf(f.n)+1,0,c);selId=c._id;props();out()});
on('#bDel','click',()=>{const f=find(selId);if(!f.p)return;f.p.children.splice(f.p.children.indexOf(f.n),1);selId=f.p._id;props();out()});
on('#bCopy','click',e=>copy(e.target,'Kopyala'));
on('#bTest','click',async e=>{await copy(e.target,"Kopyala ve Topluyo'yu aç");window.open('https://topluyo.com','_blank')});
on('#min','change',()=>out());
on('#preT','input',()=>out());on('#postT','input',()=>out());
on('#out','input',()=>{
  try{const r=parseMsg($('#out').value);if(!r.o||typeof r.o!=='object'||Array.isArray(r.o))throw Error('nesne bekleniyor');
    root=tag(r.o);selId=root._id;$('#preT').value=r.pre;$('#postT').value=r.post;props();out(true)}
  catch(e){$('#out').classList.add('bad');info(false,'JSON hatası: '+e.message)}
});
try{const s=JSON.parse(localStorage.getItem('tasarliyo')||'null');
  if(s){if(s.root){root=tag(s.root);$('#preT').value=s.pre||'';$('#postT').value=s.post||''}else root=tag(s)}}catch{}
if(!root)root=tag(TEMPLATES[0].kur());
selId=root._id;props();out();
