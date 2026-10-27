// KAYIT DEFTERİ: yeni bileşen, özellik ya da şablon eklemek = buraya bir satır.
// kind: text | area | number | color | multi | progress | action    chips: tıklanınca eklenen hazır değerler
const SEMBOL=['✦','★','●','➤','✔','⚠','🔥','📢','📜','🎉','💰','⭐','🎁','⚙','←','→'];
const RENK=['#f97316','#38bdf8','#facc15','#c084fc','#4ade80','#f43f5e','#e6e9f2','#10141c'];
// ui değerleri — base CSS'e göre tüm düzen seçenekleri
const UI=[
  // flex
  {v:'flex-x',l:'Yatay diz (row)'},{v:'flex-y',l:'Dikey diz (column)'},
  {v:'flex-cx',l:'Yatay ortalı (row+center)'},{v:'flex-center',l:'Tam ortalı'},
  {v:'flex-sx',l:'Yatay, aralarına boşluk'},{v:'flex-cy',l:'Dikey ortalı'},
  // ızgara
  {v:'grid-2',l:'2 sütun ızgara'},{v:'grid-3',l:'3 sütun ızgara'},
  {v:'grid-4',l:'4 sütun ızgara'},{v:'grid-5',l:'5 sütun ızgara'},
  // genel
  {v:'space',l:'Kalan alanı doldur (flex:1)'},{v:'center',l:'Öğeleri ortala (align-items)'},
  {v:'box',l:'Çerçeveli kutu'},{v:'muted',l:'Soluk yazı'},
  // ikon boyutu
  {v:'size-1',l:'Küçük (1em)'},{v:'size-2',l:'Orta (2em)'},{v:'size-3',l:'Büyük (3em)'},
  {v:'size-4',l:'Çok büyük (4em)'}
];
const LOGO='https://cdn.topluyo.com/logo/689af99661b01.svg';
// Buton işlevleri: örnek kartlarda görülen kullanımlar (menu_action + value). Ne yapacağını bu değerleri okuyan bot belirler.
const ISLEM=[
  {v:'home',l:'Ana menü'},{v:'back',l:'Geri'},{v:'close',l:'Kapat'},{v:'settings:home',l:'Ayarlar'},
  {v:'launcher:run',l:'Ara / çalıştır'},{v:'section:',l:'Bölüm aç…',ek:true}
];
const FL={
  text:{key:'text',label:'Metin',kind:'area',chips:SEMBOL},
  ph:{key:'placeholder',label:'İpucu yazısı (placeholder)',kind:'text'},
  ui:{key:'ui',label:'Düzen / stil (ui)',kind:'multi',options:UI},
  color:{key:'color',label:'Yazı rengi',kind:'color',chips:RENK},
  bg:{key:'background',label:'Arka plan',kind:'color',chips:RENK},
  gap:{key:'gap',label:'Boşluk (gap)',kind:'number',step:0.05},
  size:{key:'size',label:'Yazı boyutu (size)',kind:'number',step:0.05},
  name:{key:'name',label:'Ad (name)',kind:'text'},
  code:{key:'code',label:'Kod (code)',kind:'text'},
  src:{key:'src',label:'Görsel adresi (src)',kind:'text'},
  max:{key:'maxlength',label:'En fazla karakter (maxlength)',kind:'number',step:1},
  prog:{key:'progress',label:'İlerleme (yüzde ve renk)',kind:'progress'},
  act:{key:'value',keys:['value','name','code'],label:'Buton işlevi (basınca ne olsun)',kind:'action'}
};
const KAP=[FL.text,FL.ui,FL.color,FL.bg,FL.gap,FL.size];
const GENEL={label:'Özel',container:true,fields:KAP,defaults:{}};
const REGISTRY={
  box:{label:'Kutu',container:true,fields:KAP,defaults:{ui:'space'}},
  'flex-x':{label:'Yatay satır',container:true,fields:KAP,defaults:{}},
  'flex-y':{label:'Dikey sütun',container:true,fields:KAP,defaults:{}},
  'flex-cx':{label:'Yatay (ortalı)',container:true,fields:KAP,defaults:{}},
  grid:{label:'Izgara',container:true,fields:KAP,defaults:{}},
  space:{label:'Metin satırı',container:false,fields:[FL.text,FL.ui,FL.color,FL.bg,FL.size],defaults:{text:'Metin'}},
  bumote:{label:'Buton',container:true,fields:[FL.act,FL.text,FL.ui,FL.color,FL.bg,FL.gap,FL.size],defaults:{text:'Buton',value:'btn'}},
  input:{label:'Giriş kutusu',container:false,fields:[FL.text,FL.ph,FL.name,FL.max,FL.ui,FL.color,FL.bg,FL.size],defaults:{text:'Yaz...',name:'alan',ui:'space'}},
  icon:{label:'İkon / görsel',container:false,fields:[FL.src,FL.ui,FL.size],defaults:{src:LOGO,ui:'size-2'}},
  progress:{label:'İlerleme çubuğu',container:true,fields:[FL.prog,FL.ui,FL.color,FL.bg,FL.gap,FL.size],defaults:{progress:'50%;#1AF'}},
  '':{label:'Düz metin (türsüz)',container:false,fields:[FL.text,FL.ui,FL.color,FL.size],defaults:{text:'Metin'}}
};
const def=t=>REGISTRY[t]||GENEL;

// ---- Şablon yapı taşları ----
const LINE='━━━━━━━━━━━━━━━━';
const T=(text,o)=>({type:'space',text,...o});
const B=(text,value,o)=>({type:'bumote',text,value,...o});
const FX=(children,o)=>({type:'flex-x',children,...o});
const FY=(children,o)=>({type:'flex-y',children,...o});
const CX=(children,o)=>({type:'flex-cx',children,...o});
const GR=children=>({type:'grid',children});
const IC=n=>({type:'icon',ui:'size-'+n,src:LOGO});
const CARD=children=>({type:'flex-y',ui:'box',children});
const cell=(t,c)=>({type:'box',text:t,ui:'space',color:c});
const rowOf=(a,b)=>({type:'flex-x',ui:'flex-x',gap:0.3,children:[cell(...a),cell(...b)]});
const zebra=r=>{(r.children||[]).forEach((x,i)=>x.background=i%2?'#10141c':'#0d1118');return r};
const kok=(ch,g=0.2)=>zebra({type:'box',ui:'flex-y',gap:g,background:'#080a0f',children:ch});
const G='#4ade80';
const asc=s=>s.replace(/ı/g,'i').replace(/ş/g,'s').replace(/ç/g,'c').replace(/ö/g,'o').replace(/ü/g,'u').replace(/ğ/g,'g');
const grp=(ad,k)=>({type:'flex-y',ui:'box',children:[FY([T('🛡️ '+ad),FX(k.map(c=>B('!'+c,undefined,{code:asc(c)})))])]});
const bx=(t,c,s)=>({type:'box',text:t,ui:'muted',color:c,size:s});
const mb=(t,v,bg)=>({type:'bumote',name:'menu_action',value:v,text:t,background:bg,ui:'space'});
const PNL=ch=>({type:'box',ui:'flex-y',gap:0.35,background:'#080a0f',children:ch});
const HERO=(a,b,c)=>({type:'box',ui:'flex-y',gap:0.15,background:'#10141c',children:[bx(a,'#60a5fa',0.85),bx(b,'#f1f5f9',1.3),bx(c,'#64748b')]});
const ROZ=a=>({type:'flex-x',ui:'flex-x',gap:0.3,background:'#0d1118',children:a.map(([t,c])=>({type:'box',text:t,ui:'space',color:c}))});
const ARA=p=>({type:'flex-x',ui:'flex-x',gap:0.3,background:'#10141c',children:[{type:'input',ui:'space',name:'launcher_query',placeholder:p,maxlength:80,background:'#171c26'},mb('ARA','launcher:run','#2563eb')]});
const MENU=(b,rows)=>({type:'box',ui:'flex-y',gap:0.2,background:'#0d1118',children:[bx(b,'#64748b',0.8),...rows.map(r=>({type:'flex-x',ui:'flex-x',gap:0.25,children:r.map(x=>mb(...x))}))]});
const ALT=a=>({type:'flex-x',ui:'flex-x',gap:0.25,background:'#10141c',children:a.map(x=>mb(...x))});
const IMZ=(a,b)=>({type:'box',ui:'flex-x',gap:0.3,background:'#080a0f',children:[bx(a,'#60a5fa',0.8),bx('//','#334155',0.8),bx(b,'#475569',0.8)]});
const opt=(t,p,c,oy)=>({type:'bumote',ui:'flex-y,box',gap:'0.2',children:[{text:t},{type:'progress',progress:p+'%;'+c,children:[FX([{text:p+'%',ui:'space'},{text:oy+' Oy'}])]}]});
const ALTSIRA=[['🎁 ETKİNLİK','section:extras','#78350f'],['⚙ AYARLAR','settings:home','#1e293b'],['⌂ ANA MENÜ','home','#1e293b'],['← GERİ','back','#1e293b'],['× ÇIKIŞ','close','#7f1d1d']];

const TEMPLATES=[
  {ad:'Rol tablosu',kur:()=>kok([
    rowOf(['✦ Founder','#f97316'],['Genel Yönetim',G]),
    rowOf(['✦ Co-Founder','#38bdf8'],['Ekip Sorumlusu & Sistem Denetimi',G]),
    rowOf(['✦ YARDIMCI YETKİLİ','#facc15'],['Chat Moderasyonu & Üye Desteği',G]),
    rowOf(['✦ STAJYER YETKİLİ','#c084fc'],['Kanal Takibi & Aday Moderatör',G])])},
  {ad:'Duyuru',kur:()=>kok([cell('📢 DUYURU','#facc15'),cell('Duyuru metnini buraya yaz','#e6e9f2')],0.3)},
  {ad:'Kurallar',kur:()=>kok([cell('📜 KURALLAR','#c084fc'),cell('1. Saygılı ol','#e6e9f2'),cell('2. Spam yapma','#e6e9f2'),cell('3. Reklam yasak','#e6e9f2')])},
  {ad:'Bilgi kartı',kur:()=>kok([rowOf(['Başlık','#38bdf8'],['Değer',G]),rowOf(['Başlık','#38bdf8'],['Değer',G])])},
  {ad:'Evet / Hayır',kur:()=>CARD([
    CX([IC(2),T('Seçimizi Yapınız =)'),{type:'bumote',value:'1',ui:'flex-cx',children:[IC(1),{text:'Evet'}]},B('❌ Hayır','0')]),
    FX([{type:'input',text:'Adını yaz',name:'name',ui:'space'},B('Gönder','send')]),
    GR(['😍','🥳','😂','🤔','🤖','🐺'].map((e,i)=>B(e,'e'+(i+1),{ui:'flex-center'})))])},
  {ad:'Anket',pre:'Hangisine katılıyorsunuz?',kur:()=>FY([opt('Evet katılıyorum',20,'#1AF',1),opt('Hayır katılmıyorum',80,'#F84',4)],{size:'0.85',gap:'.4'})},
  {ad:'Bilgi yarışması',kur:()=>CARD([CX([IC(2),T('🎯 Bilgi Yarışması')]),T("❓ Türkiye'nin başkenti hangisidir?"),
    ...[['A','🅰️ İstanbul'],['B','🅱️ Ankara'],['C','🇨 İzmir'],['D','🇩 Bursa']].map(([v,t])=>({type:'bumote',value:v,ui:'flex-cx',children:[T(t)]})),
    T('👇 Bir şık seçerek cevabını gönder.')])},
  {ad:'Profil kartı',kur:()=>CARD([CX([IC(2),FY([T('👤 KAPTAN'),T('🏆 Seviye 42')],{ui:'space'})]),
    GR([T('💰 Coin\n12.540'),T('⭐ XP\n87%'),T('🎮 Oyun\n245'),T('❤️ Beğeni\n891')]),
    FX([B('👤 Profil','profile',{ui:'space'}),B('💬 Mesaj','message',{ui:'space'}),B('➕ Ekle','friend',{ui:'space'})])])},
  {ad:'Günlük ödül',kur:()=>CARD([T('🎁 GÜNLÜK ÖDÜL'),IC(2),T(LINE),T('💰 Kazandığın Ödül'),T('2.500 Coin'),T('🔥 Yarın tekrar gelerek daha büyük ödül kazan!'),T(LINE),
    FX([B('🎁 Topla','claim',{ui:'space'}),B('⏰ Sonra','later',{ui:'space'})])])},
  {ad:'Rol marketi',kur:()=>CARD([CX([IC(2),T('🛒 XP ROL MARKETİ')]),T(LINE),
    ...[['vip','🌙 C VIP of Turk','1.000 XP'],['hakan','☀️ C Hakan of Turks','900 XP'],['glory','🦅 C Glory of Turk','800 XP'],['king','👑 ★ King of Turk','700 XP'],['imparator','🛡️ ★ İmparator of Turk','600 XP'],['herkul','🪓 ★ Herkül of Turk','500 XP']]
      .map(([v,a,b])=>({type:'bumote',value:v,ui:'flex-cx',children:[T(a),T(b)]})),
    T(LINE),FX([B('🛍️ Satın Al','buy'),B('📜 Rollerim','roles')])])},
  {ad:'Envanter',kur:()=>CARD([CX([IC(2),FY([T('👤 KAPTAN'),T('⭐ Seviye 47 • ✨ 18.450 XP • 🚀 Turbo x3')],{ui:'space'})]),T(LINE),T('🎒 ENVANTER'),
    GR([['key15','🔑\n15$\nKEY'],['key7','🗝️\n7$\nKEY'],['vp1500','💎\n1500\nVP'],['battlepass','🎫\nBattle\nPass'],...[1,2,3,4].map(i=>['empty'+i,'⬜'])].map(([v,t])=>B(t,v,{ui:'flex-center'}))),
    T(LINE),FX([B('📦 Kullan','use'),B('❌ Kapat','close')])])},
  {ad:'Yardım menüsü',kur:()=>FY([T('⚔️ Yardım Menüsü'),
    grp('LEVEL',['seviye','seviyeayar','seviyerol','xpkanal']),grp('ROL',['rolal','rolbilgi','rolliste','rolver']),
    grp('GENEL',['anket','ayarlar','davet','ping','sil','yardım','çekiliş']),grp('MODERATOR',['ban','kick','unban']),
    T('──────────────────────────'),T('Skål! Diyar güvende.')])},
  {ad:'XP kartı',kur:()=>({type:'flex-y',ui:'box',background:'#10141c',children:[
    CX([IC(2),FY([T('⭐ KULLANICI'),T('📌 Mevcut Seviye: 2')],{ui:'space'})]),
    GR([T('⚡ Toplam XP\n15 / 500 (%3)'),T('💬 Mesaj XP\n0 XP'),T('🎙️ Ses XP\n0 XP'),T('🎯 Kalan XP\n485 XP')]),
    FX([B('📊 İlerleme Durumu','profile',{ui:'space'}),B('░░░░░░░░░░ %3','message',{ui:'space'}),B('⭐ Seviye 2','friend',{ui:'space'})])]})},
  {ad:'Komut merkezi',kur:()=>PNL([HERO('COMMAND CENTER','Yardım Merkezi','Komut seç veya hızlıca ara.'),
    ROZ([['● ONLINE','#4ade80'],['⚡ QUICK','#facc15'],['◆ SECURE','#60a5fa']]),ARA('Komut veya özellik ara...'),
    MENU('MAIN MENU',[[['01  GENEL  →','section:general','#17253a'],['02  MOD  →','section:moderation','#21182d'],['03  ÜYELER  →','section:community','#14251d']],
      [['04  ROLLER  →','section:roles','#27200f'],['05  XP / LEVEL  →','section:progression','#26162a'],['06  SİSTEM  →','section:management','#12251f']]]),
    ALT(ALTSIRA),IMZ('BOT','COMMAND CENTER')])},
  {ad:'Topluluk tanıtımı',post:'**[SUNUCUYA KATIL](https://topluyo.com/davet-kodunu-buraya-yaz)**',kur:()=>PNL([
    HERO('👑 ✦ TOPLULUK SARAYI ✦ 🏰','Birlikte Daha Güçlüyüz!','Yeni insanlarla tanışabileceğin ve kendine ait bir ortam bulabileceğin topluluk sunucumuza hoş geldin.'),
    ROZ([['● 313 KULLANICI','#4ade80'],['⚡ AKTİF SOHBET','#facc15'],['◆ BAĞIMSIZ','#60a5fa']]),
    MENU('NEDEN BİZ?',[[['01  💬 Samimi Sohbet  →','section:general','#17253a'],['02  🎉 Etkinlikler  →','section:moderation','#21182d'],['03  🎨 Paylaşım  →','section:community','#14251d']],
      [['04  🤝 Dayanışma  →','section:roles','#27200f'],['05  🛍️ Özel Alanlar  →','section:progression','#26162a'],['06  ⚡ Özgür Yapı  →','section:management','#12251f']]]),
    IMZ('TÜRK','BAĞIMSIZ TOPLULUK')])},
  {ad:'Boş kart',kur:()=>({type:'box',ui:'flex-y',gap:0.2,background:'#080a0f',children:[]})}
];
