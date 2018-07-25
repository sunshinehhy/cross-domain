
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
router.get('/res.html', showPage.bind(this,'res',{
}));

app.use(router.routes());

app.listen(3001, () => {
  console.log('Serving crossorigin pages. Listening 3001 with domain localhosts');
})

/**设置了不符合 http://www.ruanyifeng.com/blog/2016/04/cors.html 中限定的 header */
// Accept: */*
// Accept-Encoding: gzip, deflate, br
// Accept-Language: en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7
// Access-Control-Request-Headers: x-custom-header
// Access-Control-Request-Method: GET
// Connection: keep-alive
// Host: localhost:3001
// Origin: http://localhost:3000
// User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36


// Origin: http://localhost:3000
// Referer: http://localhost:3000/
// User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36

/**
 * 服务器端设置： 'Access-Control-Request-Headers':'X-Custom-Header'
 * 客户端设置：xhr.setRequestHeader('X-Custom-Header', 'value');
 * 目前不能响应，应该需要PUT方法才能行得通，有待再试
 */