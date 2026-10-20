// TEMA VERİLERİ: etiketler (seçiciler), durumlar, CSS özellikleri, önizleme sayfası.
// Yeni etiket / özellik / durum eklemek = ilgili listeye bir satır.
// NOT: seçiciler iki örnek temadan (Tema 1 / Tema 2) çıkarıldı. Topluyo'nun kendi ön yüzüyle karşılaştırılmadı.
const TM_LOGO='data:image/svg+xml,'+encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='#e61bd2'/><stop offset='1' stop-color='#a10fd6'/></linearGradient></defs><rect width='100' height='100' rx='24' fill='url(#g)'/><path d='M33 26v18M67 26v18M27 56q23 28 46 0' stroke='#fff' stroke-width='7' stroke-linecap='round' fill='none'/></svg>");

// Gruplar ve etiketler. Sıra önemli: genel -> özel (önizlemede tıklayınca en özel eşleşen seçilir)
const TM_GRP=['Genel','Genel öğeler','Sunucu rayı','Sol menü','Sağ menü','İçerik','Sunucu sohbeti','Mesaj yazma','DM paneli','Mesaj içeriği (markdown)','Pencere (modal)','Keşfet / diğer'];
const _g=(g,rows)=>rows.map(([id,ad,sel])=>({id,g,ad,sel}));
const TM_TAGS=[
  ..._g('Genel',[['body','Sayfa gövdesi','body'],['main','Ana yerleşim','body > .main'],['header','Üst çubuk','body > header'],['footer','Alt çubuk','body > footer'],['profile','Profil (üst sağ)','header #user-profile']]),
  ..._g('Genel öğeler',[['a','Bağlantılar','a'],['button','Düğmeler','button'],['inputs','Giriş kutuları','input, textarea, select']]),
  ..._g('Sunucu rayı',[['groups','Sunucu rayı','.main > .groups'],['group','Sunucu simgesi','.groups .group'],['groupimg','Sunucu simgesi görseli','.groups .group img'],['groupact','Seçili sunucu simgesi','.groups .group.active']]),
  ..._g('Sol menü',[['leftmenu','Sol menü','.main > .left-menu'],['servercard','Sunucu kartı','.left-menu [app_image_get_palette]'],['servername','Sunucu adı','.left-menu [app_image_get_palette] h1'],
    ['menutitle','Kategori başlığı','[menu-title]'],['menuchannel','Kanal satırı (menu-channel)','[menu-channel]'],['menuitem','Menü öğesi (menu-item)','[menu-item]'],
    ['menulink','Kanal bağlantısı','.left-menu [menu-link]'],['menuunread','Okunmamış kanal','.left-menu [menu-link].unreaded'],['menuactive','Seçili kanal','.left-menu [menu-link].active'],['menuset','Menü ayar simgesi','[menu-settings]']]),
  ..._g('Sağ menü',[['rightmenu','Sağ menü','.main > .right-menu'],['menuicon','Sağ menü simgesi','.right-menu [menu-icon]']]),
  ..._g('İçerik',[['content','İçerik alanı','.main > .content'],['titlebar','Başlık çubuğu','.content .title-bar'],['titlemuted','Başlık çubuğu soluk yazı','.title-bar [muted]']]),
  ..._g('Sunucu sohbeti',[['posts','Mesaj listesi','[page="posts"] .posts'],['post','Mesaj satırı','.posts .post'],['postsame','Ardışık mesaj (aynı yazar)','.posts .post[same-user="true"]'],
    ['postuser','Yazar satırı','.posts [posts-user-view]'],['postname','Kullanıcı adı','.posts [posts-user-view] b[underline]'],['posttime','Zaman','.posts [posts-user-view] [time-diff]'],
    ['postavatar','Avatar','.posts [posts-user-view] img'],['posttext','Mesaj metni','.posts .post [post-text]']]),
  ..._g('Mesaj yazma',[['editor','Mesaj kutusu (sunucu + DM birlikte)','#post-send-text-area'],['editorposts','Mesaj kutusu · sunucu','[page="posts"] #post-send-text-area'],['editordm','Mesaj kutusu · DM','[footer-message-panel-messages] #post-send-text-area'],
    ['send','Gönder düğmesi (sunucu + DM birlikte)','#post-send-button'],['sendposts','Gönder düğmesi · sunucu','[page="posts"] #post-send-button'],['senddm','Gönder düğmesi · DM','[footer-message-panel-messages] #post-send-button'],
    ['rowposts','Yazma satırı · sunucu','[page="posts"] > [flex-x]:has(> #post-send-text-area)'],['rowdm','Yazma satırı · DM','[footer-message-panel-messages] > [flex-x]:has(> #post-send-text-area)']]),
  ..._g('DM paneli',[['dmbox','DM mesaj paneli','[footer-message-panel-messages]'],['dmmsg','DM mesaj balonu','[message-direction]'],['dmme','Benim DM mesajım','[message-direction="me"]'],
    ['dmuser','DM kullanıcı adı','[message-user]'],['dmuserb','DM kullanıcı adı (kalın)','[message-user] b'],['dmtext','DM mesaj metni','[message-text]'],
    ['dmseen','Görüldü yazısı','[message-seen-text]'],['dmunseen','Görülmedi işareti','[message-unseen]'],['dmpreview','DM önizleme bilgisi','[footer-message-panel-preview] [info-text]']]),
  ..._g('Mesaj içeriği (markdown)',[['mention','@bahsetme','.marktop-mention'],['mlink','Bağlantı','.marktop-link'],['code1','Satır içi kod','.marktop-code-singleline'],['codeN','Kod bloğu','.marktop-code-multiline'],
    ['mimg','Resim','.marktop-image'],['mvideo','Video','.marktop-video'],['myt','YouTube','.marktop-youtube'],['mwin','Gömülü pencere','.marktop-window'],
    ['mwinbar','Pencere çubuğu','.marktop-window-bar'],['mwinclose','Pencere kapat','.marktop-window-bar-close'],['mwinfull','Pencere tam ekran','.marktop-window-bar-fullscreen']]),
  ..._g('Pencere (modal)',[['modal','Pencere kutusu','.topluyo-modal-container'],['modalc','Pencere içeriği','.topluyo-modal-content'],['modalh','Pencere başlığı','.topluyo-modal-container header'],
    ['modalok','Onay düğmesi','[topluyo-modal-confirm-button]'],['modalno','İptal düğmesi','[topluyo-modal-cancel-button]']]),
  ..._g('Keşfet / diğer',[['explore','Keşfet grubu','[explore-index-group]'],['book','Kitap kutusu','[book]']])
];
// Durumlar: her etikete ayrı ayrı stil verilebilir
const TM_STATES=[
  ['','Normal'],[':hover','Hover (üstüne gelince)'],[':active','Active (basılıyken)'],[':focus','Focus (odaklanınca)'],
  [':focus-within','Focus-within (içi odaklanınca)'],[':first-child','İlk öğe'],[':last-child','Son öğe'],
  ['::before','::before'],['::after','::after'],['::placeholder','::placeholder'],['::selection','::selection (seçili yazı)'],
  ['::-webkit-scrollbar','Kaydırma çubuğu'],['::-webkit-scrollbar-thumb','Çubuk tutacağı'],['::-webkit-scrollbar-track','Çubuk izi']
];
const TM_FONTS=['Nunito','Segoe UI','Arial','Georgia','Verdana','Trebuchet MS','Times New Roman','Courier New','Consolas','Impact','system-ui','monospace','cursive'];
// :root değişkenleri (önizleme taklidi bunları kullanıyor)
const TM_VARS=[['--back','Arka plan','#181418'],['--front','Yazı rengi','#ffffff'],['--primary','Ana renk','#DE11BA'],['--primary-text','Ana renk üstündeki yazı','#ffffff'],['--light','Açık ton (hover vb.)','#8881'],['--border','Kenarlık','#ffffff18'],['--sun','Üst/alt çubuk zemini (tahmini)','#1814188f'],['--shadow','Yüzey / gölge (tahmini)','#221c22'],['--back-opacity','Yarı saydam arka plan','#181418ed']];
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
