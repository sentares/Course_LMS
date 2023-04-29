const pool = require('../db/db')

class CourseFlowsService {
	async createFlows(id_course, flows_name, date_register, date_start, date_end, price, id_teacher, count_of_seats, activ) {
		try {
			const { rows } = await pool.query(
				'INSERT INTO course_flows (id_course, flows_name, date_register, date_start, date_end, price, id_teacher, count_of_seats, activ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) returning *',
				[id_course, flows_name, date_register, date_start, date_end, price, id_teacher, count_of_seats, activ]
			)
			return rows
		} catch (e) {
			console.log(e)
		}
	}

	async getAllFlowsOfCourse(id_course) {
		try {
			const { rows } = await pool.query('select * from course_flows where id_course=$1', [id_course])
			return rows
		} catch (e) {
			console.log(e)
		}
	}

	async getSpecialFlowsOfCourse(id_flows) {
		try {
			const { rows } = await pool.query('select * from course_flows where id_flows=$1', [id_flows])
			return rows
		} catch (e) {
			console.log(e)
		}
	}
}

module.exports = new CourseFlowsService()
