// 导入express
const express = require('express');
// 创建路由对象
const router = express.Router()
// 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')

// 导入文章分类的验证模块,删除模块
const { add_cate_schema, delete_cate_schema, get_cate_schame, update_cate_schema } = require('../schema/artcate')

//新增文章分类的路由


// 导入文章分类的路由处理函数
const artcate_habdler = require('../router_handler/artcate')
// 获取文章的数据列表
router.get('/cates', artcate_habdler.getArticleCates)

// 新增文章分类的路由
router.post('/addcates', expressJoi(add_cate_schema), artcate_habdler.addArticleCates)

// 根据id文章分类的路由    删除文章分类的路由

router.get("/deletecate/:id", expressJoi(delete_cate_schema), artcate_habdler.deleteCateById)

// 根据Id获取文章分类得路由
router.get('/cates/:id', expressJoi(get_cate_schame), artcate_habdler.getArtCatById)
// 更新Id文章分类得路由
router.post('/updatecate', expressJoi(update_cate_schema), artcate_habdler.updateCateById)

// 向外共享路由对象
module.exports = router