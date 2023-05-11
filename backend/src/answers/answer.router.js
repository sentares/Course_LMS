const { Router } = require('express')
const AnswerController = require('./answer.controller')

const router = Router()

router.get('/:id_question', AnswerController.getAnswers)
router.get('/getRightAnswer/:id_question', AnswerController.getRightAnswer)

module.exports = router
