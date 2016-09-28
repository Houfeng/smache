
# 介绍 

[sm]art + c[ache] = smache   

Smache 是一个方便的内存缓存模块，可以通过一些简单缓存策略避免无限占用更多的内存，同时确保最常用最应该被缓存的对象被缓存。

GitHub: [https://github.com/Houfeng/smache](https://github.com/Houfeng/smache)

<!--more-->

# 安装  
```sh
npm install smache --save
```

# 用法

```js
const Cache = require('smache');

//创建实例
var cache = new Cache({
  //最多缓存的对象数量，省略时表示不做数量限制
  //在达到最大数量时，会移除「最久没用到的」的缓存项
  max: 1000, 
  //最长缓存生命周期，单位毫秒，省略时表示永久
  //到期时自动移除
  ttl: 1000 * 60 
});

//添加
cache.set(key,value);
cache.set(key,value,ttl); //可以单设定某项的 ttl

//获取
var value = cache.get(key);

//移除
cache.remove(key);

//清空
cache.clear();

```