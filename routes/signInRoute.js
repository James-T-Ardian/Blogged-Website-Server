const express = require('express')

const router = express.Router()

const controller = require('../controller/signInController')

router.get('/', controller.checkIfLoggedIn)

router.post('/', controller.logInUser)

module.exports = router

