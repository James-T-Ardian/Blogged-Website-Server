import {pool} from '../config/db'
import {FieldPacket} from 'mysql2'
import { MySQLQueryResult } from '../types/types'

const mysql = pool.promise()

interface UsersModel {
    createNewUser(username: string, password: string): Promise<MySQLQueryResult>
    getPassword(username: string): Promise<MySQLQueryResult>
    deleteUser(username: string): Promise<MySQLQueryResult>
    
}

class Users implements UsersModel{
    // Param: username -> new user's username
    // Param: password -> new user's password
    // 
    // Returns promise of mysql query result from creating a row that corresponds to the new user
    createNewUser = async (username:string, password:string): Promise<MySQLQueryResult>=>{
        const sql: string = 'INSERT INTO users(username, password) VALUES(?, ?)'
        const [result, _]: [MySQLQueryResult, FieldPacket[]] = await mysql.execute(sql, [username, password])
        return result
    }

    // Param: username -> username of the user whos password you want to search
    //
    // Returns promise of mysql query result from looking up a user's password
    getPassword = async (username:string): Promise<MySQLQueryResult>=>{
        const sql: string = 'SELECT password FROM users WHERE username = ?'
        const [result, _]: [MySQLQueryResult, FieldPacket[]] = await mysql.execute(sql, [username])
        return result
    }

    // Param: username -> username of the user you want to delete
    //
    // Returns promise of mysql query result from deleting the user
    deleteUser = async (username:string): Promise<MySQLQueryResult>=>{
        const sql: string = 'DELETE FROM users WHERE username =?'
        const [result, _]: [MySQLQueryResult, FieldPacket[]] = await mysql.execute(sql, [username])
        return result
    }
}




export {Users}