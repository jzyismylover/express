const express = require('express')
const router = express.Router()
const db = require('../db/db')
const parser = require('body-parser')
const json = require('../db/json')


/**
 * @api {get} /blog 获取博客详情
 * @apiDescription 获取指定博客详情
 * @apiName 指定博客
 * @apiGroup Blog
 * @apiHeader Content-Type=application/json
 * 
 * @apiQuery {String} [id] 博客ID
 * 
 * @apiSuccess {String} userName 用户名
 * @apiSuccess {String} createTime 创建时间
 * @apiSuccess {String} updateTime 更新时间
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 * 
 * @apiExample {curl} Example usage:
 * curl -i http://localhost:3000/user/4711
 * 
 * @apiSampleRequest /blog
 */


router.get('/', (req, res, next) => {
  const { id } = req.query
  if(id) db.queryById('blog', { id }, res, next)
  else db.queryAll('blog', req, res, next)
})

router.post('/post', parser.urlencoded({ extended: false }), (req, res) => {
  console.log(req.body)
})

router.post('/json-post', parser.json(), (req, res) => {
  console.log(req.body)
})


module.exports = router