// require('dotenv').config

const express = require('express')
const app = express()

// 静态资源配置
const path = require('path')
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use('/apidoc', express.static(path.join(__dirname, 'public/apidoc')))

// 跨域配置
app.use(require('cors')())

// token 校验
const jwt = require('jsonwebtoken')
const { secret } = require(path.join(__dirname, 'token/jwt-config'))
const excludePaths = ['/api/login', '/api/regist']
app.use((req, res, next) => {
  if (excludePaths.includes(req.path)) {
    return next()
  }
  if (!req.headers.authorization) {
    return res.status(401).json({
      code: 401100,
      msg: '身份未验证',
    })
  }
  const token = req.headers.authorization.slice(7) // Bearer xxxx 格式
  jwt.verify(token, secret, (err, decode) => {
    if (err) {
      // err 常有两种：过期和验证错误(err.message 内部封装了对应的信息)
      console.log(err.message)
      return res.json({
        code: 401110,
        err: err.message,
      })
    }
    next()
  })
})

// body-parser 解析 body 数据
const { json, urlencoded } = require('body-parser')
// app.use(json()) // application/json
app.use(urlencoded({ extended: false })) // application/x-www-urlencoded

// 路由
const blog = require(path.join(__dirname, 'routes/blog'))
const user = require(path.join(__dirname, 'routes/user'))
const upload = require(path.join(__dirname, 'routes/upload'))

// 是否有公用配置路由前缀的方法
app.use('/api/blog', blog)
app.use('/api', user)
app.use('/api', upload)

// 全局错误捕获
app.use((err, req, res) => {
  if (err) {
    return console.group('global', err)
  }
})

app.listen(3000, () => console.log('serve open')) // 挂载端口
