const { Router } = require('express')
const TeacherController = require('./teacher.controller')

const router = Router()

router.get('/', TeacherController.getTeachers)
router.get('/getSpecial', TeacherController.getSpecialTeacher)

module.exports = router
