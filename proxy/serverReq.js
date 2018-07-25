
const path = require('path');
const Koa = require('koa');
const Router = require('koa-router');
const logger = require('koa-logger');
const views = require('koa-views');
const http = require('http');
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

router.get('/proxy', async ctx => {
    var url = ctx.query.url ;   // http://localhost:3001/
    
    var getData = '1';
    // 向url发出请求 ，因为url为空，所以会请求错误
    await  http.request(url, function(responseFromOtherDomain) {
    //     // data事件会在数据接收过程中，每收到一段数据就触发一次，接收到的数据被传入回调函数。
        responseFromOtherDomain.on("data", function(data) {
            ctx.set( {'Content-Type': 'text/html; charset=utf-8'});
            ctx.body  = 'data'; //为什么不能设在里面
            console.log(data); 
            getData = data;
        });
    });
    
    await console.log(getData);  //获取不到请求到的值，此处应该是异步，怎么变成同步呢？
    ctx.body = url; 
}); 
app.use(router.routes());

app.listen(3000, () => {
  console.log('Serving crossorigin pages. Listening 3000 with domain localhosts');
})