// Middleware initialization
const cors = require('cors')
const cookieParser = require('cookie-parser')
const express = require('express')
const expressSession = require('express-session')
const app = express()

// Route initialization
const signinRoute = require('./routes/signInRoute')
const signupRoute = require('./routes/singUpRoute')
const signoutRoute = require('./routes/signOutRoute')
const blogPostsRoute = require('./routes/blogPostsRoute')

// Middlewares used
app.use(express.json())
app.use(cors({
    origin: "http://localhost:3006",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))
app.use(cookieParser())
app.use(express.urlencoded({extended: true}))
app.use(expressSession({
    key: "username",
    secret: "doesnt actually matter",
    resave: false,
    saveUninitialized: false,
    cookie: {
        // 1 Hour
        expires: 3600000
    }
}))

// Routes used
app.get('/', (req, res)=>{
    res.redirect('/signin')
})

app.use('/signin', signinRoute)

app.use('/signup', signupRoute)

app.use('/signout', signoutRoute)

app.use('/blog', blogPostsRoute)

app.get('*', (req, res)=>{
    res.status(404).json({msg: "Resource not found"})
})


// Port
const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{
    console.log(`Server is listening on port ${PORT}`)
})
