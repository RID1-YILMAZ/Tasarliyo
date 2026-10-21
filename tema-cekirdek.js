// TEMA ÇEKİRDEĞİ: durum, CSS üretimi, düzenleme (arayüz tema.js'te)
const TMC=(()=>{
const LS='tasarliyo-tema',HEX=/^#([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i,keys=Object.keys;
const S={vars:{d:{},a:{}},tags:{},custom:[],opts:{imp:true,min:false}};
try{const s=JSON.parse(localStorage.getItem(LS)||'null');if(s&&typeof s==='object')Object.assign(S,s)}catch{}
S.vars=S.vars||{d:{},a:{}};S.vars.d=S.vars.d||{};S.vars.a=S.vars.a||{};S.tags=S.tags||{};S.custom=S.custom||[];S.gopen=S.gopen||{};S.view=S.view||'';S.opts=Object.assign({imp:true,min:false},S.opts);
for(const[o,n]of Object.entries({groupicon:'group',msgtext:'dmtext'}))if(S.tags[o]&&!S.tags[n]){S.tags[n]=S.tags[o];delete S.tags[o]}
const save=()=>{try{localStorage.setItem(LS,JSON.stringify(S))}catch{}};
const ST=id=>S.tags[id]||(S.tags[id]={d:{},a:{},st:'',open:false,cascade:false});
// Değişkenler base.css'te body üzerinde tanımlı; :root değil.
const TM_VARSEL='body.theme-dark, body.theme-light';
const entries=()=>[{id:'root',ad:'Tema değişkenleri (body)',sel:TM_VARSEL,vars:1,g:'Tema değişkenleri'},...TM_TAGS,...S.custom];
const any=m=>keys(m||{}).length>0;
const canon=o=>JSON.stringify(Object.keys(o||{}).sort().map(k=>[k,o[k]&&typeof o[k]==='object'?canon(o[k]):o[k]]));
const CASC=new Set(['color','background-color','background-image','background-size','background-position','background-repeat','background-attachment']);
const parseVal=v=>v;

// ---------- CSS üretimi ----------
// Virgülle ayrılmış seçicileri parantez/köşeli parantez/tırnak içindeki virgüllere dokunmadan böler
function split(s){
  const o=[];let d=0,q='',c='';
  for(const ch of s){
    if(q){c+=ch;if(ch===q)q='';continue}
    if(ch==='"'||ch==="'"){q=ch;c+=ch;continue}
    if(ch==='('||ch==='[')d++;if(ch===')'||ch===']')d--;
    if(ch===','&&!d){o.push(c.trim());c='';continue}
    c+=ch;
  }
  if(c.trim())o.push(c.trim());return o;
}
const FORCE=new Set([':hover',':active',':focus',':focus-within']);
let cur=null,forced=[];
function blk(sel,o){
  const mn=S.opts.min,nl=mn?'':'\n',ind=mn?'':'  ',sp=mn?'':' ',imp=S.opts.imp?(mn?'!important':' !important'):'';
  return sel+sp+'{'+nl+keys(o).map(k=>ind+k+':'+sp+o[k]+(k.startsWith('--')?'':imp)+';').join(nl)+nl+'}';
}
function cssOf(w){
  const sp=S.opts.min?'':' ',out=[];
  entries().forEach(e=>{
    if(e.vars){if(any(S.vars[w]))out.push(blk(e.sel,S.vars[w]));return}
    const m=ST(e.id)[w];
    TM_STATES.forEach(([st])=>{if(any(m[st]))out.push(blk(split(e.sel).map(x=>x+st).join(','+sp),m[st]))});
  });
  return out.join(S.opts.min?'':'\n\n');
}
const fr=document.getElementById('t-frame'),$t=s=>document.querySelector(s);
// Seçili durumu (hover/active/focus) önizlemede zorla göster
function force(){
  try{forced.forEach(el=>el.classList.remove('tz-on'));forced=[];
    if(!cur||cur.vars)return;const t=ST(cur.id);if(!t.open||!FORCE.has(t.st))return;
    forced=[...fr.contentDocument.querySelectorAll(cur.sel)];forced.forEach(el=>el.classList.add('tz-on'));
  }catch{}
}
function setCur(e){cur=e;force();live()}
function live(){
  try{const s=fr.contentDocument.getElementById('tz-theme');if(!s)return;let css=cssOf('d');
    if(cur&&!cur.vars){const t=ST(cur.id),m=t.d[t.st];
      if(t.open&&FORCE.has(t.st)&&any(m))css+=(S.opts.min?'':'\n\n')+blk(split(cur.sel).map(x=>x+'.tz-on').join(S.opts.min?',':', '),m)}
    s.textContent=css;
  }catch{}
}
function flash(e){try{fr.contentDocument.querySelectorAll(e.sel).forEach(el=>{el.classList.remove('tz-hl');void el.offsetWidth;el.classList.add('tz-hl');setTimeout(()=>el.classList.remove('tz-hl'),1400)})}catch{}}
const isOk=e=>e.vars?(any(S.vars.a)&&canon(S.vars.d)===canon(S.vars.a)):(any(ST(e.id).a)&&canon(ST(e.id).d)===canon(ST(e.id).a));
function upd(){
  let ok=0,bad=0;
  entries().forEach(e=>{
    const o=isOk(e),pend=e.vars?any(S.vars.d):any(ST(e.id).d);
    if(o)ok++;else if(pend)bad++;
    const b=document.getElementById('tb-'+e.id);if(!b)return;
    const s=b.querySelector('.t-stat');s.classList.toggle('ok',o);s.textContent=o?'✓':'✕';
    b.querySelector('.t-apply').classList.toggle('on',o);
  });
  $t('#t-sum').textContent='✓ '+ok+' uygulandı · ✕ '+bad+' bekliyor';
}
const refCss=()=>{$t('#t-css').value=cssOf('a');};
function marks(e){
  if(e.vars)return;const t=ST(e.id),b=document.getElementById('tb-'+e.id);if(!b)return;
  b.querySelectorAll('[data-s]').forEach(x=>{const has=any(t.d[x.dataset.s]);x.classList.toggle('has',has);
    if(x.tagName==='OPTION')x.textContent=(has?'• ':'')+TM_STATES.find(s=>s[0]===x.dataset.s)[1]});
}
function done(e){save();live();upd();if(e)marks(e)}

// ---------- düzenleme ----------
function setP(e,k,v){
  const del=v==null||v==='';
  if(!cur||cur.id!==e.id){cur=e;force()}
  if(e.vars){if(del)delete S.vars.d[k];else S.vars.d[k]=v;return done(e)}
  const t=ST(e.id),m=t.d[t.st]||(t.d[t.st]={});
  if(del)delete m[k];else m[k]=v;
  if(!any(m))delete t.d[t.st];
  if(t.cascade&&t.st===''&&CASC.has(k)){
    let on=false;
    entries().forEach(x=>{if(x.id===e.id){on=true;return}if(!on||x.vars)return;
      const u=ST(x.id),n=u.d['']||(u.d['']={});if(del)delete n[k];else n[k]=v;if(!any(n))delete u.d['']});
    entries().forEach(x=>{if(x.id!==e.id&&ST(x.id).open)TMC.fillBody(x)});
  }
  done(e);
}
function apply(e){
  if(e.vars)S.vars.a=structuredClone(S.vars.d);else ST(e.id).a=structuredClone(ST(e.id).d);
  refCss();upd();save();
}
function reset(e){
  if(e.vars){S.vars.d={};S.vars.a={}}else{const t=ST(e.id);t.d={};t.a={};t.cascade=false;t.st=''}
  if(ST(e.id).open||e.vars)TMC.fillBody(e);if(cur&&cur.id===e.id)force();refCss();done();
}
function cascadeNow(e){
  const m=ST(e.id).d[''];if(!m)return;
  keys(m).filter(k=>CASC.has(k)).forEach(k=>setP(e,k,m[k]));
}
return {S,save,ST,entries,any,keys,HEX,cssOf,fr,$t,live,flash,upd,refCss,done,setP,apply,reset,cascadeNow,force,setCur,split,cur:()=>cur};
})();
