const { Router } = require('express')
const AuthController = require('./auth.controller')

const router = Router()

router.post('/login', AuthController.login)
router.get('/check', AuthController.check)
router.get('/logout', AuthController.logout)
router.post('/register', AuthController.register)
router.post('/loginAdmin', AuthController.loginAdmin)

module.exports = router
