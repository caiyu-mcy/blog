---
title: 滚动到页面的指定位置
date: 2017-09-01 11:48:02
tags: 假使要我跟你再耗个十年
---
滚动到页面的指定位置可以说是非常常见的需求了
我非常排斥用js计算的方式，明明浏览器自带了锚
却因为各种原因不得不手动计算，脱离了简单的逻辑把功能做复杂
刚接触前端时用jQuery的某插件`scrollTo(element)`还觉得非常方便

伪代码：
1. 获取到`element`的offset位置信息（left, top）
2. `window.scrollTo(left, top)`

最近在react里又做到这个需求，竟搜到一个非常好用的方法：
`Element.scrollIntoView()`

```javascript
🌰document.getElementById('hi').scrollIntoView()
```
符合我的业务场景
（为什么以前没发现呢？


参考资料
[Element.scrollIntoView()](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView)
[兼容性](https://www.quirksmode.org/dom/w3c_cssom.html#t30)
写技术文就是这么水～

