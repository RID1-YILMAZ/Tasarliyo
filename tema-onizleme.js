// Önizleme: Topluyo ön yüzünün taklidi (arkadaşının default.html'i temel alındı)
const _I=c=>`<img class="${c}" src="${TM_LOGO}" alt="">`;
const _CH=['Topluyo Güvenlik Testi Kuralları','RoadMap','Burcun Ne?','Yayın','Rapor'],_CH2=['Yayın Duyuruları','Videolar','Hatalar','Kurallar','Genel Sohbet'];
const _US=['Hasan Delibaş','JaweedLentered','BOZKURT','KURT','BOT','BUG AVCISI','SekoMirson','Mod','Umut SEVİNÇ'];
const _MI=(a,n)=>`<div menu-item>${_I(a)} ${n}</div>`;
const TM_REPLICA=`<!doctype html><html lang="tr"><head><meta charset="utf-8"><style id="tz-base">
:root{--back:#181418;--front:#fff;--primary:#DE11BA;--light:#8881;--text:#fff}
*{box-sizing:border-box;margin:0;padding:0}
html,body{height:100%;width:100%;overflow:hidden;background:var(--back);color:var(--front);font:16px Nunito,"Segoe UI",Arial,sans-serif}
body{background:radial-gradient(120% 80% at 70% 0%,rgba(90,20,50,.55),transparent 55%),radial-gradient(90% 70% at 100% 100%,rgba(80,10,40,.45),transparent 50%),var(--back)}
header,footer{position:fixed;left:0;right:0;height:48px;display:flex;align-items:center;gap:8px;padding:0 10px;z-index:10;color:var(--front)}
header{top:0}footer{bottom:0}
.main{position:absolute;top:48px;bottom:48px;left:0;right:0;display:grid;grid-template-columns:56px 220px minmax(220px,1fr) 220px}
.groups{display:flex;flex-direction:column;align-items:center;gap:8px;padding:8px 0;overflow:auto;overflow-x:hidden}
.groups .group{width:40px;height:40px;border-radius:14px;display:flex;align-items:center;justify-content:center;background:#2a2430;overflow:hidden;flex:none;color:#fff;font-weight:700}
.groups .group img{width:100%;height:100%;object-fit:cover}
.left-menu,.right-menu{min-width:0;height:100%;overflow:auto;padding:0 8px}
.content{min-width:0;height:100%;overflow:auto;padding:8px 16px 16px}
.top-area{display:flex;align-items:center;min-height:8px}
.logo{width:2.4em;height:2.4em;border-radius:10px;object-fit:cover;display:block}
.ib{width:36px;height:36px;display:flex;align-items:center;justify-content:center;border-radius:8px;flex:none}
.grow{flex:1}.brand{display:flex;align-items:center;gap:8px}.brand h1{font-size:1em;font-weight:700}
.join{background:var(--primary);color:#fff;border:0;border-radius:8px;padding:6px 14px;font-weight:700;font-size:.85em}
.server-card{border-radius:.7em;overflow:hidden;background:linear-gradient(45deg,rgba(219,17,190,.2),rgba(230,121,222,.1));padding:.5em;margin:0 0 1em}
.server-card h1{font-size:1em}.muted{opacity:.7;font-size:.9em}.row{display:flex;align-items:center;gap:8px}
[menu-title]{font-size:.8em;opacity:.7;padding:10px 6px 4px;letter-spacing:.02em}
[menu-item]{display:flex;align-items:center;gap:8px;padding:6px 8px;border-radius:8px;font-size:.92em}
[menu-item]:hover{background:#ffffff10}
.ch-ico{width:22px;height:22px;border-radius:6px;object-fit:cover;flex:none}
.user-dot{width:28px;height:28px;border-radius:1em;object-fit:cover}
.post{padding:8px 0 16px}[post-text],[message-text]{line-height:1.55}
hr{border:0;border-top:1px solid #fff2;margin:16px 0}h3{font-size:1.05em;margin:12px 0 8px}
.composer{display:flex;gap:8px;padding:12px 0 8px}
#post-send-button,[ui="textarea-inside-image-selector"]{background:#221c22;border:0;color:#fff;border-radius:8px;padding:10px 12px}
[ui="textarea-inside-image-selector"]{flex:1}
[widget-panel]{padding:6px}#user-profile{display:flex;align-items:center;gap:6px}
.tz-hl{outline:3px solid #3b82f6!important;outline-offset:-3px;animation:tzf 1.3s ease-out forwards}
@keyframes tzf{0%,55%{outline-color:#3b82f6}100%{outline-color:transparent}}
</style><style id="tz-theme"></style></head><body>
<header>
  <div class="ib">☰</div><div class="brand">${_I('logo')}<h1>Topluyo</h1></div>
  <div class="ib">⤴</div><div class="grow"></div><button class="join" type="button">Katıl</button>
  <div id="user-profile">${_I('logo')}</div><div class="ib">👥</div>
</header>
<div class="main">
  <div class="groups"><a class="group">⌂</a><a class="group">${_I('')}</a><div class="group">+</div><a class="group">${_I('')}</a><a class="group">${_I('')}</a><a class="group">${_I('')}</a><a class="group">${_I('')}</a><a class="group">${_I('')}</a></div>
  <div class="left-menu">
    <div class="server-card"><div class="row">${_I('logo')}<h1>Destek</h1></div></div>
    <div channels>
      <div menu-title>UYGULAMA KANALLARI</div>${_CH.map(n=>_MI('ch-ico',n)).join('')}
      <div menu-title>METİN KANALLARI</div>${_CH2.map(n=>_MI('ch-ico',n)).join('')}
      <div menu-title>SES KANALLARI</div>${['Kodlama','Oyun','Destek Odası 1'].map(n=>_MI('ch-ico',n)).join('')}
    </div>
  </div>
  <div class="content">
    <div class="top-area"></div>
    <div class="server-card"><div class="row">${_I('logo')}<h1>Destek</h1><div class="grow"></div><button class="join" type="button">Katıl</button></div>
      <p class="muted">Topluyo resmî istek &amp; destek sunucusu. =)</p>
      <div class="row" style="margin-top:6px"><div class="muted">#1</div><div class="grow"></div><div class="muted">1841 kullanıcı</div></div></div>
    <div class="post"><div post-text message-text>
      <h3>👋 Topluyo'ya Hoş Geldiniz!</h3>
      <p>Topluyo; insanların bir araya gelerek sosyalleşebildiği, bilgi paylaşabildiği ve ortak ilgi alanları etrafında topluluklar oluşturabildiği yeni nesil bir sosyal platformdur.</p>
      <hr><h3>🌍 Topluyo Nedir?</h3>
      <p>Topluyo; toplulukların bir araya gelerek fikir alışverişi yapabildiği, gerçek zamanlı iletişim kurabildiği modern bir sosyal platformdur.</p>
    </div></div>
    <div class="composer"><div ui="textarea-inside-image-selector">Mesaj yaz...</div><button id="post-send-button" type="button">Gönder</button></div>
  </div>
  <div class="right-menu"><div widget-panel><div user-list>
    <div menu-title>KURUCU</div>${_MI('user-dot',_US[0])}<div menu-title>ÇEVRİMİÇİ</div>${_MI('user-dot',_US[1])}
    <div menu-title>ROLLER</div>${_US.slice(2,5).map(n=>_MI('user-dot',n)).join('')}
    <div menu-title>EKİPLER</div>${_US.slice(5).map(n=>_MI('user-dot',n)).join('')}
  </div></div></div>
</div>
<footer><div class="ib">🌐</div>${_I('user-dot')}<div class="grow"></div><div class="ib" id="button-widget">+</div><div class="ib" id="button-search">🔍</div><div class="ib" id="button-notification">🔔</div><div class="ib" id="button-message">✉</div></footer>
</body></html>`;
