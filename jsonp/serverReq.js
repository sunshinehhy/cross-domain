
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

app.use(router.routes());

app.listen(3000, () => {
  console.log('Serving crossorigin pages. Listening 3000 with domain localhosts');
})


// const process = require('process');
// process.on('exit', (code) => {
//   console.log(`即将退出，退出码：${code}`);
// });

// process.on('uncaughtException', (err) => {
//   // fs.writeSync(1, `捕获到异常：${err}\n`);
// });

// setTimeout(() => {
//   console.log('这里仍然会运行。');
//   console.log(`This processor architecture is ${process.arch}`);
// }, 500);