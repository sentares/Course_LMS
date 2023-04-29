const { Router } = require('express')
const CourseFlowsController = require('./courseFlows.controller')

const router = Router()

router.post('/create/:id_course', CourseFlowsController.createCourseFlows)
router.get('/getOfCourse/:id_course', CourseFlowsController.getAllCourseFlowsOfCourse)
router.get('/getSpecial/:id_flows', CourseFlowsController.getSpecialFlowsOfCourse)

module.exports = router