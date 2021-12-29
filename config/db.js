const mysql = require("mysql2")


const pool = mysql.createPool({
    host: "us-cdbr-east-05.cleardb.net",
    user: "b83f3ee4d2fdfb",
    database: "heroku_c3eef93c99c0aaa",
    password: "8c4a3671",
})


module.exports = pool.promise()

