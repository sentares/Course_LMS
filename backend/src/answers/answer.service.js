const pool = require('../db/db')

class AnswerService {
	async select() {
		try {
			return (await pool.query('select * from answers')).rows
		} catch (e) {
			console.log(e)
		}
	}
}

module.exports = new AnswerService()
