"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Middleware initialization
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session"));
const app = (0, express_1.default)();
// Route initialization
const signInRoute_1 = require("./routes/signInRoute");
const signUpRoute_1 = require("./routes/signUpRoute");
const signOutRoute_1 = require("./routes/signOutRoute");
const blogPostsRoute_1 = require("./routes/blogPostsRoute");
// Middlewares used
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "http://localhost:3006",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, express_session_1.default)({
    secret: "doesnt actually matter",
    resave: false,
    saveUninitialized: false,
    cookie: {
        // 1 Hour
        maxAge: 3600000
    }
}));
// Routes used
app.get('/', (req, res) => {
    res.redirect('/signin');
});
app.use('/signin', signInRoute_1.signinRoute);
app.use('/signup', signUpRoute_1.signupRoute);
app.use('/signout', signOutRoute_1.signoutRoute);
app.use('/blog', blogPostsRoute_1.blogPostsRoute);
app.get('*', (req, res) => {
    res.status(404).json({ msg: "Resource not found" });
});
// Port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
