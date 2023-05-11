const AnswerService = require('./answer.service')

class AnswerController {
	async getAnswers(req, res) {
		try {
			const { id_question } = req.params
			const data = await AnswerService.getAnswers(id_question)

			res.status(200).json({
				message: 'Данные успешно получены',
				type: 'success',
				data: data
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

	async getRightAnswer(req, res) {
		try {
			const { id_question } = req.params
			const data = await AnswerService.getRightAnswer(id_question)

			res.status(200).json({
				message: 'Данные успешно получены',
				type: 'success',
				data: data
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

module.exports = new AnswerController()
