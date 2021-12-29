const Users = require('../model/Users')
const bcrypt = require('bcrypt')

module.exports = {
  checkIfLoggedIn: (req, res)=>{
    // Checks if there is already a cookie
    if(req.session.user){
      return res.status(200).json({loggedIn: true, username: req.session.user, msg: "User has already logged in"})
    } else {
      return res.status(401).json({loggedIn: false, username: "" ,msg: "User has not logged in"})
    }
  },

  logInUser : (req, res) => {
    const {username, password} = req.body
    const userModel = new Users()

    // Check if username and password input is null
    if(username == null || password == null){
      return res.status(400).json({loggedIn:false, username: "", msg: "Username and/or password cannot be null"})
    }

    // Get password from database and checks if user's password is equal to password in database
    userModel.getPassword(username)
    .then((result)=>{
        if(result.length == 0){
           return res.status(401).json({loggedIn: false, username: "" , msg: "Username and/or password is incorrect"})
        } 

        // Password in databse in encrypted, so needs to be decrypted before being compared 
        bcrypt.compare(password, result[0].password, (error, response)=>{
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
    }).catch((err)=>{
        return res.status(500).json({loggedIn: false, username: "" , msg: "Server error"})
    })
    
  }
}