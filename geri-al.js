// GERİ AL / YİNELE (Metin Tasarla). Yükleme: app.js'ten sonra.
(()=>{
const snap=()=>JSON.stringify({r:clean(root),a:$('#preT').value,b:$('#postT').value});
let cur=snap(),U1=[],R1=[],burst=0,busy=0;
const bu=h('button',{id:'bUndo',title:'Geri al'},'↶ Geri al'),br=h('button',{id:'bRedo',title:'Yinele'},'↷ Yinele');
$('#bDel').parentNode.append(bu,br);
const ui=()=>{bu.disabled=!U1.length;br.disabled=!R1.length};
const O=out;
out=function(k){
  O(k);const s=snap();if(s===cur)return;
  if(!busy){
    if(!burst){U1.push(cur);if(U1.length>100)U1.shift();R1=[]}
    clearTimeout(burst);burst=setTimeout(()=>burst=0,700);
  }
  cur=s;ui();
};
const go=(from,to)=>{
  if(!from.length)return;
  to.push(cur);cur=from.pop();busy=1;
  const d=JSON.parse(cur);
  root=tag(d.r);selId=root._id;$('#preT').value=d.a;$('#postT').value=d.b;
  props();out();busy=0;ui();
};
bu.onclick=()=>go(U1,R1);br.onclick=()=>go(R1,U1);
addEventListener('keydown',e=>{
  if(!(e.ctrlKey||e.metaKey)||/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)||$('#metin').offsetParent===null)return;
  const k=e.key.toLowerCase();
  if(k==='z'&&!e.shiftKey){e.preventDefault();bu.click()}
  else if(k==='y'||(k==='z'&&e.shiftKey)){e.preventDefault();br.click()}
});
ui();
})();
