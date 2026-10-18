// KAYIT DEFTERİ: yeni bileşen, özellik ya da şablon eklemek = buraya bir satır.
// kind: text | number | color | select    chips: tıklanınca eklenen hazır değerler
const SEMBOL=['✦','★','●','➤','✔','⚠','🔥','📢','📜','🎉'];
const RENK=['#f97316','#38bdf8','#facc15','#c084fc','#4ade80','#f43f5e','#e6e9f2','#10141c'];
const DUZEN=[{v:'flex-y',l:'Dikey dizilim (flex-y)'},{v:'flex-x',l:'Yatay dizilim (flex-x)'},{v:'space',l:'Esnek alan (space)'}];
const ORTAK=[
  {key:'text',label:'Metin',kind:'text',chips:SEMBOL},
  {key:'ui',label:'Düzen',kind:'select',options:DUZEN},
  {key:'color',label:'Yazı rengi',kind:'color',chips:RENK},
  {key:'background',label:'Arka plan',kind:'color',chips:RENK},
  {key:'gap',label:'Boşluk',kind:'number',step:0.1}
];
const GENEL={label:'Özel',container:true,fields:ORTAK,defaults:{}};
const REGISTRY={
  box:{label:'Kutu',container:true,fields:ORTAK,defaults:{ui:'space'}},
  'flex-x':{label:'Yatay satır',container:true,fields:ORTAK,defaults:{ui:'flex-x',gap:0.3}}
  // Örnek: button:{label:'Buton',container:false,fields:[...ORTAK,{key:'url',label:'Bağlantı',kind:'text'}],defaults:{}}
};
const def=t=>REGISTRY[t]||GENEL;

const cell=(t,c)=>({type:'box',text:t,ui:'space',color:c});
const rowOf=(a,b)=>({type:'flex-x',ui:'flex-x',gap:0.3,children:[cell(...a),cell(...b)]});
const zebra=r=>{(r.children||[]).forEach((x,i)=>x.background=i%2?'#10141c':'#0d1118');return r};
const kok=(ch,g=0.2)=>zebra({type:'box',ui:'flex-y',gap:g,background:'#080a0f',children:ch});
const G='#4ade80';
const TEMPLATES=[
  {ad:'Rol tablosu',kur:()=>kok([
    rowOf(['✦ Founder','#f97316'],['Genel Yönetim',G]),
    rowOf(['✦ Co-Founder','#38bdf8'],['Ekip Sorumlusu & Sistem Denetimi',G]),
    rowOf(['✦ YARDIMCI YETKİLİ','#facc15'],['Chat Moderasyonu & Üye Desteği',G]),
    rowOf(['✦ STAJYER YETKİLİ','#c084fc'],['Kanal Takibi & Aday Moderatör',G])])},
  {ad:'Duyuru',kur:()=>kok([cell('📢 DUYURU','#facc15'),cell('Duyuru metnini buraya yaz','#e6e9f2')],0.3)},
  {ad:'Kurallar',kur:()=>kok([cell('📜 KURALLAR','#c084fc'),cell('1. Saygılı ol','#e6e9f2'),cell('2. Spam yapma','#e6e9f2'),cell('3. Reklam yasak','#e6e9f2')])},
  {ad:'Bilgi kartı',kur:()=>kok([rowOf(['Başlık','#38bdf8'],['Değer',G]),rowOf(['Başlık','#38bdf8'],['Değer',G])])},
  {ad:'Boş kart',kur:()=>({type:'box',ui:'flex-y',gap:0.2,background:'#080a0f',children:[]})}
];
