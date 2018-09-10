
https://github.com/FatDong1/cross-domain
https://github.com/zendesk/cross-storage
# cross-domain描述

跨域的简单demo，所有demo都是使用基于nodeJs的下一代Web开发框架Koa。

包含：jsonp/document.domain/window.name/cors/postmessage/location.hash

## koa使用出现的问题（需要深入发现，进一步处理）

## demo介绍
用node的web框架Koa在3000端口和3001端口分别开启一个静态服务器，在两个端口间进行跨域传输数据。

## express和koa结合使用
在websocket中测试过

## 路劲
// console.log(__filename); __filename变量获取当前模块文件的带有完整绝对路径的文件名
// /Users/huiyun/hhy/MTS/MyTest/cross-domain/window_name/serverReq.js

// console.log(__dirname);  __dirname文件所在目录的完整绝对路径
// /Users/huiyun/hhy/MTS/MyTest/cross-domain/window_name

post请求默认是json数据格式

https://www.npmjs.com/package/koa-bodyparser  (koa-bodyparser会转换格式)

当提交应该更新文件，想办法怎么更新文件。
当支持和反对更新后台数据，现在仅仅模仿post一个后台。


## etag


实体标签是web服务器和浏览器用于确认缓存组件的有效性的一种机制。

条件是GET请求，服务器是判断缓存是否还有效的根据?

1. 一种是根据最新修改时间：

Last-Modified   服务器响应头   标记此文件在`服务期端最后被修改的时间`

If-Modified-Since   浏览器请求头   询问该时间之后文件是否有被修改过

如果服务器端的资源没有变化，则自动返回 HTTP 304 （Not Changed.）状态码。

当服务器端代码发生改变或者重启服务器时，则重新发出资源，返回和第一次请求时类似。从而 保证不向客户端重复发出资源，也保证当服务器有变化时，客户端能够得到最新的资源。

2. 一种是前面提到的ETag：用于检测`浏览器缓存中`的组件与原始服务器上的组件是否匹配。

Last-Modified:Tue,12 Dec 200603:03:59 GMT   服务器响应头 

ETag:”10c24bc-4ab-457elc1f“    服务器响应头    在HTTP响应头中将其传送到客户端

If-Modified-Since:Tue,12 Dec 200603:03:59 GMT   浏览器请求头

If-None-Match:”10c24bc-4ab-457elc1f“   浏览器请求头

当ETag和Modified-Time都出现了，则原始服务器禁止返回304除非`请求中的条件头字段全部一致`(这句话什么意思？)。

如果ETag没改变，则返回状态304然后不返回。

Last-Modified和If-Modified-Since对应；ETag和If-None-Match对应。

**为什么要引入ETag?**

ETag主要是为了解决Last-Modified无法解决的一些问题：

1. 一些文件也许会周期性的更改，但是他的内容并不改变(仅仅改变的修改时间)，这个时候我们并不希望客户端认为这个文件被修改了，而重新GET;

2. 某些文件修改非常频繁，比如在秒以下的时间内进行修改，(比方说1s内修改了N次)，If-Modified-Since能检查到的粒度是s级的，这种修改无法判断(或者说UNIX记录MTIME只能精确到秒);

3. 某些服务器不能精确的得到文件的最后修改时间。

**ETag带来的问题**

ETag的问题在于通常使用某些属性来构造它，有些属性对于特定的部署了网站的服务器来说是唯一的。`当使用集群服务器的时候`，浏览器从一台服务器上获取了原始组件，之后又向另外一台不同的服务器发起条件GET请求，ETag就会出现不匹配的状况。

最佳实践

1. 如果使用Last-Modified不会出现任何问题，可以直接移除ETag，google的搜索首页则没有使用ETag。

2. 确定要使用ETag，在配置ETag的值的时候，移除可能影响到组件集群服务器验证的属性，例如只包含组件大小和时间戳。


## Upgrade-Insecure-Requests   浏览器的请求头

让浏览器自动升级请求从http到https,用于大量包含http资源的http网页直接升级到https而不会报错.

## Referrer-Policy

no-referrer-when-downgrade：在同等安全等级下（例如https页面请求https地址），发送referer，但当请求方低于发送方（例如https页面请求http地址），不发送referer

origin-when-cross-origin:跨域时发送origin


timing-allow-origin:用于指定特定站点，以允许其访问Resource Timing API提供的相关信息，否则这些信息会由于跨源限制将被报告为零  https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Timing-Allow-Origin

如需允许https://developer.mozilla.org查看你的计信息，你可以设置：Timing-Allow-Origin: https://developer.mozilla.org

via是http协议里面的一个header,通过代理和网关记录http请求

x-cache是squid代理的自定义header,用来记录缓存的命中与否

age: 35008
cache-control: max-age=315360000
content-length: 124
content-type: image/png
date: Tue, 04 Sep 2018 15:20:50 GMT
expires: Fri, 01 Sep 2028 05:37:22 GMT