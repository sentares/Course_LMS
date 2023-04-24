const AuthService = require('./auth.service')

class AuthController {
	async login(req, res) {
		try {
		} catch (e) {
			res.status(500).json({
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
