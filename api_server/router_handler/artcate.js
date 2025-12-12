// 这是路由处理函数模块

const db = require('../db/index')



// 获取文章分类列表的处理函数
exports.getArticleCates = (req, res) => {
    // 定义查询分类列表数据的SQL语句
    const sql = `select * from ev_article_cate where is_delete=0 order by id asc`;
    db.query(sql, (err, results) => {
        //失败
        if (err) return res.cc(err)

        // 成功
        res.send({
            status: 0,
            massage: '获取文章分类数据成功！',
            data: results,
        })

    })
}

// 新增文章分类的处理函数
exports.addArticleCates = (req, res) => {
    // 定义sql语句
    const sql = `select * from ev_article_cate where name=? or alias=?`
    // 执行查重操作
    db.query(sql, [req.body.name, req.body.alias], (err, results) => {
        // 判断是否执行SQL语句失败
        if (err) return res.cc(err)

        // 判断数据的lenght
        // 分类名称 和 分类别名 都被占用
        if (results.length === 2) return res.cc("分类名称和分类别名被占用，请更换后重试！111")
        // 分类名称 或 分类别名 都被占用
        if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias)
            return res.cc("分类名称或别名被占用，请更换后重试！222")
        // 分类名称  被占用
        if (results.length === 1 && results[0].name === req.body.name)
            return res.cc("分类名称，请更换后重试！333")
        //  分类别名 被占用
        if (results.length === 1 && results[0].alias === req.body.alias)
            return res.cc("别名被占用，请更换后重试！444")

        // 定义插入文章分类的sql语句
        const sql = `insert into ev_article_cate set ?`
        // 执行插入文章分类的SQL语句
        db.query(sql, req.body, (err, results) => {
            if (err) return res.cc(err)

            if (results.affectedRows !== 1) return res.cc('新增文章分类失败！')
            res.cc('新增文章分类成功！', 0)
        })

    })
}

// 删除文章分类的处理函数
exports.deleteCateById = (req, res) => {
    // 
    const sql = `update ev_article_cate set is_delete=1 where id=?`

    db.query(sql, req.params.id, (err, results) => {
        // 执行sql语句失败
        if (err) return res.cc(err)

        // sql语句执行成功，但是影响行数不等于1
        if (results.affectedRows !== 1) return res.cc('删除文章分类失败！')


        // 删除文章分类成功
        res.cc('删除文章分类成功', 0)
    })
}
// 根据id获取文章分类的处理函数
exports.getArtCatById = (req, res) => {
    //定义根据Id获取文章分类数据得SQL语句 
    const sql = `select * from ev_article_cate where id=?`

    db.query(sql, req.params.id, (err, results) => {
        if (err) return res.cc(err)
        // 执行成功，但没有查询到任何数据
        if (results.length !== 1) return res.cc('获取文章分类数据失败')


        res.send({
            status: 0,
            massage: '获取文章分类数据成功！',
            data: results[0]
        })
    })
}

// 根据id修改文章分类得处理函数
exports.updateCateById = (req, res) => {
    //  定义查询，分类名称与分类别名是否被占用得SQL语句 
    const sql = `select * from ev_article_cate where Id<>? and(name=? or alias=?)`
    db.query(sql, [req.body.Id, req.body.name, req.body.alias], (err, results) => {
        if (err) return res.cc(err)
        // 分类名称和分类别名都被占用
        if (results.length === 2) return res.cc("分类名称与分别被占用,请跟换后重试!111")
        if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) return res.cc("分类名称或分类别名,请跟换后重试!222")
        if (results.length === 1 && results[0].name === req.body.name) return res.cc("分类名称,请跟换后重试!333")
        if (results.length === 1 && results[0].alias === req.body.alias) return res.cc("分别被占用,请跟换后重试!444")


        //
        const sql = `update ev_article_cate set ? where Id=? `
        db.query(sql, [req.body, req.body.Id], (err, results) => {
            // 失败
            if (err) return res.cc(err)

            // 
            if (results.affectedRows !== 1) return res.cc('更新文章分类失败!')

            res.cc('跟新文章分类成功！')
        })
    })

}