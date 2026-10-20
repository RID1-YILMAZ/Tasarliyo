// Önizleme: Topluyo ön yüzünün taklidi. Yapı, iki örnek temadaki gerçek seçicilere göre kuruldu.
const _I=c=>`<img class="${c}" src="${TM_LOGO}" alt="">`;
const _L=(t,c)=>`<div menu-item><a menu-link class="${c||''}">${_I('ico')} ${t}</a><span menu-settings>⚙</span></div>`;
const _V=t=>`<div menu-channel><a menu-link>🔊 ${t}</a></div>`;
const _U=n=>`<div menu-item><span menu-icon>${_I('av')}</span> ${n}</div>`;
const _P=(n,t)=>`<div class="post"><div posts-user-view>${_I('av')}<b underline>${n}</b><span time-diff>4 gün önce</span></div><div post-text>${t}</div></div>`;
const _G=(n,c)=>`<a class="group ${c||''}">${n}</a>`;
const TM_REPLICA=`<!doctype html><html lang="tr"><head><meta charset="utf-8"><style id="tz-base">
:root{--back:#181418;--front:#fff;--primary:#DE11BA;--primary-text:#fff;--light:#8881;--border:#ffffff18;--sun:#1814188f;--shadow:#221c22;--back-opacity:#181418ed}
*{box-sizing:border-box;margin:0;padding:0}
html,body{height:100%;width:100%;overflow:hidden;background:var(--back);color:var(--front);font:15px Nunito,"Segoe UI",Arial,sans-serif}
body{background:radial-gradient(120% 80% at 70% 0%,rgba(90,20,50,.55),transparent 55%),radial-gradient(90% 70% at 100% 100%,rgba(80,10,40,.45),transparent 50%),var(--back)}
a{color:#82caff;text-decoration:none}
button{font:inherit;color:var(--front);background:var(--shadow);border:0;border-radius:8px;padding:6px 12px}
input,textarea,select{font:inherit;color:var(--front);background:var(--shadow);border:1px solid var(--border);border-radius:8px;padding:6px 10px}
header,footer{position:fixed;left:0;right:0;height:48px;display:flex;align-items:center;gap:8px;padding:0 10px;z-index:10;background:var(--sun);color:var(--front)}
header{top:0}footer{bottom:0}
.main{position:absolute;top:48px;bottom:48px;left:0;right:0;display:grid;grid-template-columns:56px 220px minmax(220px,1fr) 200px}
.groups{display:flex;flex-direction:column;align-items:center;gap:8px;padding:8px 0;overflow:auto;overflow-x:hidden}
.groups .group{width:40px;height:40px;border-radius:14px;display:flex;align-items:center;justify-content:center;background:var(--shadow);overflow:hidden;flex:none;color:#fff;font-weight:700}
.groups .group img{width:100%;height:100%;object-fit:cover}.groups .group.active{box-shadow:0 0 0 2px var(--primary)}
.left-menu,.right-menu{min-width:0;height:100%;overflow:auto;padding:0 8px}
[app_image_get_palette]{display:flex;align-items:center;gap:8px;padding:8px;margin-bottom:6px;border-radius:12px;background:linear-gradient(45deg,rgba(219,17,190,.2),rgba(230,121,222,.1))}
[app_image_get_palette] h1{font-size:1em}
.ico{width:22px;height:22px;border-radius:6px;object-fit:cover;flex:none}.av{width:28px;height:28px;border-radius:50%;object-fit:cover;flex:none}
.logo{width:2.2em;height:2.2em;border-radius:10px;display:block}
[menu-title]{display:flex;align-items:center;font-size:.78em;opacity:.7;padding:10px 6px 4px;letter-spacing:.05em}[single]{margin-left:auto}
[menu-item],[menu-channel]{display:flex;align-items:center;gap:8px;padding:5px 8px;border-radius:9px}
[menu-item]:hover,[menu-channel]:hover{background:var(--light)}
[menu-link]{flex:1;min-width:0;display:flex;align-items:center;gap:8px;color:var(--front);font-size:.92em}
[menu-link].unreaded{font-weight:800}[menu-link].active{color:var(--primary)}
[menu-settings]{opacity:.55;font-size:.8em}[menu-icon]{display:inline-flex}
.content{min-width:0;height:100%;display:flex;flex-direction:column;overflow:hidden}
.title-bar{display:flex;align-items:center;gap:10px;padding:10px 16px;border-bottom:1px solid var(--border)}
[muted]{opacity:.65;font-size:.88em}
[page="posts"]{flex:1;min-height:0;display:flex;flex-direction:column}
.posts{flex:1;overflow:auto;padding:10px 8px}
.post{padding:3px 6px;border-radius:9px}.post:hover{background:var(--light)}
[posts-user-view]{display:flex;align-items:center;gap:8px;margin-top:10px}[time-diff]{opacity:.6;font-size:.78em}
[post-text],[message-text]{line-height:1.55;overflow-wrap:anywhere}[post-text]{padding-left:36px}
.marktop-mention{color:var(--primary);background:#ffffff14;border-radius:5px;padding:0 3px}
.marktop-code-singleline{background:var(--shadow);border-radius:5px;padding:0 4px;font-family:monospace;font-size:.9em}
.marktop-code-multiline{display:block;white-space:pre;background:#0009;border-left:3px solid var(--primary);border-radius:9px;padding:8px;font-family:monospace;margin:6px 0;font-size:.85em}
[flex-x]{display:flex;gap:8px}[page="posts"]>[flex-x]{padding:8px}
#post-send-text-area{flex:1;resize:none;height:40px;min-width:0}
#post-send-button{width:40px;height:40px;flex:none;background:var(--primary);color:var(--primary-text)}
[footer-message-panel]{display:none;position:fixed;right:12px;bottom:56px;width:300px;height:340px;z-index:9;flex-direction:column;background:var(--back-opacity);border:1px solid var(--border);border-radius:14px;overflow:hidden}
body.dm [footer-message-panel]{display:flex}
[footer-message-panel-preview]{padding:8px 12px;border-bottom:1px solid var(--border)}
[footer-message-panel-messages]{flex:1;min-height:0;display:flex;flex-direction:column;gap:6px;padding:8px;overflow:auto}
[footer-message-panel-messages]>[flex-x]{margin-top:auto}
[message-direction]{max-width:88%;padding:6px 10px;border-radius:10px;background:#ffffff10}
[message-direction="me"]{align-self:flex-end;background:#ffffff22}
[message-user]{font-size:.8em;opacity:.8}[message-seen-text],[message-unseen]{font-size:.7em;opacity:.6}
.ib{width:36px;height:36px;display:flex;align-items:center;justify-content:center;border-radius:8px;flex:none}.grow{flex:1}.brand{display:flex;align-items:center;gap:8px}.brand h1{font-size:1em}
.join{background:var(--primary);color:var(--primary-text);font-weight:700;font-size:.85em}
#user-profile{display:flex;align-items:center;gap:6px;border-radius:11px}
.topluyo-modal-container{display:none}
body.modal .topluyo-modal-container{display:flex;position:fixed;inset:0;z-index:30;align-items:center;justify-content:center;background:#0009}
.topluyo-modal-content{display:flex;flex-direction:column;gap:10px;min-width:240px;padding:16px;background:var(--shadow);border:1px solid var(--border);border-radius:14px}
.marktop-image{display:block;width:140px;height:80px;margin:6px 0;border-radius:10px;object-fit:cover}
.marktop-video,.marktop-youtube{display:flex;align-items:center;justify-content:center;width:140px;height:80px;margin:6px 6px 0 0;background:#000;border-radius:10px;font-size:.8em}
.marktop-window{margin:6px 0;max-width:260px;border-radius:10px;overflow:hidden;border:1px solid var(--border)}
.marktop-window-bar{display:flex;align-items:center;gap:8px;padding:4px 8px;background:var(--shadow);font-size:.8em}.marktop-window-bar span:first-child{flex:1}
.marktop-window-bar-close,.marktop-window-bar-fullscreen{cursor:pointer;padding:0 4px;border-radius:4px}
.marktop-window>div:last-child{padding:8px;font-size:.85em}
.tz-hl{outline:3px solid #3b82f6!important;outline-offset:-3px;animation:tzf 1.3s ease-out forwards}
@keyframes tzf{0%,55%{outline-color:#3b82f6}100%{outline-color:transparent}}
</style><style id="tz-theme"></style></head><body>
<header><div class="ib">☰</div><div class="brand">${_I('logo')}<h1>Topluyo</h1></div><div class="ib">⤴</div><div class="grow"></div><div id="user-profile">${_I('av')}</div><div class="ib">👥</div></header>
<div class="main">
  <div class="groups">${_G('⌂')}${_G(_I(''),'active')}${_G('+')}${_G(_I(''))}${_G(_I(''))}${_G(_I(''))}${_G(_I(''))}</div>
  <div class="left-menu">
    <div app_image_get_palette>${_I('logo')}<h1>Destek</h1></div>
    <div menu-title>UYGULAMA KANALLARI<span single>＋</span></div>${_L('Güvenlik Testi Kuralları','unreaded')}${_L('RoadMap')}${_L('Burcun Ne?')}
    <div menu-title>METİN KANALLARI<span single>＋</span></div>${_L('Yayın Duyuruları')}${_L('Sohbet','active')}${_L('Kurallar')}
    <div menu-title>SES KANALLARI<span single>＋</span></div>${_V('Kodlama')}${_V('Oyun')}
  </div>
  <div class="content">
    <div class="title-bar"><b>Sohbet</b><span muted>#67589 · Sohbet muhabbet paylaşımları</span></div>
    <div page="posts">
      <div class="posts">
        ${_P('rid1-yilmaz','Merhaba <a class="marktop-mention" href="/@x">@kullanici</a>! Bak: <a class="marktop-link" href="#">https://topluyo.com</a>')}
        <div class="post" same-user="true"><div post-text>Ardışık ikinci mesaj, <code class="marktop-code-singleline">kod</code> da var.</div></div>
        ${_P('Petyo','Kod bloğu örneği:<code class="marktop-code-multiline">console.log("selam");</code>')}
        ${_P('Mod','Gömülü içerik örnekleri:'+_I('marktop-image')+'<span class="marktop-video">▶ video</span><span class="marktop-youtube">▶ youtube</span><div class="marktop-window"><div class="marktop-window-bar"><span>pencere</span><span class="marktop-window-bar-fullscreen">⛶</span><span class="marktop-window-bar-close">✕</span></div><div>Gömülü pencere içeriği</div></div>')}
      </div>
      <div flex-x><textarea id="post-send-text-area" placeholder="Mesaj yaz..."></textarea><button id="post-send-button" type="button">➤</button></div>
    </div>
  </div>
  <div class="right-menu"><div menu-title>KURUCU</div>${_U('Petyo')}<div menu-title>ÇEVRİMİÇİ</div>${_U('rid1-yilmaz')}<div menu-title>EKİPLER</div>${_U('BUG AVCISI')}${_U('Mod')}</div>
</div>
<footer><div class="ib">🌐</div>${_I('av')}<div class="grow"></div><div class="ib">+</div><div class="ib">🔍</div><div class="ib">🔔</div><div class="ib">✉</div></footer>
<div footer-message-panel>
  <div footer-message-panel-preview><span info-text>Direkt mesajlar · 2 yeni</span></div>
  <div footer-message-panel-messages>
    <div message-direction="you"><div message-user><b>Petyo</b></div><div message-text>Selam, tema nasıl gidiyor?</div></div>
    <div message-direction="me"><div message-user><b>Sen</b></div><div message-text>Gayet iyi, test ediyorum.</div><small message-seen-text>Görüldü</small></div>
    <div message-direction="you"><div message-user><b>Petyo</b></div><div message-text>Süper!</div><small message-unseen>●</small></div>
    <div flex-x><textarea id="post-send-text-area" placeholder="Mesaj yaz..."></textarea><button id="post-send-button" type="button">➤</button></div>
  </div>
</div>
<div class="topluyo-modal-container"><div class="topluyo-modal-content"><header>Onay</header><button topluyo-modal-confirm-button>Tamam</button><button topluyo-modal-cancel-button>İptal</button></div></div>
<div explore-index-group hidden></div><div book hidden></div>
</body></html>`;
