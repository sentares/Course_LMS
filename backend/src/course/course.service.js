const pool = require('../db/db')

class CourseService {
	async select() {
		try {
			return (await pool.query('select * from course')).rows
		} catch (e) {
			console.log(e)
		}
	}
}

module.exports = new CourseService()
