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
