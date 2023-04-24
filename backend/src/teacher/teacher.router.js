const { Router } = require('express')
const TeacherController = require('./teacher.controller')

const router = Router()

router.get('/', TeacherController.getTeachers)

module.exports = router
