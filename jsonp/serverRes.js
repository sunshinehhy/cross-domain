
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


router.get('/', ctx => {
  // app.use( async ( ctx ) => {
  //    // 如果jsonp 的请求为GET
  // if ( ctx.method === 'GET' && ctx.url.split('?')[0] === '/getData.jsonp') {

  //   // 获取jsonp的callback
  //   let callbackName = ctx.query.callback || 'callback'
  //   let returnData = {
  //     success: true,
  //     data: {
  //       text: 'this is a jsonp api',
  //       time: new Date().getTime(),
  //     }
  //   }

  //   // jsonp的script字符串
  //   let jsonpStr = `;${callbackName}(${JSON.stringify(returnData)})`

  //   // 用text/javascript，让请求支持跨域获取
  //   ctx.type = 'text/javascript'

  //   // 输出jsonp字符串
  //   ctx.body = jsonpStr

  // } else {

  //   ctx.body = 'hello jsonp'

  // }
  let callbackName = ctx.query.callback || 'callbackFun';   // ctx.query.callback获取的是，参数为callback的值，比如http://localhost:3001/?callback=callbackFun  ，得到callbackVal 。callbackName的值必须与http://localhost:3001?jsonp=callbackFun jsonp等号后面的值相同，不一定是callback，根据前后端统一命名
  let returnData = {
    success: true,
    data: {
      text: 'this is a jsonp api',
      time: new Date().getTime(),
      callback:ctx.query.callback
    }
  }
  let jsonpStr = `;${callbackName}(${JSON.stringify(returnData)})`;  //;可加可不加
  // let jsonpStr = callbackName+"({'message': 'hello world from JSONP!🙃'});";
  ctx.body = jsonpStr;  //jsonpStr得到的值是callbackFun({"success":true,"data":{"text":"this is a jsonp api","time":1532488846587}})。服务端已经JSON.stringify(returnData)，搞不明白，为什么接收端还需要JSON.stringify(data)。

});


app.use(router.routes());

app.listen(3001, () => {
  console.log('Serving crossorigin pages. Listening 3001 with domain localhosts');
})


