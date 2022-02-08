import { Request, RequestHandler, Response } from 'express'
import { SessionUser } from 'express-session'
import {Posts} from '../model/Posts'
import {Users} from '../model/Users'
import { MySQLQueryResult } from '../types/types'

// File contains request handlers for routes/blogPostsRoute
// For information about express request handlers: https://www.etutorialspoint.com/index.php/expressjs/express-js-requesthandler

const getBlogPostsTitleTime: RequestHandler = (req: Request, res: Response): Response<any, Record<string, any>> | undefined => {
    const userThatOwnsPosts: string = req.params.username
    const userThatSeesPosts: SessionUser = req.session.user
    const postsModel: Posts = new Posts(userThatOwnsPosts)
    const usersModel: Users = new Users()
    

    // Checks if user not is logged in 
    if(userThatSeesPosts == null){
        return res.status(401).json({loggedIn: false, isOwner: false, posts: [], msg: "User needs to log in first"})
    }

    // Messy code but it basically confirms that owner exists then gets posts and returns flag variables to identify is user is owner or not
    usersModel.getPassword(userThatOwnsPosts).then((userOwnerPassword: MySQLQueryResult)=>{
        postsModel.getAllUserPostsTitleAndTime()
        .then((result: MySQLQueryResult)=>{
            // If user is owner
            if(userThatSeesPosts == userThatOwnsPosts){
                return res.status(200).json({loggedIn: true, isOwner: true, posts: result, msg: "User obtained their own posts"})

            // If blog is not owned by any registered user
            } else if (userOwnerPassword.length == 0){
                return res.status(404).json({msg: "Resource not found"})

            } else {
                return res.status(200).json({loggedIn: true, isOwner: false, posts: result, msg: "User obtained another's posts"})
            }
        }).catch(()=>{
            return res.status(500).json({loggedIn: false, isOwner: false, posts: [], msg: "Server error"})
        })
    }).catch(()=>{
        return res.status(500).json({loggedIn: true, isOwner: false, posts: [], msg: "Server error"})
    })
    

}

const createBlogPost: RequestHandler = (req: Request, res: Response): Response<any, Record<string, any>> | undefined =>{
    const userThatOwnsPosts: string = req.params.username
    const userThatSeesPosts: SessionUser = req.session.user
    const postsModel: Posts = new Posts(userThatOwnsPosts)

    const {title, body, created_at}: {[key:string]: string} = req.body

    // Checks if post parameters are null
    if(title == null || body == null || created_at == null){
        return res.status(400).json({postCreated: false, postId: null, msg: "title, body and/or created_at cannot be null"})
    }

    // Checks if user is not logged in 
    if(userThatSeesPosts == null){
        return res.status(401).json({postCreated: false,  postId: null,  msg: "User needs to log in first"})
    }

    // Checks if user is not owner. Server does not allow you to post on other people's blog
    if(userThatSeesPosts !== userThatOwnsPosts){
        return res.status(401).json({postCreated: false,  postId: null, msg: "User cannot create posts for another user"})
    }

    postsModel.createNewUserPost(title, body, created_at)
    .then((result: MySQLQueryResult)=>{
        return res.status(200).json({postCreated: true,  postId: result.insertId, msg: "User has created a post"})
    }).catch(()=>{
        return res.status(500).json({postCreated: false,  postId: null, msg: "Server error"})
    })

}

const updateBlogPost: RequestHandler = (req: Request, res: Response): Response<any, Record<string, any>> | undefined=>{
    const userThatOwnsPosts: string = req.params.username
    const userThatSeesPosts: SessionUser = req.session.user
    const postsModel: Posts = new Posts(userThatOwnsPosts)

    const {postId}: {[key:string]: string} = req.params
    const {title, body}: {[key:string]: string} = req.body

    // Checks if post parameters are null
    if(title == null || body == null){
        return res.status(400).json({postUpdated: false, msg: "title, body and/or created_at cannot be null"})
    }

    // Checks if user is not logged in 
    if(userThatSeesPosts == null){
        return res.status(401).json({postUpdated: false, msg: "User needs to log in first"})
    }

    // Checks if user is not owner. Server does not allow you to update post on other people's blog
    if(userThatSeesPosts !== userThatOwnsPosts){
        return res.status(401).json({postUpdated: false, msg: "User cannot update posts from another user"})
    }

    postsModel.updateUserPost(postId, title, body)
    .then((result: MySQLQueryResult)=>{
        if(result.affectedRows == 0){
            return res.status(404).json({msg: "Resource not found"})
        } else {
            return res.status(200).json({postUpdated: true, msg: "Post has been updated"})
        }
    }).catch(()=>{
        return res.status(500).json({postUpdated: false, msg: "Server error"})
    })
}

const deleteBlogPost: RequestHandler = (req: Request, res: Response): Response<any, Record<string, any>> | undefined=>{
    const userThatOwnsPosts: string = req.params.username
    const userThatSeesPosts: SessionUser = req.session.user
    const postsModel: Posts = new Posts(userThatOwnsPosts)

    const {postId}: {[key:string]: string} = req.params

    // Checks if user is not logged in
    if(userThatSeesPosts == null){
        return res.status(401).json({postDeleted: false, msg: "User needs to log in first"})
    }

    // Checks if user is not owner. Server does not allow you to delete post on other people's blog
    if(userThatSeesPosts !== userThatOwnsPosts){
        return res.status(401).json({postDeleted: false, msg: "User cannot delete posts from another user"})
    }

    postsModel.deleteUserPost(postId)
    .then((result: MySQLQueryResult)=>{
        if(result.affectedRows == 0){
            return res.status(404).json({msg: "Resource not found"})
        } else {
            return res.status(200).json({postDeleted: true, msg: "Post has been deleted"})
        }
    }).catch(()=>{
        return res.status(500).json({postDeleted: false, msg: "Server error"})
    })
}

const getSpecificPost: RequestHandler = (req: Request, res: Response): Response<any, Record<string, any>> | undefined=>{
    const userThatOwnsPosts: string = req.params.username
    const userThatSeesPosts: SessionUser = req.session.user
    const postsModel: Posts = new Posts(userThatOwnsPosts)

    const {postId}: {[key:string]: string} = req.params

    // Checks if user is not logged in
    if(userThatSeesPosts == null){
        return res.status(401).json({loggedIn: false, isOwner: false, post: [], msg: "User needs to log in first"})
    }

    postsModel.getUserPostByPostID(postId)
    .then((result: MySQLQueryResult)=>{
        if(result.length == 0){
            return res.status(404).json({msg: "Resource not found"})
        
        // If user is owner
        } else if (userThatOwnsPosts == userThatSeesPosts){
            return res.status(200).json({loggedIn: true, isOwner: true, post: result, msg: "User has obtained their own specific post"})
        
        } else {
            return res.status(200).json({loggedIn: true, isOwner: false, post: result, msg: "User has obtained another's specific post"})
        }
    }).catch(()=>{
        return res.status(500).json({loggedIn: true, isOwner: false, post: [], msg: "Server error"})
    })
}

export {
    getBlogPostsTitleTime,
    createBlogPost,
    updateBlogPost,
    deleteBlogPost,
    getSpecificPost
}