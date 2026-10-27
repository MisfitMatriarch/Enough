// Baseline and after-change check for the built site. Read-only: it never edits files.
// Usage (from the repo root):
//   npm run build
//   python3 -m http.server 8765 --directory dist &      (any static server on port 8765)
//   node review/handover/check-site.js [output-folder]
// Writes screenshots to the output folder (default ./site-check, which is not committed)
// and prints a pass/fail line for each check. Exit code 1 if any check fails.
const {chromium}=require('playwright');
const fs=require('fs');const path=require('path');
const OUT=path.resolve(process.argv[2]||'site-check');fs.mkdirSync(OUT,{recursive:true});
const BASE='http://localhost:8765';
const PAGES=['/','/for-your-life/','/for-your-work/','/books/','/books/behaviour-makes-sense/','/speaking/','/the-practice/','/about/','/practitioner-pathway/'];
const MUST_NOT_APPEAR=['Nervous System Nourishment in Counselling','Systems for Neuroaffirming Practice','Australian Country','evidence-graded','programme','—'];
let failed=0;const ok=(c,m)=>{console.log((c?'PASS ':'FAIL ')+m);if(!c)failed++;};
(async()=>{
  const b=await chromium.launch();
  for(const [w,tag] of [[1400,'desktop'],[390,'phone']]){
    const p=await b.newPage({viewport:{width:w,height:900}});
    await p.addInitScript(()=>{try{sessionStorage.setItem('f2bm-aoc','1')}catch(e){}});
    const errs=[];p.on('pageerror',e=>errs.push(e.message));
    for(const url of PAGES){
      const r=await p.goto(BASE+url);ok(r&&r.status()===200,`${tag} ${url} loads (HTTP ${r&&r.status()})`);
      await p.waitForTimeout(1200);
      const text=await p.evaluate(()=>document.body.innerText);
      for(const s of MUST_NOT_APPEAR) ok(!text.includes(s),`${tag} ${url} has no "${s==='—'?'em dash':s}"`);
      const overflow=await p.evaluate(()=>document.documentElement.scrollWidth>window.innerWidth+1);
      ok(!overflow,`${tag} ${url} has no sideways scroll`);
      await p.screenshot({path:path.join(OUT,`${tag}${url.replace(/\//g,'_')||'_'}.png`),fullPage:true});
    }
    await p.goto(BASE+'/');await p.waitForTimeout(800);
    const btn='.site-header .nav-group:nth-child(2) .nav-more';
    await p.focus(btn);await p.keyboard.press('Enter');
    ok(await p.getAttribute(btn,'aria-expanded')==='true',`${tag} menu opens by keyboard`);
    await p.keyboard.press('Escape');
    ok(await p.getAttribute(btn,'aria-expanded')==='false',`${tag} Escape closes the menu`);
    ok(errs.length===0,`${tag} no JavaScript errors${errs.length?': '+errs.join(' | '):''}`);
    await p.close();
  }
  await b.close();
  console.log(failed?`\n${failed} check(s) failed`:'\nAll checks passed');process.exit(failed?1:0);
})();
