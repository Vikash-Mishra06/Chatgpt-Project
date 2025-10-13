const express = require('express')
const authMiddleware = require('../middlewares/authMiddleware')
const chatController = require('../controllers/chatController')
const router = express.Router()

router.post('/', authMiddleware.authUser, chatController.createChat)

module.exports = router