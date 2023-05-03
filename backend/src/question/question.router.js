const { Router } = require('express')
const QuestionController = require('./question.controller')

const router = Router()

router.get('/:id_test', QuestionController.getQuestions)
router.post('/create/:id_test', QuestionController.createQuestion)

module.exports = router
