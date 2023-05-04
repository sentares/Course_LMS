const QuestionService = require('./question.service')

class QuestionController {
	async createTopic(req, res) {
		try {
			const { id_test } = req.params
			const { topicName } = req.body
			const exists = await QuestionService.topicExists(id_test, topicName)
			if (exists) {
				return res.status(303).json({
					message: `Тема с таким названием уже создана`,
					type: 'warn',
					data: []
				})
			}

			const rows = await QuestionService.createTopic(id_test, topicName)
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
			const rows = await QuestionService.getTestsTopics(id_test)
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

	async getQuestions(req, res) {
		try {
			const { id_test } = req.params
			const rows = await QuestionService.select(id_test)

			res.status(200).json({
				message: 'Данные успешно получены',
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

	async createQuestion(req, res) {
		try {
			const { question, options } = req.body
			const { id_test } = req.params

			const rows = await QuestionService.insertQuestion(question, id_test)
			const questionId = await rows?.id_question
			await QuestionService.plusCountQuestion(id_test)
			const answers = options.map(async option => {
				const { number, text, isCorrect } = option
				const answersResult = await QuestionService.insertAnswers(questionId, text)
				const answerId = await answersResult?.id_answers
				if (isCorrect) {
					await QuestionService.insertRightAnswer(questionId, answerId)
				}

				return {
					number,
					text,
					isCorrect,
					id_answers: answerId
				}
			})
			const insertedAnswers = await Promise.all(answers)

			res.status(201).json({
				message: 'Вопрос успешно создан',
				type: 'success',
				data: {
					...rows[0],
					options: insertedAnswers
				}
			})
		} catch (e) {
			console.log(e)
			res.status(500).json({
				message: 'Ошибка в сервер',
				type: 'error',
				data: []
			})
		}
	}
}

module.exports = new QuestionController()
