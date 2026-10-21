// UYUM: yeni arayüzde #t-sum artık .t-ayar içinde; "şunun önüne ekle" çağrıları eskisi gibi çalışsın.
(()=>{
const o=Node.prototype.insertBefore;
Node.prototype.insertBefore=function(n,r){
  if(r&&r.parentNode!==this&&this.contains(r))return r.parentNode.insertBefore(n,r);
  return o.call(this,n,r);
};
})();
