// TEMA DENETİMLERİ: özellik türüne göre girdi kutuları (renk, uzunluk, gölge, gradyan...)
const TM_CTL=(()=>{
const HEX=/^#[0-9a-f]{6}$/i,keys=Object.keys;
return {
  color:(p,v,set)=>{
    const t=h('input',{value:v||'',placeholder:'#rrggbb ya da rgba()'}),c=h('input',{type:'color',value:HEX.test(v||'')?v:'#000000'});
    t.oninput=()=>{set(t.value);if(HEX.test(t.value))c.value=t.value};c.oninput=c.onchange=()=>{t.value=c.value;set(c.value)};
    return h('div',{class:'t-cr'},c,t);
  },
  num:(p,v,set)=>{
    const n=h('input',{type:'number',min:p.min,max:p.max,step:p.step||1,value:v??''}),r=h('input',{type:'range',min:p.min,max:p.max,step:p.step||1,value:v??p.min});
    n.oninput=()=>{r.value=n.value;set(n.value)};r.oninput=()=>{n.value=r.value;set(r.value)};
    return h('div',{class:'t-len'},r,n);
  },
  len:(p,v,set)=>{
    const m=/^(-?[\d.]+)(px|em|rem|%|vw|vh)$/.exec(v||''),au=v==='auto',u0=au?'auto':m?m[2]:p.u[0];
    const n=h('input',{type:'number',step:.5,value:m?m[1]:'',placeholder:'—',disabled:au}),
      u=h('select',{},...p.u.map(x=>h('option',{value:x,selected:x===u0},x))),
      r=h('input',{type:'range',min:p.min,max:p.max,step:(p.max-p.min)>100?1:.5,value:m?m[1]:p.min});
    const go=()=>{if(u.value==='auto'){n.disabled=true;set('auto');return}n.disabled=false;set(n.value===''?null:n.value+u.value)};
    n.oninput=()=>{r.value=n.value;go()};r.oninput=()=>{n.value=r.value;go()};u.onchange=go;
    return h('div',{class:'t-len'},r,n,u);
  },
  sel:(p,v,set)=>{
    const o=[...p.o];if(v&&!o.includes(v))o.push(v);
    return h('select',{onchange:ev=>set(ev.target.value||null)},h('option',{value:''},'—'),...o.map(x=>h('option',{value:x,selected:x===v},x)));
  },
  text:(p,v,set)=>h('input',{value:v||'',placeholder:p.ph||'',oninput:ev=>set(ev.target.value)}),
  font:(p,v,set)=>{
    const cur=(/^'([^']+)'/.exec(v||'')||[])[1]||v||'',o=[...TM_FONTS];if(cur&&!o.includes(cur))o.push(cur);
    const s=h('select',{onchange:()=>{let x=s.value;if(x==='__')x=(prompt('Yazı tipi adı:')||'').trim();
      if(!x){set(null);return}set(/^(system-ui|monospace|cursive|sans-serif|serif)$/.test(x)?x:"'"+x+"', sans-serif")}},
      h('option',{value:''},'—'),...o.map(x=>h('option',{value:x,selected:x===cur},x)),h('option',{value:'__'},'Özel…'));
    return s;
  },
  bgimg:(p,v,set,x)=>{
    let cur=v||'',mode=!cur?'url':/^url\(/.test(cur)?'url':/^(linear|radial)-gradient\(/.test(cur)?'grad':'raw';
    const put=x=>{cur=x;set(x)},box=h('div',{class:'t-bg'}),
      ms=h('select',{},...[['','— yok —'],['url','Görsel adresi (link)'],['grad','Gradyan'],['raw','Ham CSS']].map(([a,b])=>h('option',{value:a,selected:a===mode},b)));
    const draw=()=>{
      box.innerHTML='';
      if(mode==='url'){
        const m=/^url\(["']?(.*?)["']?\)$/.exec(cur),i=h('input',{value:m?m[1]:'',placeholder:'https://...'});
        const defs=()=>{if(x&&i.value&&!x.has('background-size')){x.other('background-size','cover');x.other('background-position','center');x.other('background-repeat','no-repeat');x.refresh()}};
        i.oninput=()=>put(i.value?'url("'+i.value+'")':null);i.onchange=defs;
        box.append(i,h('button',{onclick:()=>TM_wall(u=>{i.value=u;i.oninput();defs()})},'Duvar kâğıdı seç'));
      }else if(mode==='grad'){
        const g=/^(linear|radial)-gradient\((?:(-?[\d.]+)deg,\s*|circle,\s*)?(.*)\)$/.exec(cur)||[],cs=(g[3]||'').split(/,\s*(?![^()]*\))/);
        const ty=h('select',{},...['linear','radial'].map(x=>h('option',{value:x,selected:g[1]===x},x))),
          an=h('input',{type:'number',value:g[2]??135,title:'açı',placeholder:'açı °'}),
          cc=[0,1,2].map(i=>h('input',{type:'color',value:HEX.test(cs[i]||'')?cs[i]:['#DE11BA','#181418','#000000'][i],title:'renk '+(i+1)}));
        const c3=h('input',{type:'checkbox',checked:cs.length>2,title:'3. renk'});
        const go=()=>{const col=[cc[0].value,cc[1].value,...(c3.checked?[cc[2].value]:[])].join(', ');
          put(ty.value==='linear'?'linear-gradient('+(an.value||0)+'deg, '+col+')':'radial-gradient(circle, '+col+')')};
        [ty,an,...cc,c3].forEach(i=>{i.oninput=go;i.onchange=go});
        box.append(ty,an,...cc,h('label',{class:'chk'},c3,'3. renk'));
        if(!g[0])go();
      }else if(mode==='raw'){const i=h('input',{value:cur,placeholder:'ham CSS değeri'});i.oninput=()=>put(i.value);box.append(i)}
    };
    ms.onchange=()=>{mode=ms.value;if(!mode)put(null);draw()};draw();
    return h('div',{},ms,box);
  },
  border:(p,v,set)=>{
    const m=/^(-?[\d.]+)px\s+(\w+)\s+(.+)$/.exec(v||'');
    const w=h('input',{type:'number',min:0,step:.5,value:m?m[1]:'',placeholder:'px'}),
      s=h('select',{},...['solid','dashed','dotted','double','groove','ridge','none'].map(x=>h('option',{value:x,selected:m&&m[2]===x},x))),
      c=h('input',{type:'color',value:m&&HEX.test(m[3])?m[3]:'#888888'});
    const go=()=>set(w.value===''?null:w.value+'px '+s.value+' '+c.value);w.oninput=go;s.onchange=go;c.oninput=go;
    return h('div',{class:'t-len'},w,s,c);
  },
  shadow:(p,v,set)=>{
    const m=/^(inset\s+)?(-?[\d.]+)px\s+(-?[\d.]+)px\s+([\d.]+)px(?:\s+(-?[\d.]+)px)?\s+(.+)$/.exec(v||'')||[];
    const f=(x,t)=>h('input',{type:'number',placeholder:t,title:t,value:x??'',step:1}),
      sx=f(m[2],'x'),sy=f(m[3],'y'),sb=f(m[4],'bulanıklık'),ss=f(m[5],'yayılma'),
      sc=h('input',{type:'color',value:m[6]&&HEX.test(m[6])?m[6]:'#000000'}),si=h('input',{type:'checkbox',checked:!!m[1]});
    const go=()=>{if([sx,sy,sb].every(i=>i.value===''))return set(null);
      set((p.lite||!si.checked?'':'inset ')+(sx.value||0)+'px '+(sy.value||0)+'px '+(sb.value||0)+'px '+(p.lite?'':(ss.value||0)+'px ')+sc.value)};
    [sx,sy,sb,ss,sc,si].forEach(i=>{i.oninput=go;i.onchange=go});
    return h('div',{class:'t-len'},sx,sy,sb,...(p.lite?[]:[ss,h('label',{class:'chk'},si,'iç')]),sc);
  },
  fx:(p,v,set)=>{
    const m=/^([\w-]+)\((-?[\d.]+)(px|deg)?\)$/.exec(v||''),F={blur:'px','hue-rotate':'deg',brightness:'',contrast:'',saturate:'',grayscale:'',sepia:'',invert:'',opacity:''};
    const s=h('select',{},...keys(F).map(x=>h('option',{value:x,selected:m&&m[1]===x},x))),n=h('input',{type:'number',step:.1,value:m?m[2]:'',placeholder:'değer'});
    const go=()=>set(n.value===''?null:s.value+'('+n.value+F[s.value]+')');s.onchange=go;n.oninput=go;
    return h('div',{class:'t-len'},s,n);
  },
  transform:(p,v,set)=>{
    const tr=/translate\((-?[\d.]+)px,\s*(-?[\d.]+)px\)/.exec(v||''),ro=/rotate\((-?[\d.]+)deg\)/.exec(v||''),sc=/scale\(([\d.]+)\)/.exec(v||'');
    const f=(x,t,st)=>h('input',{type:'number',step:st,placeholder:t,title:t,value:x??''}),
      tx=f(tr&&tr[1],'X px',1),ty=f(tr&&tr[2],'Y px',1),rt=f(ro&&ro[1],'döndür °',1),sl=f(sc&&sc[1],'ölçek',.05);
    const go=()=>{const a=[];if(tx.value!==''||ty.value!=='')a.push('translate('+(tx.value||0)+'px, '+(ty.value||0)+'px)');
      if(rt.value!=='')a.push('rotate('+rt.value+'deg)');if(sl.value!=='')a.push('scale('+sl.value+')');set(a.join(' ')||null)};
    [tx,ty,rt,sl].forEach(i=>i.oninput=go);return h('div',{class:'t-len'},tx,ty,rt,sl);
  },
  trans:(p,v,set)=>{
    const m=/^all\s+(\d+)ms\s+(\S+)$/.exec(v||''),
      n=h('input',{type:'range',min:0,max:1500,step:50,value:m?m[1]:0}),
      s=h('select',{},...['ease','linear','ease-in','ease-out','ease-in-out'].map(x=>h('option',{value:x,selected:m&&m[2]===x},x))),
      o=h('span',{class:'hint'},(m?m[1]:0)+'ms');
    const go=()=>{o.textContent=n.value+'ms';set(n.value==='0'?null:'all '+n.value+'ms '+s.value)};n.oninput=go;s.onchange=go;
    return h('div',{class:'t-len'},n,o,s);
  }
};
})();
