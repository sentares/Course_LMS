const { Router } = require('express')
const AuthController = require('./auth.controller')

const router = Router()

router.post('/login', AuthController.login)
router.get('/check', AuthController.checkAuth)
router.get('/logout', AuthController.logout)
router.post('/register', AuthController.register)

module.exports = router
