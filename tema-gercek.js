// TEMA-GERÇEK: ana CSS analizine göre düzeltmeler. Yükleme sırası: tema-ek.js'ten sonra, tema.js'ten önce.
(()=>{
// 1) Gerçek değişkenler ve varsayılanlar
const V=[['--back','Arka plan','#F8F8F8'],['--front','Yazı rengi','#222222'],['--primary','Ana renk','#1177EE'],['--primary-text','Ana renk üstündeki yazı','#FFFFFF'],['--light','Açık ton (boşsa arka plan + yazıdan türer)','#8882'],['--menu-width','Sol menü genişliği','260px'],['--header-height','Üst çubuk yüksekliği','50px'],['--color','Rol rengi','#1177EE'],['--color-text','Rol yazı rengi','#FFFFFF'],['--progress-background','İlerleme çubuğu rengi','#1177EE']];
const old=TM_VARS.filter(x=>!V.some(y=>y[0]===x[0])).map(x=>[x[0],x[1]+" · bu CSS'te yok",x[2]]);
TM_VARS.length=0;TM_VARS.push(...V,...old);
// Çıktı: :root yerine ":root, body" ve değişkenlere !important (body.theme-dark'ı ezer)
const C=TMC.cssOf;
TMC.cssOf=w=>C(w).replace(/(^|[};])(\s*):root(\s*)\{/g,'$1$2:root, body$3{').replace(/(--[\w-]+\s*:\s*[^;!}]+?)\s*;/g,'$1 !important;');
// 2) Düzeltilen seçiciler
const by=id=>TM_TAGS.find(t=>t.id===id);
by('button').sel='button, .button, [button]';
by('inputs').sel='input:not([type=checkbox]):not([type=radio]), textarea, select, dropdown, .input';
by('inputs').ad='Giriş kutuları (kenarlık = inset box-shadow)';
by('body').ad='Sayfa gövdesi (opacity verme: sayfa gizlenir)';
// 3) Yeni gruplar
const add=(g,rows)=>{TM_GRP.push(g);rows.forEach(([id,ad,sel])=>TM_TAGS.push({id,g,ad,sel}))};
add('Kartlar (.marktop-*)',[['kflexx','Kart: yatay (flex-x)','.marktop-flex-x'],['kflexy','Kart: dikey (flex-y)','.marktop-flex-y'],['kflexcx','Kart: yatay ortalı (flex-cx)','.marktop-flex-cx'],['kcenter','Kart: ortala (flex-center)','.marktop-flex-center'],['kbox','Kart: kutu (box)','.marktop-box'],['kbumote','Kart: buton (bumote)','.marktop-bumote'],['kbutton','Kart: buton (button)','.marktop-button'],['kinput','Kart: giriş kutusu','.marktop-input'],['kmuted','Kart: soluk yazı','.marktop-muted'],['kicon','Kart: ikon / logo','.marktop-icon, .marktop-logo'],['kgrid','Kart: ızgara (grid)','.marktop-grid'],['kprog','Kart: ilerleme çubuğu','.marktop-progress'],['kframe','Kart: çerçeve (frame)','.marktop-frame'],['kalert','Kart: uyarı (alert)','.marktop-alert'],['ksuccess','Kart: başarı (success)','.marktop-success'],['kinfo','Kart: bilgi (info)','.marktop-info'],['kstrong','Kalın yazı (markdown)','.markdown-strong']]);
add('Kanal türleri',[['xchans','Kanal listesi','[channels]'],...[0,1,2,10,20,-20].map(n=>['xch'+(n<0?'m':'')+Math.abs(n),'Kanal türü '+n,'[channels] [channel-type="'+n+'"]'])]);
add('Dropdown & tablo',[['xdd','Dropdown','dropdown'],['xddlist','Dropdown listesi','.dropdown-list'],['xddval','Dropdown seçili değer','.dropdown-value'],['xtbl','Tablo','table'],['xtblc','Tablo hücresi','table th, table td']]);
add('Üye rolleri',[['xrole','Üye rol çipi','[context-menu-member-info-role]'],['xroleauto','Otomatik renkli rol','[context-menu-member-info-role][auto-color]'],['xrolesel','Seçili rol','[context-menu-member-info-role][auto-color].selected']]);
add('Tema modu',[['xdark','Koyu tema (body.theme-dark)','body.theme-dark'],['xlight','Açık tema (body.theme-light)','body.theme-light']]);
// 6) Metin Tasarla önizlemesi: gerçek .marktop-* CSS'i
let css='#pv{--primary:#1177EE;--primary-text:#fff;--front:#e6e9f2;--back:#0a0c12;color:var(--front)}.marktop-flex-x{display:flex;flex-direction:row;gap:.5em}.marktop-flex-y{display:flex;flex-direction:column;gap:.5em}.marktop-flex-cx{display:flex;flex-direction:row;gap:.5em;align-items:center}.marktop-flex-center{display:flex;flex-direction:row;align-items:center;justify-content:center;gap:.5em}.marktop-space{flex:1}.marktop-bumote,.marktop-button{background:#8882;padding:.25em .5em;cursor:pointer;user-select:none;transition:all .2s;border-radius:.25em}.marktop-bumote:hover,.marktop-button:hover{background:#8884}.marktop-bumote:active{transform:scale(.9)}.marktop-input{outline:1px solid #8884;padding:.25em .5em;outline-offset:-1px;border-radius:.25em}.marktop-input:empty::before{content:attr(placeholder);pointer-events:none;opacity:.6}.marktop-box{padding:.5em;border:1px solid #8882;border-radius:.25em}.marktop-muted{opacity:.8;font-size:.8em}.marktop-icon,.marktop-logo{width:2em;height:2em;background-repeat:no-repeat;background-size:contain;background-position:center}.marktop-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(0,1fr));gap:.5em}.marktop-progress{padding:.25em;position:relative;overflow:hidden}.marktop-progress::before{content:"";position:absolute;z-index:0;left:0;top:0;height:100%;width:var(--progress-percent);background:var(--progress-background,var(--primary));border-radius:.5em}.marktop-progress>*{position:relative}.marktop-frame{border-radius:.5em}.marktop-alert,.marktop-success,.marktop-info{font-family:monospace;border-radius:.25em;padding:.25em;border:1px solid currentColor;background:color-mix(in srgb,currentColor 15%,transparent)}.marktop-alert{color:#ff6b6b}.marktop-success{color:#4cd964}.marktop-info{color:#4da3ff}';
for(let i=1;i<=8;i++)css+='.marktop-size-'+i+'{width:'+i+'em;height:'+i+'em}';
const st=document.createElement('style');st.textContent=css;document.head.append(st);
view=function(n){
  const u=U(n),t=n.type||'',el=h('div',{class:['marktop-'+t,...u.map(x=>'marktop-'+x)].filter(x=>x!=='marktop-').join(' ')}),s=el.style;
  if(t==='input'){el.contentEditable='true';el.setAttribute('placeholder',n.placeholder||n.text||'')}
  else if(t!=='icon'&&n.text!=null&&n.text!=='')el.append(String(n.text));
  if(t==='icon'&&n.src)s.backgroundImage='url("'+n.src+'")';
  const g=parseFloat(n.gap);if(g)s.gap=g+'em';
  const z=parseFloat(n.size);if(z)s.fontSize=z+'em';
  if(n.background)s.background=n.background;if(n.color)s.color=n.color;
  const m=String(n.progress||'').match(/^\s*([\d.]+)\s*%?\s*;?\s*(.*)$/);
  if(t==='progress'&&m){s.setProperty('--progress-percent',Math.min(100,+m[1])+'%');s.setProperty('--progress-background',m[2]||'#1AF')}
  s.whiteSpace='pre-line';(n.children||[]).forEach(k=>el.append(view(k)));return el;
};
out(true);
})();
