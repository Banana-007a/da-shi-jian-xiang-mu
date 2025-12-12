// 文章的处理函数

//导入处理路径的核心模块
const path = require('path')
// 导入数据库模块
const db = require('../db/index')

//发布文章的处理函数
exports.addArticle = (req, res) => {
    console.log(req.body);//文件类型的数据
    console.log('-------分割线--------');
    console.log(req.file);
    // 手动判断是否上传了文章封面
    if (!req.file) {
        return res.cc('文章封面是必选参数！');
    }
    if (req.file.fieldname !== 'cover_img') {
        return res.cc('文件字段名必须为 cover_img！');
    }

    const articleInfo = {
        // 标题、内容、发布状态、所属分类的Id
        ...req.body,
        // 文章封面的存放路径
        cover_img: path.join('/uploads', req.file.filename),
        // 文章的发布时间
        pub_date: new Date(),
        // 文章作者的Id
        author_id: req.user.id,

    }
    const sql = `insert into ev_articles set ?`
    db.query(sql, articleInfo, (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('发布新文章失败')
        res.cc('发布文章成功！', 0)
    })
}

// 获取文章列表的处理函数
exports.getArticleList = (req, res) => {
    // 定义获取文章列表的SQL语句
    const sql = `select * from ev_articles where author_id=? order by pub_date desc`;
    db.query(sql, [req.user.id], (err, results) => {
        if (err) return res.cc(err);
        res.send({
            status: 0,
            message: '获取文章列表成功！',
            data: results
        });
    });
}

// 获取文章详情的处理函数
exports.getArticleById = (req, res) => {
    const sql = `select * from ev_articles where id=? and author_id=?`;
    db.query(sql, [req.params.id, req.user.id], (err, results) => {
        if (err) return res.cc(err);
        if (results.length !== 1) return res.cc('获取文章详情失败');
        res.send({
            status: 0,
            message: '获取文章详情成功！',
            data: results[0]
        });
    });
}

// 编辑文章的处理函数
exports.editArticle = (req, res) => {
    let articleInfo = {
        // 标题、内容、发布状态、所属分类的Id
        ...req.body,
        // 文章的更新时间
        pub_date: new Date()
    };

    // 如果有新的封面图片上传
    if (req.file) {
        if (req.file.fieldname !== 'cover_img') {
            return res.cc('文件字段名必须为 cover_img！');
        }
        articleInfo.cover_img = path.join('/uploads', req.file.filename);
    }

    const sql = `update ev_articles set ? where id=? and author_id=?`;
    db.query(sql, [articleInfo, req.body.id, req.user.id], (err, results) => {
        if (err) return res.cc(err);
        if (results.affectedRows !== 1) return res.cc('编辑文章失败');
        res.cc('编辑文章成功！', 0);
    });
}

// 删除文章的处理函数
exports.deleteArticle = (req, res) => {
    const sql = `delete from ev_articles where id=? and author_id=?`;
    db.query(sql, [req.params.id, req.user.id], (err, results) => {
        if (err) return res.cc(err);
        if (results.affectedRows !== 1) return res.cc('删除文章失败');
        res.cc('删除文章成功！', 0);
    });
}