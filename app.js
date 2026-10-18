const $=s=>document.querySelector(s);
function h(t,p={},...k){const e=document.createElement(t);for(const[a,v]of Object.entries(p))a in e?e[a]=v:e.setAttribute(a,v);e.append(...k);return e}
let uid=0,root,selId;
const nid=()=>'n'+(++uid);
const tag=n=>{n._id=nid();(n.children||[]).forEach(tag);return n};
function mk(type){const d=def(type),n={type,...structuredClone(d.defaults||{})};if(d.container)n.children=[];return tag(n)}
function find(id,n=root,p=null){if(n._id===id)return{n,p};for(const c of n.children||[]){const r=find(id,c,n);if(r)return r}return null}
function clean(n){const o={};for(const[k,v]of Object.entries(n)){if(k==='_id'||k==='children'||v===''||v==null)continue;o[k]=v}if(n.children&&n.children.length)o.children=n.children.map(clean);return o}
function set(n,k,v){if(v===''||v==null||v!==v)delete n[k];else n[k]=v;out()}
function load(n){root=tag(n);selId=root._id;props();out()}
function view(n){
  const r=n.type==='flex-x'||n.ui==='flex-x',e=h('div',{class:'pv'}),s=e.style;
  s.flexDirection=r?'row':'column';if(n.gap)s.gap=n.gap+'em';
  if(n.background)s.background=n.background;if(n.color)s.color=n.color;
  if(n.ui==='space'){s.flex='1';s.padding='.6em .8em';s.borderRadius='.4em'}
  if(n.text)e.append(n.text);(n.children||[]).forEach(c=>e.append(view(c)));return e;
}
function renderTree(){
  const t=$('#tree');t.innerHTML='';
  (function w(n,d){t.append(h('button',{class:'ti'+(n._id===selId?' sel':''),style:'padding-left:'+(8+d*16)+'px',onclick:()=>{selId=n._id;renderTree();props()}},h('b',{},def(n.type).label),(n.text||'').slice(0,28)));(n.children||[]).forEach(c=>w(c,d+1))})(root,0);
}
function info(ok,m){const i=$('#info');i.className=ok?'ok':'bad';i.textContent=ok?'✓ Geçerli · '+m+' karakter':'✗ '+m}
function out(keep){
  renderTree();$('#pv').replaceChildren(view(root));
  const t='~'+JSON.stringify(clean(root),null,$('#min').checked?0:2);
  if(!keep)$('#out').value=t;$('#out').classList.remove('bad');info(true,t.length);
  try{localStorage.setItem('tasarliyo',JSON.stringify(clean(root)))}catch{}
}
const row=(l,c)=>h('div',{class:'f'},h('span',{},l),c);
const HEX=/^#[0-9a-f]{6}$/i;
function field(n,fl){
  const v=n[fl.key]??'';
  if(fl.kind==='select'){
    const op=[...fl.options];if(v&&!op.some(o=>o.v===v))op.push({v,l:v});
    return h('select',{onchange:e=>{let x=e.target.value;if(x==='__')x=(prompt('Değeri yaz:')||'').trim();set(n,fl.key,x);props()}},
      h('option',{value:''},'— seçilmedi —'),...op.map(o=>h('option',{value:o.v,selected:o.v===v},o.l)),h('option',{value:'__'},'Özel değer…'));
  }
  if(fl.kind==='number')return h('input',{type:'number',step:fl.step||1,value:v,oninput:e=>set(n,fl.key,e.target.value===''?'':parseFloat(e.target.value))});
  const isC=fl.kind==='color';
  const t=h('input',{value:v,oninput:()=>{set(n,fl.key,t.value);if(cp)cp.value=HEX.test(t.value)?t.value:'#000000'}});
  const cp=isC?h('input',{type:'color',value:HEX.test(v)?v:'#000000',oninput:()=>{t.value=cp.value;set(n,fl.key,cp.value)}}):null;
  const ch=h('div',{class:'chips'},...(fl.chips||[]).map(s=>h('button',{class:'chip',title:s,style:isC?'background:'+s:'',onclick:()=>{t.value=isC?s:t.value+s;if(cp)cp.value=s;set(n,fl.key,t.value)}},isC?'':s)));
  return h('div',{},isC?h('span',{class:'cr'},cp,t):t,ch);
}
function typeSel(n){
  const s=h('select',{onchange:()=>{let v=s.value;if(v==='__')v=(prompt('Tür adı (ör. button):')||'').trim();if(v)n.type=v;props();out()}});
  const ts=Object.keys(REGISTRY);if(!ts.includes(n.type))ts.push(n.type);
  ts.forEach(t=>s.append(h('option',{value:t,selected:t===n.type},(REGISTRY[t]?REGISTRY[t].label+' ('+t+')':t))));
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
const target=()=>{const f=find(selId);return def(f.n.type).container?f.n:(f.p||root)};
function mv(d){const f=find(selId);if(!f.p)return;const a=f.p.children,i=a.indexOf(f.n),j=i+d;if(j<0||j>=a.length)return;[a[i],a[j]]=[a[j],a[i]];out()}
async function copy(btn,label){
  const t=$('#out');try{await navigator.clipboard.writeText(t.value)}catch{t.select();document.execCommand('copy')}
  btn.textContent='Kopyalandı ✓';setTimeout(()=>btn.textContent=label,1200);
}
// Başlat
[GENEL,...Object.values(REGISTRY)];
document.querySelectorAll('.tab').forEach(b=>b.onclick=()=>{
  document.querySelectorAll('.tab').forEach(x=>x.classList.toggle('on',x===b));
  $('#metin').hidden=b.dataset.t!=='metin';$('#arayuz').hidden=b.dataset.t!=='arayuz'});
TEMPLATES.forEach(t=>$('#sablon').append(h('button',{onclick:()=>load(t.kur())},t.ad)));
Object.keys(REGISTRY).forEach(t=>$('#addType').append(h('option',{value:t},REGISTRY[t].label+' ('+t+')')));
$('#addType').append(h('option',{value:'__'},'Özel tür…'));
$('#bAdd').onclick=()=>{let t=$('#addType').value;if(t==='__')t=(prompt('Tür adı:')||'').trim();if(!t)return;const p=target(),n=mk(t);(p.children=p.children||[]).push(n);selId=n._id;props();out()};
$('#bRow').onclick=()=>{const n=tag(rowOf(['Başlık','#f97316'],['Açıklama',G]));root.children=root.children||[];root.children.push(n);zebra(root);selId=n._id;props();out()};
$('#bZebra').onclick=()=>{zebra(root);props();out()};
$('#bUp').onclick=()=>mv(-1);$('#bDown').onclick=()=>mv(1);
$('#bDup').onclick=()=>{const f=find(selId);if(!f.p)return;const c=structuredClone(f.n);tag(c);f.p.children.splice(f.p.children.indexOf(f.n)+1,0,c);selId=c._id;props();out()};
$('#bDel').onclick=()=>{const f=find(selId);if(!f.p)return;f.p.children.splice(f.p.children.indexOf(f.n),1);selId=f.p._id;props();out()};
$('#bCopy').onclick=e=>copy(e.target,'Kopyala');
$('#bTest').onclick=async e=>{await copy(e.target,"Kopyala ve Topluyo'yu aç");window.open('https://topluyo.com','_blank')};
$('#min').onchange=()=>out();
$('#out').oninput=()=>{
  let s=$('#out').value.trim();if(s[0]==='~')s=s.slice(1);
  try{const o=JSON.parse(s);if(!o||typeof o!=='object'||Array.isArray(o))throw Error('nesne bekleniyor');
    root=tag(o);selId=root._id;props();out(true)}
  catch(e){$('#out').classList.add('bad');info(false,'JSON hatası: '+e.message)}
};
try{const s=localStorage.getItem('tasarliyo');if(s)root=tag(JSON.parse(s))}catch{}
if(!root)root=tag(TEMPLATES[0].kur());
selId=root._id;props();out();
