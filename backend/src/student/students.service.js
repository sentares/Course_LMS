const pool = require('../db/db')

class StudentService {
	async select() {
		try {
			return (await pool.query('select * from students')).rows
		} catch (e) {
			console.log(e)
		}
	}
}

module.exports = new StudentService()
