const AuthService = require('./auth.service')

class AuthController {
	async login(req, res) {
		try {
			const { login, password } = req.body
			const result = await AuthService.loginStudent({ login, password })
			res.status(result.login ? 202 : 303).json(result)
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

	async checkAuth(req, res) {
		try {
		} catch (e) {
			res.status(500).json({
				message: 'Ошибка в сервере',
				type: 'error',
				data: {}
			})
		}
	}

	async logout(req, res) {
		try {
		} catch (e) {
			res.status(500).json({
				message: 'Ошибка в сервере',
				type: 'error',
				data: {}
			})
		}
	}
}

module.exports = new AuthController()
