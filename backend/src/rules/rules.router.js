const { Router } = require('express')
const RulesControllers = require('./rules.controller')

const router = Router()

router.put('/createRule/:id_test', RulesControllers.createRule)

module.exports = router
