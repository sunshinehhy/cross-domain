// var express = require('express');
// var app = express();

// var requestPort = 3000;

// app.use(express.static(__dirname + '/views'));


// app.listen(requestPort, function () {
//     console.log('Requester is listening on port :'+ requestPort);
// });



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


app.use(router.routes());

app.listen(3000, () => {
  console.log('Serving websocket pages. Listening 3000 with domain localhosts');
})