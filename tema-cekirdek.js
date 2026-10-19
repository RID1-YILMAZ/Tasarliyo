// TEMA ÇEKİRDEĞİ: durum, CSS üretimi, düzenleme (arayüz tema.js'te)
const TMC=(()=>{
const LS='tasarliyo-tema',HEX=/^#[0-9a-f]{6}$/i,keys=Object.keys;
const S={vars:{d:{},a:{}},tags:{},custom:[],opts:{imp:true,min:false}};
try{const s=JSON.parse(localStorage.getItem(LS)||'null');if(s&&typeof s==='object')Object.assign(S,s)}catch{}
S.vars=S.vars||{d:{},a:{}};S.vars.d=S.vars.d||{};S.vars.a=S.vars.a||{};S.tags=S.tags||{};S.custom=S.custom||[];S.opts=Object.assign({imp:true,min:false},S.opts);
const save=()=>{try{localStorage.setItem(LS,JSON.stringify(S))}catch{}};
const ST=id=>S.tags[id]||(S.tags[id]={d:{},a:{},st:'',open:false,cascade:false});
const entries=()=>[{id:'root',ad:':root (renk değişkenleri)',sel:':root',vars:1},...TM_TAGS,...S.custom];
const any=m=>keys(m||{}).length>0;
const canon=o=>JSON.stringify(Object.keys(o||{}).sort().map(k=>[k,o[k]&&typeof o[k]==='object'?canon(o[k]):o[k]]));
const CASC=new Set(['color','background-color','background-image','background-size','background-position','background-repeat','background-attachment']);

// ---------- CSS üretimi ----------
function cssOf(w){
  const mn=S.opts.min,nl=mn?'':'\n',ind=mn?'':'  ',sp=mn?'':' ',imp=S.opts.imp?(mn?'!important':' !important'):'';
  const blk=(sel,o)=>sel+sp+'{'+nl+keys(o).map(k=>ind+k+':'+sp+o[k]+(k.startsWith('--')?'':imp)+';').join(nl)+nl+'}';
  const out=[];
  entries().forEach(e=>{
    if(e.vars){if(any(S.vars[w]))out.push(blk(':root',S.vars[w]));return}
    const m=ST(e.id)[w];
    TM_STATES.forEach(([st])=>{if(any(m[st]))out.push(blk(e.sel.split(',').map(x=>x.trim()+st).join(','+sp),m[st]))});
  });
  return out.join(nl+nl);
}
const fr=document.getElementById('t-frame'),$t=s=>document.querySelector(s);
function live(){try{const s=fr.contentDocument.getElementById('tz-theme');if(s)s.textContent=cssOf('d')}catch{}}
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
  if(e.vars)return;const t=ST(e.id),sel=document.querySelector('#tb-'+e.id+' .t-bar select');if(!sel)return;
  [...sel.options].forEach((o,i)=>{o.textContent=(any(t.d[TM_STATES[i][0]])?'• ':'')+TM_STATES[i][1]});
}
function done(e){save();live();upd();if(e)marks(e)}

// ---------- düzenleme ----------
function setP(e,k,v){
  const del=v==null||v==='';
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
  if(ST(e.id).open||e.vars)TMC.fillBody(e);refCss();done();
}
function cascadeNow(e){
  const m=ST(e.id).d[''];if(!m)return;
  keys(m).filter(k=>CASC.has(k)).forEach(k=>setP(e,k,m[k]));
}
return {S,save,ST,entries,any,keys,HEX,cssOf,fr,$t,live,flash,upd,refCss,done,setP,apply,reset,cascadeNow};
})();
