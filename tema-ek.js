// TEMA-EK: mobil önizleme, şeffaflık, yazı tipleri, özel buton. Diğer dosyalara dokunmaz.
// Yükleme sırası: tema-cekirdek.js'ten sonra, tema.js'ten önce.
(()=>{
const st=document.createElement('style');
st.textContent='#metin.mob #chat{max-width:380px;margin:0 auto}#t-pv.mob{background:#05060a}#t-pv.mob #t-frame{width:390px!important;height:100%!important;transform:none!important;left:50%;margin-left:-195px;border-radius:16px}.al{display:flex;gap:8px;align-items:center}.al input{flex:1}';
document.head.append(st);
const $$=s=>document.querySelector(s);
// --- renk + şeffaflık yardımcıları ---
const A=c=>{c=String(c||'').trim();let m;
  if(m=c.match(/^#([0-9a-f])([0-9a-f])([0-9a-f])$/i))return{rgb:'#'+m[1]+m[1]+m[2]+m[2]+m[3]+m[3],a:1};
  if(m=c.match(/^(#[0-9a-f]{6})([0-9a-f]{2})?$/i))return{rgb:m[1],a:m[2]?parseInt(m[2],16)/255:1};
  return null};
const hx=(rgb,a)=>a>=1?rgb:rgb+Math.round(a*255).toString(16).padStart(2,'0');
// --- 2) Mobil önizleme tuşları ---
const mob=(btn,el,cls)=>{btn.onclick=()=>{btn.classList.toggle('on',el.classList.toggle(cls));try{window.dispatchEvent(new Event('resize'))}catch{}}};
const b1=h('button',{id:'bMob'},'📱 Mobil');$$('#bTest').parentNode.append(b1);mob(b1,$$('#metin'),'mob');
const b2=h('button',{id:'t-mob'},'📱 Mobil');$$('.t-tools').insertBefore(b2,$$('#t-sum'));mob(b2,$$('#t-pv'),'mob');
// --- 3) Şeffaflık: kart öğeleri (Metin Tasarla) ---
const P0=props;
props=function(){
  P0();const f=find(selId);if(!f)return;const n=f.n,b=$$('#props');
  [['background','Arka plan şeffaflığı'],['color','Yazı şeffaflığı']].forEach(([k,l])=>{
    const p=A(n[k]);
    if(!p){b.append(row(l,h('span',{class:'hint'},'Önce '+(k==='color'?'yazı':'arka plan')+' rengi seç (#rrggbb)')));return}
    const o=h('span',{},Math.round(p.a*100)+'%'),r=h('input',{type:'range',min:0,max:100,value:Math.round(p.a*100)});
    r.oninput=()=>{o.textContent=r.value+'%';set(n,k,hx(p.rgb,r.value/100))};r.onchange=()=>props();
    b.append(row(l,h('div',{class:'al'},r,o)));
  });
};
props();
// --- 3b) Şeffaflık: tema renkleri (Tema Tasarla) ---
const C0=TM_CTL.color;
TM_CTL.color=(p,v,set)=>{
  const w=C0(p,v,set),c=w.firstChild,t=w.lastChild,q=A(v)||{a:1};
  const o=h('span',{},Math.round(q.a*100)+'%'),r=h('input',{type:'range',min:0,max:100,value:Math.round(q.a*100),title:'şeffaflık'});
  const ti=t.oninput;
  t.oninput=()=>{ti();const x=A(t.value);if(x){r.value=Math.round(x.a*100);o.textContent=r.value+'%'}};
  c.oninput=c.onchange=()=>{t.value=hx(c.value,r.value/100);set(t.value)};
  r.oninput=()=>{o.textContent=r.value+'%';const x=A(t.value)||A(c.value);t.value=hx(x.rgb,r.value/100);set(t.value)};
  w.append(r,o);return w;
};
// --- 5) Yazı tipleri ---
const GF=['Nunito','Poppins','Roboto','Open Sans','Montserrat','Lato','Ubuntu','Inter','Oswald','Quicksand','Raleway','Comfortaa','Merriweather','Playfair Display','Pacifico','Lobster','Caveat','Bebas Neue','Fira Code','JetBrains Mono'];
GF.forEach(f=>{if(!TM_FONTS.includes(f))TM_FONTS.push(f)});
const gurl=a=>'https://fonts.googleapis.com/css2?'+a.map(n=>'family='+n.replace(/ /g,'+')+':wght@400;700').join('&')+'&display=swap';
const fr=document.getElementById('t-frame');
fr.addEventListener('load',()=>{try{const d=fr.contentDocument,l=d.createElement('link');l.rel='stylesheet';l.href=gurl(GF);d.head.append(l)}catch{}});
const C1=TMC.cssOf;
TMC.cssOf=w=>{const c=C1(w),u=GF.filter(f=>c.includes("'"+f+"'"));return(u.length?"@import url('"+gurl(u)+"');\n\n":'')+c};
// --- 4) Özel buton + pencere (yalnızca CSS ile) ---
const b3=h('button',{id:'t-cbtn'},'+ Özel buton');$$('.t-tools').insertBefore(b3,$$('#t-sum'));
b3.onclick=()=>{
  const par=(prompt('Buton nereye konsun? (CSS seçici)','body > header')||'').trim();if(!par)return;
  const tx=(prompt('Buton yazısı:','✦ Gençliğe Hitabe')||'').trim();if(!tx)return;
  const pop=(prompt('Basılınca ekranda çıkacak yazı:','')||'').trim();if(!pop)return;
  const q=s=>'"'+s.replace(/["\\\n]/g,' ')+'"',id='c'+Date.now(),{S,ST}=TMC;
  const mk=(i,sel,ad,d)=>{const e={id:id+i,ad,sel,custom:1};S.custom.push(e);const t=ST(e.id);t.d['']=d;t.a['']=structuredClone(d)};
  mk(1,par+'::after','Buton: '+tx,{content:q(tx),padding:'6px 14px',margin:'0 8px','background-color':'#DE11BA',color:'#ffffff','border-radius':'20px',cursor:'pointer','font-weight':'700'});
  mk(2,par+'::before','Pencere: '+tx,{content:q(pop),position:'fixed',top:'30%',left:'50%',transform:'translate(-50%, 0px)','z-index':'9999',padding:'24px','max-width':'80vw','background-color':'#181418',color:'#ffffff','border-radius':'14px','box-shadow':'0 0 40px #000000','white-space':'pre-wrap',opacity:'0','pointer-events':'none'});
  mk(3,par+':active::before','Pencere göster (basılıyken)',{opacity:'1'});
  TMC.save();TMC.renderAll();TMC.refCss();TMC.live();
};
})();
