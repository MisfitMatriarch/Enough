/* Escape, focus containment and return focus for the existing acknowledgement. */
(()=>{
  const dialog=document.getElementById('aoc');
  const close=document.getElementById('aoc-enter');
  const reopen=document.getElementById('aoc-reopen');
  if(!dialog||!close)return;
  let origin=null;
  if(reopen)reopen.addEventListener('click',()=>{origin=reopen;});
  close.addEventListener('click',()=>{if(origin){origin.focus();origin=null;}});
  document.addEventListener('keydown',event=>{
    if(!document.body.classList.contains('aoc-overlay'))return;
    if(event.key==='Escape'){event.preventDefault();close.click();return;}
    if(event.key!=='Tab')return;
    const items=[...dialog.querySelectorAll('button:not([hidden]),a[href],input,select,textarea,[tabindex="0"]')].filter(el=>el.getClientRects().length);
    if(!items.length)return;
    const first=items[0],last=items[items.length-1];
    if(event.shiftKey&&(document.activeElement===first||!dialog.contains(document.activeElement))){event.preventDefault();last.focus();}
    else if(!event.shiftKey&&(document.activeElement===last||!dialog.contains(document.activeElement))){event.preventDefault();first.focus();}
  });
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
