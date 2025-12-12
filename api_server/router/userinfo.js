const express = require('express')
const router = express.Router()


// 挂载路由


// 导入路由处理函数模块
const userinfo_habdler = require('../router_handler/userinfo')
//导入需要的验证规则对象
const expressJoi = require('@escook/express-joi')


const { update_userinfo_schema, update_password_schema, update_avatar_schema } = require('../schema/user')
// 获取用户的基本信息
router.get('/userinfo', userinfo_habdler.getUserInfo)


// 更新用户信息的路由
router.post('/userinfo', expressJoi(update_userinfo_schema), userinfo_habdler.updateUserInfo)

router.post('/updatepwd', expressJoi(update_password_schema), userinfo_habdler.updatePassword)


// 更新用户头像的路由
router.post('/update/avatar', expressJoi(update_avatar_schema), userinfo_habdler.updateAvatar)
module.exports = router