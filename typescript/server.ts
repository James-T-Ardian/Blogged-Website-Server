// Middleware initialization
import express, {Application, Request, Response} from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import expressSession from 'express-session'
const app: Application =  express()



// Route initialization
import {signinRoute} from './routes/signInRoute'
import {signupRoute} from './routes/signUpRoute'
import {signoutRoute} from './routes/signOutRoute'
import {blogPostsRoute} from './routes/blogPostsRoute'

// Middlewares used
app.use(express.json())
app.use(cors({
    origin: "https://blogged-website.netlify.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))
app.use(cookieParser())
app.use(express.urlencoded({extended: true}))
app.enable("trust proxy")
app.use(expressSession({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    cookie: {
        // 1 Hour
        maxAge: 3600000,
        secure: true,
        sameSite: "none"
    }
}))

// Routes used
app.get('/', (req :Request, res:Response)=>{
    res.redirect('/signin')
})

app.use('/signin', signinRoute)

app.use('/signup', signupRoute)

app.use('/signout', signoutRoute)

app.use('/blog', blogPostsRoute)

app.get('*', (req:Request, res:Response)=>{
    res.status(404).json({msg: "Resource not found"})
})


// Port
const PORT : string|3000 = process.env.PORT || 3000
app.listen(PORT, ()=>{
    console.log(`Server is listening on port ${PORT}`)
})
