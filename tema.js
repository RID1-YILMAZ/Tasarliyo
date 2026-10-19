// TEMA ARAYÜZÜ: etiket kutuları, önizleme, düğmeler
(()=>{
const {S,save,ST,entries,any,keys,HEX,cssOf,fr,$t,live,flash,upd,refCss,done,setP,apply,reset,cascadeNow}=TMC;
function prow(e,p){
  const t=ST(e.id),get=()=>(t.d[t.st]||{})[p.k];
  const w=h('div',{class:'t-f'}),lab=h('label',{class:get()!==undefined?'on':''},p.l+' ',
    h('button',{class:'x',title:'temizle',onclick:()=>{setP(e,p.k,null);w.replaceWith(prow(e,p))}},'✕'));
  w.append(lab,TM_CTL[p.t](p,get(),v=>{setP(e,p.k,v);lab.classList.toggle('on',get()!==undefined)}));
  return w;
}
function extras(e){
  const t=ST(e.id),known=new Set(TM_PROPS.flatMap(g=>g.p.map(p=>p.k))),m=t.d[t.st]||{};
  const box=h('div',{class:'t-f'},h('label',{},'Ekstra CSS satırları (herhangi bir özellik + değer)'));
  keys(m).filter(k=>!known.has(k)).forEach(k=>box.append(h('div',{class:'kv'},h('input',{value:k,disabled:true}),
    h('input',{value:m[k],oninput:ev=>setP(e,k,ev.target.value)}),h('button',{class:'red',onclick:()=>{setP(e,k,null);fillBody(e)}},'✕'))));
  const kk=h('input',{placeholder:'özellik (ör. caret-color)'}),vv=h('input',{placeholder:'değer'});
  box.append(h('div',{class:'kv'},kk,vv,h('button',{onclick:()=>{const k=kk.value.trim();if(!k||!vv.value.trim())return;setP(e,k,vv.value.trim());fillBody(e)}},'+')));
  return box;
}
function varsUI(e){
  const m=S.vars.d,out=[h('p',{class:'hint'},'Topluyo ön yüzü bu değişkenleri kullanıyorsa tüm temayı tek yerden değiştirir (önizleme taklidi kullanıyor). Boş bırakılanlar çıktıya girmez.')];
  TM_VARS.forEach(([k,l,d])=>{
    const t=h('input',{value:m[k]||'',placeholder:d}),c=h('input',{type:'color',value:HEX.test(m[k]||'')?m[k]:(HEX.test(d)?d:'#000000')});
    t.oninput=()=>{setP(e,k,t.value);if(HEX.test(t.value))c.value=t.value};c.oninput=()=>{t.value=c.value;setP(e,k,c.value)};
    out.push(h('div',{class:'t-f'},h('label',{class:m[k]?'on':''},l+' ('+k+')'),h('div',{class:'t-cr'},c,t)));
  });
  const known=new Set(TM_VARS.map(x=>x[0]));
  keys(m).filter(k=>!known.has(k)).forEach(k=>out.push(h('div',{class:'kv'},h('input',{value:k,disabled:true}),
    h('input',{value:m[k],oninput:ev=>setP(e,k,ev.target.value)}),h('button',{class:'red',onclick:()=>{setP(e,k,null);fillBody(e)}},'✕'))));
  const kk=h('input',{placeholder:'--değişken'}),vv=h('input',{placeholder:'değer'});
  out.push(h('div',{class:'kv'},kk,vv,h('button',{onclick:()=>{const k=kk.value.trim();if(!/^--/.test(k)||!vv.value.trim())return;setP(e,k,vv.value.trim());fillBody(e)}},'+')));
  return out;
}
function fillBody(e,body){
  body=body||document.querySelector('#tb-'+e.id+' .t-bodyx');if(!body)return;
  body.innerHTML='';
  if(e.vars){body.append(...varsUI(e));return}
  const t=ST(e.id);
  const sel=h('select',{onchange:()=>{t.st=sel.value;save();fillBody(e)}},...TM_STATES.map(([s,l])=>h('option',{value:s,selected:s===t.st},(any(t.d[s])?'• ':'')+l)));
  body.append(h('div',{class:'t-bar'},sel),
    h('label',{class:'chk'},h('input',{type:'checkbox',checked:t.cascade,onchange:ev=>{t.cascade=ev.target.checked;if(t.cascade)cascadeNow(e);save()}}),' Renk/arka planı aşağıdaki etiketlere de uygula'));
  const m=t.d[t.st]||{};
  TM_PROPS.forEach(g=>{
    const n=g.p.filter(p=>m[p.k]!==undefined).length,d=h('details',{class:'t-g'},h('summary',{},g.g+(n?'  •'+n:'')));
    const fill=()=>{if(!d.dataset.f){d.dataset.f=1;g.p.forEach(p=>d.append(prow(e,p)))}};
    d.addEventListener('toggle',()=>{if(d.open)fill()});
    if(g.open||n){d.open=true;fill()}
    body.append(d);
  });
  body.append(extras(e));
}
function mkBox(e){
  const t=ST(e.id);
  const body=h('div',{class:'t-bodyx'}),
    head=h('div',{class:'t-head'},h('span',{class:'t-stat'},'✕'),
      h('span',{class:'t-name',onclick:()=>toggle(e)},h('b',{},e.ad),h('small',{},e.sel)),
      ...(e.custom?[h('button',{class:'red',onclick:()=>delCustom(e)},'Sil')]:[]),
      h('button',{onclick:()=>reset(e)},'Varsayılan'),h('button',{class:'t-apply',onclick:()=>apply(e)},'Uygula'),
      h('button',{class:'t-tg',onclick:()=>toggle(e)},t.open?'▲':'▼'));
  const el=h('div',{class:'t-box'+(t.open?'':' shut'),id:'tb-'+e.id,onmouseenter:()=>flash(e)},head,body);
  if(t.open)fillBody(e,body);
  return el;
}
function toggle(e){
  const t=ST(e.id),el=document.getElementById('tb-'+e.id);t.open=!t.open;
  el.classList.toggle('shut',!t.open);el.querySelector('.t-tg').textContent=t.open?'▲':'▼';
  if(t.open)fillBody(e);else el.querySelector('.t-bodyx').innerHTML='';
  save();flash(e);
}
function renderAll(){
  $t('#t-list').replaceChildren(...entries().map(mkBox));
  $t('#t-pop').replaceChildren(...entries().map(e=>h('button',{onclick:()=>{
    if(!ST(e.id).open)toggle(e);document.getElementById('tb-'+e.id).scrollIntoView({block:'start'});$t('#t-pop').classList.remove('open')}},e.sel)));
  upd();
}
function addCustom(){
  const sel=(prompt('CSS seçici (ör. .my-class, [data-x], #id, button:hover):')||'').trim();if(!sel)return;
  const ad=(prompt('Bu etiket için ad:',sel)||sel).trim(),id='c'+Date.now();
  S.custom.push({id,ad,sel,custom:1});ST(id).open=true;save();renderAll();live();
}
function delCustom(e){S.custom=S.custom.filter(x=>x.id!==e.id);delete S.tags[e.id];save();renderAll();refCss();live()}
function resetAll(){
  if(!confirm('Tüm tema (ekli seçiciler dahil) sıfırlansın mı?'))return;
  S.vars={d:{},a:{}};S.tags={};S.custom=[];save();renderAll();refCss();live();
}

// ---------- önizleme ----------
const pv=$t('#t-pv');
function fit(){const w=pv.clientWidth,hh=pv.clientHeight;if(!w)return;const W=w>=1000?w:1000,s=w/W;fr.style.width=W+'px';fr.style.height=(hh/s)+'px';fr.style.transform='scale('+s+')'}
new ResizeObserver(fit).observe(pv);
fr.addEventListener('load',()=>{live();fit()});
fr.srcdoc=TM_REPLICA;
function showPane(css){
  $t('#t-pv').hidden=css;$t('#t-css').hidden=!css;
  $t('#t-b-css').classList.toggle('on',css);$t('#t-b-pv').classList.toggle('on',!css);
  if(css)refCss();else fit();
}
function wall(cb){
  const m=$t('#t-wall'),g=$t('#t-wall-grid');m.hidden=false;
  g.replaceChildren(...TM_WALL.map(u=>h('button',{onclick:()=>{m.hidden=true;cb(u)}},h('img',{src:u,alt:'',loading:'lazy'}))));
}
async function copyCss(){
  const css=cssOf('a'),b=$t('#t-copy');
  if(!css){b.textContent='Önce Uygula';setTimeout(()=>b.textContent='Kopyala',1400);return}
  try{await navigator.clipboard.writeText(css)}catch{const t=h('textarea',{value:css});document.body.append(t);t.select();document.execCommand('copy');t.remove()}
  b.textContent='Kopyalandı ✓';setTimeout(()=>b.textContent='Kopyala',1400);
}
// ---------- bağlantılar ----------
document.querySelectorAll('.tab').forEach(b=>b.addEventListener('click',()=>{$t('#tema').hidden=b.dataset.t!=='tema';if(b.dataset.t==='tema')setTimeout(fit,0)}));
$t('#t-copy').onclick=copyCss;
$t('#t-b-css').onclick=()=>showPane(true);$t('#t-b-pv').onclick=()=>showPane(false);
$t('#t-class').onclick=ev=>{ev.stopPropagation();$t('#t-pop').classList.toggle('open')};
document.addEventListener('click',ev=>{if(!ev.target.closest('.t-popwrap'))$t('#t-pop').classList.remove('open')});
$t('#t-all').onclick=()=>{entries().forEach(apply);refCss()};
$t('#t-add').onclick=addCustom;$t('#t-reset-all').onclick=resetAll;$t('#t-wall-x').onclick=()=>{$t('#t-wall').hidden=true};
$t('#t-imp').checked=S.opts.imp;$t('#t-min').checked=S.opts.min;
$t('#t-imp').onchange=ev=>{S.opts.imp=ev.target.checked;save();live();refCss()};
$t('#t-min').onchange=ev=>{S.opts.min=ev.target.checked;save();live();refCss()};
renderAll();refCss();
window.TM_wall=wall;TMC.fillBody=fillBody;
})();
