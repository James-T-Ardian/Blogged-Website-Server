module.exports = {
    logOutUser: (req, res)=>{
        if(req.session.user){
            // Cookie begone
            res.clearCookie("username", {domain: "https://james-t-ardian.github.io", path:"/"})
        
            res.status(200).json({loggedOut: true, msg: "User has been logged out"})
        } else {
            res.status(409).json({loggedOut: false, msg: "Cannot log out if user hasnt logged in"})
        }
        
    }
}