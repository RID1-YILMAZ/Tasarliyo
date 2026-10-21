// TEMA-GERÇEK2: ana CSS'te olup araçta olmayan kart bileşenleri. Yükleme: tema-gercek.js'ten sonra, tema.js'ten önce.
(()=>{
const KAP2=[FL.text,FL.ui,FL.color,FL.bg,FL.gap,FL.size];
[3,4,5,6,7,8].forEach(i=>UI.push({v:'size-'+i,l:'Boyut '+i}));
const add=(t,o)=>{REGISTRY[t]=o;$('#addType').append(h('option',{value:t},lbl(t)))};
const say=l=>({label:l,container:false,fields:[FL.text,FL.ui,FL.size],defaults:{text:'Mesaj'}});
add('alert',say('Uyarı (kırmızı)'));add('success',say('Başarı (yeşil)'));add('info',say('Bilgi (mavi)'));
add('button',{label:'Buton (button)',container:true,fields:[FL.act,...KAP2],defaults:{text:'Buton',value:'btn'}});
add('image',{label:'Görsel (image)',container:false,fields:[FL.src,FL.ui],defaults:{src:LOGO}});
add('video',{label:'Video',container:false,fields:[FL.src,FL.ui],defaults:{src:'https://'}});
add('youtube',{label:'YouTube',container:false,fields:[FL.src,FL.code,FL.ui],defaults:{src:'https://www.youtube.com/embed/'}});
add('kick',{label:'Kick',container:false,fields:[FL.src,FL.code,FL.ui],defaults:{src:'https://'}});
add('frame',{label:'Çerçeve (iframe)',container:false,fields:[FL.src,FL.ui],defaults:{src:'https://',ui:'size-3'}});
add('window',{label:'Pencere (window)',container:false,fields:[FL.text,FL.src,FL.ui],defaults:{text:'Pencere',src:'https://',ui:'size-4'}});
let css='.marktop-youtube,.marktop-kick,.marktop-image,.marktop-video{border:none;border-radius:.5em;height:12em;width:21em;max-width:100%;object-fit:cover}.marktop-video{object-fit:contain}.marktop-window{display:flex;flex-direction:column;width:100%}.marktop-window-bar{height:2em;background:#8882;border-radius:.5em .4em 0 0;display:flex;align-items:center;overflow:hidden}.marktop-window-bar-title{padding:0 .5em;flex:1}.marktop-window-bar-close{width:2em;height:2em;display:flex;align-items:center;justify-content:center;background:#8882}.marktop-window-bar-close::after{content:"⏻"}.marktop-window-iframe{height:calc(100% - 2em);border:0;border-radius:0 0 .5em .5em;width:100%}';
for(let i=1;i<=8;i++)css+='.marktop-frame.marktop-size-'+i+',.marktop-window.marktop-size-'+i+'{width:100%;height:'+2*i+'em}';
const st=document.createElement('style');st.textContent=css;document.head.append(st);
const V0=view;
view=function(n){
  const t=n.type;
  if(!['image','video','youtube','kick','frame','window'].includes(t))return V0(n);
  const c=['marktop-'+t,...U(n).map(x=>'marktop-'+x)].join(' '),src=n.src||n.code||'';
  if(t==='image')return h('img',{class:c,src});
  if(t==='video')return h('video',{class:c,src,controls:true});
  if(t==='window')return h('div',{class:c},h('div',{class:'marktop-window-bar'},h('div',{class:'marktop-window-bar-title'},n.text||''),h('div',{class:'marktop-window-bar-close'})),h('iframe',{class:'marktop-window-iframe',src}));
  return h('iframe',{class:c,src});
};
// Nunito zaten yüklü: @import'a girmesin
const C=TMC.cssOf;
TMC.cssOf=w=>C(w).replace(/family=Nunito:wght@400;700&?/,'').replace(/@import url\('https:\/\/fonts\.googleapis\.com\/css2\?&?display=swap'\);\n\n/,'');
out(true);
})();
