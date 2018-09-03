
https://github.com/FatDong1/cross-domain
https://github.com/zendesk/cross-storage
# cross-domain描述

跨域的简单demo，所有demo都是使用基于nodeJs的下一代Web开发框架Koa。

包含：jsonp/document.domain/window.name/cors/postmessage/location.hash

## koa使用出现的问题（需要深入发现，进一步处理）

## demo介绍
用node的web框架Koa在3000端口和3001端口分别开启一个静态服务器，在两个端口间进行跨域传输数据。


## 路劲
// console.log(__filename); __filename变量获取当前模块文件的带有完整绝对路径的文件名
// /Users/huiyun/hhy/MTS/MyTest/cross-domain/window_name/serverReq.js

// console.log(__dirname);  __dirname文件所在目录的完整绝对路径
// /Users/huiyun/hhy/MTS/MyTest/cross-domain/window_name

post请求默认是json数据格式

https://www.npmjs.com/package/koa-bodyparser  (koa-bodyparser会转换格式)

当提交应该更新文件，想办法怎么更新文件。
当支持和反对更新后台数据，现在仅仅模仿post一个后台。