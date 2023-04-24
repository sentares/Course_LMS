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
}

module.exports = new CourseController()
