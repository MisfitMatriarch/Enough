// Automated WCAG 2.1 A/AA checks, including the browser-only audit's dynamic states.
// Does not submit forms or contact the reservation API. Human review is still required.
const {chromium}=require('playwright');
const {default:AxeBuilder}=require('@axe-core/playwright');
const fs=require('node:fs');
const path=require('node:path');
const out=path.resolve(process.argv[2]||'site-check/accessibility');
fs.mkdirSync(out,{recursive:true});
const routes=fs.readdirSync('dist',{recursive:true})
 .filter(file=>file.endsWith('.html')&&!file.startsWith('enough/'))
 .map(file=>'/'+file.split(path.sep).join('/').replace(/index\.html$/,''));
(async()=>{
 const browser=await chromium.launch();
 try{
  const context=await browser.newContext({viewport:{width:1400,height:900}});
  await context.addInitScript(()=>sessionStorage.setItem('f2bm-aoc','1'));
  await context.route('**/api/**',route=>route.abort());
  await context.route('**/*',route=>['GET','HEAD'].includes(route.request().method())?route.fallback():route.abort());
  const page=await context.newPage();page.setDefaultTimeout(15000);
  const results=[];
  async function scan(label){
   await page.evaluate(()=>document.fonts.ready);
   const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa']).analyze();
   results.push({page:label,violations:result.violations,incomplete:result.incomplete});
   console.log((result.violations.length?'FAIL ':'PASS ')+label+' ('+result.violations.length+' detected violations)');
  }
  for(const url of routes){await page.goto('http://localhost:8765'+url,{waitUntil:'domcontentloaded'});await scan(url);}
  await page.goto('http://localhost:8765/frameworks/sovereignty-conditions-audit/',{waitUntil:'domcontentloaded'});
  await page.locator('#startBtn').click();await scan('Conditions audit: questions');
  await page.locator('#genBtn').click();await scan('Conditions audit: generated snapshot');
  const failures=results.filter(result=>result.violations.length);
  fs.writeFileSync(path.join(out,'results.json'),JSON.stringify({states:results.length,failedStates:failures.length,results},null,2));
  console.log(`${results.length-failures.length}/${results.length} page states pass automated WCAG 2.1 A/AA checks. Human checks remain separate.`);
  process.exitCode=failures.length?1:0;
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1});
