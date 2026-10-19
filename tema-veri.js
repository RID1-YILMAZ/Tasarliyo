// TEMA VERİLERİ: etiketler (seçiciler), durumlar, CSS özellikleri, önizleme sayfası.
// Yeni etiket / özellik / durum eklemek = ilgili listeye bir satır.
// NOT: seçiciler arkadaşının demosundan alındı (Topluyo'nun gerçek ön yüzüyle karşılaştırılmadı).
const TM_LOGO='data:image/svg+xml,'+encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='#e61bd2'/><stop offset='1' stop-color='#a10fd6'/></linearGradient></defs><rect width='100' height='100' rx='24' fill='url(#g)'/><path d='M33 26v18M67 26v18M27 56q23 28 46 0' stroke='#fff' stroke-width='7' stroke-linecap='round' fill='none'/></svg>");

// Sıra önemli: en dıştaki (body) en üstte, içtekiler aşağıda
const TM_TAGS=[
  {id:'body',ad:'body',sel:'body'},
  {id:'main',ad:'main',sel:'.main'},
  {id:'header',ad:'header',sel:'header'},
  {id:'toparea',ad:'top-area',sel:'.top-area'},
  {id:'profile',ad:'user-profile',sel:'#user-profile'},
  {id:'groups',ad:'groups',sel:'.groups'},
  {id:'groupicon',ad:'group',sel:'.groups .group'},
  {id:'leftmenu',ad:'left-menu',sel:'.left-menu'},
  {id:'channels',ad:'channels',sel:'[channels]'},
  {id:'menutitle',ad:'menu-title',sel:'[menu-title]'},
  {id:'menuitem',ad:'menu-item',sel:'[menu-item]'},
  {id:'content',ad:'content',sel:'.content'},
  {id:'post',ad:'post',sel:'.post'},
  {id:'posttext',ad:'post-text',sel:'[post-text]'},
  {id:'msgtext',ad:'message-text',sel:'[message-text]'},
  {id:'composer',ad:'composer (mesaj kutusu + gönder)',sel:'[ui="textarea-inside-image-selector"], #post-send-button'},
  {id:'rightmenu',ad:'right-menu',sel:'.right-menu'},
  {id:'widget',ad:'widget-panel',sel:'[widget-panel]'},
  {id:'userlist',ad:'user-list',sel:'[user-list]'},
  {id:'footer',ad:'footer',sel:'footer'}
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
const TM_VARS=[['--back','Arka plan','#181418'],['--front','Ön yazı rengi','#ffffff'],['--primary','Ana renk','#DE11BA'],['--light','Açık ton','#8881'],['--text','Yazı','#ffffff']];
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
