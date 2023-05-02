const CourseService = require('./course.service')

class CourseController {
	async getCourses(req, res) {
		try {
			const data = await CourseService.select()
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

	async createCourse(req, res) {
		try {
			const { nameOfCourse, descriptionOfCourse } = req.body

			const { rows } = await CourseService.createCourse(nameOfCourse, descriptionOfCourse)
			console.log(rows)

			return res.status(200).json({
				message: 'Курс успешно создан',
				type: 'success',
				data: rows
			})
		} catch (e) {
			res.status(500).json({
				message: 'Ошибка в сервере',
				type: 'error',
				data: {}
			})
		}
	}

	async getSpecialCourse(req, res) {
		try {
			const { id_course } = req.params

			const rows = await CourseService.getSpecialCourse(id_course)

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

	async getTeachersCourses(req, res) {
		try {
			const { id_teacher } = req.body
			const rows = await CourseService.getTeachersCourses(id_teacher)

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
}

module.exports = new CourseController()
