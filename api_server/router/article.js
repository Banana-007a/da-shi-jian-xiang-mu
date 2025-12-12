// 文章的路由模块

const express = require('express');
const router = express.Router();
const article_handler = require('../router_handler/article')
// 导入 multer 和 path
const multer = require('multer')
const path = require('path')
// 创建multer的实例对象，通过dest属性指定文件的存放路径
const upload = multer({ dest: path.join(__dirname, '../uploads') })
// 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 导入文章的验证模块
const {
    add_article_schema,
    edit_article_schema,
    delete_article_schema,
    get_article_schema
} = require('../schema/article')

// 发布文章的路由
router.post('/add', upload.single('cover_img'), expressJoi(add_article_schema), article_handler.addArticle)

// 获取文章列表的路由
router.get('/list', article_handler.getArticleList)

// 获取文章详情的路由
router.get('/:id', expressJoi(get_article_schema), article_handler.getArticleById)

// 编辑文章的路由
router.post('/edit', upload.single('cover_img'), expressJoi(edit_article_schema), article_handler.editArticle)

// 删除文章的路由
router.get('/delete/:id', expressJoi(delete_article_schema), article_handler.deleteArticle)

module.exports = router;