
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
router.get('/', showPage.bind(this,'req',{
}));

// 必须要async和await才能找到页面，不然会报404错误
router.get('/test',async ctx => {
   await ctx.render('test.html');
});

// router.get('/b', ctx => {
//     ctx.render('b.html');
// });

router.get('/c', ctx => {
   ctx.body='';
});
app.use(router.routes());

app.listen(3000, () => {
  console.log('Serving crossorigin pages. Listening 3000 with domain localhosts');
})