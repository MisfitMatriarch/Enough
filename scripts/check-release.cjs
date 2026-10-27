// Read-only browser release checks. Never submit a live form or contact the reservation API.
// Requires the existing Playwright test tooling and dist served on localhost:8765.
const {chromium}=require('playwright');
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve('dist');
const out=path.resolve(process.argv[2]||'site-check/release');
fs.mkdirSync(out,{recursive:true});
const walk=dir=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):e.name.endsWith('.html')?[path.join(dir,e.name)]:[]);
const urls=walk(root).map(f=>'/'+path.relative(root,f).split(path.sep).join('/').replace(/index\.html$/,''));
const results=[];
const check=(passed,label,details)=>{results.push({passed,label,...(details?{details}: {})});if(!passed)console.error('FAIL '+label,details||'');};
(async()=>{
 const browser=await chromium.launch();
 const context=await browser.newContext();
 await context.addInitScript(()=>sessionStorage.setItem('f2bm-aoc','1'));
 await context.route('**/api/**',route=>route.abort());
 // Fail closed if any future page unexpectedly attempts a write during a read-only check.
 await context.route('**/*',route=>route.request().method()==='GET'||route.request().method()==='HEAD'?route.fallback():route.abort());
 const page=await context.newPage();page.setDefaultTimeout(10000);page.setDefaultNavigationTimeout(20000);
 const errors=[];page.on('pageerror',e=>errors.push({url:page.url(),error:e.message}));
 for(const width of [320,390,768,1400]){
  await page.setViewportSize({width,height:900});
  console.log('Checking '+urls.length+' pages at '+width+'px');
  for(const url of urls){
   const response=await page.goto('http://localhost:8765'+url,{waitUntil:'domcontentloaded'});
   if(url==='/enough/')await page.waitForURL('**/books/free-2b-me/');
   await page.evaluate(()=>document.fonts.ready);
   const state=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,h1:document.querySelectorAll('h1').length,main:document.querySelectorAll('main').length,overflow:[...document.querySelectorAll('main *')].filter(e=>{const r=e.getBoundingClientRect();return r.width&&getComputedStyle(e).position!=='absolute'&&(r.right>innerWidth+2||r.left< -2)}).slice(0,5).map(e=>({tag:e.tagName,class:e.className,text:e.textContent.slice(0,80)}))}));
   check(response.status()===200,`${width}px ${url} HTTP 200`);
   check(state.scroll<=state.width+1,`${width}px ${url} fits viewport`,state.scroll>state.width+1?state:undefined);
   // The legacy /enough/ page is an intentional instant redirect.
   if(url!=='/enough/')check(state.h1===1&&state.main===1,`${width}px ${url} has one main and one H1`,state.h1!==1||state.main!==1?state:undefined);
  }
 }
 console.log('All-page width checks complete.');
 for(const type of ['keynote','mc','panel','workshop']){
  await page.goto('http://localhost:8765/speaking/?type='+type,{waitUntil:'domcontentloaded'});
  const expected={keynote:'Keynote speaking',mc:'MC / event hosting',panel:'Panel facilitation',workshop:'Participant / community workshop'}[type];
  check(await page.locator('#enq-type').inputValue()===expected,`Speaking query preselects ${type}`);
 }
 const slugs=['free-2b-me','you-make-sense','nervous-system-nourishment','built-with-you','access-before-intervention','behaviour-makes-sense','beyond-regulation','practice-that-holds'];
 for(const slug of slugs){
  await page.goto('http://localhost:8765/books/pre-order/?book='+slug,{waitUntil:'domcontentloaded'});
  check(await page.locator('#'+slug).inputValue()==='1',`Book query preselects ${slug}`);
 }
 // Tanya authorised preparation only. Fill and inspect the local forms without clicking submit.
 const plans=JSON.parse(fs.readFileSync('review/handover/form-test-plan.json','utf8'));
 for(const plan of plans){
  await page.goto('http://localhost:8765'+plan.source,{waitUntil:'domcontentloaded'});
  const form=page.locator(`form[name="${plan.formName}"]`);
  for(const [name,value] of Object.entries(plan.fields)){
   const field=form.locator(`[name="${name}"]`).first();
   const type=await field.getAttribute('type');
   if(type==='hidden'||!value)continue;
   if(type==='checkbox')await field.check();
   else if(type==='radio')await form.locator(`[name="${name}"][value="${value}"]`).check();
   else if(await field.evaluate(e=>e.tagName)==='SELECT')await field.selectOption(value);
   else await field.fill(value);
  }
  check(await form.evaluate(e=>e.checkValidity()),`Prepared local ${plan.source} ${plan.formName} passes browser validation`);
  const fields=await form.evaluate(e=>Object.fromEntries(new FormData(e)));
  check(Object.entries(plan.fields).every(([name,value])=>fields[name]===value),`Prepared local ${plan.source} ${plan.formName} retains expected fields`);
 }
 await page.setViewportSize({width:320,height:900});
 for(const url of ['/','/for-your-life/','/for-your-work/','/books/','/speaking/','/the-practice/','/about/','/professional-learning/','/work-with-tanya/']){
  await page.goto('http://localhost:8765'+url,{waitUntil:'domcontentloaded'});
  await page.getByRole('button',{name:'Accessibility',exact:true}).click();
  for(const name of ['Larger text','High contrast','Reduce motion'])await page.getByRole('button',{name,exact:true}).click();
  const state=await page.evaluate(()=>({fits:document.documentElement.scrollWidth<=innerWidth+1,large:document.body.classList.contains('text-larger'),contrast:document.body.classList.contains('high-contrast'),motion:document.body.classList.contains('reduce-motion')}));
  check(state.fits&&state.large&&state.contrast&&state.motion,`320px combined accessibility modes ${url}`,state);
  await page.getByRole('button',{name:'Reset',exact:true}).click();
 }
 check(errors.length===0,'No JavaScript page errors across all routes and widths',errors.length?errors:undefined);
 await browser.close();
 const summary={pages:urls.length,widths:[320,390,768,1400],checks:results.length,failures:results.filter(r=>!r.passed),results};
 fs.writeFileSync(path.join(out,'results.json'),JSON.stringify(summary,null,2));
 console.log(`${summary.checks-summary.failures.length}/${summary.checks} checks pass across ${urls.length} pages at four widths; ${summary.failures.length} failures. No form submissions or reservation API requests.`);
 process.exitCode=summary.failures.length?1:0;
})().catch(error=>{console.error(error);process.exit(1)});
