
(function(){
  var nav=document.getElementById('nav'),mb=document.getElementById('menuBtn');
  if(mb){mb.onclick=function(){var o=nav.classList.toggle('open');mb.setAttribute('aria-expanded',o)};}
  // tabs (home menu preview / gallery filters / menu switch)
  document.querySelectorAll('[data-tabs]').forEach(function(group){
    var btns=group.querySelectorAll('button');
    btns.forEach(function(b){b.addEventListener('click',function(){
      btns.forEach(function(x){x.setAttribute('aria-selected',x===b)});
      var f=b.dataset.filter, scope=document.querySelector(group.dataset.tabs);
      if(!scope) return;
      scope.querySelectorAll('[data-cat]').forEach(function(el){el.hidden=!(f==='all'||el.dataset.cat.indexOf(f)>-1)});
    })});
  });
  // menu page jump buttons
  document.querySelectorAll('[data-jump]').forEach(function(b){b.addEventListener('click',function(){
    var t=document.getElementById(b.dataset.jump); if(t) t.scrollIntoView({behavior:'smooth',block:'start'});
  })});
  // enquiry form (front-end only for now)
  var f=document.getElementById('enq');
  if(f){f.addEventListener('submit',function(e){
    e.preventDefault();
    var n=document.getElementById('f-name'),p=document.getElementById('f-phone');
    if(!n.value.trim()||!p.value.trim()){(n.value.trim()?p:n).focus();return}
    document.getElementById('ok').hidden=false; f.reset();
  });}
  // gallery lightbox
  var items=[].slice.call(document.querySelectorAll('.gal-full button'));
  if(items.length){
    var lb=document.getElementById('lb'),li=lb.querySelector('img'),lc=lb.querySelector('p'),cur=0;
    function vis(){return items.filter(function(x){return !x.hidden})}
    function open(i){var v=vis();cur=(i+v.length)%v.length;var im=v[cur].querySelector('img');li.src=im.src;li.alt=im.alt;lc.textContent=im.alt;lb.hidden=false;lb.querySelector('.x').focus()}
    items.forEach(function(b){b.addEventListener('click',function(){open(vis().indexOf(b))})});
    lb.querySelector('.x').onclick=function(){lb.hidden=true};
    lb.querySelector('.pv').onclick=function(){open(cur-1)};
    lb.querySelector('.nx').onclick=function(){open(cur+1)};
    lb.addEventListener('click',function(e){if(e.target===lb)lb.hidden=true});
    document.addEventListener('keydown',function(e){if(lb.hidden)return;if(e.key==='Escape')lb.hidden=true;if(e.key==='ArrowLeft')open(cur-1);if(e.key==='ArrowRight')open(cur+1)});
  }
  // gentle lift-in for content below the fold
  if(!matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){en.target.classList.remove('pre');io.unobserve(en.target)}})},{threshold:.12});
    document.querySelectorAll('.reveal').forEach(function(el){if(el.getBoundingClientRect().top>innerHeight){el.classList.add('pre');io.observe(el)}});
  }
})();
