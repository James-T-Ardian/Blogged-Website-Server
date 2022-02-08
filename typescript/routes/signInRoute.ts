import express, {Router} from 'express'

import *  as signInController from '../controller/signInController'

const router:Router = express.Router()

// Routes (See: https://expressjs.com/en/guide/routing.html)
router.get('/', signInController.checkIfLoggedIn) 
router.post('/', signInController.logInUser)

export {router as signinRoute}

