---
title: 表格内的pre元素宽度的问题
date: 2017-07-13 17:08:29
tags: 假使要我跟你再耗个十年
---

**描述**
`pre`元素如果遇到长链接或者较长的文字时不会自动折行，而是出现横向滚动条。
日常问题不大，但是在表格中会尽量的舒展，并可能撑出容器。
而且设置`max-width`不起作用。

虽然可以设置固定的`width`解决，但在表格内无法自适应宽度。


**方案一**`pre` 自动折行设置

```
pre {
  white-space: -moz-pre-wrap; /* Mozilla, supported since 1999 */
  white-space: -pre-wrap; /* Opera */
  white-space: -o-pre-wrap; /* Opera */
  white-space: pre-wrap; /* CSS3 - Text module (Candidate Recommendation) http://www.w3.org/TR/css3-text/#white-space */
  word-wrap: break-word;
}
```

**方案二**`pre`宽度固定，溢出滚动的设置
即解决表格能够限制`pre`的宽度，而不是让它自由扩展
```
table {
  table-layout:fixed;
  width: 100%;
}
```

完。

p.s.之前发在Medium上。
因为最近有人也遇到这样的问题，但是各种原因导致查看很困难
所以整理到博客上来了。
