const { Router } = require('express')
const CourseController = require('./course.controller')

const router = Router()

router.get('/', CourseController.getCourses)

module.exports = router
