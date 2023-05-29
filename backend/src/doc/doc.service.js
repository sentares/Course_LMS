const pool = require('../db/db')

class DocService {
	async postDataToSertificate(id_course, id_test_result, id_student) {
		const { rows: courseInfo } = await pool.query('SELECT * FROM course WHERE id_course = $1', [id_course])
		const { rows: studentInfo } = await pool.query('SELECT name, surname, patronymic, male, role FROM students WHERE id_student = $1', [id_student])
		const { rows: testResultInfo } = await pool.query('SELECT * FROM tests_results WHERE id_test_result = $1', [id_test_result])

		return {
			courseInfo: courseInfo[0],
			studentInfo: studentInfo[0],
			testResultInfo: testResultInfo[0]
		}
	}
}

module.exports = new DocService()
