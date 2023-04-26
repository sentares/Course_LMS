const AuthService = require('./auth.service')

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

	async register(req, res) {
		try {
			const { name, surname, patronymic, password, login } = req.body

			const result = await AuthService.registerStudent({ name, surname, patronymic, password, login })

			if (result.register) {
				return res.status(201).json({
					message: 'Вы успешно зарегистированы',
					type: 'success',
					data: [],
					register: true
				})
			} else {
				return res.status(303).json({
					message: `Пользователь с такой ${login} эл.почтой уже регистрирован`,
					type: 'warn',
					data: [],
					register: false
				})
			}
		} catch (e) {
			console.log(e)
			return res.status(500).json({
				message: 'Ошибка в сервере',
				type: 'error',
				data: {}
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
