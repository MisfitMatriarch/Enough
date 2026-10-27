// Read-only regression checks for the visitor pass. All traffic stays on localhost.
const {chromium}=require('playwright');
const fs=require('node:fs');const path=require('node:path');
const out=path.resolve(process.argv[2]||'site-check/visitor');fs.mkdirSync(out,{recursive:true});
const routes=fs.readdirSync('dist',{recursive:true}).filter(f=>f.endsWith('.html')).map(f=>'/'+f.replaceAll(path.sep,'/').replace(/index\.html$/,''));
const checks=[];const check=(pass,label)=>checks.push({pass:!!pass,label});
(async()=>{const browser=await chromium.launch();try{
 const context=await browser.newContext();let writes=0;
 await context.addInitScript(()=>{sessionStorage.setItem('f2bm-aoc','1');Object.defineProperty(window,'speechSynthesis',{value:{getVoices:()=>[],addEventListener(){},cancel(){},speak(){throw Error('Unavailable voice must not be called');}}});});
 await context.route('**/*',route=>{if(!['GET','HEAD'].includes(route.request().method())||route.request().url().includes('/api/')){writes++;return route.abort();}return route.fallback();});
 const page=await context.newPage();
 for(const width of [320,1400]){await page.setViewportSize({width,height:900});for(const route of routes){
  await page.goto('http://localhost:8765'+route,{waitUntil:'domcontentloaded'});
  if(route==='/enough/')await page.waitForURL('**/books/free-2b-me/');
  if(await page.locator('header.site-header').count()){
   const action=page.locator('.header-enquire');check(await action.count()===1&&await action.isVisible(),`${width} ${route} has visible enquiry access`);
   const box=await action.boundingBox();check(box&&box.x>=0&&box.x+box.width<=width+1&&box.height>=44,`${width} ${route} enquiry target fits and is at least 44px tall`);
   check(await action.getAttribute('href')==='/work-with-tanya/',`${width} ${route} enquiry reaches the full guidance page`);
  }
  check(await page.locator('a[href="/privacy/"]').count()>0,`${width} ${route} links to privacy`);
  check(await page.locator('.intro-listen').count()===0,`${width} ${route} has no dead read-aloud control when voices are unavailable`);
 }}
 for(const route of ['/work-with-tanya/','/speaking/']){await page.goto('http://localhost:8765'+route);check(await page.locator('.enquiry-steps>li').count()===3,route+' explains three next steps');check((await page.locator('.enquiry-next').innerText()).includes('48 hours'),route+' states the approved response window');}
 const voiceContext=await browser.newContext();await voiceContext.addInitScript(()=>{
  sessionStorage.setItem('f2bm-aoc','1');window.__introVoice={spoken:[],cancelled:0};window.SpeechSynthesisUtterance=class{constructor(text){this.text=text;}};
  Object.defineProperty(window,'speechSynthesis',{value:{getVoices:()=>[{lang:'en-AU'}],addEventListener(){},cancel(){window.__introVoice.cancelled++;},speak(utterance){window.__introVoice.spoken.push(utterance.text);window.__lastIntroUtterance=utterance;}}});
 });
 await voiceContext.route('**/*',route=>{if(!['GET','HEAD'].includes(route.request().method())||route.request().url().includes('/api/')){writes++;return route.abort();}return route.fallback();});
 const voicePage=await voiceContext.newPage();await voicePage.goto('http://localhost:8765/work-with-tanya/');
 await voicePage.getByLabel('What would you like to make possible?',{exact:true}).fill('SYNTHETIC PRIVATE FIELD MUST NOT BE READ');
 const listen=voicePage.locator('.intro-listen');await listen.focus();await voicePage.keyboard.press('Space');
 check(await listen.getAttribute('aria-pressed')==='true','Introduction listening starts by keyboard');
 let spoken=await voicePage.evaluate(()=>window.__introVoice.spoken);check(spoken.length===1&&spoken[0].includes('What would you like')&&!spoken[0].includes('SYNTHETIC PRIVATE FIELD'),'Listening reads public introduction and excludes form values');
 await voicePage.keyboard.press('Escape');check(await listen.getAttribute('aria-pressed')==='false','Escape stops introduction listening');
 await listen.click();await voicePage.evaluate(()=>window.__lastIntroUtterance.onend());check(await listen.getAttribute('aria-pressed')==='false','End of speech restores the listen control');
 check(writes===0,'No form submissions or reservation API requests');
 const failed=checks.filter(c=>!c.pass);fs.writeFileSync(path.join(out,'results.json'),JSON.stringify({checks:checks.length,failures:failed,results:checks},null,2));for(const item of failed)console.error('FAIL '+item.label);console.log(`${checks.length-failed.length}/${checks.length} visitor journey checks pass. No forms submitted; voice playback is simulated.`);process.exitCode=failed.length?1:0;
 }finally{await browser.close();}})().catch(error=>{console.error(error);process.exitCode=1;});
