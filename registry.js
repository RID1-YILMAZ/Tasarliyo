// BİLEŞEN KAYIT DEFTERİ: yeni bileşen/özellik eklemek = buraya bir satır.
// kind: text | number | color | select(options)   list: yazarken öneri listesi
const UI_ONERI=['flex-y','flex-x','space'];
const ORTAK=[
  {key:'text',label:'Metin',kind:'text'},
  {key:'ui',label:'ui',kind:'text',list:UI_ONERI},
  {key:'color',label:'Yazı rengi',kind:'color'},
  {key:'background',label:'Arka plan',kind:'color'},
  {key:'gap',label:'Boşluk (gap)',kind:'number',step:0.1}
];
// Bilinmeyen/özel türler bunu kullanır
const GENEL={label:'Özel',container:true,fields:ORTAK,defaults:{}};
const REGISTRY={
  box:{label:'Kutu',container:true,fields:ORTAK,defaults:{ui:'space'}},
  'flex-x':{label:'Yatay satır',container:true,fields:ORTAK,defaults:{ui:'flex-x',gap:0.3}}
  // Örnek (yeni bileşen bulunca): 
  // button:{label:'Buton',container:false,fields:[...ORTAK,{key:'url',label:'Bağlantı',kind:'text'}],defaults:{}}
};
const def=t=>REGISTRY[t]||GENEL;
