/**
 * 用户登录 & 注册逻辑
 */

const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const { join } = require('path')
const { secret } = require(join(__dirname, '../token/jwt-config'))

router.post('/login', (req, res) => {
  const { username, password } = req.body
  const tokenObj = {
    username,
    role: 'student'
  }

  const token = jwt.sign({
    data: tokenObj,
  }, secret, {
      expiresIn: '2 days'
  })

  res.json({
    code: 200,
    msg: 'login successfully',
    data: {
      token
    }
  })
})

router.post('/regist', (req, res) => {
  const { username, password, rePassword } = req.body
})


const formidable = require('formidable')
const { writeFile, readFileSync } = require('fs')
router.post('/upload', (req, res, next) => {
  const form = formidable({ multiples: true })
  form.parse(req, (err, fields, files) => {
    if(err) { return next(err) }
    // console.log(fields, files)
    /* fields 得到的是字段；files 得到的是文件 */
    /*
      对应的 files 对象(可以通过 mimetype 限制上传的图片格式)
      "files": {
          "image": {
              "size": 122914,
              "filepath": "C:\\Users\\hp\\AppData\\Local\\Temp\\52a115cacc134a3e8779ca700",
              "newFilename": "52a115cacc134a3e8779ca700",
              "mimetype": "image/png",
              "mtime": "2022-06-25T06:24:34.648Z",
              "originalFilename": "encrypt.png"
          }
      }
    */
    if(files) {
      writeFile(join('public/images/', files.image.originalFilename), readFileSync(files.image.filepath), (err, data) => {
        if(err) {
          return next(err)
        }
        res.json({
          /* 返回给用户的应该一个可以访问的图片 URL */
          /* 考虑到服务器的资源有限 -- 后期可以考虑使用云对象存储 */
          files
        })
      }) 
    }
  })
})

module.exports = router