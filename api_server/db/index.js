const mysql = require("mysql2");

const db = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "1234",
  database: "my_db_01",
});

//向外共享db数据库链接对象
module.exports = db;
