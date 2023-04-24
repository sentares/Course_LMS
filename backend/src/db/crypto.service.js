const crypto = require('crypto')

class CryptoService {
	md5(value) {
		return crypto.createHash('md5').update(value).digest('hex')
	}

	caesar(str) {
		let value = ''

		str.split('').forEach(letter => {
			const code = letter.charCodeAt()
			value += String.fromCharCode(code + 1)
		})

		return value
	}
}

module.exports = new CryptoService()
