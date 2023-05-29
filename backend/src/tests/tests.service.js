const pool = require('../db/db')

class TestsService {
	async testExists(id_course, test_name) {
		try {
			const result = await pool.query('SELECT EXISTS (SELECT 1 FROM tests WHERE id_course=$1 AND test_name=$2)', [id_course, test_name])
			return result.rows[0].exists
		} catch (e) {
			console.log(e)
			return false
		}
	}

	async createTest(id_teacher, id_course, test_name, test_description, min_question_count) {
		const { rows } = await pool.query('insert into tests (id_teacher, id_course, test_name, test_description, min_question_count) values ($1, $2, $3, $4, $5) returning *', [
			id_teacher,
			id_course,
			test_name,
			test_description,
			min_question_count
		])
		return rows[0]
	}

	async getTests() {
		const { rows } = await pool.query('SELECT * FROM tests ORDER BY id_test DESC')
		return rows
	}

	async getTeachersTests(id_teacher) {
		const { rows } = await pool.query('SELECT * FROM tests WHERE id_teacher = $1 ORDER BY id_test DESC', [id_teacher])
		return rows
	}

	async getSpecialTest(id_test) {
		const { rows } = await pool.query('select * from tests where id_test=$1', [id_test])
		return rows[0]
	}

	async getFullInfoSpecialTest(id_test) {
		try {
			const { rows } = await pool.query('SELECT * FROM tests WHERE id_test = $1', [id_test])
			if (rows.length > 0) {
				const test = rows[0]
				const { id_course } = test
				const { rows: courseRows } = await pool.query('SELECT course_name FROM course WHERE id_course = $1', [id_course])
				if (courseRows.length > 0) {
					const nameOfCourse = courseRows[0].course_name
					const { rows: testsOfFlowsRows } = await pool.query('SELECT id_flows FROM tests_of_flows WHERE id_test = $1', [id_test])
					if (testsOfFlowsRows.length > 0) {
						const id_flows = testsOfFlowsRows[0].id_flows
						const { rows: flowRows } = await pool.query('SELECT flows_name FROM course_flows WHERE id_flows = $1', [id_flows])
						if (flowRows.length > 0) {
							const flowName = flowRows[0].flows_name
							return {
								data: {
									...test,
									course_name: nameOfCourse,
									flow_name: flowName,
									id_flows: id_flows
									// with_sertificate: with_sertificate
								}
							}
						}
					}
				}
			}
		} catch (e) {
			console.log(e)
		}
	}

	async getRegulateTests() {
		const { rows } = await pool.query('select * from tests where regulate=true')
		return rows
	}

	async getRegulateTestsOfCourse(id_course) {
		const { rows } = await pool.query('SELECT * FROM tests WHERE regulate=true AND id_course=$1', [id_course])
		return rows
	}

	async getConnectedTestsWithFlow(id_flows) {
		const { rows } = await pool.query('SELECT * FROM tests_of_flows WHERE id_flows = $1', [id_flows])

		const studentsByTest = new Map()
		rows.forEach(row => {
			const { id_test, id_student, id_rrnk_test, ...testData } = row
			if (!studentsByTest.has(id_test)) {
				studentsByTest.set(id_test, {
					id_test,
					students: [],
					...testData
				})
			}
			studentsByTest.get(id_test).students.push({ id_student, id_rrnk_test })
		})
		return Array.from(studentsByTest.values())
	}

	async createConnectTestWithFlow(formForTest) {
		try {
			const { choseStudentsIds, ...formData } = formForTest
			const { id_course, id_flows, id_test, date_begin_test, date_end_test } = formData
			const id_rrnk_tests = []

			for (const id_student of choseStudentsIds) {
				const { rows } = await pool.query(
					'INSERT INTO tests_of_flows (id_course, id_flows, id_test, date_begin_test, date_end_test, id_student) VALUES ($1, $2, $3, $4::timestamp, $5::timestamp, $6) RETURNING id_rrnk_test',
					[id_course, id_flows, id_test, date_begin_test, date_end_test, id_student]
				)
				if (rows.length > 0) {
					id_rrnk_tests.push(rows[0].id_rrnk_test)
				}
			}

			return id_rrnk_tests
		} catch (e) {
			console.log(e)
			return []
		}
	}

	async getStudentsPersonalActiveTestCount(id_student) {
		try {
			const { rows } = await pool.query('SELECT COUNT(*) AS test_count FROM tests_of_flows WHERE id_student = $1', [id_student])
			const testCount = rows[0].test_count

			return testCount
		} catch (e) {
			console.log(e)
		}
	}

	async getPersonalTests(id_student) {
		try {
			const { rows } = await pool.query('select * from tests_of_flows where id_student = $1', [id_student])

			const testDetails = []

			for (const row of rows) {
				const testQueryResult = await pool.query('select * from tests where id_test = $1', [row.id_test])
				const test = testQueryResult.rows[0]
				const testWithDetails = {
					...row,
					test
				}
				testDetails.push(testWithDetails)
			}

			return testDetails
		} catch (e) {
			console.log(e)
		}
	}
}

module.exports = new TestsService()
