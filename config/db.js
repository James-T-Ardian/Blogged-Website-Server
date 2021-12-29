const mysql = require("mysql2")

mysql://b83f3ee4d2fdfb:8c4a3671@us-cdbr-east-05.cleardb.net/heroku_c3eef93c99c0aaa?reconnect=true

const pool = mysql.createPool({
    host: "us-cdbr-east-05.cleardb.net",
    user: "b83f3ee4d2fdfb",
    database: "heroku_c3eef93c99c0aaa",
    password: "8c4a3671",
})


module.exports = pool.promise()

