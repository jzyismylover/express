require('dotenv').config

const express = require('express')
const app = express()
const mysql = require('mysql')
const sqlConfig = require('./db/dbconfig')

// /* 数据库连接配置 */
// const connection = mysql.createConnection({
//   host: sqlConfig.host,
//   user: sqlConfig.user,
//   password: sqlConfig.password,
//   database: sqlConfig.database
// })

// connection.connect()
// connection.on('error', (error) => console.log(error))
// connection.on('once', () => console.log('Connect to the database'))


// 静态文件托管
app.use('/static', express.static('public'))

// 配置跨域请求
app.use(require('cors')())

// 编码
app.use(express.json())

// 导入路由
const blog = require('./routes/blog')

// 路由前缀配置
app.use('/blog', blog)

// 挂载端口
app.listen(3000, () => console.log('serve open'))