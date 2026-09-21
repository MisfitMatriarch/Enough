
(function(){
const root=document.getElementById('main');
if (!root) return;
root.querySelectorAll('.f2b-additions .f-choices').forEach(group=>{group.hidden=false;});
const entries={joy:['Something can matter simply because you love it.','Making. Moving. Laughing. Resting. Being with people who get it. What would you make room for if it didn’t have to improve you?','Explore more living ↗','#f-world'],identity:['You belong without becoming somebody else.','Your identity, communication and way of participating deserve room. You choose what you share and how you show up.','Find belonging ↗','#f-belong'],voice:['What you bring deserves room.','An idea. A story. A different way of seeing. There is more than one way to be heard, and being heard should not require becoming someone else.','Meet Tanya’s approach ↗','#f-stage'],people:['Find people you can be yourself with.','Shared interests. Different participation. Connection that leaves room for support, quietness, enthusiasm and changing your mind.','Explore community ↗','#f-world'],event:['Let’s make room for your people to shine.','An MC, a conversation, a keynote or a workshop. Start with what you want your gathering to make possible.','Explore MCing, speaking & workshops ↗','#f-stage']};
root.querySelectorAll('[data-room]').forEach(button=>button.addEventListener('click',()=>{root.querySelectorAll('[data-room]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));const e=entries[button.dataset.room];root.querySelector('#f-answer-title').textContent=e[0];root.querySelector('#f-answer-text').textContent=e[1];const link=root.querySelector('#f-answer-link');link.textContent=e[2];link.setAttribute('href',e[3]);}));
const lines={life:'You don’t have to justify the life you want.',support:'Support doesn’t cancel capability.',belong:'You don’t have to become less of yourself to belong.',joy:'Something does not need to improve you to deserve space in your life.'};
root.querySelectorAll('[data-line]').forEach(button=>button.addEventListener('click',()=>{root.querySelectorAll('[data-line]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));root.querySelector('#f-pocket-line').textContent=lines[button.dataset.line];}));
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
