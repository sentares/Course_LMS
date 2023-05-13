const pool = require('../db/db')

class QuestionService {
	async select(id_test) {
		try {
			const { rows } = await pool.query(`select * from questions where id_test=$1`, [id_test])
			return rows
		} catch (e) {
			console.log(e)
		}
	}

	async getCount(id_test) {
		try {
			const { rows } = await pool.query(`select id_question from questions where id_test=$1`, [id_test])
			return rows
		} catch (e) {
			console.log(e)
		}
	}

	async getTopicsQuestions(id_topic) {
		try {
			const { rows } = await pool.query(`select * from questions where id_topic=$1 ORDER BY id_question asc`, [id_topic])
			return rows
		} catch (e) {
			console.log(e)
		}
	}

	async getSpecial(id_question) {
		try {
			const { rows } = await pool.query(`select * from questions where id_question=$1`, [id_question])
			return rows[0]
		} catch (e) {
			console.log(e)
		}
	}

	async insertQuestion(question, id_test, id_topic) {
		try {
			const { rows } = await pool.query('INSERT INTO questions (question, id_test, id_topic) VALUES ($1, $2, $3) RETURNING *', [question, id_test, id_topic])
			return rows[0]
		} catch (e) {
			console.log(e)
		}
	}

	async plusCountQuestion(id_test, id_topic) {
		try {
			const { rows } = await pool.query('UPDATE tests SET question_count = question_count + 1 WHERE id_test = $1 returning *', [id_test])
			const { rows: topic } = await pool.query('UPDATE tests_topics SET count_question = count_question + 1 WHERE id_topic = $1 returning *', [id_topic])
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
