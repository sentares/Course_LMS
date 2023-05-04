const pool = require('../db/db')

class QuestionService {
	async topicExists(id_test, topicName) {
		try {
			const result = await pool.query('SELECT EXISTS (SELECT 1 FROM tests_topics WHERE id_test=$1 AND topic_name=$2)', [id_test, topicName])
			return result.rows[0].exists
		} catch (e) {
			console.log(e)
		}
	}

	async createTopic(id_test, topicName) {
		try {
			const { rows } = await pool.query('insert into tests_topics (id_test, topic_name) values ($1, $2) returning *', [id_test, topicName])
			return rows[0]
		} catch (e) {
			console.log(e)
		}
	}

	async getTestsTopics(id_test) {
		try {
			const { rows } = await pool.query('select * from tests_topics where id_test=$1', [id_test])
			return rows
		} catch (e) {
			console.log(e)
		}
	}

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

	async plusCountQuestion(id_test) {
		try {
			const { rows } = await pool.query('UPDATE tests SET question_count = question_count + 1 WHERE id_test = $1 returning *', [id_test])
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
