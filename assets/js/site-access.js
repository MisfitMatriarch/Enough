/* Show the acknowledgement at the entrance once per tab visit, with a footer reread link. */
(()=>{
  const dialog=document.getElementById('aoc');
  const close=document.getElementById('aoc-enter');
  if(!dialog||!close||typeof dialog.showModal!=='function')return;
  const title=dialog.querySelector('h2');
  let origin=null;
  // If storage is unavailable, keep reading optional rather than interrupting every page.
  let seen=true;
  try{seen=sessionStorage.getItem('f2bm-aoc')==='1';}catch{}
  close.hidden=false;
  function open(trigger){
    if(dialog.open)return;
    origin=trigger||null;
    close.textContent=seen?'Return to website':'Enter website';
    dialog.showModal();
    if(title){title.tabIndex=-1;title.focus({preventScroll:true});}
  }
  close.addEventListener('click',()=>dialog.close());
  dialog.addEventListener('close',()=>{
    seen=true;
    try{sessionStorage.setItem('f2bm-aoc','1');}catch{}
    const listening=dialog.querySelector('[data-listen-btn][aria-pressed="true"]');
    if(listening)listening.click();
    if(location.hash==='#aoc')history.replaceState(null,'',location.pathname+location.search);
    if(origin){origin.focus({preventScroll:true});origin=null;}
    else{
      const main=document.querySelector('main');
      if(main){main.tabIndex=-1;main.focus({preventScroll:true});}
    }
  });
  document.querySelectorAll('a[href="#aoc"]').forEach(link=>{
    link.addEventListener('click',event=>{event.preventDefault();open(link);});
  });
  if(!seen||location.hash==='#aoc')open();
})();

(function(){
  var groups=[].slice.call(document.querySelectorAll('.site-header .nav-group'));
  if(!groups.length)return;
  function close(except){groups.forEach(function(g){if(g!==except){g.classList.remove('open');var b=g.querySelector('.nav-more');if(b)b.setAttribute('aria-expanded','false');}});}
  groups.forEach(function(g){
    var b=g.querySelector('.nav-more');if(!b)return;
    b.addEventListener('click',function(){var open=!g.classList.contains('open');close(g);g.classList.toggle('open',open);b.setAttribute('aria-expanded',String(open));});
    g.addEventListener('focusout',function(e){if(!g.contains(e.relatedTarget)){g.classList.remove('open');b.setAttribute('aria-expanded','false');}});
  });
  document.addEventListener('click',function(e){if(!e.target.closest('.nav-group'))close();});
  document.addEventListener('keydown',function(e){if(e.key!=='Escape')return;var g=document.activeElement&&document.activeElement.closest('.nav-group');close();if(g)g.querySelector('.nav-more').focus();});
})();

/* Optional introduction listening. Read public introduction text only, never form values. */
(()=>{
  const speech=window.speechSynthesis;
  if(!speech||typeof window.SpeechSynthesisUtterance!=='function')return;
  const opening=document.querySelector('main .page-hero,main .life-hero,main .brand-hero');
  const heading=opening&&opening.querySelector('h1');
  const parent=heading&&heading.parentElement;
  const label=parent&&parent.querySelector(':scope > .eyebrow, :scope > .hero-roles');
  if(!label)return;
  let button,active;
  function stop(){if(!active)return;active=null;speech.cancel();button.textContent='Listen';button.setAttribute('aria-pressed','false');button.setAttribute('aria-label','Listen to introduction');}
  function offer(){
    if(button||!speech.getVoices().length)return;
    button=document.createElement('button');button.type='button';button.className='intro-listen';button.textContent='Listen';button.setAttribute('aria-label','Listen to introduction');button.setAttribute('aria-pressed','false');
    label.appendChild(button);
    button.addEventListener('click',()=>{
      if(active){stop();return;}
      const lines=[heading.textContent,...[...parent.children].filter(el=>el.tagName==='P'&&el!==label).map(el=>el.textContent)];
      const utterance=new SpeechSynthesisUtterance(lines.join('. ').replace(/\s+/g,' ').trim());
      speech.cancel();utterance.lang='en-AU';utterance.rate=.95;active=utterance;
      button.textContent='Stop';button.setAttribute('aria-pressed','true');button.setAttribute('aria-label','Stop listening to introduction');
      function done(){if(active!==utterance)return;active=null;button.textContent='Listen';button.setAttribute('aria-pressed','false');button.setAttribute('aria-label','Listen to introduction');}
      utterance.onend=done;utterance.onerror=done;speech.speak(utterance);
    });
  }
  offer();speech.addEventListener('voiceschanged',offer);
  window.addEventListener('pagehide',stop);
  document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});
  document.addEventListener('keydown',event=>{if(event.key==='Escape')stop();});
})();
