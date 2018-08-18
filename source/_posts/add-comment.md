---
title: 以 Disqus & 友言 为例给 Hexo 博客设置评论
date: 2017-10-31 16:18:11
tags:
- 假使要我跟你再耗个十年
- BLUESH
---
一开始用的 Disqus 评论但是只能翻wall访问
后因为有人发gmail邮件问问题，因为我太少查看邮件了大概延迟了一个月，也就没有帮到这位朋友
想着如果有包容一点的评论也许会回复及时一点，所以换了lowlow的友言
之前在推上也有人问怎么加的 Disqus 评论今天也一并记录一下：

### 友言评论
1. 注册[友言](http://www.uyan.cc/)
2. 如果你用的 Hexo 主题支持友言评论的话，只需要进入友言的**后台管理**拷贝用户ID粘贴到👇
路径`themes/yourtheme/_config.yml`
{% img /images/blog/2017/1031-1.png %}

3. 如果主题配置不支持，就自己添加`youyan_uid: yourid`配置
然后找到主题文件下的`comment.ejs`文件，拷贝代码👇

```javascript
<!-- youyan Comments -->
<% if (theme.comments && theme.comments.youyan_uid){ %>
<div id="uyan_frame"></div>
<script type="text/javascript">
  var youyan_uid = '<%= theme.comments.youyan_uid %>';
  (function() {
      var uyan = document.createElement('script');
      uyan.type = 'text/javascript';
      uyan.async = true;
      uyan.src = '//v2.uyan.cc/code/uyan.js?uid=' + youyan_uid;
      (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(uyan);
  })();
</script>
<% } %>
```
完成✅

### Disqus 评论
1. 注册[Disqus](https://disqus.com/) (我电脑已经访问不了了)
2. 如果主题支持 Disqus 评论的话，只需要给`disqus_shortname`填上你的 Disqus 用户名
3. 如果主题不支持，加上`disqus_shortname: your_disqus_shortname`，并找到`comment.ejs`文件，拷贝代码👇

```javascript
<!-- Disqus Comments -->
<% if (theme.comments && theme.comments.disqus_shortname){ %>
<div id="disqus_thread" class="comment"></div>
<script type="text/javascript">
  /* * * CONFIGURATION VARIABLES * * */
  var disqus_shortname = '<%= theme.comments.disqus_shortname %>';

  /* * * DON'T EDIT BELOW THIS LINE * * */
  (function() {
      var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
      dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
      (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
  })();
</script>
<% } %>
```
完成✅

<!-- 可能有些人的主题里是没有`comment.ejs`文件的，那这段代码就应该放在文章`article-full.ejs`的底部 -->

心酸的是上线到现在都没有人评论过诶，希望大家多多留言多多交流啦
p.s. 今天超级想改主题的
