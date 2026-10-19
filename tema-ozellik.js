// CSS özellikleri. t: renk/num/len/sel/text/font/bgimg/border/shadow/fx/transform/trans
const _l=(k,l,min,max,u)=>({k,l,t:'len',min,max,u:u||['px','em','rem','%']});
const _s=(k,l,o)=>({k,l,t:'sel',o});
const _c=(k,l)=>({k,l,t:'color'});
const _n=(k,l,min,max,step)=>({k,l,t:'num',min,max,step});
const _SIDE=[['top','Üst'],['right','Sağ'],['bottom','Alt'],['left','Sol']];
const _SZ=['px','%','vw','vh','em','rem','auto'];
const TM_PROPS=[
  {g:'Renkler',open:1,p:[_c('color','Yazı rengi'),_c('background-color','Arka plan rengi'),_n('opacity','Saydamlık',0,1,.05)]},
  {g:'Arka plan görseli',p:[{k:'background-image',l:'Arka plan görseli',t:'bgimg'},
    _s('background-size','Boyut',['auto','cover','contain','100% 100%']),
    _s('background-position','Konum',['center','top','bottom','left','right','top left','top right','bottom left','bottom right']),
    _s('background-repeat','Tekrar',['no-repeat','repeat','repeat-x','repeat-y']),
    _s('background-attachment','Sabitleme',['scroll','fixed','local']),
    _s('background-blend-mode','Karışım modu',['normal','multiply','screen','overlay','darken','lighten','color-dodge','soft-light','hard-light','difference'])]},
  {g:'Yazı',p:[{k:'font-family',l:'Yazı tipi',t:'font'},_l('font-size','Boyut',8,60),
    _s('font-weight','Kalınlık',['100','200','300','400','500','600','700','800','900']),_s('font-style','Stil',['normal','italic']),
    _l('letter-spacing','Harf aralığı',-2,10,['px','em']),_n('line-height','Satır yüksekliği',0.8,3,.05),
    _s('text-align','Hizalama',['left','center','right','justify']),_s('text-transform','Harf biçimi',['none','uppercase','lowercase','capitalize']),
    _s('text-decoration','Çizgi',['none','underline','line-through','overline']),{k:'text-shadow',l:'Yazı gölgesi',t:'shadow',lite:1},
    {k:'content',l:'content (::before / ::after için)',t:'text',ph:'"★ "'}]},
  {g:'İç boşluk (padding)',p:_SIDE.map(([s,l])=>_l('padding-'+s,l,0,80))},
  {g:'Dış boşluk (margin)',p:_SIDE.map(([s,l])=>_l('margin-'+s,l,-40,80))},
  {g:'Kenarlık',p:[{k:'border',l:'Dört kenar',t:'border'},..._SIDE.map(([s,l])=>({k:'border-'+s,l:l+' kenar',t:'border'})),{k:'outline',l:'Dış çizgi (outline)',t:'border'}]},
  {g:'Köşe yuvarlama',p:[_l('border-radius','Tüm köşeler',0,60,['px','%','em']),
    ...[['top-left','Sol üst'],['top-right','Sağ üst'],['bottom-right','Sağ alt'],['bottom-left','Sol alt']].map(([s,l])=>_l('border-'+s+'-radius',l,0,60,['px','%','em']))]},
  {g:'Gölge & efekt',p:[{k:'box-shadow',l:'Kutu gölgesi',t:'shadow'},{k:'filter',l:'Filtre',t:'fx'},{k:'backdrop-filter',l:'Arka plan filtresi (cam efekti)',t:'fx'},
    _s('mix-blend-mode','Karışım modu',['normal','multiply','screen','overlay','difference','lighten','darken']),
    {k:'transform',l:'Dönüşüm (kaydır / döndür / ölçekle)',t:'transform'},{k:'transition',l:'Geçiş süresi',t:'trans'},
    _s('cursor','İmleç',['default','pointer','text','move','not-allowed','grab','crosshair','help','wait']),_s('pointer-events','Tıklanabilirlik',['auto','none'])]},
  {g:'Boyut & konum',p:[_l('width','Genişlik',0,1200,_SZ),_l('height','Yükseklik',0,1200,_SZ),_l('min-width','En az genişlik',0,1200,_SZ),_l('min-height','En az yükseklik',0,1200,_SZ),
    _l('max-width','En çok genişlik',0,1600,_SZ),_l('max-height','En çok yükseklik',0,1600,_SZ),
    _s('display','Görünüm (none = gizle)',['none','block','flex','grid','inline-block','inline','inline-flex']),
    _s('position','Konumlandırma',['static','relative','absolute','fixed','sticky']),
    ..._SIDE.map(([s,l])=>_l(s,l+' konum',-200,600,['px','%','vw','vh'])),_n('z-index','Katman (z-index)',-10,100,1),
    _s('overflow','Taşma',['visible','hidden','auto','scroll']),_s('flex-direction','Flex yönü',['row','column','row-reverse','column-reverse']),
    _s('flex-wrap','Flex satır kırma',['nowrap','wrap']),_s('justify-content','Yatay hizalama (flex)',['flex-start','center','flex-end','space-between','space-around','space-evenly']),
    _s('align-items','Dikey hizalama (flex)',['stretch','flex-start','center','flex-end','baseline']),_l('gap','Öğeler arası boşluk',0,80)]},
  {g:'Kaydırma çubuğu',p:[_s('scrollbar-width','Kalınlık',['auto','thin','none']),{k:'scrollbar-color',l:'Renk (tutacak iz)',t:'text',ph:'#888 #222'}]}
];
