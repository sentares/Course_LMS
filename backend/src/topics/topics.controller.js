const TopicsServise = require('./topics.service.js')

class TopicsController {
	async createTopic(req, res) {
		try {
			const { id_test } = req.params
			const { topicName } = req.body
			const exists = await TopicsServise.topicExists(id_test, topicName)
			if (exists) {
				return res.status(303).json({
					message: `Тема с таким названием уже создана`,
					type: 'warn',
					data: []
				})
			}

			const rows = await TopicsServise.createTopic(id_test, topicName)
			return res.status(200).json({
				message: 'Тема создана',
				type: 'success',
				data: rows
			})
		} catch (e) {
			console.log(e)
			res.status(500).json({
				message: 'Ошибка в сервере',
				type: 'error',
				data: {}
			})
		}
	}

	async getTopics(req, res) {
		try {
			const { id_test } = req.params
			const rows = await TopicsServise.getTestsTopics(id_test)
			return res.status(200).json({
				message: 'Тема загружены',
				type: 'success',
				data: rows
			})
		} catch (e) {
			console.log(e)
			res.status(500).json({
				message: 'Ошибка в сервере',
				type: 'error',
				data: {}
			})
		}
	}

	async getSpecial(req, res) {
		try {
			const { id_topic } = req.params
			const rows = await TopicsServise.getSpecialTopic(id_topic)
			return res.status(200).json({
				message: 'Тема загружены',
				type: 'success',
				data: rows
			})
		} catch (e) {
			console.log(e)
			res.status(500).json({
				message: 'Ошибка в сервере',
				type: 'error',
				data: {}
			})
		}
	}
}

module.exports = new TopicsController()
