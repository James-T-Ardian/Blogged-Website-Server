const Users = require('../model/Users')
const bcrypt = require('bcrypt')
const saltRounds = 10

module.exports = {
    createNewUser : (req, res)=>{
        const {username, password} = req.body
        const userModel = new Users()

        // Check if username and password input is not null
        if(username == null || password == null){
            return res.status(400).json({signedUp: false, msg: "Username and/or password cannot be null"})
        }

        if(username.length > 15 || password.length > 15){
            return res.status(400).json({signedUp: false, msg: "Username and/or password cannot exceed 15 characters"})
        }

        // Password stored in database will be encrypted first 
        bcrypt.hash(password, saltRounds, (error, hash)=>{
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
}