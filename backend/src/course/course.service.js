const pool = require('../db/db')

class CourseService {
	async select() {
		try {
			return (await pool.query('select * from course')).rows
		} catch (e) {
			console.log(e)
		}
	}

	async createCourse(nameOfCourse, descriptionOfCourse) {
		try {
			const { rows } = await pool.query('INSERT INTO course (course_name, course_description) VALUES ($1, $2) returning *', [nameOfCourse, descriptionOfCourse])
			return rows[0]
		} catch (e) {
			console.log(e)
		}
	}

	async getSpecialCourse(id_course) {
		try {
			const { rows } = await pool.query('select * from course where id_course=$1', [id_course])
			return rows[0]
		} catch (e) {
			console.log(e)
		}
	}

	async getTeachersCourses(id_teacher) {
		try {
			const { rows } = await pool.query('select * from course where id_teacher=$1', [id_teacher])
			return rows
		} catch (e) {
			console.log(e)
		}
	}
}

module.exports = new CourseService()
