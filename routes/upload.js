const express = require('express')
const router = express.Router()
const formidable = require('formidable')
const { writeFile, readFileSync } = require('fs')
const { join } = require('path')

// 文件上传接口(使用 formidable配置中间件函数)
// 相对而言感觉 multer 更加优雅一些
// 可以针对上传的格式和对应的参数进行校验
router.post('/upload', (req, res, next) => {
  console.log(req.body)
  const form = formidable({ multiples: true })
  form.parse(req, (err, fields, files) => {
    if (err) {
      return next(err)
    }
    // 对应的 file 其实就是用户上传的字段名
    console.log(fields, files.file.originalFilename)
    // if (files) {
    //   writeFile(
    //     join('public/images/', files.file.originalFilename),
    //     readFileSync(files.file.originalFilename),
    //     (err, data) => {
    //       if (err) {
    //         return next(err)
    //       }
    //       res.json({
    //         files,
    //       })
    //     }
    //   )
    // }
  })
})

module.exports = router
