const express = require('express')
const router = express.Router()
const db = require('../db/db')

/**
 * @api {get} /blog 获取博客列表
 * @apiDescription 获取博客详情
 * @apiName blog
 * @apiGroup Blog
 */
router.get('/', (req, res, next) => {
  db.queryAll('blog', '', res, next)
})

/**
 * @api {get} /blog 获取指定博客详情
 * @apiDescription 获取指定博客详情
 * @apiName self blog
 * @apiGroup Blog
 * @apiParam {string} blog_id 博客ID
 * @apiSuccess {json} result
 * @apiSuccessExample {json} Success-Response: 
 * {
 *    "success": "true",
 *    "result": {
 *         
 *    }
 * }
 * @apiSampleRequest http://localhost:3000/api/blog
 */
router.get('/:id', (req, res, next) => {
  // console.log(req.params)
  // console.log(req.query)
  db.queryById('blog', { id: req.params.id }, res, next)
})

router.post('/', (req, res) => {})

router.get('/:id', (req, res) => {})

router.delete('/:id', (req, res) => {})

module.exports = router