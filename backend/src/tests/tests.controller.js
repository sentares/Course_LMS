const testsService = require('./tests.service.js')
const TestsService = require('./tests.service.js')

class TestsController {
	async createTest(req, res) {
		try {
			const { id_teacher, id_course, test_name, test_description, min_question_count } = req.body

			const exists = await TestsService.testExists(id_course, test_name)
			if (exists) {
				return res.status(303).json({
					message: `Тест с таким названием уже создан`,
					type: 'warn',
					data: []
				})
			}

			const rows = await TestsService.createTest(id_teacher, id_course, test_name, test_description, min_question_count)

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

	async getRegulateTests(req, res) {
		try {
			const data = await TestsService.getRegulateTests()

			return res.status(200).json({
				message: 'Тесты получены',
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

	async getRegulateTestsOfCourse(req, res) {
		try {
			const { id_course } = req.params
			const data = await TestsService.getRegulateTestsOfCourse(id_course)

			return res.status(200).json({
				message: 'Тесты получены',
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

	async getTeachersTests(req, res) {
		try {
			const { id_teacher } = req.params
			const data = await TestsService.getTeachersTests(id_teacher)

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

	async getSpecialTest(req, res) {
		try {
			const { id_test } = req.params
			const data = await TestsService.getSpecialTest(id_test)
			return res.status(200).json({
				message: 'Тест получен',
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

	async getFullInfoSpecialTest(req, res) {
		try {
			const { id_test } = req.params
			const { data } = await TestsService.getFullInfoSpecialTest(id_test)

			return res.status(200).json({
				message: 'Тест получен',
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

	async getConnectedTestsWithFlow(req, res) {
		try {
			const { id_flows } = req.params

			const data = await TestsService.getConnectedTestsWithFlow(id_flows)
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

	async connectTestWithFlow(req, res) {
		try {
			const formForTest = req.body
			const data = await TestsService.createConnectTestWithFlow(formForTest)

			if (data.length > 0) {
				return res.status(200).json({
					message: 'Тест привязан',
					type: 'success',
					data
				})
			} else {
				res.status(400).json({
					message: 'Что-то не так',
					type: 'error',
					data: {}
				})
			}
		} catch (e) {
			console.log(e)
			res.status(500).json({
				message: 'Ошибка в сервере',
				type: 'error',
				data: {}
			})
		}
	}

	async getPersonalActiveTestsCount(req, res) {
		try {
			const { id_student } = req.params

			const data = await TestsService.getStudentsPersonalActiveTestCount(id_student)
			return res.status(200).json({
				message: 'Тест привязан',
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

	async getPersonalTests(req, res) {
		try {
			const { id_student } = req.params
			const data = await TestsService.getPersonalTests(id_student)

			return res.status(200).json({
				message: 'Тесты для вас',
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
