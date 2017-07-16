---
title: React 回头看学习指南
date: 2017-07-16 20:35:05
tags: 假使要我跟你再耗个十年
---
我，一个懒惰的前端工程师
只有在需要的时候才会去学习新技术（但是我学习能力强，上手快啊）
所以 React 起步相对晚
之前还跟面试官说，我觉得和 Vue 也差不多（划掉）嘛～
通过这几天资料的翻阅和查看，整理一下
是上手以后再回头看也有益处的资料

1. [React Architecture and Best Practices](https://github.com/markerikson/react-redux-links/blob/master/react-architecture.md)

1. [React + Redux 最佳实践](https://github.com/sorrycc/blog/issues/1)

1. [react-redux样板](https://github.com/sorrycc/react-redux-boilerplate)

1. [Redux 中文文档](http://cn.redux.js.org/index.html)

1. [理解 React，但不理解 Redux，该如何通俗易懂的理解 Redux？](https://www.zhihu.com/question/41312576)

1. [深入浅出 - Redux](https://www.w3ctech.com/topic/1561)

1. [React Router](https://reacttraining.com/react-router/web/guides/philosophy)

1. [Redux-saga 中文文档](http://leonshi.com/redux-saga-in-chinese/index.html)

1. [async 函数的含义和用法](http://www.ruanyifeng.com/blog/2015/05/async.html)

1. [Fetch](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch)

1. [reselect](https://github.com/reactjs/reselect#connecting-a-selector-to-the-redux-store)


还在积累实际项目过程中，所以没有经验之谈，只是就选型这件事啰嗦两句
团队在 Vue 和 React 之间摇摆不定，我也一度想要放弃高门槛的 React
但是本着既然没接触过 React 学会了之后也算掌握三剑客（Angular Vue React）找工作更容易的私心坚持了下来

React 和其他框架不同之处在于它不是一个框架
它的思想理念在我看来仿佛就是一套类似的浏览器，对树结点的解析和渲染。
搭配上一系列的周边（redux，router），才能称之为一个框架。

特征：**单数据流**
Data 总是从顶层向下分发，只有子组件的回调在概念上可以回到state顶层影响Data。
这样我可以在一个state上管理所有的数据，而不至于将组件之间的交互线路搞得一团乱麻
在组件分离组合的时候更加高效

Vue2.x也做了这样的改进，当然是基于Flux思想
我不造Vue被称为渐进式的框架，在 React 面前是渐进在哪里
在我看来，Vue就是作者基于Flux理念给的一套最佳实践，跟[dva](https://github.com/dvajs/dva)做的事情一样。
而所谓的最佳实践，其实是指符合大多数应用的开发模式
所以所谓的**渐进**，React 才是需要多少->学多少->用多少的一门语言

以及我们团队的前端水平参差不齐，不希望给开发者太多的自由发挥
所以 TypeScript 成了不二之选
设计良好的 TypeScript 堪比一份规范文档，麻麻再也不用担心新手乱搞事情

总而言之，适合自己的才是最好的

p.s.我也刚接触 React 不到一个月，理解不深刻。片面之处请包涵，能指正就再好不过了






