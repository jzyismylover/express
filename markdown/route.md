# 路由模块

- 路由是指应用程序的端点 (URI) 如何响应客户端请求, 下面是最简单的一个路由 example
```js
const express = require('express')
const app = express()

app.get('/', function(req, res) {
    res.send('hello world')
})
```

- 路由包括了 HTTP 请求的方法，比如 get, post, post, delete 等，其中有一个比较特殊的 all 方法，用来处理中间件函数。

```js
app.all('/secret', function(req, res, next) {
    // do something
    next() // 跳转到下一个处理回调
})
```

## 路由路径

- 路径其实就和之前基础到的接口是差不多的概念，每个路径代表着一个功能。而 express 的路径可以使用字符串或者正则表达式来构建。`path-to-regexp` 是 express 内部解析路径的插件。

```js
app.get('/', function(req, res) {})

app.get('/ab?cd', function(req, res) {}) // 可能匹配到 acd or abcd

app.get('/ab+cd', function(req, res) {}) // 可能匹配到 abcd、abbcd、abcd .....

app.get('/ab*cd', function (req, res) { }) // 可能匹配到 abd abxcd abxxxxcd ....(可能和我们所理解的 * 的概念不太一样)

app.get(/a/, function(req, res) {} ) // 所有包含 a 的路径都会匹配到
```


### 路径传参

- 上面介绍的是如何匹配路径的问题，匹配到路径之后我们怎么传参呢？下面就来详细的介绍一下。

```js
app.get('/users/:userId/books/:bookId', function (req, res) {
  res.send(req.params) // { userId: 'xxx', bookId: 'xxx'}
})
```
可以理解为我们可以通过 req.params 来获得路径传参的参数值


## 路由处理(Router handlers)
- 我们可以使用多个回调函数的形式来处理请求

```js 
// 第一种方式
app.get('/example/b', function (req, res, next) {
  console.log('the response will be sent by the next function ...')
  next()
}, function (req, res) {
  res.send('Hello from B!')
})

// 第二种方式
var cb0 = function (req, res, next) {
  console.log('CB0')
  next()
}

var cb1 = function (req, res, next) {
  console.log('CB1')
  next()
}

var cb2 = function (req, res) {
  res.send('Hello from C!')
}

app.get('/example/c', [cb0, cb1, cb2])

// 第三种方式
var cb0 = function (req, res, next) {
  console.log('CB0')
  next()
}

var cb1 = function (req, res, next) {
  console.log('CB1')
  next()
}

app.get('/example/d', [cb0, cb1], function (req, res, next) {
  console.log('the response will be sent by the next function ...')
  next()
}, function (req, res) {
  res.send('Hello from D!')
})

```

## Response methods


## 构造路由

构造路由其实有两种方式

- 第一种是使用 `app.route`的方式，构建一个路径集合的 http 方法

```js
app.route('/book')
  .get(function (req, res) {
    res.send('Get a random book')
  })
  .post(function (req, res) {
    res.send('Add a book')
  })
  .put(function (req, res) {
    res.send('Update the book')
  })
```

- 第二种是使用 `express.Router`的方式，通过一个基础路径，扩展不同的路径集合设置不同的请求方法。

```js
var express = require('express')
var router = express.Router()

// 中间件函数
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

// 根路由
router.get('/', function (req, res) {
  res.send('Birds home page')
})

// about 子路由
router.get('/about', function (req, res) {
  res.send('About birds')
})

module.exports = router

// 在 app.js 中使用
const birds = require('./birds')
app.use('/birds', birds)

// 当匹配到 /birds 时，触发 birds.js 内部的根路由拦截
// 当匹配到 /birds/about 时，触发 birds.js 内部的 /about 路由拦截
// 这种方法的可扩展性相比第一种要更强一些
```