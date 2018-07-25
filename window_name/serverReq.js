
const path = require('path');
const Koa = require('koa');
const Router = require('koa-router');
const logger = require('koa-logger');
const views = require('koa-views');

const app = new Koa();
const router = new Router();

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
}));



// router.get('/', ctx => {
//    ctx.body='3000';
// });
app.use(router.routes());

app.listen(3000, () => {
  console.log('Serving crossorigin pages. Listening 3000 with domain localhosts');
})