// TEMA DÜZENİ: önizlemede seçili öğeyi sürükleyerek taşı, tutamaçlarla boyutlandır
(()=>{
const {S,ST,entries,setP,fr,$t}=TMC,pv=$t('#t-pv'),HS=['nw','n','ne','e','se','s','sw','w'];
let on=false,sel=null,drag=null;
const css=document.createElement('style');
css.textContent=`#t-ov{position:absolute;z-index:5;pointer-events:none;border:2px solid #3b82f6;box-shadow:0 0 0 1px #fff8}
#t-ov .mv{position:absolute;inset:0;pointer-events:auto;cursor:move;touch-action:none;background:#3b82f61f}
#t-ov .hd{position:absolute;width:var(--hs,20px);height:var(--hs,20px);background:#fff;border:2px solid #3b82f6;border-radius:50%;pointer-events:auto;touch-action:none;z-index:2}
#t-ov .nw{left:0;top:0;cursor:nwse-resize}#t-ov .n{left:50%;top:0;margin-left:calc(var(--hs,20px)/-2);cursor:ns-resize}#t-ov .ne{right:0;top:0;cursor:nesw-resize}
#t-ov .e{right:0;top:50%;margin-top:calc(var(--hs,20px)/-2);cursor:ew-resize}#t-ov .se{right:0;bottom:0;cursor:nwse-resize}#t-ov .s{left:50%;bottom:0;margin-left:calc(var(--hs,20px)/-2);cursor:ns-resize}
#t-ov .sw{left:0;bottom:0;cursor:nesw-resize}#t-ov .w{left:0;top:50%;margin-top:calc(var(--hs,20px)/-2);cursor:ew-resize}
#t-ov.sm .n,#t-ov.sm .e,#t-ov.sm .s,#t-ov.sm .w{display:none}
@media(max-width:900px){.t-box{scroll-margin-top:calc(var(--sh,200px) + 8px)!important}}
#t-ov .lb{position:absolute;left:-2px;background:#3b82f6;color:#fff;font:11px/1 system-ui,sans-serif;padding:4px 6px;border-radius:6px;white-space:nowrap;pointer-events:none}`;
document.head.append(css);
const lb=h('div',{class:'lb'}),ov=h('div',{id:'t-ov',hidden:true},h('div',{class:'mv'}),...HS.map(k=>h('div',{class:'hd '+k,'data-h':k})),lb);
pv.append(ov);
const btn=h('button',{id:'t-edit',title:'Önizlemede seçili öğeyi sürükleyip boyutlandır'},'✥ Taşı / boyutlandır'),
  chk=h('input',{type:'checkbox',id:'t-one'}),lab=h('label',{class:'chk',hidden:true},chk,' Sadece bu öğe');
$t('.t-ayar').before(btn);$t('.t-ayar').before(lab);

new ResizeObserver(()=>document.documentElement.style.setProperty('--sh',$t('.t-stage').offsetHeight+'px')).observe($t('.t-stage'));
const sc=()=>{const m=/scale\(([\d.]+)\)/.exec(fr.style.transform);return m?+m[1]:1};
const doc=()=>fr.contentDocument;
function find(el){
  const all=entries().filter(x=>!x.vars);
  for(let n=el;n&&n.nodeType===1;n=n.parentElement){
    const e=all.filter(x=>{try{return n.matches(x.sel)}catch{return false}}).pop();
    if(e)return{e,el:n};
  }
  return null;
}
function uniq(el){
  const p=[];
  for(let n=el;n&&n.nodeType===1&&n.tagName!=='HTML';n=n.parentElement){
    if(n.id){p.unshift('#'+CSS.escape(n.id));break}
    if(n.tagName==='BODY'){p.unshift('body');break}
    p.unshift(n.tagName.toLowerCase()+':nth-child('+([...n.parentElement.children].indexOf(n)+1)+')');
  }
  return p.join(' > ');
}
const parseTr=v=>{const t=/translate\((-?[\d.]+)px,\s*(-?[\d.]+)px\)/.exec(v||''),r=/rotate\((-?[\d.]+)deg\)/.exec(v||''),s=/scale\(([\d.]+)\)/.exec(v||'');
  return{x:t?+t[1]:0,y:t?+t[2]:0,r:r?r[1]:null,s:s?s[1]:null}};
const mkTr=o=>'translate('+Math.round(o.x)+'px, '+Math.round(o.y)+'px)'+(o.r!=null?' rotate('+o.r+'deg)':'')+(o.s!=null?' scale('+o.s+')':'');
const getTr=e=>parseTr((ST(e.id).d[ST(e.id).st]||{}).transform);
// "Sadece bu öğe" açıksa yalnız o öğeye özel bir seçici (tek öğe) oluşturur
function target(){
  if(!chk.checked)return sel.e;
  const s=uniq(sel.el),ex=S.custom.find(c=>c.sel===s);if(ex)return ex;
  const c={id:'c'+Date.now(),ad:sel.e.ad.split(' ')[0]+' · tek öğe',sel:s,custom:1};
  S.custom.push(c);ST(c.id).open=true;TMC.save();TMC.renderAll();return c;
}
function place(){
  if(!on||!sel||!sel.el.isConnected||!pv.clientWidth){ov.hidden=true;return}
  const r=sel.el.getBoundingClientRect(),s=sc(),n=sel.n;
  ov.hidden=false;
  Object.assign(ov.style,{left:r.left*s+'px',top:r.top*s+'px',width:r.width*s+'px',height:r.height*s+'px'});
  lb.textContent=Math.round(r.width)+' × '+Math.round(r.height)+' px'+(n>1&&!chk.checked?' · '+n+' öğe birlikte':'');
  lb.style.top=r.top*s<30?'6px':'-26px';
  const mn=Math.min(r.width,r.height)*s;ov.classList.toggle('sm',mn<70);ov.style.setProperty('--hs',Math.max(12,Math.min(22,mn/3))+'px');
}
(function loop(){place();requestAnimationFrame(loop)})();
function select(h){sel=h;if(h)sel.n=doc().querySelectorAll(h.e.sel).length}
function bind(){
  const d=doc();if(!d||!d.getElementById('tz-theme')||d.__duzen)return;d.__duzen=1;
  d.addEventListener('click',ev=>{const h=find(ev.target);if(h)select(h)},true);
}
if(doc()&&doc().getElementById('tz-theme'))bind();
fr.addEventListener('load',bind);
btn.onclick=()=>{
  on=!on;btn.classList.toggle('on',on);lab.hidden=!on;
  if(on&&!sel){const c=TMC.cur();const el=c&&!c.vars&&doc().querySelector(c.sel);if(el)select({e:c,el})}
};
// ---- sürükle / boyutlandır ----
ov.addEventListener('pointerdown',ev=>{
  const t=ev.target,hd=t.dataset.h||(t.classList.contains('mv')?'m':null);
  if(!hd||!sel)return;ev.preventDefault();ev.stopPropagation();
  const r=sel.el.getBoundingClientRect(),e=target();
  drag={hd,e,x:ev.clientX,y:ev.clientY,w:r.width,h:r.height,tr:getTr(e),s:sc(),moved:false};
  try{t.setPointerCapture(ev.pointerId)}catch{}
});
ov.addEventListener('pointermove',ev=>{
  if(!drag)return;
  const dx=(ev.clientX-drag.x)/drag.s,dy=(ev.clientY-drag.y)/drag.s,k=drag.hd,tr={...drag.tr};
  if(!drag.moved&&Math.abs(dx)+Math.abs(dy)<3)return;drag.moved=true;
  let w=null,h2=null;
  if(k==='m'){tr.x+=dx;tr.y+=dy}
  else{
    if(k.includes('e'))w=Math.max(8,drag.w+dx);
    if(k.includes('w')){w=Math.max(8,drag.w-dx);tr.x=drag.tr.x+(drag.w-w)}
    if(k.includes('s'))h2=Math.max(8,drag.h+dy);
    if(k.includes('n')){h2=Math.max(8,drag.h-dy);tr.y=drag.tr.y+(drag.h-h2)}
  }
  if(k==='m'||k.includes('w')||k.includes('n'))setP(drag.e,'transform',mkTr(tr));
  if(w!=null)setP(drag.e,'width',Math.round(w)+'px');
  if(h2!=null)setP(drag.e,'height',Math.round(h2)+'px');
});
function endDrag(ev){
  if(!drag)return;const d=drag;drag=null;
  if(d.moved){if(ST(d.e.id).open&&TMC.fillBody)TMC.fillBody(d.e);return}
  // sürüklemeden dokunuş: parmağın altındaki öğeyi seç (örn. içteki bir öğe)
  const r=pv.getBoundingClientRect(),s=sc(),el=doc().elementFromPoint((ev.clientX-r.left)/s,(ev.clientY-r.top)/s),h=el&&find(el);
  if(h){select(h);if(TMC.jump)TMC.jump(h.e)}
}
ov.addEventListener('pointerup',endDrag);ov.addEventListener('pointercancel',()=>{drag=null});
// ---- klavye: ok tuşları 1px, Shift+ok 10px ----
document.addEventListener('keydown',ev=>{
  if(!on||!sel||/INPUT|TEXTAREA|SELECT/.test((document.activeElement||{}).tagName||''))return;
  const k={ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,-1],ArrowDown:[0,1]}[ev.key];if(!k)return;
  ev.preventDefault();const st=ev.shiftKey?10:1,e=target(),tr=getTr(e);tr.x+=k[0]*st;tr.y+=k[1]*st;
  setP(e,'transform',mkTr(tr));if(ST(e.id).open&&TMC.fillBody)TMC.fillBody(e);
});
})();
