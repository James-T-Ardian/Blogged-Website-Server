const mysql = require("mysql2")

const pool = mysql.createPool({
    host: "us-cdbr-east-05.cleardb.net",
    user: "b0c4020c0e4bf1",
    database: "heroku_56aedce8ab8533a",
    password: "65814191",
})


module.exports = pool.promise()

