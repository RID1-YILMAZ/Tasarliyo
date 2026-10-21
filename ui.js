// UI YARDIMCILARI: ikonlar (satır içi SVG), özel açılır menü, buton geri bildirimi.
// Yeni ikon eklemek = ikonlar listesine bir satır. HTML'de <i data-ikon="ikon-adı"></i> yazmak yeterli.
const ikonlar={
  'chevron-down':'<path d="m6 9 6 6 6-6"/>',
  'chevron-up':'<path d="m18 15-6-6-6 6"/>',
  check:'<path d="M20 6 9 17l-5-5"/>',
  'check-check':'<path d="M18 6 7 17l-5-5"/><path d="m22 10-7.5 7.5L13 16"/>',
  x:'<path d="M18 6 6 18M6 6l12 12"/>',
  plus:'<path d="M5 12h14M12 5v14"/>',
  'arrow-up':'<path d="m5 12 7-7 7 7M12 19V5"/>',
  'arrow-down':'<path d="M12 5v14m7-7-7 7-7-7"/>',
  'arrow-left':'<path d="m12 19-7-7 7-7M19 12H5"/>',
  'arrow-right':'<path d="M5 12h14m-7-7 7 7-7 7"/>',
  copy:'<rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>',
  trash:'<path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2M10 11v6M14 11v6"/>',
  'rotate-ccw':'<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>',
  'external-link':'<path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
  layers:'<path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/>',
  rows:'<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 12h18"/>',
  columns:'<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M12 3v18"/>',
  square:'<rect width="18" height="18" x="3" y="3" rx="2"/>',
  'layout-grid':'<rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/>',
  type:'<path d="M4 7V4h16v3M9 20h6M12 4v16"/>',
  palette:'<circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>',
  'pen-tool':'<path d="m12 19 7-7 3 3-7 7-3-3z"/><path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="m2 2 7.586 7.586"/><circle cx="11" cy="11" r="2"/>',
  pointer:'<path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/><path d="m13 13 6 6"/>',
  'text-cursor':'<path d="M17 22h-1a4 4 0 0 1-4-4V6a4 4 0 0 1 4-4h1M7 22h1a4 4 0 0 0 4-4v-1M7 2h1a4 4 0 0 1 4 4v1"/>',
  image:'<rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21"/>',
  progress:'<rect width="18" height="6" x="3" y="9" rx="1"/><path d="M7 9v6M11 9v6"/>',
  box:'<path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5M12 22V12"/>',
  code:'<path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/>',
  eye:'<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
  alert:'<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4M12 17h.01"/>',
  menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',
  share:'<path d="m15 14 5-5-5-5"/><path d="M4 20v-7a4 4 0 0 1 4-4h12"/>',
  users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
  globe:'<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20M2 12h20"/>',
  search:'<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  bell:'<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
  mail:'<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
  home:'<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',
  'at-sign':'<circle cx="12" cy="12" r="4"/><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8"/>'
};
// Kart öğesi türü -> ikon (tür seçim menüsünde görünür)
const tur_ikonu={box:'square','flex-x':'columns','flex-y':'rows','flex-cx':'columns',grid:'layout-grid',space:'type',bumote:'pointer',input:'text-cursor',icon:'image',progress:'progress','':'type'};

function ikon_svg(ad,boyut){boyut=boyut||18;return '<svg xmlns="http://www.w3.org/2000/svg" width="'+boyut+'" height="'+boyut+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="display:block;flex:none">'+(ikonlar[ad]||ikonlar.square)+'</svg>'}
function ikon(ad,boyut){const oge=document.createElement('i');oge.className='ic';oge.innerHTML=ikon_svg(ad,boyut);return oge}
function ikonlari_uygula(kok){(kok||document).querySelectorAll('i[data-ikon]').forEach(oge=>{oge.className='ic';oge.innerHTML=ikon_svg(oge.dataset.ikon,+oge.dataset.boyut||18);oge.removeAttribute('data-ikon')})}
// Butonun içeriğini kısa süre değiştir (ör. "Kopyalandı"), sonra eski haline getir
function buton_mesaji(dugme,yazi,ikon_adi,sure){
  if(dugme._eski===undefined)dugme._eski=[...dugme.childNodes];
  clearTimeout(dugme._zaman);
  dugme.replaceChildren(...(ikon_adi?[ikon(ikon_adi,16)]:[]),yazi);
  dugme._zaman=setTimeout(()=>{dugme.replaceChildren(...dugme._eski);dugme._eski=undefined},sure||1400);
}

// ---- Açılma / kapanma animasyonları (Web Animations) ----
const hareket_azalt=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
// Bir öğe görünür olduktan SONRA çağır: yükseklik 0'dan tam boya açılır
function acilma_animasyonu(oge){
  if(hareket_azalt())return;
  const yukseklik=oge.scrollHeight,ust=getComputedStyle(oge).marginTop;
  oge.style.overflow='hidden';
  const a=oge.animate([{height:'0px',marginTop:'0px',opacity:0},{height:yukseklik+'px',marginTop:ust,opacity:1}],{duration:220,easing:'ease-out'});
  a.onfinish=a.oncancel=()=>{oge.style.overflow=''};
}
// Yükseklik tam boydan 0'a iner, bitince bitince() çalışır
function kapanma_animasyonu(oge,bitince){
  if(hareket_azalt()){bitince&&bitince();return}
  const yukseklik=oge.offsetHeight,ust=getComputedStyle(oge).marginTop;
  oge.style.overflow='hidden';
  const a=oge.animate([{height:yukseklik+'px',marginTop:ust,opacity:1},{height:'0px',marginTop:'0px',opacity:0}],{duration:180,easing:'ease-in',fill:'forwards'});
  a.onfinish=()=>{oge.style.overflow='';if(bitince)bitince();a.cancel()};
}
// Açılır liste / modal çıkışı: tur = 'pop' | 'sheet' | 'fade'
function cikis_animasyonu(oge,tur,bitince){
  if(hareket_azalt()){bitince();return}
  const son=tur==='sheet'?{transform:'translateY(100%)'}:tur==='fade'?{opacity:0}:{opacity:0,transform:'translateY(-6px) scale(.98)'};
  const a=oge.animate([{opacity:1,transform:'none'},son],{duration:tur==='sheet'?180:120,easing:'ease-in',fill:'forwards'});
  a.onfinish=bitince;
}
// Tüm pencereyi yumuşakça gizle
function gizle_animasyonlu(oge){
  if(oge.hidden)return;
  if(hareket_azalt()){oge.hidden=true;return}
  const a=oge.animate([{opacity:1},{opacity:0}],{duration:140,easing:'ease-in',fill:'forwards'});
  a.onfinish=()=>{oge.hidden=true;a.cancel()};
}
// details.t-g: açılırken ve kapanırken yükseklik animasyonu
document.addEventListener('click',e=>{
  const ozet=e.target.closest&&e.target.closest('details.t-g>summary');
  if(!ozet)return;
  const d=ozet.parentElement;
  if(hareket_azalt())return;
  e.preventDefault();
  if(d._mesgul)return;
  const kenar=d.offsetHeight-d.clientHeight;
  if(d.open){
    const tam=d.offsetHeight,kapali=ozet.offsetHeight-(parseFloat(getComputedStyle(ozet).borderBottomWidth)||0)+kenar;
    d._mesgul=true;d.style.overflow='hidden';
    const a=d.animate([{height:tam+'px'},{height:kapali+'px'}],{duration:180,easing:'ease-in',fill:'forwards'});
    a.onfinish=()=>{d.open=false;d.style.overflow='';a.cancel();d._mesgul=false};
  }else{
    const kapali=ozet.offsetHeight+kenar;
    d._mesgul=true;d.style.overflow='hidden';d.style.height=kapali+'px';
    d.addEventListener('toggle',()=>{
      const tam=d.scrollHeight+kenar;d.style.height='';
      const a=d.animate([{height:kapali+'px'},{height:tam+'px'}],{duration:220,easing:'ease-out'});
      a.onfinish=a.oncancel=()=>{d.style.overflow='';d._mesgul=false};
    },{once:true});
    d.open=true;
  }
});

// ---- Özel açılır menü: sayfadaki her <select> otomatik buna dönüşür ----
// <option data-ikon="ikon"> yazılırsa seçeneğin başında ikon görünür.
const acilir_menu=(()=>{
  let acik=null;
  function kapat(odakla){
    if(!acik)return;const a=acik;acik=null;
    a.dugme.setAttribute('aria-expanded','false');a.temizle();
    a.liste.style.pointerEvents='none';
    cikis_animasyonu(a.liste,a.liste.classList.contains('sheet')?'sheet':'pop',()=>a.liste.remove());
    if(a.arka){a.arka.style.pointerEvents='none';cikis_animasyonu(a.arka,'fade',()=>a.arka.remove())}
    if(odakla)a.dugme.focus({preventScroll:true});
  }
  function etiketi_guncelle(secim,dugme){
    const oge=secim.options[secim.selectedIndex],ikon_adi=oge&&oge.dataset.ikon,bas_ikon=dugme.querySelector('.dd-i');
    dugme.querySelector('.dd-l').textContent=oge?oge.textContent:'';
    bas_ikon.innerHTML=ikon_adi?ikon_svg(ikon_adi,16):'';bas_ikon.hidden=!ikon_adi;
    dugme.disabled=secim.disabled;
  }
  function ac(secim,dugme){
    kapat();
    const liste=document.createElement('div');liste.className='dd-pop';liste.setAttribute('role','listbox');
    [...secim.options].forEach(oge=>{
      const satir=document.createElement('button');satir.type='button';satir.className='dd-opt'+(oge.selected?' on':'');
      satir.setAttribute('role','option');satir.setAttribute('aria-selected',oge.selected?'true':'false');
      const bas_ikon=document.createElement('i');bas_ikon.className='ic dd-i';bas_ikon.innerHTML=oge.dataset.ikon?ikon_svg(oge.dataset.ikon,16):'';bas_ikon.hidden=!oge.dataset.ikon;
      const metin=document.createElement('span');metin.className='dd-l';metin.textContent=oge.textContent;
      const tik=document.createElement('i');tik.className='ic dd-ck';tik.innerHTML=oge.selected?ikon_svg('check',16):'';
      satir.append(bas_ikon,metin,tik);
      satir.onclick=()=>{secim.selectedIndex=oge.index;secim.dispatchEvent(new Event('change',{bubbles:true}));kapat(true)};
      liste.append(satir);
    });
    const telefon=innerWidth<760;let arka=null;
    if(telefon){arka=document.createElement('div');arka.className='dd-bd';arka.onclick=()=>kapat(true);document.body.append(arka);liste.classList.add('sheet')}
    document.body.append(liste);
    if(!telefon){
      const kutu=dugme.getBoundingClientRect(),alt_bosluk=innerHeight-kutu.bottom-10,ust_bosluk=kutu.top-10,istenen=Math.min(liste.scrollHeight,320);
      const yukari=alt_bosluk<istenen&&ust_bosluk>alt_bosluk;
      liste.style.minWidth=Math.max(kutu.width,160)+'px';
      liste.style.maxHeight=Math.max(120,Math.min(320,yukari?ust_bosluk:alt_bosluk))+'px';
      liste.style.left=Math.max(8,Math.min(kutu.left,innerWidth-liste.offsetWidth-8))+'px';
      if(yukari)liste.style.bottom=(innerHeight-kutu.top+4)+'px';else liste.style.top=(kutu.bottom+4)+'px';
    }
    dugme.setAttribute('aria-expanded','true');
    const disari_tikla=e=>{if(!liste.contains(e.target)&&!dugme.contains(e.target))kapat()};
    const kaydirma=e=>{if(!liste.contains(e.target)&&!telefon)kapat()};
    const tus=e=>{
      if(e.key==='Escape'){e.preventDefault();kapat(true);return}
      const satirlar=[...liste.querySelectorAll('.dd-opt')],sira=satirlar.indexOf(document.activeElement);
      if(e.key==='ArrowDown'){e.preventDefault();satirlar[Math.min(satirlar.length-1,sira+1)].focus()}
      else if(e.key==='ArrowUp'){e.preventDefault();satirlar[Math.max(0,sira-1)].focus()}
      else if(e.key==='Home'){e.preventDefault();satirlar[0].focus()}
      else if(e.key==='End'){e.preventDefault();satirlar[satirlar.length-1].focus()}
      else if(e.key==='Tab')kapat();
    };
    const boyut_degisti=()=>kapat();
    document.addEventListener('pointerdown',disari_tikla,true);document.addEventListener('keydown',tus);
    addEventListener('scroll',kaydirma,true);addEventListener('resize',boyut_degisti);
    acik={liste,arka,dugme,temizle:()=>{document.removeEventListener('pointerdown',disari_tikla,true);document.removeEventListener('keydown',tus);removeEventListener('scroll',kaydirma,true);removeEventListener('resize',boyut_degisti)}};
    const secili=liste.querySelector('.on')||liste.querySelector('.dd-opt');
    if(secili){secili.focus({preventScroll:true});secili.scrollIntoView({block:'nearest'})}
  }
  function donustur(secim){
    if(secim.dataset.dd||secim.multiple||secim.size>1||!secim.parentNode)return;
    secim.dataset.dd='1';
    const kap=document.createElement('div');kap.className='dd';
    const dugme=document.createElement('button');dugme.type='button';dugme.className='dd-btn '+secim.className;
    dugme.setAttribute('aria-haspopup','listbox');dugme.setAttribute('aria-expanded','false');
    dugme.innerHTML='<i class="ic dd-i" hidden></i><span class="dd-l"></span><i class="ic dd-c">'+ikon_svg('chevron-down',16)+'</i>';
    if(secim.title)dugme.title=secim.title;
    kap.append(dugme);secim.before(kap);
    const guncelle=()=>etiketi_guncelle(secim,dugme);guncelle();
    new MutationObserver(guncelle).observe(secim,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:['disabled','selected']});
    secim.addEventListener('change',guncelle);
    dugme.onclick=()=>{if(acik&&acik.dugme===dugme)kapat();else ac(secim,dugme)};
    dugme.onkeydown=e=>{if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();ac(secim,dugme)}};
  }
  function tara(dugum){if(dugum.nodeType!==1)return;if(dugum.tagName==='SELECT')donustur(dugum);else if(dugum.querySelectorAll)dugum.querySelectorAll('select').forEach(donustur)}
  new MutationObserver(kayitlar=>kayitlar.forEach(k=>k.addedNodes.forEach(tara))).observe(document.body,{childList:true,subtree:true});
  tara(document.body);
  return {kapat,donustur};
})();

// ---- Modal pencere: tarayıcının prompt/confirm kutuları yerine ----
// modal_sor({baslik,mesaj,alanlar:[{ad,etiket,yer,deger,zorunlu}],onay,iptal,tehlike}) -> {ad:deger} ya da vazgeçilirse null
function modal_sor(secenek){
  const {baslik='',mesaj='',alanlar=[],onay='Tamam',iptal='Vazgeç',tehlike=false}=secenek;
  return new Promise(coz=>{
    const onceki=document.activeElement;
    const arka=document.createElement('div');arka.className='modal_arka';
    const kutu=document.createElement('div');kutu.className='modal_kutu';kutu.setAttribute('role','dialog');kutu.setAttribute('aria-modal','true');
    const ust=document.createElement('div');ust.className='modal_baslik';ust.textContent=baslik;
    const govde=document.createElement('div');govde.className='modal_govde';
    if(mesaj){const m=document.createElement('p');m.className='modal_mesaj';m.textContent=mesaj;govde.append(m)}
    const girdiler=alanlar.map(a=>{
      const et=document.createElement('label');et.className='f';
      const yazi=document.createElement('span');yazi.textContent=a.etiket||a.ad;
      const girdi=document.createElement('input');girdi.type='text';girdi.placeholder=a.yer||'';girdi.value=a.deger||'';girdi.spellcheck=false;
      girdi.oninput=()=>girdi.classList.remove('hata');
      et.append(yazi,girdi);govde.append(et);return {a,girdi};
    });
    const alt=document.createElement('div');alt.className='modal_alt';
    const iptal_dugme=document.createElement('button');iptal_dugme.type='button';iptal_dugme.textContent=iptal;
    const onay_dugme=document.createElement('button');onay_dugme.type='button';onay_dugme.className=tehlike?'red':'pri';onay_dugme.textContent=onay;
    alt.append(iptal_dugme,onay_dugme);kutu.append(ust,govde,alt);arka.append(kutu);document.body.append(arka);
    const bitir=sonuc=>{document.removeEventListener('keydown',tus,true);arka.style.pointerEvents='none';cikis_animasyonu(kutu,innerWidth<760?'sheet':'pop',()=>{});cikis_animasyonu(arka,'fade',()=>arka.remove());if(onceki&&onceki.focus)onceki.focus({preventScroll:true});coz(sonuc)};
    const gonder=()=>{
      const bos=girdiler.find(g=>g.a.zorunlu&&!g.girdi.value.trim());
      if(bos){bos.girdi.classList.add('hata');bos.girdi.focus();return}
      const sonuc={};girdiler.forEach(g=>sonuc[g.a.ad]=g.girdi.value);bitir(sonuc);
    };
    const tus=e=>{
      if(e.key==='Escape'){e.preventDefault();e.stopPropagation();bitir(null)}
      else if(e.key==='Enter'&&e.target.tagName==='INPUT'){e.preventDefault();gonder()}
      else if(e.key==='Tab'){
        const odaklar=[...kutu.querySelectorAll('input,button')],ilk=odaklar[0],son=odaklar[odaklar.length-1];
        if(e.shiftKey&&document.activeElement===ilk){e.preventDefault();son.focus()}
        else if(!e.shiftKey&&document.activeElement===son){e.preventDefault();ilk.focus()}
      }
    };
    document.addEventListener('keydown',tus,true);
    arka.addEventListener('pointerdown',e=>{if(e.target===arka)bitir(null)});
    iptal_dugme.onclick=()=>bitir(null);onay_dugme.onclick=gonder;
    (girdiler[0]?girdiler[0].girdi:onay_dugme).focus();
    if(girdiler[0])girdiler[0].girdi.select();
  });
}
// Evet/hayır sorusu: true ya da false döner
async function modal_onayla(secenek){return (await modal_sor(secenek))!==null}

// ---- Kaydırıcı (range): sol kısım mor dolgu. Dolgu oranı --oran değişkeniyle CSS'e verilir ----
function kaydirici_doldur(k){
  const en_az=parseFloat(k.min||0),en_cok=parseFloat(k.max||100),aralik=(en_cok-en_az)||1;
  k.style.setProperty('--oran',Math.min(1,Math.max(0,(parseFloat(k.value)-en_az)/aralik)));
}
(()=>{
  const eski=Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value');
  Object.defineProperty(HTMLInputElement.prototype,'value',{configurable:true,get(){return eski.get.call(this)},set(v){eski.set.call(this,v);if(this.type==='range')kaydirici_doldur(this)}});
  document.addEventListener('input',e=>{if(e.target.type==='range')kaydirici_doldur(e.target)},true);
  const tara=dugum=>{if(dugum.nodeType!==1)return;if(dugum.type==='range')kaydirici_doldur(dugum);else if(dugum.querySelectorAll)dugum.querySelectorAll('input[type=range]').forEach(kaydirici_doldur)};
  new MutationObserver(kayitlar=>kayitlar.forEach(k=>k.addedNodes.forEach(tara))).observe(document.body,{childList:true,subtree:true});
  tara(document.body);
})();

ikonlari_uygula();
