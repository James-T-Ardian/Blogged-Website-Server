const mysql = require('../config/db')

class Posts {
    constructor(username) {
        this.username = username
    }

    getAllUserPostsTitleAndTime = async ()=>{
        const sql = 'SELECT post_id, title, created_at FROM posts WHERE uploader = ? ORDER BY post_id DESC'
        const [result, _] = await mysql.execute(sql, [this.username])
        return result
    }

    getUserPostByPostID = async (postID)=>{
        const sql = 'SELECT title, body, created_at FROM posts WHERE post_id = ? && uploader = ?'
        const [result, _] = await mysql.execute(sql, [postID, this.username])
        return result
    }

    createNewUserPost = async (title, body, created_at)=>{
        const sql = 'INSERT INTO posts(title, body, created_at, uploader) VALUES (?, ?, ?, ?)'
        const [result, _] = await mysql.execute(sql, [title, body, created_at, this.username])
        return result
    }

    updateUserPost = async(postID, title, body)=>{
        const sql = 'UPDATE posts SET title = ?, body = ? WHERE post_id  = ?'
        const [result, _]  = await mysql.execute(sql, [title, body, postID])
        return result
    }
    
    deleteUserPost = async(postID)=>{
        const sql = 'DELETE FROM posts WHERE post_id  = ?'
        const [result, _]  = await mysql.execute(sql, [postID])
        return result
    }

    deleteAllUserPosts = async()=>{
        const sql = 'DELETE FROM posts WHERE uploader = ?'
        const [result, _]  = await mysql.execute(sql, [this.username])
        return result
    }
}

// let postModel = new Posts("xd")
// postModel.getAllUserPostsTitleAndTime().then((result)=>{console.log(result)}).catch((err)=>{console.log(err)})
module.exports = Posts

