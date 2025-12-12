// 导入express模块
const express = require("express");

// 创建express的服务器实例
const app = express();
const joi = require('joi')
const cors = require("cors");
app.use(cors());

// 配置解析表单数据的中间件,这个中间件只能解析析 application/x-www-form-urlencoded文件格式
app.use(express.urlencoded({ extended: false }));

//一定要在路由之前，封装res,=.cc函数
app.use((req, res, next) => {
  // status默认值为1，表示失败的情况
  res.cc = function (err, status = 1) {
    res.send({ status, message: err instanceof Error ? err.message : err });
  };
  next();
});

// 一定要在路由之前配置解析Token的中间件
const expressJWT = require('express-jwt')
const config = require('./config');


//app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api/] }))

// 修正：排除 /uploads 路径，允许匿名访问静态资源
app.use(expressJWT({ secret: config.jwtSecretKey }).unless({
  path: [/^\/api/, /^\/uploads/]  // 新增 /uploads 白名单
}))

// 导入并使用用户路由模块
const userRouter = require("./router/user");
app.use("/api", userRouter);

// 导入并使用用户信息的路由
const userinfoRouter = require('./router/userinfo')
app.use('/my', userinfoRouter)

// 导入并使用文章分类的路由模块
const artCateRouter = require('./router/artcate');

app.use('/my/article', artCateRouter)

// 导入并使用文章的路由模块
const articleRouter = require('./router/article')
app.use('/my/article', articleRouter)
app.use('/uploads', express.static('./uploads'))


// 定义错误级别的中间件
app.use((err, req, res, next) => {
  // 数据验证失败导致的
  if (err instanceof joi.ValidationError) return res.cc(err)
  // 这是身份认证失败的错误
  if (err.name === 'UnauthorizedError') return res.cc('身份认证失败')
  // 未知的错误
  res.cc(err)
})

// 调用app.listen方法，指定端口号并启动web服务器
app.listen(3007, () => {
  console.log("api server running at http://127.0.0.1:3007");
});

//xiaoming   123456
