const { Router } = require('express')
const TopicsController = require('./topics.controller')

const router = Router()

router.get('/:id_test', TopicsController.getTopics)
router.post('/create/:id_test', TopicsController.createTopic)
router.get('/getSpecial/:id_topic', TopicsController.getSpecial)

module.exports = router
