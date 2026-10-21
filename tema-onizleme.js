// Önizleme: Topluyo ön yüzünün taklidi.
// İskelet base.css'e birebir uyar: body > header (menu-opener) + content > (menu, main)
// base.css'in tanımladığı öğeler: header, content, menu, menu-opener, main, panel, dropdown
const _AV=`<img class="tz-post-av" src="${TM_LOGO}" alt="">`;
const _MENU_H2=t=>`<div class="menu-H2">${t}</div>`;
const _CH=(t,c)=>`<a href="#" class="${c||''}">${t}</a>`;
const _IB=(t,attr)=>`<span icon-button ${attr||''}>${t}</span>`;
const _GAL=t=>`<span class="marktop-box">${t}</span>`;
// Markdown içerikli mesaj gövdesi (base.css marktop-* sınıfları)
const _POST=(name,time,body,extra)=>`<div class="tz-post">${_AV}<div class="tz-post-body">
<div class="tz-post-head"><b class="underline">${name}</b><span class="tz-muted">${time}</span></div>
<div class="tz-post-text">${body}</div>${extra||''}</div></div>`;

const TM_REPLICA=`<!doctype html><html lang="tr"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="stylesheet" href="base.css?v=1">
<link rel="stylesheet" href="topluyo.css?v=1">
<style id="tz-theme"></style></head>
<body class="theme-dark">
<header>
  <menu-opener title="Menüyü aç">☰</menu-opener>
  <a href="#" class="tz-brand"><img class="marktop-logo" src="${TM_LOGO}" alt=""><span>Topluyo</span></a>
  <span class="space"></span>
  ${_IB('🔍','title="Ara" tooltip-right="Ara"')}
  ${_IB('🔔','title="Bildirimler"')}
  ${_IB('👥','title="Topluluk"')}
  <span class="tz-user"><img src="${TM_LOGO}" alt="">${_IB('⚙','title="Ayarlar"')}</span>
</header>

<content>
  <menu>
    ${_MENU_H2('UYGULAMA KANALLARI')}
    ${_CH('Güvenlik Testi Kuralları','tz-unread')}
    ${_CH('RoadMap')}
    ${_CH('Burcun Ne?')}
    ${_MENU_H2('METİN KANALLARI')}
    ${_CH('Yayın Duyuruları')}
    ${_CH('Sohbet','active')}
    ${_CH('Kurallar')}
    ${_MENU_H2('SES KANALLARI')}
    ${_CH('🔊 Kodlama','tz-voice')}
    ${_CH('🔊 Oyun','tz-voice')}
  </menu>

  <main>
    <div class="tz-head"><b>Sohbet</b><span class="tz-muted">#67589 · Sohbet muhabbet paylaşımları</span></div>
    <div class="tz-posts">
      ${_POST('rid1-yilmaz','4 gün önce',
        `Merhaba <a class="marktop-mention" href="#">@kullanici</a>! Bak: <a class="marktop-link" href="#">https://topluyo.com</a>`)}
      ${_POST('rid1-yilmaz','4 gün önce',
        `Ardışık ikinci mesaj, <code class="marktop-code-singleline">kod</code> da var.`)}
      ${_POST('Petyo','3 gün önce',
        `Kod bloğu örneği:<code class="marktop-code-multiline">console.log("selam");</code>`)}
      ${_POST('Mod','2 gün önce',
        `<div class="marktop-box marktop-flex-y">
          <div class="marktop-flex-cx"><img class="marktop-icon marktop-size-2" src="${TM_LOGO}" alt=""><b class="marktop-muted">GÜNLÜK ÖDÜL</b></div>
          <div class="marktop-flex-x marktop-space"><span>2.500 Coin</span><button class="marktop-bumote" type="button">Topla</button></div>
          <div class="marktop-grid">
            <div class="marktop-box marktop-muted">A</div>
            <div class="marktop-box marktop-muted">B</div>
            <div class="marktop-box marktop-muted">C</div>
          </div>
          <div class="marktop-progress" style="--progress-percent:64%;--progress-background:#1AF"><span>%64</span></div>
          <div class="marktop-input" contenteditable="true" placeholder="İsmini yaz..."></div>
        </div>`)}
      ${_POST('Sistem','1 gün önce',
        `Gömülü içerik örnekleri:
         <img class="marktop-image" src="${TM_LOGO}" alt="">
         <div class="marktop-window"><div class="marktop-window-bar"><span class="marktop-window-bar-title">pencere</span><span class="marktop-window-bar-fullscreen"></span><span class="marktop-window-bar-close"></span></div><div class="marktop-window-iframe">Gömülü pencere içeriği</div></div>`)}
    </div>

    <div class="tz-gallery">
      ${_MENU_H2('YARDIMCI SINIFLAR')}
      <div class="tz-gal-row">
        <span class="flex-x light">flex-x</span><span class="flex-y light">flex-y</span>
        <span class="flex-cx light">flex-cx</span><span class="flex-cy light">flex-cy</span>
        <span class="flex-sx light">flex-sx</span><span class="flex-ex light">flex-ex</span>
      </div>
      <div class="tz-gal-row">
        <span class="grid-2 light">grid-2</span><span class="grid-3 light">grid-3</span>
        <span class="grid-4 light">grid-4</span><span class="grid-5 light">grid-5</span>
        <span class="grid-6 light">grid-6</span>
      </div>
      <div class="tz-gal-row">
        <span class="gap light">gap</span><span class="space light">space</span>
        <span class="inverse">inverse</span><span class="center">center</span>
        <span class="underline">underline</span><span class="padding light">padding</span>
        <span class="padding-1 light">padding-1</span>
      </div>

      ${_MENU_H2('MARKDOWN (marktop-*)')}
      <div class="tz-gal-row">
        <span class="marktop-flex-x">marktop-flex-x</span><span class="marktop-flex-y">marktop-flex-y</span>
        <span class="marktop-flex-cx">marktop-flex-cx</span><span class="marktop-flex-center">marktop-flex-center</span>
        <span class="marktop-space">marktop-space</span><span class="marktop-muted">marktop-muted</span>
      </div>
      <div class="tz-gal-row">
        ${_GAL('marktop-box')}<button class="marktop-bumote" type="button">marktop-bumote</button>
        <button class="marktop-button" type="button">marktop-button</button>
        <div class="marktop-input" contenteditable="true" placeholder="marktop-input"></div>
      </div>
      <div class="tz-gal-row">
        <span class="marktop-alert">marktop-alert</span><span class="marktop-success">marktop-success</span>
        <span class="marktop-info">marktop-info</span>
      </div>
      <div class="tz-gal-row tz-gal-media">
        <img class="marktop-icon marktop-size-1" src="${TM_LOGO}" alt=""><img class="marktop-icon marktop-size-2" src="${TM_LOGO}" alt="">
        <img class="marktop-icon marktop-size-3" src="${TM_LOGO}" alt=""><img class="marktop-icon marktop-size-4" src="${TM_LOGO}" alt="">
        <img class="marktop-logo" src="${TM_LOGO}" alt=""><img class="marktop-image" src="${TM_LOGO}" alt="">
        <span class="marktop-video">marktop-video</span><span class="marktop-youtube">marktop-youtube</span>
      </div>
      <div class="tz-gal-row">
        <span class="marktop-progress" style="--progress-percent:40%;--progress-background:#1AF">marktop-progress</span>
        <div class="marktop-grid"><span class="marktop-box">marktop-grid</span><span class="marktop-box">2</span></div>
      </div>
      <div class="tz-gal-row">
        <a class="marktop-mention" href="#">marktop-mention</a><a class="marktop-link" href="#">marktop-link</a>
        <code class="marktop-code-singleline">marktop-code-singleline</code>
        <strong class="markdown-strong">markdown-strong</strong>
        <ul><li marktop-list="-">marktop-list</li></ul>
      </div>
    </div>

    <div class="tz-editor">
      <input class="input" type="text" placeholder="Mesaj yaz...">
      <button class="tz-send" type="button">➤</button>
    </div>
  </main>
</content>

<panel>
  <div class="tz-dm-head">Direkt mesajlar · 2 yeni</div>
  <div class="tz-dm"><b>Petyo</b><div>Selam, tema nasıl gidiyor?</div></div>
  <div class="tz-dm me"><b>Sen</b><div>Gayet iyi, test ediyorum.</div></div>
  <div class="tz-dm"><b>Petyo</b><div>Süper!</div></div>
  <div class="tz-editor"><input class="input" type="text" placeholder="Mesaj yaz..."><button class="tz-send" type="button">➤</button></div>
</panel>

<div class="tz-modal"><div class="tz-modal-box">
  <h3>Onay</h3>
  <p>Bu işlemi onaylıyor musun?</p>
  <div grid-form><span>Ad</span><input class="input" type="text" value="Örnek"></div>
  <dropdown name="ornek"><div class="dropdown-value"><div class="dropdown-value-item">Seç</div></div>
    <div class="dropdown-list"><div>Seçenek 1</div><div>Seçenek 2</div></div>
  </dropdown>
  <label class="tz-flex"><input type="checkbox" checked> Onay kutusu</label>
  <label class="tz-flex"><input type="checkbox" switch="Açık"> Anahtar</label>
  <div class="tz-flex"><button type="button" class="marktop-bumote">Tamam</button><button type="button" class="marktop-bumote">İptal</button></div>
</div></div>
<script>document.addEventListener('click',function(e){if(e.target.closest('menu-opener'))document.body.classList.toggle('hide-menu')});</script>
</body></html>`;
