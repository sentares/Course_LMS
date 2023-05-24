const RulesService = require('./rules.service')

class RulesControllers {
	async createRule(req, res) {
		try {
			const { id_test } = req.params
			const { timeForTest, regulateCountOfQuestionInTopic, passingScore } = req.body

			if (!id_test || !timeForTest || !regulateCountOfQuestionInTopic || !passingScore) {
				return res.status(400).json({
					message: 'Данные записаны не правильно',
					type: 'warn'
				})
			}

			for (const id_topic in regulateCountOfQuestionInTopic) {
				const regulate_count_question = regulateCountOfQuestionInTopic[id_topic]
				await RulesService.addRegulateCountQuestion(id_topic, regulate_count_question)
			}

			await RulesService.addTimeToTest(id_test, timeForTest)
			await RulesService.addPassingScoreToTest(id_test, passingScore)

			return res.status(200).json({
				message: 'Условие создано',
				type: 'success'
			})
		} catch (e) {
			console.log(e)
			res.status(500).json({
				message: 'Произошла ошибка при создании условия',
				type: 'error'
			})
		}
	}
}
module.exports = new RulesControllers()
