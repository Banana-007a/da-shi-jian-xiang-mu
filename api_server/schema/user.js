// 导入定义验证规则的包
const joi = require('joi')

// 定义用户和密码的验证规则
const username = joi.string().alphanum().min(1).max(10).required();
const password = joi.string().pattern(/^[\S]{6,12}$/).required();

// 定义id,nickname,email的验证规则
const id = joi.number().integer().min(1).required()
const nickname = joi.string().required()
const user_email = joi.string().email().required()

// 定义验证avatar头像的验证规则
const avatar = joi.string().dataUri().required()
// 注册和登录表单的验证规划对象
exports.reg_login_schema = {
    // 表示需要对req.body中的数据进行验证
    body: {
        username, password
    }
}
// 验证规则对象-更新用户基本信息-id,nickname,email
exports.update_userinfo_schema = {
    body: {
        id, nickname, email: user_email
    }
}

// 验证规则对象--更新密码
exports.update_password_schema = {
    body: {
        oldPwd: password,
        newPwd: joi.not(joi.ref('oldPwd')).concat(password),
    }
}

// 验证规则对象--更新头像

exports.update_avatar_schema = {
    body: {
        avatar
    }
}
