---
title: 基于 LeanCloud 平台 为 Hexo 博客添加文章阅读量
date: 2017-06-21 14:58:23
categories: 哈喽！女汉纸
tags: hexo
---
我自己经常会到 Google Analytics 后台看网站的访问数据，最近特别关心文章的阅读量。

外加这次[电影节](/blog/2017/06/09/2017上海电影节排片（官方改良版）/)的访问数据很可观，满足下自己小小的虚荣心。

我自己也不用特意去后台看数据，直接访问网站就能看到；
用户也有可能被阅读量高的文章吸引好奇进来点一点。


## 文章浏览量
[LeanCloud](https://leancloud.cn/)注册帐户，新建应用
<img src="/blog/images/blog/2017/0621_1.png" class="full-img">

### 基础安全配置

完成后可以在 **设置 － 应用Key** 路径下找到 `app_id` 和 `app_key`


在Hexo根目录下的 `_config.yml`文件中加入配置
```
leancloud_visitors:
  enable: true
  app_id: **你的leancloud 帐户app_id**
  app_key: **你的leancloud 帐户app_key**
```

**设置 － 安全中心** 路径下配置 **Web 安全域名**
<img src="/blog/images/blog/2017/0621_3.png" class="full-img">


### 创建Class

在应用的存储中新建一个 `Counter` 类。
<img src="/blog/images/blog/2017/0621_2.png" class="full-img">

这个**存储**就是一张张数据库的表格，我们现在建了一张统计访问量的表格。

此外它提供了一些方法来和表格数据交互，你也不必了解太详细，我下面会提供方法


### 对 themes 主题文件进行配置

找到 `google-anaytics.ejs` 文件，加入以下代码（因为这类都是统计SDK，可以放在一起，
洁癖人士可以新建一个文件）：
```
<% if (theme.leancloud_visitors.enable){ %>
<script src="https://cdn1.lncld.net/static/js/av-core-mini-0.6.1.js"></script>
<script>AV.initialize("<%= theme.leancloud_visitors.app_id %>", "<%= theme.leancloud_visitors.app_key %>");</script>
<script>
function showTime(Counter) {
    var query = new AV.Query(Counter);
    document.querySelectorAll(".leancloud_visitors").forEach(function(item) {
        console.log(item.id);
        var url = item.id.trim();
        query.equalTo("url", url);
        query.find({
            success: function(results) {
                if (results.length == 0) {
                    document.getElementById(url).innerHTML = 0;
                    return;
                }
                for (var i = 0; i < results.length; i++) {
                    var object = results[i];
                    document.getElementById(url).innerHTML = object.get('time');
                }
            },
            error: function(object, error) {
                console.log("Error: " + error.code + " " + error.message);
            }
        });

    });
}

function addCount(Counter) {
    var Counter = AV.Object.extend("Counter");
    url = document.querySelector(".leancloud_visitors").id.trim();
    title = document.querySelector(".leancloud_visitors").getAttribute('data-title').trim();
    var query = new AV.Query(Counter);
    query.equalTo("url", url);
    query.find({
        success: function(results) {
            if (results.length > 0) {
                var counter = results[0];
                counter.fetchWhenSave(true);
                counter.increment("time");
                counter.save(null, {
                    success: function(counter) {
                        document.getElementById(url).innerHTML = counter.get('time');
                    },
                    error: function(counter, error) {
                        console.log('Failed to save Visitor num, with error message: ' + error.message);
                    }
                });
            } else {
                var newcounter = new Counter();
                newcounter.set("title", title);
                newcounter.set("url", url);
                newcounter.set("time", 1);
                newcounter.save(null, {
                    success: function(newcounter) {
                        console.log("newcounter.get('time')="+newcounter.get('time'));
                        document.getElementById(url).innerHTML = newcounter.get('time');
                    },
                    error: function(newcounter, error) {
                        console.log('Failed to create');
                    }
                });
            }
        },
        error: function(error) {
            console.log('Error:' + error.code + " " + error.message);
        }
    });
}
(function() {
    var Counter = AV.Object.extend("Counter");
    // 如果页面只有一个 leancloud_visitors 则认为它是文章页面
    // 如果有多个，认为它是列表页
    if (document.querySelectorAll('.leancloud_visitors').length == 1) {
        addCount(Counter);
    } else if (document.querySelectorAll('.leancloud_visitors').length > 1) {
        showTime(Counter);
    }
})();
</script>
<% } %>
```

p.s. 我参考的网站用的是`jQuery`，我不想多引入一个js文件，所以都改成了原生的 `javaScript`。

把下面这段代码放在你想要显示阅读量的位置就可以了（比如说列表页面，比如说文章页面顶部）：
```
<% if (theme.leancloud_visitors.enable) { %>
    <span id="<%- url_for(item.path) %>" class="leancloud_visitors" data-title="<%= item.title %>"></span>
<% } %>
```
手动把 Google Analytics 的数据导入到 LeanCloud
最终效果：
<img src="/blog/images/blog/2017/0621_6.png" alt="文章详情页" class="full-img">



## 网站访问量
网站总的访问量可以用[不蒜子](http://busuanzi.ibruce.info/)的统计，太简单就不展开说了。

按照官网给的教程没有坑。

我把这个加在了页面底部：
<img src="/blog/images/blog/2017/0621_4.png" class="full-img">

## 番外

其实赞赏的按钮也加了监控
可以检查有多少人点击，啥时候也把数据获取了展示一下😁😁
