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

	async loginStudent({ login, password: dataPassword }) {
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

			const { name, surname, patronymic, password, id_student, role } = await rows[0]
			const isPasswordCorrect = await bcrypt.compare(dataPassword, password)

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

	async check(req, res) {
		try {
			const { token } = req.cookies

			if (!token) {
				return res.status(303).json({
					message: 'Вы не авторизованы',
					type: 'warn',
					data: {},
					accessToken: ''
				})
			}

			try {
				const { name, surname, patronymic, login, id_student, role } = jwt.verify(token, process.env.SECRET_KEY)
				res.status(202).json({
					message: 'Вы авторизованы',
					type: 'success',
					data: { name, surname, patronymic, login, id_student, role },
					accessToken: token
				})
			} catch (studentTokenError) {
				try {
					const { name, login, id_user, activ, try_count, role } = jwt.verify(token, process.env.SECRET_KEY)
					res.status(202).json({
						message: 'Вы авторизованы',
						type: 'success',
						data: { name, login, id_user, activ, try_count, role },
						accessToken: token
					})
				} catch (adminTokenError) {
					return res.status(401).json({
						message: 'Неправильный токен',
						type: 'error',
						data: {},
						accessToken: ''
					})
				}
			}
		} catch (e) {
			console.log(e)
			throw e
		}
	}
}

module.exports = new AuthService()
