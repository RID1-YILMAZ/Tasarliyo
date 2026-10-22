// KARE: 16:9 önizleme (1280x720 sabit tuval), taşıma aracıyla uyumlu ölçek, her tema kartına şeffaflık.
// Yükleme: mobil.js'ten sonra.
(()=>{
const $$=s=>document.querySelector(s),fr=$$('#t-frame'),pv=$$('#t-pv'),W=1280,H=720;
const st=document.createElement('style');
st.textContent='#t-pv{aspect-ratio:16/9;height:auto!important;min-height:0!important}#t-pv.mob{aspect-ratio:auto;height:min(80vh,860px)!important}.t-op{display:flex;align-items:center;gap:8px;margin:6px 0}.t-op input{flex:1}';
document.head.append(st);
// Ölçek tek yerden yazılır: tema.js fit() ne yazarsa yazsın, biz düzeltiriz
const put=(k,v)=>{if(fr.style[k]!==v)fr.style[k]=v};
const apply=()=>{
  const w=pv.clientWidth;if(!w)return;
  if(pv.classList.contains('mob')){
    put('width','390px');put('height',pv.clientHeight+'px');put('transform','scale(1)');
    put('left',Math.max(0,Math.round((w-390)/2))+'px');
  }else{
    put('width',W+'px');put('height',H+'px');put('transform','scale('+(+(w/W).toFixed(5))+')');put('left','0px');
  }
};
new MutationObserver(apply).observe(fr,{attributes:true,attributeFilter:['style']});
new ResizeObserver(apply).observe(pv);
$$('#t-mob').addEventListener('click',()=>setTimeout(apply,0));
apply();
// Her tema kartına "Şeffaflık" (opacity) kaydırıcısı: düzenlenen duruma (Normal/Hover...) yazılır
const {ST,entries,setP}=TMC,list=$$('#t-list');
const addOp=()=>list.querySelectorAll('.t-box').forEach(b=>{
  const body=b.querySelector('.t-bodyx');
  if(!body||!body.children.length)return;
  const q=body.querySelector('.t-quick')||body;
  if(q.querySelector('.t-op'))return;
  const e=entries().find(x=>'tb-'+x.id===b.id);
  if(!e||e.vars)return;
  const t=ST(e.id),m=t.d[t.st]||{},p=parseFloat(m.opacity),v=isNaN(p)?100:Math.round(p*100);
  const o=h('span',{},v+'%'),r=h('input',{type:'range',min:0,max:100,value:v});
  r.oninput=()=>{o.textContent=r.value+'%';setP(e,'opacity',+r.value>=100?'':String(r.value/100))};
  q.append(h('div',{class:'t-op'},h('span',{},'Şeffaflık'),r,o));
});
new MutationObserver(addOp).observe(list,{childList:true,subtree:true});
addOp();
})();
