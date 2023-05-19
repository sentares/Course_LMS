const AuthService = require('./auth.service')
const jwt = require('jsonwebtoken')
const pool = require('../db/db')
const bcrypt = require('bcrypt')
const path = require('path')

class AuthController {
	async login(req, res) {
		try {
			const data = req.body
			const authResponse = await AuthService.loginStudent(data.login, data.password)
			if (!authResponse.login) {
				return res.status(303).json(authResponse)
			}
			const token = authResponse.accessToken
			const user = authResponse.data
			res.status(202)
				.cookie('token', token, {
					httpOnly: true,
					maxAge: 100 * 60 * 60 * 24 * 30
				})
				.json({
					message: 'Авторизация прошла успешно',
					type: 'success',
					data: user,
					accessToken: token
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

	async loginAdmin(req, res) {
		try {
			const data = req.body

			const { rows } = await pool.query('select * from users where login=$1', [data.login])

			if (!rows.length) {
				return res.status(303).json({
					message: 'Такой пользователь не существует',
					type: 'warn',
					data: {},
					accessToken: ''
				})
			}

			const { name, password, login, id_user, activ, try_count, role } = await rows[0]

			if (!activ) {
				return res.status(401).json({
					message: 'У вас нет полномочий для входа',
					type: 'error',
					data: { activ },
					accessToken: ''
				})
			}

			if (try_count >= 5) {
				await pool.query(`update users set activ=false where id_user=${id_user}`)
				return res.status(401).json({
					message: 'Вы превысили лимит попыток входа.',
					type: 'error',
					data: { try_count, activ },
					accessToken: ''
				})
			}

			const isPassword = await bcrypt.compare(data.password, password)

			if (!isPassword) {
				await pool.query(`update users set try_count=${try_count + 1} where id_user=${id_user}`)

				return res.status(303).json({
					message: 'Неправильный пароль',
					type: 'warn',
					data: { try_count: try_count + 1 },
					accessToken: ''
				})
			}

			const token = jwt.sign({ name, login, id_user, activ, try_count, role }, process.env.SECRET_KEY)

			await pool.query(`update users set try_count=0 where id_user=${id_user}`)

			res.status(202)
				.cookie('token', token, {
					httpOnly: true,
					maxAge: 100 * 60 * 60 * 24 * 30
				})
				.json({
					message: 'Авторизация прошла успешно',
					type: 'success',
					data: { name, login, id_user, activ, try_count, role },
					accessToken: token
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

	async loginTeacher(req, res) {
		try {
			const data = req.body
			const { rows } = await pool.query('select * from teachers where temp_inn=$1', [data.temp_inn])

			if (!rows.length) {
				return res.status(303).json({
					message: 'Такой пользователь не существует',
					type: 'warn',
					data: {},
					accessToken: ''
				})
			}

			const { name, surname, patronymic, password, email, temp_inn, id_teacher, role, status } = await rows[0]

			const isPassword = await bcrypt.compare(data.password, password)

			if (!isPassword) {
				return res.status(303).json({
					message: 'Неправильный пароль',
					type: 'warn',
					data: {},
					accessToken: ''
				})
			}

			const token = jwt.sign({ name, surname, patronymic, email, temp_inn, id_teacher, role, status }, process.env.SECRET_KEY)

			res.status(202)
				.cookie('token', token, {
					httpOnly: true,
					maxAge: 100 * 60 * 60 * 24 * 30
				})
				.json({
					message: 'Авторизация прошла успешно',
					type: 'success',
					data: {
						name,
						id_teacher,
						role,
						status
					},
					accessToken: token
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

	async register(req, res) {
		try {
			const { name, surname, patronymic, password, login } = req.body

			const { rows } = await pool.query('select * from students where login=$1', [login])

			if (rows.length) {
				return res.status(303).json({
					message: `Пользователь с такой ${login} эл.почтой уже регистрирован`,
					type: 'warn',
					data: [],
					register: false
				})
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
				const uploadsDir = path.join(__dirname, '../uploads/students')
				if (!fs.existsSync(uploadsDir)) {
					fs.mkdirSync(uploadsDir)
				}

				const studentDir = path.join(uploadsDir, arrId[0].id_student.toString())
				if (!fs.existsSync(studentDir)) {
					fs.mkdirSync(studentDir)
				}
				return res.status(201).json({
					message: 'Вы успешно зарегистированы',
					type: 'success',
					data: [],
					register: true
				})
			}

			return res.status(404).json({
				message: 'Ошибка в регистрации',
				type: 'error',
				data: [],
				register: false
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

	async check(req, res) {
		try {
			const token = req.cookies.token

			if (!token) {
				return res.status(401).json({
					message: 'Вы не авторизованы',
					type: 'warn',
					data: {},
					accessToken: ''
				})
			}
			const data = await AuthService.verifyToken(token)

			res.status(200).json({
				message: 'Вы авторизованы',
				type: 'success',
				data: data,
				accessToken: token
			})
		} catch (error) {
			console.error(error)

			if (error.name === 'JsonWebTokenError') {
				return res.status(401).json({
					message: 'Неправильный токен',
					type: 'error',
					data: {},
					accessToken: ''
				})
			}

			res.status(500).json({
				message: 'Ошибка сервера',
				type: 'error',
				data: {},
				accessToken: ''
			})
		}
	}

	async logout(req, res) {
		try {
			res.status(200).clearCookie('token').json({
				message: 'Вы успешно вышли',
				type: 'success',
				data: {}
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

module.exports = new AuthController()
