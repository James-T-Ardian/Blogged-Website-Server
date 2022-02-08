"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNewUser = void 0;
const Users_1 = require("../model/Users");
const bcrypt_1 = __importDefault(require("bcrypt"));
const saltRounds = 10;
// File contains request handlers for routes/signUpRoute
// For information about express request handlers: https://www.etutorialspoint.com/index.php/expressjs/express-js-requesthandler
const createNewUser = (req, res) => {
    const { username, password } = req.body;
    const userModel = new Users_1.Users();
    // Check if username and password input is not null
    if (username == null || password == null) {
        return res.status(400).json({ signedUp: false, msg: "Username and/or password cannot be null" });
    }
    if (username.length > 15 || password.length > 15) {
        return res.status(400).json({ signedUp: false, msg: "Username and/or password cannot exceed 15 characters" });
    }
    // Password stored in database will be encrypted first 
    bcrypt_1.default.hash(password, saltRounds, (error, hash) => {
        if (error) {
            return res.status(500).json({ signedUp: false, msg: "Server error" });
        }
        userModel.createNewUser(username, hash)
            .then(() => {
            return res.status(200).json({ signedUp: true, msg: "Account has been created" });
        })
            .catch((err) => {
            if (err.errno == 1062) {
                return res.status(409).json({ signedUp: false, msg: "Someone already has that username" });
            }
            else {
                return res.status(500).json({ signedUp: false, msg: "Server error" });
            }
        });
    });
};
exports.createNewUser = createNewUser;
