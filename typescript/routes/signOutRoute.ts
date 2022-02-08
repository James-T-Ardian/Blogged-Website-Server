import express, {Router} from 'express'

import * as signOutController from '../controller/signOutController'

const router:Router = express.Router()

// Routes (See: https://expressjs.com/en/guide/routing.html)
router.post('/', signOutController.logOutUser)

export {router as signoutRoute}