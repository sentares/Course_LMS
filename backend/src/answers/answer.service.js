const pool = require('../db/db')

class AnswerService {
	async getAnswers(id_question) {
		try {
			const { rows } = await pool.query(`select * from answers where id_question=$1`, [id_question])
			return rows
		} catch (e) {
			console.log(e)
		}
	}

	async getRightAnswer(getRightAnswer) {
		try {
			const { rows } = await pool.query('select * from right_answers where id_question=$1', [getRightAnswer])
			return rows[0]
		} catch (e) {
			console.log(e)
		}
	}
}

module.exports = new AnswerService()
