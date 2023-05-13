const CourseFlowsService = require('./courseFlows.service')

class CourseFlowsController {
	async createCourseFlows(req, res) {
		try {
			const { id_course } = req.params
			const { flows_name, date_register, date_start, date_end, price, id_teacher, count_of_seats, activ } = req.body

			const rows = await CourseFlowsService.createFlows(id_course, flows_name, date_register, date_start, date_end, price, id_teacher, count_of_seats, activ)

			res.status(200).json({
				message: 'Поток успешно создан',
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

	async getAllCourseFlowsOfCourse(req, res) {
		try {
			const { id_course } = req.params
			const data = await CourseFlowsService.getAllFlowsOfCourse(id_course)

			res.status(200).json({
				message: 'Потоки курса успешно загружены',
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

	async getSpecialFlowsOfCourse(req, res) {
		try {
			const { id_flows } = req.params
			const rows = await CourseFlowsService.getSpecialFlowsOfCourse(id_flows)

			res.status(200).json({
				message: 'Поток успешно загружен',
				type: 'success',
				data: rows[0]
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

	async getSpecialFLowsOfTeacher(req, res) {
		try {
			const { id_teacher } = req.params
			const rows = await CourseFlowsService.getSpecialFlowsOfTeacher(id_teacher)

			res.status(200).json({
				message: 'Потоки успешно загружены',
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

module.exports = new CourseFlowsController()
