# Express 基础知识



## express-generator

:key: 生成 express 初始项目的脚手架







## app





## req

```js
router.get('/', (req, res, next) => {
})
```

场场看到路由的实现里面有这么一个东西，本质上其实也就是访问对应这个路径的时候执行里面的回调函数，回调函数的值包括 req, res, next。其中 req 对象就是这里需要讲解的模块。req 作为请求配置的对象，里面包含了很多客户端发起请求的一些信息。

### req.query

:key: 指的是 http://localhost:3000/blog?name=jzy ? 后面的内容，默认值是 {}。也就是无论后面拼接了多少值都会以键值对的形式存储到对象内部。一般是用在 get 请求获取传递参数上。

```js
// GET /search?q=tobi+ferret
req.query.q
// => "tobi ferret"

// GET /shoes?order=desc&shoe[color]=blue&shoe[type]=converse
req.query.order
// => "desc"

req.query.shoe.color
// => "blue"

req.query.shoe.type
// => "converse"	
```

### req.params

:key: 指的是 http://localhost:3000/blog/1 在路由定义的时候，可能会出现这么一种情况 /blog/:id，其实这里的 params 指的就是后面的 id，默认值是 {}，也就是存在多个这些东西的时候会以键值对的形式进行存储。

:exclamation: 有这么一种特殊情况，如果是 /blog/* 那么得到的结果就是一个数组了，数组就是按顺序存储内部拼接的内容。

```js
// GET /user/tj
req.params.name
// => "tj"

// 定义 /file/*
// GET /file/javascripts/jquery.js
req.params[0]
// => "javascripts/jquery.js"
```



### req.param

:key: 判断某个 param 是否存在。有检验顺序的问题。param -> body -> query

```js
// GET /search?q=tobi+ferret
req.query.q
// => "tobi ferret"

// GET /shoes?order=desc&shoe[color]=blue&shoe[type]=converse
req.query.order
// => "desc"

req.query.shoe.color
// => "blue"

req.query.shoe.type
// => "converse"
```







## res