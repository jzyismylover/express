# 中间件



:exclamation: 使用注意事项

1. 如果要注册中间件，必须在定义路由前调用
2. 客户端发送过来的请求，可以连续调用多个中间件进行处理
3. 执行完中间件的业务代码之后，不要忘记调用 next() 函数
4. 为了防止代码逻辑混乱，调用 next() 函数后不要再写额外的代码
5. 连续调用多个中间件时，多个中间件共享 req 和 res 对象



:key: 中间件粗略分为全局中间件和局部中间件，如果细致分的话:

- 应用级别中间件
  - (req, res, next)
  - 绑定到 app 上(全局 & 局部)

- 路由级别中间件
  - (req, res, next)
  - 绑定在 router 上(当前路由生效)

- 错误级别中间件

  - (err, req, res, next)
  - 捕获整个项目中发生的异常错误，防止程序崩溃

  - :exclamation: 错误级别中间件必须注册所有路由之后(否则不能正常工作)

- 内置中间件

  - express.static -- 托管静态资源
  - express.json -- 解析 JSON 格式的请求体数据
  - express.urlencoded -- 解析 URL-encoded 格式的请求数据(配置解析 application/x-www-form-urlencoded)

```js
// 解析表单中的 JSON 格式数据
app.use(express.json())
// 解析表单中的 application/x-www-form-urlencoded 数据
app.use(express.urlencoded({ extended: false }))
```

- 第三方中间件
  - 不是 Express 内置的，需要自己下载的
  - [body-parser](https://www.jianshu.com/p/4ebcc5acff45)

```js
// 下载第三方中间件
npm install body-parser

// 使用第三方中间件
const parser = require('body-parser')
app.use(parser.urlencoded({ extended: false }))

app.post('', (req, res) => {
    // 如果没有配置任何解析表单数据的中间件，则 req.body 为空
    console.log(req.body)
})
```



:key: 自定义中间件

1. 定义中间件
2. 监听 req 的 data 事件
3. 监听 req 的 end 事件
4. querystring 模块



```js
const query = require('querystring')
const middleware = (req, res, next) => {
    let str = ''
	req.on('data', (chunk) => {
		// 如果数据比较大需要对数据进行分批处理
    	str += chunk
    })
    req.on('end', () => {
        // 拿到并处理完整的请求体数据
        const params = query.parse(str)
        req.body = params
        
    })
}
```

