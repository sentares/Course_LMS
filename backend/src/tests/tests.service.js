const pool = require('../db/db')

class TestsService {
	async testExists(id_course, test_name) {
		try {
			const result = await pool.query('SELECT EXISTS (SELECT 1 FROM tests WHERE id_course=$1 AND test_name=$2)', [id_course, test_name])
			return result.rows[0].exists
		} catch (e) {
			console.log(e)
			return false
		}
	}

	async createTest(id_teacher, id_course, test_name, test_description, question_count) {
		const { rows } = await pool.query('insert into tests (id_teacher, id_course, test_name, test_description, question_count) values ($1, $2, $3, $4, $5) returning *', [
			id_teacher,
			id_course,
			test_name,
			test_description,
			question_count
		])
		return rows[0]
	}

	async getTests() {
		const { rows } = await pool.query('SELECT * FROM tests ORDER BY id_test DESC')
		return rows
	}

	async getSpecialTest(id_test) {
		const { rows } = await pool.query('select * from tests where id_test=$1', [id_test])
		return rows[0]
	}
}

module.exports = new TestsService()
