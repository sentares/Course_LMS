const pool = require('../db/db')

class TeacherService {
	async select() {
		try {
			return (await pool.query('select * from teachers')).rows
		} catch (e) {
			console.log(e)
		}
	}
}

module.exports = new TeacherService()
