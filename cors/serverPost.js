
const path = require('path');
const Koa = require('koa');
const Router = require('koa-router');
const logger = require('koa-logger');
const views = require('koa-views');
const bodyparser = require('koa-bodyparser');

const app = new Koa();
const router = new Router();
const routerPost = new Router();

// app.use(logger());
app.use(bodyparser());



// 服务器端，不需要添加页面，仅仅是创建返回内容和权限
// router.get('/', ctx => {
//   ctx.set({
//       'Access-Control-Allow-Origin':'http://localhost:3000',
//       'Cache-Control': 'public, max-age=604800',
//       'Etag': '1234',
//       'Last-Modified': new Date(),
//       'Access-Control-Request-Method': 'GET,PUT,POST',
//       'Access-Control-Allow-Credentials': 'true',
//       'Access-Control-Request-Headers':'X-Custom-Header',
//       'Access-Control-Max-Age': 1728000
//     }); 

//   ctx.body = {
//     'name':'hehuiyun',
//     'type':'core'
//   }
// })

routerPost.post('/add',async (ctx)=>{
      ctx.set({
      'Access-Control-Allow-Origin':'http://localhost:3000',
      'Cache-Control': 'public, max-age=604800',
      'Etag': '1234',
      'Last-Modified': new Date(),
      'Access-Control-Request-Method': 'GET,PUT,POST',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Request-Headers':'X-Custom-Header',
      'Access-Control-Max-Age': 1728000
    }); 
    // 获取表单提交的数据
    ctx.body = ctx.request.body;
});

routerPost.post('/', ctx => {
  ctx.set({
      'Access-Control-Allow-Origin':'http://localhost:3000',
      'Cache-Control': 'public, max-age=604800',
      'Etag': '1234',
      'Last-Modified': new Date(),
      'Access-Control-Request-Method': 'GET,PUT,POST',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Request-Headers':'X-Custom-Header',
      'Access-Control-Max-Age': 1728000
    }); 
  const name = ctx.params.name;
  const data = ctx.request.body;
  ctx.body = {
    'name':'hehuiyun',
    'type':'core'
  }
// 获取表单提交的数据s
//   ctx.body = ctx.request.body;
})

// app.use(router.routes());
app.use(routerPost.routes());
app.use(routerPost.allowedMethods());

app.listen(3002, () => {
  console.log('Serving crossorigin pages. Listening 3002 with domain localhosts');
})

