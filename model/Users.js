const mysql = require('../config/db')

class Users {
    createNewUser = async (username, password)=>{
        const sql = 'INSERT INTO users(username, password) VALUES(?, ?)'
        const [result, _] = await mysql.execute(sql, [username, password])
        return result
    }

    getPassword = async (username)=>{
        const sql = 'SELECT password FROM users WHERE username = ?'
        const [result, _] = await mysql.execute(sql, [username])
        return result
    }

    deleteUser = async (username)=>{
        const sql = 'DELETE FROM users WHERE username =?'
        const [result, _] = await mysql.execute(sql, [username])
        return result
    }
}




module.exports = Users