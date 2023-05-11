const { Router } = require('express')
const QuestionController = require('./question.controller')

const router = Router()

router.get('/:id_test', QuestionController.getQuestions)
router.get('/getCount/:id_test', QuestionController.getCountOfQuestion)
router.get('/getSpecial/:id_question', QuestionController.getSpecialQuestion)
router.post('/create/:id_test', QuestionController.createQuestion)
router.get('/getTopicsQuestions/:id_topic', QuestionController.getTopicsQuestions)

module.exports = router
