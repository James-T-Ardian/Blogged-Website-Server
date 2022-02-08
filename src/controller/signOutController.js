"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logOutUser = void 0;
// File contains request handlers for routes/signOutRoute
// For information about express request handlers: https://www.etutorialspoint.com/index.php/expressjs/express-js-requesthandler
const logOutUser = (req, res) => {
    if (req.session.user) {
        // Destroy cookie
        req.session.destroy((err) => {
            // Do nothing
        });
        res.clearCookie("username");
        return res.status(200).json({ loggedOut: true, msg: "User has been logged out" });
    }
    else {
        return res.status(409).json({ loggedOut: false, msg: "Cannot log out if user hasnt logged in" });
    }
};
exports.logOutUser = logOutUser;
