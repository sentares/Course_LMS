const QuestionService = require('./question.service')

class QuestionController {
	async getQuestions(req, res) {
		try {
			const data = await QuestionService.select()

			res.status(200).json({
				message: 'Данные успешно получены',
				type: 'success',
				data: data
			})
		} catch (e) {
			res.status(500).json({
				message: 'Ошибка в сервере',
				type: 'error',
				data: {}
			})
		}
	}
}

module.exports = new QuestionController()
