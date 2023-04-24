const { Router } = require('express')
const StudentController = require('./student.controller')

const router = Router()

router.get('/', StudentController.getStudents)

module.exports = router
