用document.domain来指定域，是可以的，但是有局限性，也就是一级域名一致才可以。

比如：
- 对
http://req.req.sub.localhost:3000/req  下指到sub.localhost 是可以的。

http://res.res.sub.localhost:3001/res  下指到sub.localhost 是可以的。

http://req.sub.localhost:3000/req  下指到sub.localhost 是可以的。

http://res.sub.localhost:3001/res  下指到sub.localhost 是可以的。

像上面是可以的，因为 一级域名  都是 sub.localhost 。 (此例子是不是一级域名，还得确定，但是一定要设有相同域名)

- 不对
http://req.sub.localhost:3000/req  下指到localhost 是不可以的。

http://res.sub.localhost:3001/res  下指到localhost 是不可以的。

会报错res:14 Uncaught DOMException: Failed to set the 'domain' property on 'Document': 'localhost' is a top-level domain.

- 不对
http://req.sub.localhost:3000/req  下指到 res.sub.localhost  是不行的。

sojson.com  指到 baidu.com  还是不行的。

像上面是不可以的，因为 一级域名  都不一致，这个情况下，会报错