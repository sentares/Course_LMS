const TestsService = require('./tests.service.js')

class TestsController {
	async createTest(req, res) {
		try {
			const { id_teacher, id_course, test_name, test_description, question_count } = req.body

			const exists = await TestsService.testExists(id_course, test_name)
			if (exists) {
				return res.status(303).json({
					message: `Тест с таким названием уже создан`,
					type: 'warn',
					data: []
				})
			}

			const rows = await TestsService.createTest(id_teacher, id_course, test_name, test_description, question_count)

			return res.status(200).json({
				message: 'Тест создан',
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

	async getTests(req, res) {
		try {
			const data = await TestsService.getTests()
			return res.status(200).json({
				message: 'Тесты получены',
				type: 'success',
				data
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

module.exports = new TestsController()
