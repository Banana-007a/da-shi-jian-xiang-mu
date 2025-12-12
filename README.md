# 大事件项目

## 项目简介

大事件项目是一个基于 Node.js 和 Express 构建的博客/文章管理系统，包含前端展示和后端 API 服务两部分。该系统实现了用户管理、文章分类管理和文章管理等核心功能，适合作为学习 Node.js 全栈开发的实践项目。

## 项目结构

## 技术栈

### 后端技术栈

| 技术/依赖           | 版本    | 用途                   |
| ------------------- | ------- | ---------------------- |
| Node.js             | ^12.0.0 | JavaScript 运行环境    |
| Express             | ^4.17.1 | Web 应用框架           |
| MySQL               | ^5.7.0  | 关系型数据库           |
| bcryptjs            | ^2.4.3  | 密码加密               |
| jsonwebtoken        | ^8.5.1  | JWT 认证               |
| express-jwt         | ^5.3.3  | JWT 中间件             |
| multer              | ^1.4.2  | 文件上传               |
| cors                | ^2.8.5  | 跨域请求处理           |
| joi                 | ^17.4.0 | 数据验证               |
| @escook/express-joi | ^1.1.1  | Express 数据验证中间件 |

### 前端技术栈

- HTML5 + CSS3
- JavaScript (ES6+)
- jQuery
- Bootstrap (推测)

## 核心功能

### 用户管理

- 用户注册和登录
- 用户信息管理
- 密码重置
- 头像上传

### 文章分类管理

- 获取分类列表
- 添加新分类
- 更新分类信息
- 删除分类

### 文章管理

- 获取文章列表（支持分页和筛选）
- 发布新文章
- 编辑文章
- 删除文章
- 上传文章封面

## 安装和运行

### 1. 环境要求

- Node.js >= 12.0.0
- MySQL >= 5.7.0

### 2. 安装步骤

#### 后端 API 服务

1. **进入后端目录**

```bash
cd code/api_server
```

2. **安装依赖**

```bash
npm install
```

3. **配置数据库**

修改 `db/index.js` 文件中的数据库连接信息：

```javascript
const db = mysql.createPool({
  host: "127.0.0.1",
  user: "your_username",
  password: "your_password",
  database: "your_database",
})
```

4. **创建数据库表**

在 MySQL 中执行以下 SQL 语句：

```sql
-- 创建用户表
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `nickname` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `user_pic` varchar(255) DEFAULT NULL,
  `create_time` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

-- 创建文章分类表
CREATE TABLE `article_cate` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `alias` varchar(255) NOT NULL,
  `is_delete` tinyint(4) NOT NULL DEFAULT '0',
  `create_time` datetime NOT NULL,
  `update_time` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

-- 创建文章表
CREATE TABLE `article` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `cover_img` varchar(255) DEFAULT NULL,
  `pub_date` datetime NOT NULL,
  `state` varchar(255) NOT NULL DEFAULT '草稿',
  `is_delete` tinyint(4) NOT NULL DEFAULT '0',
  `cate_id` int(11) NOT NULL,
  `author_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `author_id` (`author_id`),
  KEY `cate_id` (`cate_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
```

5. **启动后端服务**

```bash
node app.js
```

服务将在 `http://127.0.0.1:3007` 运行。

#### 前端项目

前端项目是纯静态文件，可以直接通过浏览器打开 `code/大事件项目/index.html` 文件访问。

## API 接口文档

### 用户相关接口

| 接口         | 方法 | URL               | 功能             |
| ------------ | ---- | ----------------- | ---------------- |
| 用户注册     | POST | /api/reguser      | 用户注册         |
| 用户登录     | POST | /api/login        | 用户登录         |
| 获取用户信息 | GET  | /my/userinfo      | 获取当前用户信息 |
| 更新用户信息 | POST | /my/userinfo      | 更新当前用户信息 |
| 更新密码     | POST | /my/updatepwd     | 更新当前用户密码 |
| 更新头像     | POST | /my/update/avatar | 更新当前用户头像 |

### 文章分类相关接口

| 接口         | 方法 | URL                        | 功能             |
| ------------ | ---- | -------------------------- | ---------------- |
| 获取分类列表 | GET  | /my/article/cates          | 获取文章分类列表 |
| 添加分类     | POST | /my/article/addcates       | 添加文章分类     |
| 删除分类     | GET  | /my/article/deletecate/:id | 删除文章分类     |
| 更新分类     | POST | /my/article/updatecate     | 更新文章分类     |

### 文章相关接口

| 接口         | 方法 | URL                    | 功能         |
| ------------ | ---- | ---------------------- | ------------ |
| 获取文章列表 | GET  | /my/article/list       | 获取文章列表 |
| 获取文章详情 | GET  | /my/article/:id        | 获取文章详情 |
| 发布文章     | POST | /my/article/add        | 发布文章     |
| 编辑文章     | POST | /my/article/edit       | 编辑文章     |
| 删除文章     | GET  | /my/article/delete/:id | 删除文章     |
| 上传封面     | POST | /my/article/upload     | 上传文章封面 |

## 配置说明

### config.js

```javascript
module.exports = {
  // 加密和解密 Token 的密钥
  jwtSecretKey: "xiaoai No1.^_^",
  // Token 的有效期
  expiresIn: "10h",
}
```

## 安全特性

- 使用 bcryptjs 对用户密码进行加密存储
- 使用 JWT 进行身份认证
- 使用 joi 进行数据验证，防止无效数据进入系统
- 配置了 CORS 中间件，支持跨域请求
- 实现了用户权限控制，确保用户只能访问和修改自己的数据

## 注意事项

1. 确保 MySQL 服务已启动并正确配置
2. 首次使用前请先创建数据库和表
3. 上传的图片会存储在 `api_server/uploads` 目录中，请确保该目录存在且可写
4. 前端页面需要通过 HTTP 协议访问，建议使用本地服务器（如 Live Server）
5. 开发环境下建议使用 nodemon 启动后端服务，方便代码修改后自动重启

## 开发工具

- **VS Code**: 代码编辑器
- **Postman**: API 测试工具
- **Navicat**: 数据库管理工具
- **Git**: 版本控制工具
- **GitHub**: 代码托管平台

## 许可证

ISC

## 作者

湖北汽车工业学院
