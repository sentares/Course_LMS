const pool = require('../db/db')

class StudentFollowsService {
	async isStudentAdded(id_flows, id_student) {
		try {
			const { rows } = await pool.query('select * from course_of_students where id_flows=$1 and id_student=$2', [id_flows, id_student])
			return rows
		} catch (e) {
			console.log(e)
		}
	}

	async addStudentToFlows(id_flows, id_student, id_course) {
		try {
			const { rows } = await pool.query('insert into course_of_students (id_flows, id_student, id_course) values ($1, $2, $3) returning *', [id_flows, id_student, id_course])
			return rows
		} catch (e) {
			console.log(e)
		}
	}

	async getStudentFollows(id_student) {
		try {
			const { rows } = await pool.query('select * from course_of_students where id_student=$1', [id_student])
			return rows
		} catch (e) {
			console.log(e)
		}
	}

	async getStudentsCourses(courseIds) {
		try {
			const { rows } = await pool.query(`SELECT * FROM course WHERE id_course IN (${courseIds.join(',')})`)
			return rows
		} catch (e) {
			console.log(e)
		}
	}

	async getStudentsFlows(flowsIds) {
		try {
			const { rows } = await pool.query(`SELECT * FROM course_flows WHERE id_flows IN (${flowsIds.join(',')})`)
			return rows
		} catch (e) {
			console.log(e)
		}
	}

	async updateIsActiveStudent(id_flows, arrOfIdStudents) {
		try {
			const query = `UPDATE course_of_students SET is_active = CASE WHEN id_student IN (${arrOfIdStudents
				.map((_, index) => `$${index + 2}`)
				.join(',')}) THEN true ELSE false END WHERE id_flows = $1`
			const params = [id_flows, ...arrOfIdStudents]
			const { rowCount } = await pool.query(query, params)
			console.log(`Updated ${rowCount} rows`)
		} catch (e) {
			console.log(e)
		}
	}
}

module.exports = new StudentFollowsService()
