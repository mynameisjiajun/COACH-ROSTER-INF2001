// Screenshots every scenario into one folder per use case (desktop 1600x900 @2x and phone 390x844 @2x).
// Setup once: npm i --no-save playwright@1.48.2 @fontsource/inter@5.0.18 && npx playwright install chromium
// Run: node tools/screenshots.js   -> screenshots/desktop, screenshots/phone, screenshots/meta.json
const {chromium}=require('playwright');const path=require('path');const fs=require('fs');process.chdir(path.join(__dirname,'..'));
const F=path.resolve('node_modules/@fontsource/inter/files');
const fontCss=[400,500,600,700].map(w=>`@font-face{font-family:'Inter';font-weight:${w};src:url('file://${F}/inter-latin-${w}-normal.woff2') format('woff2')}`).join('')+'.fab,.scnbar{display:none!important}';
const URL='file://'+path.resolve('index.html');
const slug=s=>s.toLowerCase().replace(/[–]/g,'-').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
(async()=>{
 const OUT='screenshots';fs.rmSync(OUT,{recursive:true,force:true});
 const b=await chromium.launch();const errs=[];let meta=null;
 for(const [mode,opts] of [['desktop',{viewport:{width:1600,height:900},deviceScaleFactor:2}],['phone',{viewport:{width:390,height:844},deviceScaleFactor:2,isMobile:true,hasTouch:true}]]){
  const ctx=await b.newContext(opts);await ctx.route(/fonts\.(googleapis|gstatic)\.com/,r=>r.abort());
  const p=await ctx.newPage();p.on('pageerror',e=>errs.push(mode+': '+e.message));
  await p.goto(URL);await p.addStyleTag({content:fontCss});
  const list=await p.evaluate(()=>SCN.map(x=>({g:x.g,s:x.s,r:x.r,t:x.t,e:x.e})));
  const groups=[...new Set(list.map(x=>x.g))];
  meta=list.map((x,i)=>{const gi=groups.indexOf(x.g);const folder=`${String(gi).padStart(2,'0')} ${x.g}`;const file=`${String(i+1).padStart(3,'0')}-${slug(x.s)}-${x.r.join('-')}-${slug(x.t)}`.slice(0,120)+'.png';return {...x,n:i+1,folder,file}});
  for(const m of meta){
   const dir=path.join(OUT,mode,m.folder);fs.mkdirSync(dir,{recursive:true});
   await p.evaluate(i=>{document.getElementById('toast-root').innerHTML='';runScenario(i)},m.n-1);
   await p.waitForTimeout(230);await p.evaluate(()=>document.fonts.ready);
   await p.screenshot({path:path.join(dir,m.file)});
  }
  await ctx.close();
 }
 fs.writeFileSync(path.join(OUT,'meta.json'),JSON.stringify(meta,null,1));
 console.log('count',meta.length,'errors',errs);await b.close();
})();
