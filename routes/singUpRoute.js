const express = require('express')

const router = express.Router()

const controller = require('../controller/signUpController')

router.post('/', controller.createNewUser)

module.exports = router