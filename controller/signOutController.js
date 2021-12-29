module.exports = {
    logOutUser: (req, res)=>{
        if(req.session.user){
            // Cookie begone
            res.clearCookie("username", {path:"/", domain: "blogged-server.herokuapp.com"})
        
            res.status(200).json({loggedOut: true, msg: "User has been logged out"})
        } else {
            res.status(409).json({loggedOut: false, msg: "Cannot log out if user hasnt logged in"})
        }
        
    }
}