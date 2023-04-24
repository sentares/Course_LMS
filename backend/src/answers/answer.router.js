const { Router } = require('express')
const AnswerController = require('./answer.controller')

const router = Router()

router.get('/', AnswerController.getAnswers)

module.exports = router
