"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const db_1 = require("../config/db");
const mysql = db_1.pool.promise();
class Users {
    constructor() {
        // Param: username -> new user's username
        // Param: password -> new user's password
        // 
        // Returns promise of mysql query result from creating a row that corresponds to the new user
        this.createNewUser = (username, password) => __awaiter(this, void 0, void 0, function* () {
            const sql = 'INSERT INTO users(username, password) VALUES(?, ?)';
            const [result, _] = yield mysql.execute(sql, [username, password]);
            return result;
        });
        // Param: username -> username of the user whos password you want to search
        //
        // Returns promise of mysql query result from looking up a user's password
        this.getPassword = (username) => __awaiter(this, void 0, void 0, function* () {
            const sql = 'SELECT password FROM users WHERE username = ?';
            const [result, _] = yield mysql.execute(sql, [username]);
            return result;
        });
        // Param: username -> username of the user you want to delete
        //
        // Returns promise of mysql query result from deleting the user
        this.deleteUser = (username) => __awaiter(this, void 0, void 0, function* () {
            const sql = 'DELETE FROM users WHERE username =?';
            const [result, _] = yield mysql.execute(sql, [username]);
            return result;
        });
    }
}
exports.Users = Users;
