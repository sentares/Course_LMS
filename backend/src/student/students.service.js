const pool = require('../db/db')
const crypto = require('crypto')

class StudentService {
	async select() {
		try {
			return (await pool.query('select * from students')).rows
		} catch (e) {
			console.log(e)
		}
	}

	async getSpecialStudentByArrIds(studentsIds) {
		try {
			const { rows } = await pool.query(`SELECT id_student, login, name, surname, patronymic, role FROM students WHERE id_student IN (${studentsIds.join(',')})`)
			return rows
		} catch (e) {
			console.log(e)
		}
	}

	async getTestInfo(id_test, id_student, ipAddress) {
		try {
			const { rows } = await pool.query('select * from tests_results where id_test=$1 and id_student=$2', [id_test, id_student])
			return rows[0]
		} catch (e) {
			console.log(e)
		}
	}

	async getAndCheckIsRightAnswers(id_test_result) {
		try {
			const { rows } = await pool.query('select questions, answers from tests_results where id_test_result = $1', [id_test_result])
			let numberOfCorrectAnswers

			if (!rows[0].answers) {
				return 0
			} else {
				const { questions, answers } = rows[0]
				const questionsArray = questions.split(',')
				const { rows: rightAnswers } = await pool.query(`select * from right_answers where id_question in (${questionsArray.join(',')})`)
				return (numberOfCorrectAnswers = rightAnswers.filter(rightAnswer => answers.includes(rightAnswer.id_answers)).length)
			}
		} catch (e) {
			console.log(e)
		}
	}

	async startPassTest(id_test, id_student, ipAddress) {
		try {
			const statusOfProgress = 'start'
			const { rows } = await pool.query('select * from tests_results where id_test=$1 and id_student=$2 and status=$3', [id_test, id_student, statusOfProgress])

			if (rows.length > 0) {
				if (rows[0].ip_address === ipAddress) {
					return { type: 'success', message: 'Продолжите тест', data: rows } // Возвращаем все данные
				} else {
					return { type: 'warn', message: 'Это не ваш IP адрес', data: {} }
				}
			} else {
				const { rows } = await pool.query('select * from tests_results where id_test=$1 and id_student=$2 and status=$3', [id_test, id_student, 'passed'])

				if (rows.length > 0) {
					return { type: 'warn', message: 'Вы уже сдали тест', data: {} } // Уже сдано
				} else {
					const status = 'start'
					const currentDate = new Date()
					const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate
						.getDate()
						.toString()
						.padStart(2, '0')} ${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}:${currentDate
						.getSeconds()
						.toString()
						.padStart(2, '0')}.000`

					await pool.query('insert into tests_results (id_test, id_student, status, ip_address, generate_date) values ($1, $2, $3, $4, $5)', [
						id_test,
						id_student,
						status,
						ipAddress,
						formattedDate
					])
					return { type: 'success', message: 'Тест начат', data: rows } // Тест начат
				}
			}
		} catch (e) {
			console.log(e)
			return { message: 'Ошибка в сервере', data: {} }
		}
	}

	async updateTestResultQuestions(id_test_result, questionsString, questionCount) {
		try {
			const { rows } = await pool.query('update tests_results set questions = $1, count_question = $2 where id_test_result = $3', [
				questionsString,
				questionCount,
				id_test_result
			])
			return rows
		} catch (e) {
			console.log(e)
		}
	}

	async updateChosedAnswer(id_test_result, studentChose) {
		try {
			const { rows } = await pool.query('select questions, answers from tests_results where id_test_result = $1', [id_test_result])
			const { questions, answers } = rows[0]
			const newAnswers = questions.split(',').map((question, index) => {
				const answer = studentChose[question] || 0
				return answer
			})
			const newAnswersString = newAnswers.join(',')
			const { rows: updatedAnswers } = await pool.query('update tests_results set answers = $1 where id_test_result = $2 returning answers', [
				newAnswersString,
				id_test_result
			])
			return updatedAnswers
		} catch (e) {
			console.log(e)
		}
	}

	async uploadResultOfTest(id_student, id_test, countRightAnswers, percentageOfRightAnswer, id_test_result) {
		try {
			const querySelect = 'SELECT * FROM tests_results WHERE id_test_result = $1'
			const { rows: selectRows } = await pool.query(querySelect, [id_test_result])

			if (selectRows.length === 0) {
				return 'Неверный id_test_result'
			}

			const status = selectRows[0].status

			if (status === 'passed') {
				return { type: 'warn', message: 'Вы уже сдавали тест', data: {} }
			}

			const currentDate = new Date()
			const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate
				.getDate()
				.toString()
				.padStart(2, '0')} ${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}:${currentDate
				.getSeconds()
				.toString()
				.padStart(2, '0')}.000`
			const statusPassed = 'passed'

			const queryUpdate = 'UPDATE tests_results SET ball = $1, delivery_date = $2, count_right_answers = $3, status = $4 WHERE id_test_result = $5 RETURNING *'
			const { rows: updateRows } = await pool.query(queryUpdate, [percentageOfRightAnswer, formattedDate, countRightAnswers, statusPassed, id_test_result])

			if (updateRows.length > 0) {
				const updatedData = updateRows[0]
				const dataToHash =
					`${updatedData.id_test_result}${updatedData.id_test}${updatedData.id_student}${updatedData.status}${updatedData.count_right_answers}${updatedData.questions}${updatedData.answers}${updatedData.ball}${updatedData.generate_date}${updatedData.delivery_date}${updatedData.count_question}${updatedData.attempt}${updatedData.ip_address}`.replace(
						/\s+/g,
						''
					)

				const hash = crypto.createHash('sha256').update(dataToHash).digest('hex')
				const queryChecksum = 'UPDATE tests_results SET check_sum = $1 WHERE id_test_result = $2 RETURNING *'
				const { rows: checksumRows } = await pool.query(queryChecksum, [hash, id_test_result])

				return { type: 'success', message: 'Тест сдан', data: { checksumRows } }
			}
			return updateRows
		} catch (e) {
			console.log(e)
		}
	}

	async getStudentsResultOfTest(studentsId, testsId) {
		try {
			const query = 'SELECT * FROM tests_results WHERE id_student = $1 AND id_test = $2'
			const { rows } = await pool.query(query, [studentsId, testsId])

			if (rows.length === 0) {
				console.log('Результаты теста не найдены')
				return
			}

			const retrievedData = rows[0]

			const {
				id_test_result,
				id_test,
				id_student,
				status,
				count_right_answers,
				questions,
				answers,
				ball,
				generate_date,
				delivery_date,
				count_question,
				attempt,
				ip_address,
				check_sum
			} = retrievedData

			const dataToHash =
				`${id_test_result}${id_test}${id_student}${status}${count_right_answers}${questions}${answers}${ball}${generate_date}${delivery_date}${count_question}${attempt}${ip_address}`.replace(
					/\s+/g,
					''
				)

			const hash = crypto.createHash('sha256').update(dataToHash).digest('hex')

			if (hash !== check_sum) {
				return { type: 'warn', message: 'Данные были изменены', data: rows[0] }
			} else {
				return { type: 'succes', message: 'Данные целостны', data: rows[0] }
			}
		} catch (e) {
			console.log(e)
		}
	}
}

module.exports = new StudentService()
