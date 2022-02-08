import {Users} from '../model/Users'
import bcrypt from 'bcrypt'
import { Request, RequestHandler, Response } from 'express'
const saltRounds:number = 10

// File contains request handlers for routes/signUpRoute
// For information about express request handlers: https://www.etutorialspoint.com/index.php/expressjs/express-js-requesthandler

const createNewUser: RequestHandler = (req: Request, res: Response): Response<any, Record<string, any>> | undefined =>{
    const {username, password}: {[key:string]: string} = req.body
    const userModel: Users = new Users()

    // Check if username and password input is not null
    if(username == null || password == null){
        return res.status(400).json({signedUp: false, msg: "Username and/or password cannot be null"})
    }

    if(username.length > 15 || password.length > 15){
        return res.status(400).json({signedUp: false, msg: "Username and/or password cannot exceed 15 characters"})
    }

    // Password stored in database will be encrypted first 
    bcrypt.hash(password, saltRounds, (error: Error | undefined, hash: string)=>{
        if(error){
            return res.status(500).json({signedUp: false, msg: "Server error"})
        }
        
        userModel.createNewUser(username, hash)
        .then(() => {
            return res.status(200).json({signedUp: true, msg: "Account has been created"})
        })
        .catch((err)=>{
            if(err.errno == 1062){
                return res.status(409).json({signedUp: false, msg: "Someone already has that username"})
            } else {
                return res.status(500).json({signedUp: false, msg: "Server error"})
            }
        })
    })
    

}


export {createNewUser}