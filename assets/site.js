
(function(){
  var root=document.documentElement;
  var bEn=document.getElementById('lang-en'), bUa=document.getElementById('lang-ua');
  function setLang(l){
    if(l==='ua'){root.setAttribute('data-lang','ua');}else{root.removeAttribute('data-lang');l='en';}
    root.lang = l==='ua'?'uk':'en';
    bEn.setAttribute('aria-pressed', l==='en'); bUa.setAttribute('aria-pressed', l==='ua');
    try{localStorage.setItem('gh-lang',l);}catch(e){}
  }
  bEn.addEventListener('click',function(){setLang('en');});
  bUa.addEventListener('click',function(){setLang('ua');});
  var saved=null; try{saved=localStorage.getItem('gh-lang');}catch(e){}
  if(saved==='en' || (!saved && !/^(uk|ru)/i.test(navigator.language||''))) setLang('en'); else setLang('ua');

  var copy=document.getElementById('copy'), mail=document.getElementById('mail');
  var en=copy.querySelector('[lang-en]'), ua=copy.querySelector('[lang-ua]');
  function done(){ en.textContent='Copied'; ua.textContent='Скопійовано'; setTimeout(function(){ en.textContent='Copy address'; ua.textContent='Скопіювати адресу'; },1500); }
  function selectMail(){ var r=document.createRange(); r.selectNodeContents(mail); var s=window.getSelection(); s.removeAllRanges(); s.addRange(r); }
  copy.addEventListener('click',function(){
    var t=mail.textContent;
    if(navigator.clipboard && navigator.clipboard.writeText){ navigator.clipboard.writeText(t).then(done, selectMail); } else { selectMail(); }
  });
})();

(function(){var b=document.getElementById('menu'),n=document.getElementById('nav');if(!b||!n)return;
b.addEventListener('click',function(){var o=n.classList.toggle('open');b.setAttribute('aria-expanded',o);});})();
