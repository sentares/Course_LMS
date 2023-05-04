const { Router } = require('express')
const QuestionController = require('./question.controller')

const router = Router()

router.get('/topics/:id_test', QuestionController.getTopics)
router.get('/:id_test', QuestionController.getQuestions)
router.post('/create/:id_test', QuestionController.createQuestion)
router.post('/createTopic/:id_test', QuestionController.createTopic)

module.exports = router
