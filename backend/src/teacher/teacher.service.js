const pool = require('../db/db')

class TeacherService {
	async select() {
		try {
			return (await pool.query('select * from teachers')).rows
		} catch (e) {
			console.log(e)
		}
	}

	async getSpecialTeacher(id_teacher) {
		try {
			const { rows } = await pool.query(`select * from teachers where id_teacher=$1`, [id_teacher])
			return rows
		} catch (e) {
			console.log(e)
		}
	}
}

module.exports = new TeacherService()
