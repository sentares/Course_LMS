const { Router } = require('express')
const StudentController = require('./student.controller')

const router = Router()

router.get('/', StudentController.getStudents)
router.post('/getStudentsByArrIds', StudentController.getStudentsByArrIds)
router.get(`/:id_student/getTestInfo/:id_test`, StudentController.getTestInfo)
router.post(`/:id_student/startPassTest/:id_test`, StudentController.startPassTest)
router.post(`/:id_student/uploadResultOfTest/:id_test`, StudentController.uploadStudentsResultOfTest)
router.put(`/updateTestResultQuestions/:id_test_result`, StudentController.updateQuestionsTestResult)
router.put(`/updateStudentChose/:id_test_result`, StudentController.updateChosedAnswerOfQuestion)
router.get(`/:id_student/getResultOfTest/:id_test`, StudentController.getStudentsResult)

module.exports = router
