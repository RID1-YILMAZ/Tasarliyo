// MOBİL: gerçek mobil önizleme (sol/sağ panel gizli, tuşla açılır), Büyüt tuşu, daha büyük çerçeve.
// Yükleme: tema.js ve tema-duzen.js'ten sonra.
(()=>{
const $$=s=>document.querySelector(s),fr=$$('#t-frame'),pv=$$('#t-pv');
// İkonlar (arkadaşın ui.js'indeki sisteme eklenir; yoksa metin kalır)
const ik=typeof ikon==='function'&&typeof ikonlar==='object';
if(ik)Object.assign(ikonlar,{
  smartphone:'<rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/>',
  maximize:'<path d="M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M16 21h3a2 2 0 0 0 2-2v-3"/>',
  undo:'<path d="M3 7v6h6"/><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"/>',
  redo:'<path d="M21 7v6h-6"/><path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3L21 13"/>'
});
const put=(b,n,t)=>{if(b&&ik)b.replaceChildren(ikon(n,16),t)};
put($$('#t-mob'),'smartphone','Mobil');put($$('#t-cbtn'),'plus','Özel buton');
put($$('#bUndo'),'undo','Geri al');put($$('#bRedo'),'redo','Yinele');
// Daha büyük çerçeve: 750-999 px arası sahnede %75 ölçek (eskiden yaklaşık %53)
const st=document.createElement('style');
st.textContent='#t-pv{container-type:inline-size}@container (min-width:520px) and (max-width:999px){#t-frame{width:calc(100%/.75)!important;height:calc(100%/.75)!important;transform:scale(.75)!important}}#tema.wide .t-editor{display:none}#tema.wide .t-wrap{grid-template-columns:1fr!important}';
document.head.append(st);
// Büyüt: editörü gizleyip önizlemeyi tam genişlik yapar
const bb=h('button',{id:'t-big'},'Büyüt');put(bb,'maximize','Büyüt');
const ay=$$('.t-ayar');ay?ay.before(bb):$$('.t-tools').append(bb);
bb.onclick=()=>{bb.classList.toggle('on',$$('#tema').classList.toggle('wide'))};
// Önizleme sayfasına (iframe) eklenen CSS
const MC='@media(max-width:760px){body:not(.tz-m) .main{grid-template-columns:48px 170px minmax(190px,1fr) 170px}}'
+'body.tz-m .main{grid-template-columns:1fr}'
+'body.tz-m .groups,body.tz-m .left-menu,body.tz-m .right-menu{display:none;position:fixed;top:48px;bottom:48px;z-index:9;background:var(--back-opacity,var(--back,#181418));box-shadow:0 0 24px #000a}'
+'body.tz-m .groups{left:0;width:56px}body.tz-m .left-menu{left:56px;width:min(230px,calc(100% - 56px))}body.tz-m .right-menu{right:0;width:min(230px,72%)}'
+'body.tz-m.tz-l .groups{display:flex}body.tz-m.tz-l .left-menu,body.tz-m.tz-r .right-menu{display:block}'
+'body.tz-m.tz-l .content,body.tz-m.tz-r .content{opacity:.45}'
+'body.tz-m header .join{display:none}body.tz-m .content{padding:8px 12px 12px}';
const doc=()=>{try{return fr.contentDocument}catch{return null}};
const sync=()=>{
  const d=doc();if(!d||!d.body)return;
  if(!d.getElementById('tz-mob')){const s=d.createElement('style');s.id='tz-mob';s.textContent=MC;d.head.append(s)}
  const on=pv.classList.contains('mob');
  d.body.classList.toggle('tz-m',on);
  if(!on)d.body.classList.remove('tz-l','tz-r');
  if(!d.__mob){d.__mob=1;d.addEventListener('click',e=>{
    const b=d.body;if(!b.classList.contains('tz-m'))return;
    const ibs=d.querySelectorAll('header .ib'),i=e.target.closest&&e.target.closest('.ib');
    if(i&&i===ibs[0]){b.classList.toggle('tz-l');b.classList.remove('tz-r')}
    else if(i&&i===ibs[ibs.length-1]){b.classList.toggle('tz-r');b.classList.remove('tz-l')}
    else if(e.target.closest&&e.target.closest('.content'))b.classList.remove('tz-l','tz-r');
  })}
};
fr.addEventListener('load',sync);
$$('#t-mob').addEventListener('click',()=>setTimeout(sync,0));
sync();
})();
