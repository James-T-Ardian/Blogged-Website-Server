import express, {Router}  from 'express'

import * as  signUpController from '../controller/signUpController' 

const router:Router = express.Router()

// Routes (See: https://expressjs.com/en/guide/routing.html)
router.post('/', signUpController.createNewUser)

export {router as signupRoute}