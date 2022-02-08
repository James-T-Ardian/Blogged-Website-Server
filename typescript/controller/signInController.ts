import {Users} from '../model/Users'
import bcrypt from 'bcrypt'
import { Request, RequestHandler, Response } from 'express'
import { MySQLQueryResult } from '../types/types'

// File contains request handlers for routes/signInRoute
// For information about express request handlers: https://www.etutorialspoint.com/index.php/expressjs/express-js-requesthandler

const checkIfLoggedIn: RequestHandler = (req: Request, res: Response): Response<any, Record<string, any>> | undefined =>{
  // Checks if there is already a cookie
  if(req.session.user){
    return res.status(200).json({loggedIn: true, username: req.session.user, msg: "User has already logged in"})
  } else {
    return res.status(401).json({loggedIn: false, username: "" ,msg: "User has not logged in"})
  }
}

const logInUser: RequestHandler = (req: Request, res: Response): Response<any, Record<string, any>> | undefined => {
  const {username, password}: {[key:string]: string} = req.body
  const userModel: Users = new Users()

  // Check if username and password input is null
  if(username == null || password == null){
    return res.status(400).json({loggedIn:false, username: "", msg: "Username and/or password cannot be null"})
  }

  // Get password from database and checks if user's password is equal to password in database
  userModel.getPassword(username)
  .then((result: MySQLQueryResult)=>{
      if(result.length == 0){
         return res.status(401).json({loggedIn: false, username: "" , msg: "Username and/or password is incorrect"})
      } 

      const resultArray = result as any

      // Password in databse in encrypted, so needs to be decrypted before being compared 
      bcrypt.compare(password, resultArray[0].password, (error: Error|undefined, response: boolean)=>{
        if(error){
          return res.status(500).json({loggedIn: false, username: "" , msg: "Server error"})
        }
        
        if(response){
          // Create cookie
          req.session.user = username

          return res.status(200).json({loggedIn: true, username: req.session.user, msg: "User has logged in successfully"})
        } else {
          return res.status(401).json({loggedIn: false, username: "" , msg: "Username and/or password is incorrect"})
        }
      })
  }).catch(()=>{
      return res.status(500).json({loggedIn: false, username: "" , msg: "Server error"})
  })
  
}

export {
  checkIfLoggedIn,
  logInUser
}