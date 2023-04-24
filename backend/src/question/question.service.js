const pool = require('../db/db')

class QuestionService {
	async select() {
		try {
			return (await pool.query('select * from questions')).rows
		} catch (e) {
			console.log(e)
		}
	}
}

module.exports = new QuestionService()
