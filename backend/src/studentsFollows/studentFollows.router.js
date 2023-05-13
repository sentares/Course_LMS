const { Router } = require('express')
const StudentFollowsController = require('./studentFollows.controller')

const router = Router()

router.post('/:id_flows/addStudent/:id_student/:id_course', StudentFollowsController.addStudentToFlows)
router.get('/:id_flows/checkStudent/:id_student', StudentFollowsController.checkIsStudentAdded)
router.get('/:id_student', StudentFollowsController.getStudentsFollows)
router.post('/getStudentsCourses', StudentFollowsController.getStudentsCourses)
router.post('/getStudentsFlows', StudentFollowsController.getStudentsFlows)

module.exports = router
