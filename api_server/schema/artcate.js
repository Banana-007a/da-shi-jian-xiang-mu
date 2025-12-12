
// 导入定义验证规则的模块 
const joi = require('joi')
// 定义 分类名称 和分类别名 

const name = joi.string().required()
const alias = joi.string().alphanum().required()

// id的校验规则
const id = joi.number().integer().min(1).required()


// 共享验证规则
exports.add_cate_schema = {
    body: {
        name, alias
    }
}
// 验证规则对象--删除对象
exports.delete_cate_schema = {
    params: {
        id,
    }
}

// 根据Id获取分类
exports.get_cate_schame = {
    params: {
        id,
    }
}

// 跟新分类
exports.update_cate_schema = {
    body: {
        Id: id,
        name,
        alias,
    }
}


