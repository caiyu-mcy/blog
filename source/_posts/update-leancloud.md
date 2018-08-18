---
title: 优化 LeanCloud 获取文章阅读量的请求
date: 2018-08-18 14:55:32
tags:
- 假使要我跟你再耗个十年
- BLUESH
---
Google Mail 常年没有正经邮件，自从用了[LeanCloud 给博客添加文章阅读量](/blog/2017/06/21/add-post-views/)之后，经常收到「使用超限」的提醒。一开始还激动说，妈耶我博客访问量超载了耶好棒哦！

后来渐渐发现是自己的使用方式不对，尤其是在修改主题之后列表页不带分页的情况下。
每次都一篇一篇获取文章的阅读数据，而不是拉取一个阅读列表数组。可想而知，列表页刷个两次，一周就该爆表了。
今天终于忍不住动手修改了一下，也稍稍翻了翻[LeanCloud 文档](https://leancloud.cn/docs/leanstorage_guide-js.html)。

<img src="/blog/images/blog/2018/0818-1.png">我就一开发项目，免费的数量本来就有限。结果一次列表页的请求就浪费五十多次。但截图中可以看出写操作还是一条一条的计费。

优化方式：按照创建时间倒叙来获取列表数据，然后找到对应的DOM去写入已读数据。
```javascript
query.descending('createdAt');
query.find().then(function (results) {
    results.map(object => {
        let DOM = document.getElementById(object.get('url'));
        if(DOM) {
            DOM.innerHTML = '已读：' + object.get('time')
        }
    })
})
```
昨天是情人节，祝大家都和和美美。
这篇文章是就着康永哥和小S的「真相吧！花花万物」，和一点点去冰三分糖冰淇淋红茶写下的，没有压力很简单。
有时候在想看文章的人都在做着什么，怎么想象写文章的那个人。
但凡有一点帮助我都会很开心。
