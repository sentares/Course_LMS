const { Router } = require('express')
const QuestionController = require('./question.controller')

const router = Router()

router.get('/', QuestionController.getQuestions)

module.exports = router
