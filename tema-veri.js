// TEMA VERİLERİ: etiketler (seçiciler), durumlar, CSS özellikleri, önizleme sayfası.
// Yeni etiket / özellik / durum eklemek = ilgili listeye bir satır.
// NOT: seçiciler Topluyo'nun kendi base.css dosyasından çıkarıldı; önizleme taklidi
//       (tema-onizleme.js) birebir bu seçicileri taşır.
const TM_LOGO='data:image/svg+xml,'+encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='#e61bd2'/><stop offset='1' stop-color='#a10fd6'/></linearGradient></defs><rect width='100' height='100' rx='24' fill='url(#g)'/><path d='M33 26v18M67 26v18M27 56q23 28 46 0' stroke='#fff' stroke-width='7' stroke-linecap='round' fill='none'/></svg>");

// Gruplar ve etiketler. Sıra önemli: genel -> özel (önizlemede tıklayınca en özel eşleşen seçilir)
const TM_GRP=['Tema değişkenleri','Uygulama iskeleti','Üst çubuk','Menü','Form öğeleri','Düzen yardımcıları','Mesaj içeriği (markdown)','DM paneli','Pencere (modal)','Önizleme katmanı'];
const _g=(g,rows)=>rows.map(([id,ad,sel])=>({id,g,ad,sel}));
const TM_TAGS=[
  ..._g('Uygulama iskeleti',[
    ['body','Sayfa gövdesi','body'],
    ['header','Üst çubuk','header'],
    ['content','İçerik kabuğu','content'],
    ['menu','Menü (kanal listesi)','menu'],
    ['main','Ana alan','main'],
    ['menuopener','Menü açma düğmesi','menu-opener'],
    ['dropdown','Açılır liste','dropdown']]),
  ..._g('Üst çubuk',[
    ['headera','Üst çubuk bağlantısı','header a'],
    ['headertitle','Üst çubuk başlığı','header [title]'],
    ['headerspace','Üst çubuk boşluğu','header .space'],
    ['iconbtn','İkon düğmesi','[icon-button]'],
    ['tooltip','İpucu (tooltip)','[tooltip-right]']]),
  ..._g('Menü',[
    ['menuh2','Menü başlığı','menu .menu-H2'],
    ['menua','Kanal bağlantısı','menu a'],
    ['menuaactive','Seçili kanal','menu a.active']]),
  ..._g('Form öğeleri',[
    ['button','Düğmeler','button'],
    ['input','Giriş kutuları','input:not([type=checkbox]):not([type=radio])'],
    ['inputcls','Giriş kutusu (sınıf)','.input'],
    ['checkbox','Onay kutusu','input[type=checkbox]:not([switch])'],
    ['switch','Anahtar (switch)','input[switch]'],
    ['gridform','Izgara form','[grid-form]']]),
  ..._g('Düzen yardımcıları',[
    ['flexx','Yatay diz','.flex-x'],['flexy','Dikey diz','.flex-y'],
    ['flexcx','Yatay, ortali','.flex-cx'],['flexcy','Dikey, ortali','.flex-cy'],
    ['flexsx','Yatay, iki uç arası','.flex-sx'],['flexex','Yatay, eşit genişlik','.flex-ex'],
    ['grid2','Izgara 2','.grid-2'],['grid3','Izgara 3','.grid-3'],['grid4','Izgara 4','.grid-4'],
    ['grid5','Izgara 5','.grid-5'],['grid6','Izgara 6','.grid-6'],
    ['spacec','Kalan alanı doldur','.space'],['gapc','Boşluk','.gap'],
    ['lightc','Işık efekti','.light'],['inversec','Ters renk','.inverse'],
    ['centerc','Dikey ortalı','.center'],['underlinec','Altı çizili','.underline'],
    ['paddingc','İç boşluk','.padding'],['padding1c','İç boşluk (geniş)','.padding-1']]),
  ..._g('Mesaj içeriği (markdown)',[
    ['mflexx','marktop-flex-x','.marktop-flex-x'],['mflexy','marktop-flex-y','.marktop-flex-y'],
    ['mflexcx','marktop-flex-cx','.marktop-flex-cx'],['mflexcenter','marktop-flex-center','.marktop-flex-center'],
    ['mspace','marktop-space','.marktop-space'],['mbox','marktop-box','.marktop-box'],
    ['mmuted','marktop-muted','.marktop-muted'],['mbumote','marktop-bumote','.marktop-bumote'],
    ['mbutton','marktop-button','.marktop-button'],['minput','marktop-input','.marktop-input'],
    ['micon','marktop-icon','.marktop-icon'],['mlogo','marktop-logo','.marktop-logo'],
    ['msize1','marktop-size-1','.marktop-size-1'],['msize2','marktop-size-2','.marktop-size-2'],
    ['msize3','marktop-size-3','.marktop-size-3'],['msize4','marktop-size-4','.marktop-size-4'],
    ['mgrid','marktop-grid','.marktop-grid'],['mprogress','marktop-progress','.marktop-progress'],
    ['mimage','marktop-image','.marktop-image'],['mvideo','marktop-video','.marktop-video'],
    ['myoutube','marktop-youtube','.marktop-youtube'],['mmention','marktop-mention','.marktop-mention'],
    ['mlink','marktop-link','.marktop-link'],['mcode1','marktop-code-singleline','.marktop-code-singleline'],
    ['mcodeN','marktop-code-multiline','.marktop-code-multiline'],['malert','marktop-alert','.marktop-alert'],
    ['msuccess','marktop-success','.marktop-success'],['minfo','marktop-info','.marktop-info'],
    ['mwin','marktop-window','.marktop-window'],['mwinbar','marktop-window-bar','.marktop-window-bar'],
    ['mwintitle','marktop-window-bar-title','.marktop-window-bar-title'],
    ['mwinclose','marktop-window-bar-close','.marktop-window-bar-close'],
    ['mwinfull','marktop-window-bar-fullscreen','.marktop-window-bar-fullscreen'],
    ['mwinframe','marktop-window-iframe','.marktop-window-iframe'],
    ['mstrong','markdown-strong','.markdown-strong'],['mlist','marktop-list','li[marktop-list="-"]']]),
  ..._g('DM paneli',[
    ['panel','DM mesaj panelı','panel'],
    ['dmhead','DM başlığı','.tz-dm-head'],
    ['dmmsg','DM mesaj balonu','.tz-dm'],
    ['dmme','Benim DM mesajım','.tz-dm.me']]),
  ..._g('Pencere (modal)',[
    ['modalbox','Pencere kutusu','.tz-modal-box'],
    ['modalh','Pencere başlığı','.tz-modal-box h3']]),
  ..._g('Önizleme katmanı',[
    ['tzhead','Kanal başlık çubuğu','.tz-head'],
    ['tzpost','Mesaj satırı','.tz-post'],
    ['tzposthead','Mesaj başlığı','.tz-post-head'],
    ['tzposttext','Mesaj metni','.tz-post-text'],
    ['tzeditor','Mesaj yazma satırı','.tz-editor'],
    ['tzgallery','Yardımcı sınıf galerisi','.tz-gallery']])
];
// Durumlar: her etikete ayrı ayrı stil verilebilir
const TM_STATES=[
  ['','Normal'],[':hover','Hover (üstüne gelince)'],[':active','Active (basılıyken)'],[':focus','Focus (odaklanınca)'],
  [':focus-within','Focus-within (içi odaklanınca)'],[':first-child','İlk öğe'],[':last-child','Son öğe'],
  ['::before','::before'],['::after','::after'],['::placeholder','::placeholder'],['::selection','::selection (seçili yazı)'],
  ['::-webkit-scrollbar','Kaydırma çubuğu'],['::-webkit-scrollbar-thumb','Çubuk tutacağı'],['::-webkit-scrollbar-track','Çubuk izi']
];
const TM_FONTS=['Nunito','Segoe UI','Arial','Georgia','Verdana','Trebuchet MS','Times New Roman','Courier New','Consolas','Impact','system-ui','monospace','cursive'];
// Tema değişkenleri (base.css bunları body üzerinde tanımlar)
// [ad, etiket, varsayılan, tür]  tür: color | len
const TM_VARS=[
  ['--back','Arka plan','#181818','color'],
  ['--front','Yazı rengi','#FFFFFF','color'],
  ['--primary','Ana renk','#1177EE','color'],
  ['--primary-text','Ana renk üstündeki yazı','#FFFFFF','color'],
  ['--light','Soluk ton (hover zemini)','#88888822','color'],
  ['--menu-width','Menü genişliği','260px','len'],
  ['--header-height','Üst çubuk yüksekliği','50px','len']
];
const TM_WALL=[
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1469474968028-3778080dd275?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1482192505345-5656af4ab6ba?auto=format&fit=crop&w=900&q=80',
  'https://picsum.photos/id/1015/900/560','https://picsum.photos/id/1018/900/560',
  'https://picsum.photos/id/1022/900/560','https://picsum.photos/id/1036/900/560'
];
