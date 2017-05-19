---
title: 一次makefile实践经历
date: 2017-05-19 20:25:17
tags: 哈喽！女汉纸
---

今天是身份证上的生日(but so what)
这几天看陈皓创业的视频说到：
> 亚马逊的技术团队有两个观点，第一个观点是崇尚简化和自动化，第二个观点是运维优先，叫 operational excellence，做平台的思路。

其实在写这篇之前，我一直以为他说的是工具化。就是运维有一堆的烂事情，你一定要让它变成自动化的工具，否则你可能永远深陷泥藻抽不出身。
每天忙得要死却不一定有什么成绩。

我，一个专业的前端（笑话）！为什么要关心运维的事呢？
我所在的团队就是做运维工具。
大多数前端都会觉得做后台应用low low的。业务要接近B端用户，框架和工具也要追求最新版。
但是我们团队的前端框架就是维持在 Angular1.4 不能升级。
因为写代码的那坨人都是并不是专业的前端，他们不关心昨天淘汰了哪个框架今天webpack升到多少明天又有什么新的概念诞生。他们关心自己的业务能不能完成，以及他们会用Angular完成任务，新的框架意味着新的学习成本。
不是他们不愿意学习，而是时间不允许他们犯错。

我的工作就是给他们提供一个简单高效低出错的前端框架。
开发新增一个业务模块，需要增加4个固定格式的文件，并引入申明到主模块。

所以我就想到用 makefile 来自动生成这几个文件并初始化一些固定格式的内容，顺便帮他们引入到主模块。
这之前开发的工作是：
1. 拷贝粘贴一个业务文件夹
1. 重命名文件夹
1. 进入文件夹
1. 重命名文件1
1. 重命名文件2
1. 重命名文件3
1. 修改文件1
2. 修改文件2
2. 修改文件3
2. 找到index.js文件把这个新的模块引入
2. 开始写业务

现在只需要一行命令就可以实现：`make init name=myProject`

且不说7，8，9这几个步骤的麻烦程度，就步骤上而言已经说明了问题。

### How to do it

- 明确 makefile 要做什么：
  创建目录
创建指定名字的文件
修改文件内容

```javascript
init:
    @mkdir ./app/${name}
    @touch ./app/${name}/${name}.tpl.html ./app/${name}/${name}.module.js ./app/${name}/${name}.controller.js
    @echo 'controller.js' > ./app/${name}/${name}.controller.js
    @echo 'module.js' > ./app/${name}/${name}.module.js
    @echo 'tpl.html' > ./app/${name}/${name}.tpl.html
```
- `init:` 相当于是函数名，也就是一个make命令。
  换行之后需要一个tab键，否则不认识接下来指令哦

- `mkdir`创建目录；
  make的指令默认会在控制台中打出这条操作，相当于console.log()。
  如果不想要，就在前面加`@`字符
  `${}`表示变量，就是`make init name=myProject`的name

- `touch`创建文件；

- `echo a > file`将 a 写入 file文件 中

`echo`相当于是完全覆盖之前的文件内容，那怎么做到在之前的文件内容上修改呢？
这时候就要上`awk`啦～
它的原理是读取这段文件，在指定地方写入内容，作为一个temp文件。最后将这个temp文件写到文件中。

```javascript
init:
    @awk -v file=./pages/${name}/${name} '{if ($$0 ~ "^];$$") print "    require(\"" file ".module.js\")," ; print $$0}' ./app/app.js > /tmp/mid.js && mv /tmp/mid.js ./app/app.js
```

`awk` 学问很深，我懂的太少
