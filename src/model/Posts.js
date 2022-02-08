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
exports.Posts = void 0;
const db_1 = require("../config/db");
const mysql = db_1.pool.promise();
class Posts {
    // Param: username of the user who's post you want to access
    //
    // Returns Posts object for the user who has the username from the param
    constructor(username) {
        //  Returns promise of mysql query result from search the titles and upload time of all posts made by user where user = this.username
        this.getAllUserPostsTitleAndTime = () => __awaiter(this, void 0, void 0, function* () {
            const sql = 'SELECT post_id, title, created_at FROM posts WHERE uploader = ? ORDER BY post_id DESC';
            const [result, _] = yield mysql.execute(sql, [this.username]);
            return result;
        });
        // Param: postID -> postID of the post you want to search
        //
        // Returns promise of mysql query result from search of post by id made by user with username = this.username
        this.getUserPostByPostID = (post_id) => __awaiter(this, void 0, void 0, function* () {
            const sql = 'SELECT title, body, created_at FROM posts WHERE post_id = ? && uploader = ?';
            const [result, _] = yield mysql.execute(sql, [post_id, this.username]);
            return result;
        });
        // Param: title -> title of new post
        // Param: body -> text body of new post
        // Param: created_at -> yyyy-mm-dd string of when the post was created 
        //
        // Returns promise of mysql query result from creating new post for user with username = this.username
        this.createNewUserPost = (title, body, created_at) => __awaiter(this, void 0, void 0, function* () {
            const sql = 'INSERT INTO posts(title, body, created_at, uploader) VALUES (?, ?, ?, ?)';
            const [result, _] = yield mysql.execute(sql, [title, body, created_at, this.username]);
            return result;
        });
        // Param: postID -> postID of the post you want to update
        // Param: title -> new title
        // Param: body -> new text body
        //
        // Returns promise of mysql query result from updating post for user with username = this.username
        this.updateUserPost = (post_id, title, body) => __awaiter(this, void 0, void 0, function* () {
            const sql = 'UPDATE posts SET title = ?, body = ? WHERE post_id  = ?';
            const [result, _] = yield mysql.execute(sql, [title, body, post_id]);
            return result;
        });
        // Param: postID -> postID of the post you want to delete
        //
        // Returns promise of mysql query result from deleting post by id for user with username = this.username
        this.deleteUserPost = (post_id) => __awaiter(this, void 0, void 0, function* () {
            const sql = 'DELETE FROM posts WHERE post_id  = ?';
            const [result, _] = yield mysql.execute(sql, [post_id]);
            return result;
        });
        // Returns promise of mysql query result from deleting all posts for user with username = this.username
        this.deleteAllUserPosts = () => __awaiter(this, void 0, void 0, function* () {
            const sql = 'DELETE FROM posts WHERE uploader = ?';
            const [result, _] = yield mysql.execute(sql, [this.username]);
            return result;
        });
        this.username = username;
    }
}
exports.Posts = Posts;
