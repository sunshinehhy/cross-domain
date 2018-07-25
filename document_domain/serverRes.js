
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
router.get('/res', showPage.bind(this,'res',{
}));
subdomain.use('res.sub', router.routes())

app.use(subdomain.routes());

app.listen(3001, () => {
  console.log('Serving crossorigin pages. Listening 3001 with domain localhosts');
})

