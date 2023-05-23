const StudentService = require('./students.service')
const { networkInterfaces } = require('os')

const nets = networkInterfaces()
const results = Object.create(null) // Or just '{}', an empty object

for (const name of Object.keys(nets)) {
	for (const net of nets[name]) {
		const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4
		if (net.family === familyV4Value && !net.internal) {
			if (!results[name]) {
				results[name] = []
			}
			results[name].push(net.address)
		}
	}
}

class StudentController {
	async getStudents(req, res) {
		try {
			const data = await StudentService.select()

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

	async getStudentsByArrIds(req, res) {
		try {
			const { studentsIds } = req.body
			const data = await StudentService.getSpecialStudentByArrIds(studentsIds)

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

	async getTestInfo(req, res) {
		try {
			const { id_test, id_student } = req.params
			const ipAddress = results.Ethernet[0]

			const data = await StudentService.getTestInfo(id_test, id_student, ipAddress)

			if (!data) {
				res.status(200).json({
					message: 'Тест еще не начали сдавать',
					type: 'success',
					data: 'not started'
				})
			} else {
				res.status(200).json({
					message: 'Данные успешно получены',
					type: 'success',
					data: data
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

	async startPassTest(req, res) {
		try {
			const { id_test, id_student } = req.params

			const ipAddress = results.Ethernet[0]

			const data = await StudentService.startPassTest(id_test, id_student, ipAddress)
			console.log(data, 'dataOfStart')

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

	async updateQuestionsTestResult(req, res) {
		try {
			const { id_test_result } = req.params
			const { arrOfQuestionsIds } = req.body

			const questionsString = arrOfQuestionsIds.join(',')
			const questionCount = arrOfQuestionsIds.length

			const data = await StudentService.updateTestResultQuestions(id_test_result, questionsString, questionCount)
			res.status(200).json({
				message: 'Вопросы для теста успешно обновлены',
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

	async updateChosedAnswerOfQuestion(req, res) {
		try {
			const { id_test_result } = req.params
			const { studentChose } = req.body

			if (studentChose === 0) {
				console.log('have nothing')
			}
			const data = await StudentService.updateChosedAnswer(id_test_result, studentChose)

			res.status(200).json({
				message: 'Ответы успешно обновлены',
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

	async uploadStudentsResultOfTest(req, res) {
		try {
			const { id_student, id_test } = req.params
			const { count_question, id_test_result } = req.body
			// const { countRightAnswers, percentageOfRightAnswer } = resultOfTest

			const countRightAnswers = await StudentService.getAndCheckIsRightAnswers(id_test_result)
			console.log(countRightAnswers)
			console.log(count_question)
			const percentageOfRightAnswer = await ((countRightAnswers / count_question) * 100).toFixed(2)
			console.log(percentageOfRightAnswer)

			const data = await StudentService.uploadResultOfTest(id_student, id_test, countRightAnswers, percentageOfRightAnswer, id_test_result)
			res.status(200).json({
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

	async getStudentsResult(req, res) {
		try {
			const { id_student, id_test } = req.params
			const studentsId = id_student
			const testsId = id_test

			const data = await StudentService.getStudentsResultOfTest(studentsId, testsId)
			res.status(200).json({
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

module.exports = new StudentController()
