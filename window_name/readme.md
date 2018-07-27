window.name跨域
在页面在浏览器端展示的时候，我们总能在控制台拿到一个全局变量window，该变量有一个name属性，其有以下 特征：
1）每个窗口都有独立的window.name与之对应；
2）在一个窗口的生命周期中（被关闭前），窗口载入的所有页面同时共享一个window.name，每个页面对window.name都有读写的权限；
3）window.name一直存在与当前窗口，即使是有新的页面载入也不会改变window.name的值；
4）window.name可以存储不超过2M的数据，数据格式按需自定义。

https://www.jianshu.com/p/43ff69d076e3