const { Router } = require('express')
const TestsController = require('./tests.controller')

const router = Router()

router.get('', TestsController.getTests)
router.get('/getSpecial/:id_test', TestsController.getSpecialTest)
router.get('/getTeacher/:id_teacher', TestsController.getTeachersTests)
router.get('/getRegulateTests', TestsController.getRegulateTests)
router.get('/getRegulateTestsOfCourse/:id_course', TestsController.getRegulateTestsOfCourse)
router.post('/connectWithFlow', TestsController.connectTestWithFlow)
router.post('/create', TestsController.createTest)
router.get('/getConnectedWithFlow/:id_flows', TestsController.getConnectedTestsWithFlow)
router.get('/getPersonalActiveTestCount/:id_student', TestsController.getPersonalActiveTestsCount)
router.get('/getPersonalTests/:id_student', TestsController.getPersonalTests)
router.get('/getFullInfo/:id_test', TestsController.getFullInfoSpecialTest)

module.exports = router
