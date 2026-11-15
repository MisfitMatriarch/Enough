// Read-only browser regression: entrance once, no repeated page block, optional reread.
const {chromium}=require('playwright');
const {default:AxeBuilder}=require('@axe-core/playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const base='http://localhost:8765';
const out=path.resolve(process.argv[2]||'site-check/acknowledgement');
fs.mkdirSync(out,{recursive:true});
(async()=>{
  const browser=await chromium.launch();
  try{
    for(const width of [1400,390]){
      const context=await browser.newContext({viewport:{width,height:900}});
      const page=await context.newPage();
      const errors=[];page.on('pageerror',error=>errors.push(error.message));
      await context.route('**/*',route=>['GET','HEAD'].includes(route.request().method())?route.continue():route.abort());
      await page.goto(base+'/');
      await page.locator('#aoc[open]').waitFor();
      assert.equal(await page.locator('section.aoc').count(),0);
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
      const axe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa']).analyze();
      assert.deepEqual(axe.violations.map(v=>v.id),[],`${width}: entrance accessibility`);
      await page.screenshot({path:path.join(out,`${width}-entrance.png`)});
      await page.getByRole('button',{name:'Enter website',exact:true}).click();
      await page.waitForFunction(()=>sessionStorage.getItem('f2bm-aoc')==='1');
      assert.equal(await page.locator('#aoc').isVisible(),false);
      for(const route of ['/about/','/books/','/free2bme/','/work-with-tanya/thank-you/']){
        await page.goto(base+route);
        assert.equal(await page.locator('#aoc').isVisible(),false,`${width}: no repeat on ${route}`);
        assert.equal(await page.locator('section.aoc,section.country').count(),0);
      }
      const reopen=page.getByRole('link',{name:'Acknowledgement of Country',exact:true});
      await reopen.click();
      await page.locator('#aoc[open]').waitFor();
      assert.equal(await page.getByRole('button',{name:'Return to website',exact:true}).isVisible(),true);
      await page.keyboard.press('Escape');
      await page.waitForFunction(()=>!document.querySelector('#aoc').open);
      assert.equal(await page.locator('#aoc').isVisible(),false);
      assert.equal(await reopen.evaluate(el=>document.activeElement===el),true);
      await page.goto(base+'/');
      await page.screenshot({path:path.join(out,`${width}-page-without-repeat.png`),fullPage:true});
      assert.deepEqual(errors,[]);
      await context.close();
      console.log(`PASS ${width}px: entry, navigation, footer reread, Escape, focus and accessibility`);
    }
    const fresh=await browser.newContext();
    const deep=await fresh.newPage();await deep.goto(base+'/speaking/');
    await deep.locator('#aoc[open]').waitFor();await fresh.close();
    console.log('PASS first entrance can be an interior page');
    const nojs=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:900}});
    const fallback=await nojs.newPage();await fallback.goto(base+'/books/');
    assert.equal(await fallback.locator('#aoc').isVisible(),false);
    await fallback.getByRole('link',{name:'Acknowledgement of Country',exact:true}).click();
    assert.equal(await fallback.locator('#aoc').isVisible(),true);
    await fallback.getByRole('link',{name:'Back to page',exact:true}).click();
    assert.equal(await fallback.locator('#aoc').isVisible(),false);
    await nojs.close();console.log('PASS optional reading without JavaScript');
  }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
