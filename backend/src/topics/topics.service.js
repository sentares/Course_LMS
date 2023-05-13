const pool = require('../db/db')

class TopicsServise {
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
			const { rows } = await pool.query('select * from tests_topics where id_test=$1 order by id_topic asc', [id_test])
			return rows
		} catch (e) {
			console.log(e)
		}
	}

	async getSpecialTopic(id_topic) {
		try {
			const { rows } = await pool.query('select * from tests_topics where id_topic=$1', [id_topic])
			return rows[0]
		} catch (e) {
			console.log(e)
		}
	}
}

module.exports = new TopicsServise()
