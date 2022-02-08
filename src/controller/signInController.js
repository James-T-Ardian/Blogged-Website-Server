"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logInUser = exports.checkIfLoggedIn = void 0;
const Users_1 = require("../model/Users");
const bcrypt_1 = __importDefault(require("bcrypt"));
// File contains request handlers for routes/signInRoute
// For information about express request handlers: https://www.etutorialspoint.com/index.php/expressjs/express-js-requesthandler
const checkIfLoggedIn = (req, res) => {
    // Checks if there is already a cookie
    if (req.session.user) {
        return res.status(200).json({ loggedIn: true, username: req.session.user, msg: "User has already logged in" });
    }
    else {
        return res.status(401).json({ loggedIn: false, username: "", msg: "User has not logged in" });
    }
};
exports.checkIfLoggedIn = checkIfLoggedIn;
const logInUser = (req, res) => {
    const { username, password } = req.body;
    const userModel = new Users_1.Users();
    // Check if username and password input is null
    if (username == null || password == null) {
        return res.status(400).json({ loggedIn: false, username: "", msg: "Username and/or password cannot be null" });
    }
    // Get password from database and checks if user's password is equal to password in database
    userModel.getPassword(username)
        .then((result) => {
        if (result.length == 0) {
            return res.status(401).json({ loggedIn: false, username: "", msg: "Username and/or password is incorrect" });
        }
        const resultArray = result;
        // Password in databse in encrypted, so needs to be decrypted before being compared 
        bcrypt_1.default.compare(password, resultArray[0].password, (error, response) => {
            if (error) {
                return res.status(500).json({ loggedIn: false, username: "", msg: "Server error" });
            }
            if (response) {
                // Create cookie
                req.session.user = username;
                return res.status(200).json({ loggedIn: true, username: req.session.user, msg: "User has logged in successfully" });
            }
            else {
                return res.status(401).json({ loggedIn: false, username: "", msg: "Username and/or password is incorrect" });
            }
        });
    }).catch(() => {
        return res.status(500).json({ loggedIn: false, username: "", msg: "Server error" });
    });
};
exports.logInUser = logInUser;
