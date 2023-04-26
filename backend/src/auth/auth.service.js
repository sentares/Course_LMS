const bcrypt = require('bcrypt')
const path = require('path')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const pool = require('../db/db')

class AuthService {
	async registerStudent({ name, surname, patronymic, password, login }) {
		try {
			const { rows } = await pool.query('select * from students where login=$1', [login])

			if (rows.length) {
				return {
					message: `Пользователь с такой ${login} эл.почтой уже регистрирован`,
					type: 'warn',
					data: [],
					register: false
				}
			}

			const hashPassword = await bcrypt.hash(password, 12)

			const { rows: arrId } = await pool.query('insert into students (login, password, name, surname, patronymic) values ($1, $2, $3, $4, $5) returning id_student', [
				login,
				hashPassword,
				name,
				surname,
				patronymic
			])

			if (arrId.length) {
				const uploadsDir = path.join(__dirname, '../../uploads/students')
				if (!fs.existsSync(uploadsDir)) {
					fs.mkdirSync(uploadsDir)
				}

				const studentDir = path.join(uploadsDir, arrId[0].id_student.toString())
				if (!fs.existsSync(studentDir)) {
					fs.mkdirSync(studentDir)
				}

				return {
					message: 'Вы успешно зарегистированы',
					type: 'success',
					data: [],
					register: true
				}
			}

			return {
				message: 'Ошибка в регистрации',
				type: 'error',
				data: [],
				register: false
			}
		} catch (e) {
			console.log(e)
			throw e
		}
	}

	async loginStudent(login, password) {
		try {
			const { rows } = await pool.query('select * from students where login=$1', [login])

			if (!rows.length) {
				return {
					message: 'Такой пользователь не существует',
					type: 'warn',
					data: {},
					login: false,
					accessToken: ''
				}
			}

			const { name, surname, patronymic, password: hashedPassword, id_student, role } = await rows[0]
			const isPasswordCorrect = await bcrypt.compare(password, hashedPassword)

			if (!isPasswordCorrect) {
				return {
					message: 'Неправильный пароль',
					type: 'warn',
					data: {},
					login: false,
					accessToken: ''
				}
			}

			const token = jwt.sign({ name, surname, patronymic, login, id_student, role }, process.env.SECRET_KEY)

			return {
				message: 'Авторизация прошла успешно',
				type: 'success',
				data: { name, surname, patronymic, login, id_student, role },
				login: true,
				accessToken: token
			}
		} catch (e) {
			console.log(e)
			throw e
		}
	}

	async verifyToken(token) {
		try {
			const decoded = jwt.verify(token, process.env.SECRET_KEY)

			if (decoded.id_student) {
				return {
					name: decoded.name,
					surname: decoded.surname,
					patronymic: decoded.patronymic,
					login: decoded.login,
					id_student: decoded.id_student,
					role: decoded.role
				}
			} else {
				return {
					name: decoded.name,
					login: decoded.login,
					id_user: decoded.id_user,
					activ: decoded.activ,
					try_count: decoded.try_count,
					role: decoded.role
				}
			}
		} catch (error) {
			throw error
		}
	}
}

module.exports = new AuthService()
