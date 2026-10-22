// İKON-UYUM: arkadaşın arayüzündeki ikonlar ve pencereler, JS'in kurduğu öğelerde de aynı olsun.
// Yükleme: en sonda (kare.js'ten sonra).
(()=>{
const $$=s=>document.querySelector(s),all=s=>document.querySelectorAll(s);
const clean=t=>t.replace(/^[^\p{L}\p{N}]+/u,'').trim();
const lb=t=>Object.assign(document.createElement('span'),{className:'lb',textContent:t});
const LB={'Sil':'trash','Varsayılan':'rotate-ccw','Uygula':'check'};
// Tema kartı başlığı: durum işareti, Sil / Varsayılan / Uygula, aç-kapat oku
const head=hd=>{
  const s=hd.querySelector('.t-stat');
  if(s&&!s.querySelector('svg'))s.innerHTML=ikon_svg(s.classList.contains('ok')?'check':'x',14);
  hd.querySelectorAll('button').forEach(b=>{
    if(b.querySelector('svg'))return;
    const t=clean(b.textContent),ic=LB[t];
    if(ic)b.replaceChildren(ikon(ic,15),lb(t));
    else if(b.classList.contains('t-tg')||/^[▾▸▼▶⌄⌃]$/.test(b.textContent.trim()))b.replaceChildren(ikon('chevron-down',16));
  });
};
// Satır sonundaki ✕ ve + düğmeleri
const small=b=>{
  if(b.querySelector('svg'))return;
  const t=b.textContent.trim();
  if(/^[✕×xX✖]$/.test(t))b.replaceChildren(ikon('x',b.classList.contains('x')?14:16));
  else if(/^\+/.test(t)){const r=t.replace(/^\+\s*/,'');b.replaceChildren(ikon('plus',16),...(r?[r]:[]))}
};
// "N uygulandı · N bekliyor" özeti ve geçerlilik satırı
const sum=()=>{
  const s=$$('#t-sum');
  if(s&&!s.querySelector('svg')){
    const m=s.textContent.match(/(\d+)\D+uygulan\S*\D+(\d+)/);
    if(m)s.innerHTML='<span class="g">'+ikon_svg('check',14)+m[1]+' uygulandı</span><span class="r">'+ikon_svg('x',14)+m[2]+' bekliyor</span>';
  }
  const i=$$('#info');
  if(i&&!i.querySelector('svg')&&i.textContent.trim())i.replaceChildren(ikon(i.classList.contains('ok')?'check':'x',16),clean(i.textContent));
};
// Tür menülerinde seçeneklerin ikonları
const opts=s=>{
  if(s.id!=='addType'&&!(s.closest('#props')&&[...s.options].some(o=>o.value==='box')))return;
  [...s.options].forEach(o=>{if(!o.dataset.ikon&&o.value!=='__')o.dataset.ikon=tur_ikonu[o.value]||'box'});
};
const scan=()=>{
  all('.t-head').forEach(head);
  all('.kv button,button.x').forEach(small);
  all('#addType,#props select').forEach(opts);
  sum();
};
let q=0;
new MutationObserver(()=>{if(!q)q=requestAnimationFrame(()=>{q=0;scan()})}).observe(document.body,{childList:true,subtree:true,characterData:true});
scan();
// Önizleme sayfasındaki ikonlar (emoji yerine çizgi ikonlar)
const fr=$$('#t-frame');
const swap=(el,n)=>{if(el&&!el.querySelector('svg')&&el.textContent.trim().length<4&&!el.querySelector('img'))el.innerHTML=ikon_svg(n,20)};
const rep=()=>{
  let d;try{d=fr.contentDocument}catch{return}
  if(!d||!d.body||d.__ik)return;d.__ik=1;
  const hb=d.querySelectorAll('header .ib');
  swap(hb[0],'menu');swap(hb[1],'share');swap(hb[hb.length-1],'users');
  swap(d.querySelector('#button-widget'),'plus');swap(d.querySelector('#button-search'),'search');
  const fb=[...d.querySelectorAll('footer .ib')].filter(x=>x.id!=='button-widget'&&x.id!=='button-search');
  swap(fb[0],'globe');swap(fb[1],'bell');swap(fb[2],'mail');
  const gr=d.querySelectorAll('.groups .group');
  if(gr[0])swap(gr[0],'home');
  gr.forEach(g=>{if(g.textContent.trim()==='+')swap(g,'plus')});
};
fr.addEventListener('load',rep);rep();
// Pencereler: tarayıcı kutuları yerine arkadaşın modal'ı
const {S,ST,save,renderAll,live,refCss}=TMC;
const stop=(id,fn)=>{const b=$$(id);if(b)b.addEventListener('click',e=>{e.stopImmediatePropagation();e.preventDefault();fn()},true)};
stop('#t-add',async()=>{
  const c=await modal_sor({baslik:'Yeni seçici ekle',alanlar:[{ad:'secici',etiket:'CSS seçici',yer:'.my-class, [data-x], #id, button:hover',zorunlu:1},{ad:'ad',etiket:'Etiket adı (isteğe bağlı)',yer:'Boş bırakırsan seçici yazılır'}],onay:'Ekle'});
  if(!c)return;const sel=c.secici.trim();if(!sel)return;
  const id='c'+Date.now();S.custom.push({id,ad:(c.ad||'').trim()||sel,sel,custom:1});ST(id).open=true;save();renderAll();live();
});
stop('#t-reset-all',async()=>{
  if(!(await modal_onayla({baslik:'Temayı sıfırla',mesaj:'Tüm tema (ekli seçiciler dahil) sıfırlansın mı?',onay:'Sıfırla',tehlike:true})))return;
  S.vars={d:{},a:{}};S.tags={};S.custom=[];save();renderAll();refCss();live();
});
stop('#t-cbtn',async()=>{
  const c=await modal_sor({baslik:'Özel buton ekle',alanlar:[{ad:'par',etiket:'Buton nereye konsun? (CSS seçici)',yer:'body > header',zorunlu:1},{ad:'tx',etiket:'Buton yazısı',yer:'✦ Gençliğe Hitabe',zorunlu:1},{ad:'pop',etiket:'Basılınca ekranda çıkacak yazı',yer:'Metin…',zorunlu:1}],onay:'Ekle'});
  if(!c)return;
  const par=c.par.trim(),tx=c.tx.trim(),pop=c.pop.trim(),q=s=>'"'+s.replace(/["\\\n]/g,' ')+'"',id='c'+Date.now();
  const mk=(i,sel,ad,d)=>{const e={id:id+i,ad,sel,custom:1};S.custom.push(e);const t=ST(e.id);t.d['']=d;t.a['']=structuredClone(d)};
  mk(1,par+'::after','Buton: '+tx,{content:q(tx),padding:'6px 14px',margin:'0 8px','background-color':'#DE11BA',color:'#ffffff','border-radius':'20px',cursor:'pointer','font-weight':'700'});
  mk(2,par+'::before','Pencere: '+tx,{content:q(pop),position:'fixed',top:'30%',left:'50%',transform:'translate(-50%, 0px)','z-index':'9999',padding:'24px','max-width':'80vw','background-color':'#181418',color:'#ffffff','border-radius':'14px','box-shadow':'0 0 40px #000000','white-space':'pre-wrap',opacity:'0','pointer-events':'none'});
  mk(3,par+':active::before','Pencere göster (basılıyken)',{opacity:'1'});
  save();renderAll();refCss();live();
});
})();
