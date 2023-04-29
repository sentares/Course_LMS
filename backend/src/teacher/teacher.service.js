const pool = require('../db/db')

class TeacherService {
	async select() {
		try {
			return (await pool.query('select id_teacher, name, surname, patronymic, email, birthday, role, status, temp_inn from teachers')).rows
		} catch (e) {
			console.log(e)
		}
	}

	async getSpecialTeacher(id_teacher) {
		try {
			const { rows } = await pool.query(`select name, surname, patronymic, email, birthday, role, status, temp_inn from teachers where id_teacher=$1`, [id_teacher])
			return rows[0]
		} catch (e) {
			console.log(e)
		}
	}
}

module.exports = new TeacherService()
