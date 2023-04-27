const TeacherService = require('./teacher.service')

class TeacherController {
	async getTeachers(req, res) {
		try {
			const data = await TeacherService.select()
			res.status(200).json({
				message: 'Данные успешно получены',
				type: 'success',
				data
			})
		} catch (e) {
			res.status(500).json({
				message: 'Ошибка в сервере',
				type: 'error',
				data: {}
			})
		}
	}

	async getSpecialTeacher(req, res) {
		try {
			const { id_teacher } = req.params
			const { rows } = await TeacherService.getSpecialTeacher(id_teacher)
			console.log(id_teacher)
			// const { name, surname, patronymic, email, birthday, role, status, temp_inn } = await rows[0]

			// res.status(200).json({
			// 	message: 'Преподователь успешно загружен',
			// 	type: 'succes',
			// 	data: {
			// 		name,
			// 		surname,
			// 		patronymic,
			// 		email,
			// 		birthday,
			// 		role,
			// 		status,
			// 		temp_inn
			// 	}
			// })
		} catch (e) {
			res.status(500).json({
				message: 'Ошибка в сервере',
				type: 'error',
				data: {}
			})
		}
	}
}

module.exports = new TeacherController()
