import React from 'react'
import StudentTestsToPassModule from './module/StudentTestsToPassModule'
import styles from './styles.module.scss'
import { Link } from 'react-router-dom'

const StudentTestsToPass = () => {
	const { personalTests, formatDate } = StudentTestsToPassModule()

	const isTestMissed = test => {
		const currentDate = new Date()
		const startDate = new Date(test.date_begin_test)
		const endDate = new Date(test.date_end_test)
		return currentDate < startDate || currentDate > endDate
	}

	console.log(personalTests)

	return (
		<div className={styles.StudentTestsToPass}>
			<div>
				<div>Тесты, которые вы должны пройти:</div>
				<div>
					{personalTests?.length ? (
						<>
							{personalTests.map(test => (
								<Link
									to={`/testsToPass/${test.id_test}`}
									className={`${styles.ConnectedTestItem} ${
										isTestMissed(test) ? styles.missed : ''
									}`}
									key={test.id_test}
								>
									<div className={styles.name}>{test.test.test_name}</div>
									<div>
										<div className={styles.date}>
											Начало: {formatDate(test.date_begin_test)}{' '}
										</div>
										<div className={styles.date}>
											Конец: {formatDate(test.date_end_test)}{' '}
										</div>
									</div>
								</Link>
							))}
						</>
					) : (
						<div>Пока нет тестов</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default StudentTestsToPass
