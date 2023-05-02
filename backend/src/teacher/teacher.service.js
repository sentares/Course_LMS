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

	async checkTeacher(temp_inn) {
		try {
			const { rows } = await pool.query('select * from teachers where temp_inn=$1', [temp_inn])
			return rows[0] || null
		} catch (e) {
			console.log(e)
		}
	}

	async createTeacher(name, surname, patronymic, birthday, hashPassword, email, temp_inn, role) {
		try {
			const { rows } = await pool.query(
				'INSERT INTO teachers (name, surname, patronymic, birthday, password, email, temp_inn, role) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) returning *',
				[name, surname, patronymic, birthday, hashPassword, email, temp_inn, role]
			)
			return rows[0]
		} catch (e) {
			console.log(e)
		}
	}
}

module.exports = new TeacherService()
