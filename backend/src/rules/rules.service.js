const pool = require('../db/db')

class RulesService {
	async addTimeToTest(id_test, timeForTest) {
		try {
			const { rows } = await pool.query(`UPDATE tests SET time=$1 WHERE id_test=$2`, [timeForTest, id_test])
			return rows
		} catch (e) {
			console.log(e)
		}
	}

	async addPassingScoreToTest(id_test, passingScore) {
		try {
			const { rows } = await pool.query(`UPDATE tests SET score_to_passing=$1, regulate=true WHERE id_test=$2`, [passingScore, id_test])
			return rows
		} catch (e) {
			console.log(e)
		}
	}

	async addRegulateCountQuestion(id_topic, regulate_count_question) {
		try {
			const { rows } = await pool.query(`UPDATE tests_topics SET regulate_count_question=$1 WHERE id_topic=$2`, [regulate_count_question, id_topic])
			return rows
		} catch (e) {
			console.log(e)
		}
	}
}

module.exports = new RulesService()
