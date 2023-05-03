const { Router } = require('express')
const TestsController = require('./tests.controller')

const router = Router()

router.get('', TestsController.getTests)
router.get('/getSpecial/:id_test', TestsController.getSpecialTest)
router.post('/create', TestsController.createTest)

module.exports = router
