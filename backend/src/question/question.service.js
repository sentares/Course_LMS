const pool = require('../db/db')

class QuestionService {
	async select(id_test) {
		try {
			const { rows } = await pool.query('select * from questions where id_test=$1', [id_test])
			return rows
		} catch (e) {
			console.log(e)
		}
	}

	async insertQuestion(question, id_test) {
		try {
			const { rows } = await pool.query('INSERT INTO questions (question, id_test) VALUES ($1, $2) RETURNING *', [question, id_test])
			return rows[0]
		} catch (e) {
			console.log(e)
		}
	}

	async insertAnswers(questionId, text) {
		try {
			const { rows } = await pool.query('INSERT INTO answers (id_question, answers) VALUES ($1, $2) RETURNING *', [questionId, text])
			return rows[0]
		} catch (e) {
			console.log(e)
		}
	}

	async insertRightAnswer(questionId, answerId) {
		try {
			await pool.query('INSERT INTO right_answers (id_question, id_answers) VALUES ($1, $2)', [questionId, answerId])
		} catch (e) {
			console.log(e)
		}
	}
}

module.exports = new QuestionService()
