const { Router } = require('express')
const CourseController = require('./course.controller')

const router = Router()

router.get('/', CourseController.getCourses)
router.post('/create', CourseController.createCourse)
router.get('/getSpecial/:id_course', CourseController.getSpecialCourse)

module.exports = router
