const $=s=>document.querySelector(s);
function h(t,p={},...k){const e=document.createElement(t);for(const[a,v]of Object.entries(p))a in e?e[a]=v:e.setAttribute(a,v);e.append(...k);return e}
let uid=0,root,selId;
const nid=()=>'n'+(++uid);
const tag=n=>{n._id=nid();(n.children||[]).forEach(tag);return n};
const reid=tag;
function mk(type){const d=def(type),n={type,...structuredClone(d.defaults||{})};if(d.container)n.children=[];return tag(n)}
function find(id,n=root,p=null){if(n._id===id)return{n,p};for(const c of n.children||[]){const r=find(id,c,n);if(r)return r}return null}
function clean(n){const o={};for(const[k,v]of Object.entries(n)){if(k==='_id'||k==='children'||v===''||v==null)continue;o[k]=v}if(n.children&&n.children.length)o.children=n.children.map(clean);return o}
function set(n,k,v){if(v===''||v==null||v!==v)delete n[k];else n[k]=v;out()}
const cell=(t,c)=>({type:'box',text:t,ui:'space',color:c});
const rowOf=(a,b)=>({type:'flex-x',ui:'flex-x',gap:0.3,children:[cell(...a),cell(...b)]});
const zebra=()=>root.children.forEach((r,i)=>r.background=i%2?'#10141c':'#0d1118');
function preset(){
  root=tag({type:'box',ui:'flex-y',gap:0.2,background:'#080a0f',children:[
    rowOf(['✦ Founder','#f97316'],['Genel Yönetim','#4ade80']),
    rowOf(['✦ Co-Founder','#38bdf8'],['Ekip Sorumlusu & Sistem Denetimi','#4ade80']),
    rowOf(['✦ YARDIMCI YETKİLİ','#facc15'],['Chat Moderasyonu & Üye Desteği','#4ade80']),
    rowOf(['✦ STAJYER YETKİLİ','#c084fc'],['Kanal Takibi & Aday Moderatör','#4ade80'])]});
  zebra();tag(root);selId=root._id;
}
function view(n){
  const r=n.type==='flex-x'||n.ui==='flex-x',e=h('div',{class:'pv'}),s=e.style;
  s.flexDirection=r?'row':'column';if(n.gap)s.gap=n.gap+'em';
  if(n.background)s.background=n.background;if(n.color)s.color=n.color;
  if(n.ui==='space'){s.flex='1';s.padding='.6em .8em'}
  if(n.text)e.append(n.text);(n.children||[]).forEach(c=>e.append(view(c)));return e;
}
function renderTree(){
  const t=$('#tree');t.innerHTML='';
  (function w(n,d){t.append(h('button',{class:'ti'+(n._id===selId?' sel':''),style:'padding-left:'+(8+d*16)+'px',onclick:()=>{selId=n._id;renderTree();props()}},h('b',{},n.type),(n.text||n.ui||'').slice(0,28)));(n.children||[]).forEach(c=>w(c,d+1))})(root,0);
}
function out(){
  renderTree();$('#pv').replaceChildren(view(root));
  $('#out').value='~'+JSON.stringify(clean(root),null,$('#min').checked?0:2);
  try{localStorage.setItem('tasarliyo',JSON.stringify(clean(root)))}catch{}
}
const row=(l,c)=>h('label',{class:'f'},h('span',{},l),c);
function field(n,fl){
  const v=n[fl.key]??'';
  if(fl.kind==='select')return h('select',{onchange:e=>set(n,fl.key,e.target.value)},h('option',{value:''},'—'),...fl.options.map(o=>h('option',{value:o,selected:o===v},o)));
  if(fl.kind==='number')return h('input',{type:'number',step:fl.step||1,value:v,oninput:e=>set(n,fl.key,e.target.value===''?'':parseFloat(e.target.value))});
  const t=h('input',{value:v,oninput:()=>{set(n,fl.key,t.value);if(c)c.value=/^#[0-9a-f]{6}$/i.test(t.value)?t.value:'#000000'}});
  if(fl.list)t.setAttribute('list','dl-'+fl.key);
  if(fl.kind!=='color')return t;
  const c=h('input',{type:'color',value:/^#[0-9a-f]{6}$/i.test(v)?v:'#000000',oninput:()=>{t.value=c.value;set(n,fl.key,c.value)}});
  return h('span',{class:'cr'},c,t);
}
function typeSel(n){
  const s=h('select',{onchange:()=>{let v=s.value;if(v==='__')v=(prompt('Tür adı (ör. button):')||'').trim();if(v)n.type=v;props();out()}});
  const ts=Object.keys(REGISTRY);if(!ts.includes(n.type))ts.push(n.type);
  ts.forEach(t=>s.append(h('option',{value:t,selected:t===n.type},t)));
  s.append(h('option',{value:'__'},'Özel tür…'));return s;
}
function props(){
  const b=$('#props');b.innerHTML='';const f=find(selId);if(!f)return;
  const n=f.n,d=def(n.type);
  b.append(row('Tür',typeSel(n)));
  d.fields.forEach(fl=>b.append(row(fl.label,field(n,fl))));
  const known=new Set(['_id','type','children',...d.fields.map(x=>x.key)]),ex={};
  for(const k in n)if(!known.has(k))ex[k]=n[k];
  const ta=h('textarea',{rows:3,placeholder:'{"ozellik":"değer"}',value:Object.keys(ex).length?JSON.stringify(ex):'',oninput:()=>{
    try{const o=JSON.parse(ta.value||'{}');for(const k of Object.keys(n))if(!known.has(k))delete n[k];
      for(const k in o)if(!known.has(k))n[k]=o[k];ta.classList.remove('bad');out()}catch{ta.classList.add('bad')}}});
  b.append(row('Ekstra özellikler (JSON)',ta));
}
function target(){const f=find(selId);return def(f.n.type).container?f.n:(f.p||root)}
function mv(d){const f=find(selId);if(!f.p)return;const a=f.p.children,i=a.indexOf(f.n),j=i+d;if(j<0||j>=a.length)return;[a[i],a[j]]=[a[j],a[i]];out()}
function imp(){
  let s=$('#imp').value.trim();if(s[0]==='~')s=s.slice(1);
  try{const o=JSON.parse(s);if(!o||typeof o!=='object'||Array.isArray(o))throw Error('nesne bekleniyor');
    root=tag(o);selId=root._id;$('#imp').value='';$('#err').textContent='';props();out()}
  catch(e){$('#err').textContent='Okunamadı: '+e.message}
}
async function copy(){
  const t=$('#out');try{await navigator.clipboard.writeText(t.value)}catch{t.select();document.execCommand('copy')}
  const b=$('#bCopy');b.textContent='Kopyalandı ✓';setTimeout(()=>b.textContent='Kopyala',1200);
}
// Başlat
[GENEL,...Object.values(REGISTRY)].forEach(d=>d.fields.forEach(f=>{if(f.list&&!$('#dl-'+f.key))document.body.append(h('datalist',{id:'dl-'+f.key},...f.list.map(v=>h('option',{value:v}))))}));
Object.keys(REGISTRY).forEach(t=>$('#addType').append(h('option',{value:t},REGISTRY[t].label+' ('+t+')')));
$('#addType').append(h('option',{value:'__'},'Özel tür…'));
$('#bAdd').onclick=()=>{let t=$('#addType').value;if(t==='__')t=(prompt('Tür adı:')||'').trim();if(!t)return;const p=target(),n=mk(t);(p.children=p.children||[]).push(n);selId=n._id;props();out()};
$('#bRow').onclick=()=>{const n=tag(rowOf(['Başlık','#f97316'],['Açıklama','#4ade80']));root.children=root.children||[];root.children.push(n);zebra();selId=n._id;props();out()};
$('#bZebra').onclick=()=>{if(root.children){zebra();props();out()}};
$('#bUp').onclick=()=>mv(-1);$('#bDown').onclick=()=>mv(1);
$('#bDup').onclick=()=>{const f=find(selId);if(!f.p)return;const c=structuredClone(f.n);reid(c);f.p.children.splice(f.p.children.indexOf(f.n)+1,0,c);selId=c._id;props();out()};
$('#bDel').onclick=()=>{const f=find(selId);if(!f.p)return;f.p.children.splice(f.p.children.indexOf(f.n),1);selId=f.p._id;props();out()};
$('#bPre').onclick=()=>{preset();props();out()};
$('#bImp').onclick=imp;$('#bCopy').onclick=copy;$('#min').onchange=out;
try{const s=localStorage.getItem('tasarliyo');if(s){root=tag(JSON.parse(s));selId=root._id}}catch{}
if(!root)preset();
props();out();
