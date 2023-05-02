const pool = require('../db/db')

class TestsService {
	async checkTest(test_name) {
		try {
			const rows = await pool.query('select * from tests where test_name=$1', [test_name])
			return rows[0] || null
		} catch (e) {
			console.log(e)
		}
	}

	async createTest(id_teacher, id_course, test_name, test_description, question_count) {
		const rows = await pool.query('insert into tests (id_teacher, id_course, test_name, test_description, question_count) values ($1, $2, $3, $4, $5) returning *', [
			id_teacher,
			id_course,
			test_name,
			test_description,
			question_count
		])
		return rows[0]
	}

	async getTests() {
		const { rows } = await pool.query('select * from tests')
		return rows
	}
}

module.exports = new TestsService()
