require('dotenv').config

const express = require('express')
const app = express()


/* 静态资源配置 */
const path = require('path')
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use('/apidoc', express.static(path.join(__dirname, 'public/apidoc')))

/* 跨域配置处理 */
app.use(require('cors')())


/* token校验 */
const jwt = require('jsonwebtoken')
const { secret } = require(path.join(__dirname, 'token/jwt-config'))
const excludePaths = ['/api/login', '/api/regist']
app.use((req, res, next) => {
  if (excludePaths.includes(req.path)) { return next() }
  if(!req.headers.authorization) {
    return res.json({
      code: '401',
      err: 'Blank token'
    })
  }
  const token = req.headers.authorization.slice(7)
  jwt.verify(token, secret, (err, decode) => {
    console.log(err)
    if (err) {
      // err 常有两种：过期和验证错误(err.message 内部封装了对应的讯息)
      return res.json({
        code: 401,
        err: err.message
      })
    }
    next()
  })
})


/* body-parser 配置解析 post 方法数据 */
const { json, urlencoded } = require('body-parser')
app.use(json())
app.use(urlencoded({ extended: false }))


/* 路由 */
const blog = require(path.join(__dirname, 'routes/blog'))
const login = require(path.join(__dirname, 'routes/user'))

app.use('/api/blog', blog)
app.use('/api', login)


/* 全局错误捕获 */
app.use((err, req, res) => {
  if(err) {
    console.log('global')
    return console.log(err)
  }
})

app.listen(3000, () => console.log('serve open')) // 挂载端口