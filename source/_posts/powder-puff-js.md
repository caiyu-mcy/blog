---
title: 花拳绣腿的JS，来玩正则啊
date: 2017-08-21 19:41:39
tags: 假使要我跟你再耗个十年
---
今天写了个函数来高亮一段字符串中的**所有**关键字
发去给刘导得瑟说
你看你看，我现在写递归好顺滑哦～
```javascript
var highlight = (s:string, key: string): string => {
    const index = s.indexOf(key);
    if(index === -1) return s;

    const beforeStr = s.substr(0, index);
    const afterStr = s.substr(index + key.length);
    return `${beforeStr}<b style="color:#f04134">${key}</b>${highlight(afterStr, key)}`
}
```

刘导看了会说
但是有更简单的做法
string regex replace

我一拍脑袋，怎么没想到正则呢！
```javascript
var highlight = (s:string, key: string): string => {
    const reg = new RegExp(key, 'g');
    return s.replace(reg, `<b style="color:#f04134">${key}</b>`);
}
```

刘导说着不忘补一句
你们呀，老是喜欢花拳绣腿

正则高深莫测
在处理字符串的时候别忘了还有**正则**
可能比一堆函数还有用
