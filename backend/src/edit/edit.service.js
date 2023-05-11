const pool = require('../db/db')

class EditService {
	async updateQuestion(questionTitle) {
		try {
			const rows = await pool.query()
			return rows[0]
		} catch (e) {
			console.log(e)
		}
	}

	async updateRightAnswer(rightAnswer) {
		try {
			const { id_answers, id_question } = rightAnswer
			const rows = await pool.query()
			return rows[0]
		} catch (e) {
			console.log(e)
		}
	}
}

module.exports = new EditService()
