const TeacherService = require('./teacher.service')
const bcrypt = require('bcrypt')

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
			const data = await TeacherService.getSpecialTeacher(id_teacher)
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

	async createTeacher(req, res) {
		try {
			const { name, surname, patronymic, birthday, password, email, temp_inn, role } = req.body

			const rows = await TeacherService.checkTeacher(temp_inn)

			if (rows) {
				return res.status(303).json({
					message: `Преподователь с таким ИНН уже зарегистрирован`,
					type: 'warn',
					data: []
				})
			}
			const hashPassword = await bcrypt.hash(password, 12)

			const data = await TeacherService.createTeacher(name, surname, patronymic, birthday, hashPassword, email, temp_inn, role)

			return res.status(200).json({
				message: 'Преподователь добавлен',
				type: 'success',
				data: data
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

module.exports = new TeacherController()
