const StudentFollowsService = require('./studentFollows.service')

class StudentFollowsController {
	async getStudentsFollows(req, res) {
		try {
			const { id_student } = req.params
			const rows = await StudentFollowsService.getStudentFollows(id_student)

			res.status(200).json({
				message: 'Потоки ваших курсов загружены',
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

	async getStudentsCourses(req, res) {
		try {
			const { courseIds } = req.body
			const rows = await StudentFollowsService.getStudentsCourses(courseIds)

			return res.status(200).json({
				message: 'Курсы успешно получены',
				type: 'success',
				data: rows
			})
		} catch (e) {
			console.log(e)
			res.status(500).json({
				message: 'Ошибка в сервер',
				status: 'error',
				data: []
			})
		}
	}

	async getStudentsFlows(req, res) {
		try {
			const { flowsIds } = req.body
			const rows = await StudentFollowsService.getStudentsFlows(flowsIds)

			return res.status(200).json({
				message: 'Курсы успешно получены',
				type: 'success',
				data: rows
			})
		} catch (e) {
			console.log(e)
			res.status(500).json({
				message: 'Ошибка в сервер',
				status: 'error',
				data: []
			})
		}
	}

	async addStudentToFlows(req, res) {
		try {
			const { id_flows, id_student, id_course } = req.params
			const rows = await StudentFollowsService.addStudentToFlows(id_flows, id_student, id_course)

			res.status(200).json({
				message: 'Вы успешно записаны на курс',
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

	async checkIsStudentAdded(req, res) {
		try {
			const { id_flows, id_student } = req.params
			const rows = await StudentFollowsService.isStudentAdded(id_flows, id_student)
			let isAdded
			if (rows?.length) {
				isAdded = true
			} else {
				isAdded = false
			}

			res.status(200).json({
				message: 'Вы записаны на курс',
				type: 'success',
				data: isAdded
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

	async activateStudent(req, res) {
		try {
			const { id_flows } = req.params
			const { arrOfIdStudents } = req.body

			const rows = await StudentFollowsService.updateIsActiveStudent(id_flows, arrOfIdStudents)
			res.status(200).json({
				message: 'Активация прошла успешно',
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
module.exports = new StudentFollowsController()
