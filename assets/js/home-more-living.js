
(function(){
const root=document.getElementById('main');
if (!root) return;
root.querySelectorAll('.f2b-additions .f-choices').forEach(group=>{group.hidden=false;});
const entries={joy:['Something can matter simply because you love it.','Making. Moving. Laughing. Resting. Being with people who get it. What would you make room for if it didn’t have to improve you?','Explore community →','#f-world'],identity:['You belong without becoming somebody else.','Your identity, communication and way of participating deserve room. You choose what you share and how you show up.','Find belonging →','#f-belong'],voice:['What you bring deserves room.','An idea. A story. A different way of seeing. There is more than one way to be heard, and being heard should not require becoming someone else.','Meet Tanya’s approach →','#f-stage'],people:['Find people you can be yourself with.','Shared interests. Different participation. Connection that leaves room for support, quietness, enthusiasm and changing your mind.','Explore community →','#f-world'],event:['Let’s make room for your people to shine.','An MC, a conversation, a keynote or a workshop. Start with what you want your gathering to make possible.','Explore MCing, speaking & workshops →','#f-stage']};
root.querySelectorAll('[data-room]').forEach(button=>button.addEventListener('click',()=>{root.querySelectorAll('[data-room]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));const e=entries[button.dataset.room];root.querySelector('#f-answer-title').textContent=e[0];root.querySelector('#f-answer-text').textContent=e[1];const link=root.querySelector('#f-answer-link');link.textContent=e[2];link.setAttribute('href',e[3]);}));
const lines={life:'You don’t have to justify the life you want.',support:'Support doesn’t cancel capability.',belong:'You don’t have to become less of yourself to belong.',joy:'Something does not need to improve you to deserve space in your life.'};
root.querySelectorAll('[data-line]').forEach(button=>button.addEventListener('click',()=>{root.querySelectorAll('[data-line]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));root.querySelector('#f-pocket-line').textContent=lines[button.dataset.line];}));
/* A different line on each return visit. Storage is optional; without it the first line stays. */
(()=>{const keys=Object.keys(lines);let n=0;try{n=(parseInt(localStorage.getItem('f2bm-line-visit')||'0',10)+1)%keys.length;localStorage.setItem('f2bm-line-visit',String(n));}catch(e){return;}
const k=keys[n];root.querySelectorAll('[data-line]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.line===k)));const q=root.querySelector('#f-pocket-line');if(q)q.textContent=lines[k];})();
/* Save the current line as a branded image, drawn in the browser. Nothing is sent anywhere. */
(()=>{const btn=root.querySelector('#save-line');if(!btn||!document.createElement('canvas').getContext)return;btn.hidden=false;
const status=document.createElement('p');status.setAttribute('role','status');status.className='small';btn.after(status);
const copy=document.createElement('button');copy.type='button';copy.className='save-line';copy.textContent='Copy this line';status.before(copy);
copy.addEventListener('click',async()=>{const text=root.querySelector('#f-pocket-line').textContent.trim();
try{if(navigator.clipboard&&navigator.clipboard.writeText){await navigator.clipboard.writeText(text);}else{const field=document.createElement('textarea');field.value=text;field.setAttribute('readonly','');field.style.position='fixed';field.style.opacity='0';document.body.appendChild(field);field.select();const ok=document.execCommand('copy');field.remove();copy.focus();if(!ok)throw new Error('Copy unavailable');}status.textContent='Line copied.';}catch(e){status.textContent='Copy is unavailable in this browser. Select the sentence above to copy it.';}});
const load=src=>new Promise((res,rej)=>{const i=new Image();i.onload=()=>res(i);i.onerror=rej;i.src=src;});
btn.addEventListener('click',async()=>{const text=root.querySelector('#f-pocket-line').textContent.trim();btn.disabled=true;
try{if(document.fonts){await document.fonts.load('500 76px "Cormorant Garamond"');await document.fonts.load('400 46px "Cormorant Garamond"');await document.fonts.load('500 30px Figtree');await document.fonts.ready;}
const W=1080,H=1350,c=document.createElement('canvas');c.width=W;c.height=H;const x=c.getContext('2d');
x.fillStyle='#fbf7ef';x.fillRect(0,0,W,H);
const [band,phoenix]=await Promise.all([load('/assets/brand/footer-band-1024.jpg'),load('/assets/brand/phoenix-dark-480.png')]);
const bh=band.height*W/band.width;x.save();const g=x.createLinearGradient(0,H-bh*.55,0,H);g.addColorStop(0,'rgba(251,247,239,1)');g.addColorStop(.45,'rgba(251,247,239,0)');x.drawImage(band,0,H-bh*.55,W,bh);x.fillStyle=g;x.fillRect(0,H-bh*.55,W,bh);x.restore();
x.drawImage(phoenix,(W-240)/2,120,240,240);
x.fillStyle='#08768a';x.textAlign='center';x.font='500 76px "Cormorant Garamond", Georgia, serif';
const words=text.split(' '),out=[];let line='';for(const w of words){const t=line?line+' '+w:w;if(x.measureText(t).width>W-200&&line){out.push(line);line=w;}else line=t;}out.push(line);
let y=560-((out.length-1)*92)/2;for(const l of out){x.fillText(l,W/2,y);y+=92;}
x.strokeStyle='#caa45a';x.lineWidth=3;x.beginPath();x.moveTo(W/2-70,y+10);x.lineTo(W/2+70,y+10);x.stroke();
x.fillStyle='#ab236e';x.font='400 46px "Cormorant Garamond", Georgia, serif';x.fillText('Less fixing. More living.',W/2,y+80);
x.fillStyle='#18334f';x.font='500 30px Figtree, system-ui, sans-serif';x.fillText('tanyahicks.com',W/2,y+136);
const a=document.createElement('a');a.download='free2bme-line.png';a.href=c.toDataURL('image/png');document.body.appendChild(a);a.click();a.remove();}
catch(e){status.textContent='The image could not be saved. You can still copy the line.';}finally{btn.disabled=false;}});})();
})();


(()=>{
  const section=document.querySelector('.reflection-focus');
  if(!section)return;
  const buttons=[...section.querySelectorAll('[data-reflection]')];
  const questions=[...section.querySelectorAll('[data-question]')];
  function select(index){
    buttons.forEach((button,i)=>button.setAttribute('aria-pressed',String(i===index)));
    questions.forEach((question,i)=>question.hidden=i!==index);
  }
  buttons.forEach((button,i)=>button.addEventListener('click',()=>select(i)));
  select(0);
  section.querySelector('.reflection-choices').hidden=false;
})();
