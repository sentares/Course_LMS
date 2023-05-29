const { Router } = require('express')
const DocController = require('./doc.controller')

const router = Router()

router.get('/course/:id_course/test/:id_test_result/student/:id_student', DocController.postDataToSertificate)

module.exports = router
