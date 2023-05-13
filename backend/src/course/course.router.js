const { Router } = require('express')
const CourseController = require('./course.controller')

const router = Router()

router.get('/', CourseController.getCourses)
router.post('/create', CourseController.createCourse)
router.get('/getSpecial/:id_course', CourseController.getSpecialCourse)
router.get('/getTeachersCourse/:id_teacher', CourseController.getTeachersCourses)
// router.post('/getStudentsCourses', CourseController.getStudentsCourses)

module.exports = router
