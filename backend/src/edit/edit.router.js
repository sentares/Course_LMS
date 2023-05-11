const { Router } = require('express')
const EditController = require('./edit.controller')

const router = Router()

router.put('/question/:id_question', EditController.editQuestion)

module.exports = router
