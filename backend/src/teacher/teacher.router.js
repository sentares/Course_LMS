const { Router } = require('express')
const TeacherController = require('./teacher.controller')

const router = Router()

router.get('/', TeacherController.getTeachers)
router.get('/getSpecial/:id_teacher', TeacherController.getSpecialTeacher)

module.exports = router
