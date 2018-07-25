
const path = require('path');
const Koa = require('koa');
const Router = require('koa-router');
const logger = require('koa-logger');
const views = require('koa-views');
const Subdomain = require('koa-subdomain');
const subdomain = new Subdomain();
const app = new Koa();
const router = new Router();
app.subdomainOffset = 1;
app.use(logger());

app.use(views(path.resolve(__dirname,'views'), {
  map:{
    html:'nunjucks'
  }
}));

async function showPage(pagename, data, ctx) {
  await ctx.render(pagename,data);
}
router.get('/req', showPage.bind(this,'req',{
  iframeUrl:'http://res.sub.localhost:3001/res'
}));

subdomain.use('req.sub', router.routes())

app.use(subdomain.routes());
// http://sub.localhost:3001/res 的 document.domain 为 "sub.localhost"
// http://localhost:3000/req 的 document.domain 为 "localhost"

// app.use(router.routes());

app.listen(3000, () => {
  console.log('Serving crossorigin pages. Listening 3000 with domain localhosts');
})