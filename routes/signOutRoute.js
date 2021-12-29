const express = require('express')

const router = express.Router()

const controller = require('../controller/signOutController')

router.post('/', controller.logOutUser)

module.exports = router