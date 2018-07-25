
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


// 服务器端，不需要添加页面，仅仅是创建返回内容和权限
router.get('/', ctx => {
  ctx.set({
      'Access-Control-Allow-Origin':'http://localhost:3000',
      'Cache-Control': 'public, max-age=604800',
      'Etag': '1234',
      'Last-Modified': new Date(),
      'Access-Control-Request-Method': 'GET,PUT,POST',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Request-Headers':'X-Custom-Header',
      'Access-Control-Max-Age': 1728000
    }); //// 设置允许跨域的origin，允许3000端口访问本端口（3001）
//   ctx.body = "Hello world from CROS.";
  ctx.body = {
    'name':'hehuiyun',
    'type':'core'
  }
  ctx.cookies.set(
            'cid','hello world',{
            domain:'localhost', // 写cookie所在的域名
            path:'/',       // 写cookie所在的路径
            maxAge: 2*60*60*1000,   // cookie有效时长
            // expires:new Date().getTime()+10000000000, // cookie失效时间  
            httpOnly:false,  // 是否只用于http请求中获取
            overwrite:true  // 是否允许重写
        }
    );
//  ctx.body = ctx.cookies.get('cid');

/**
 * 现象：
 * 1. maxAge和expires
   2018-07-25T05:25:11.078Z  maxAge: 20*60*60*1000,
   2018-07-24T11:22:06.071Z   maxAge: 2*60*60*1000,
   当同时有maxAge和expires，会取maxAge值；当删除maxAge时会报错，当注释expires不会报错。
 * 2. httpOnly
  当设httpOnly:true ，用 document.cookie得到空字符串；当设httpOnly:false，用 document.cookie可以正常得到cookie。
 * 3. domain
    此项目不允许加上端口号，不然设置不了cookie。延伸考虑，以后使用时也不加port，因为他不属于domain
 * 4. cookie
   当 'Access-Control-Allow-Credentials': 'false', 不发送cookie；否则发送。此项目中默认发送 
 */

})

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