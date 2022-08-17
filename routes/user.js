/**
 * 用户登录 & 注册逻辑
 */

const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const { join } = require('path')
const { secret } = require(join(__dirname, '../token/jwt-config'))
const { queryAdd } = require('../db/db')

// 基于 jwt 的方式对用户的身份进行校验
router.post('/login', (req, res) => {
  const { username, password } = req.body
  console.log(username, password)
  console.log(req.body)

  if (!username || !password) {
    return res.status(400).send({
      code: -1,
    })
  }

  // token sign
  const tokenObj = {
    username,
    role: 'teacher',
  }
  const token = jwt.sign(
    {
      data: tokenObj,
    },
    secret,
    {
      expiresIn: '20 days',
    }
  )

  res.json({
    code: 200,
    msg: '登录成功',
    data: {
      token,
    },
  })
})

router.post('/regist', (req, res) => {
  const { username, password, rePassword } = req.body
})

module.exports = router
