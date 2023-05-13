import React from 'react'
import styles from './styles.module.scss'

const SpecialTestInfo = ({ specialCourse, specialTest, specialTeacher }) => {
	return (
		<div className={styles.testInfoBlock}>
			<div className={styles.naming}>
				<div className={styles.nameOfCat}>
					Курс: <strong>{specialCourse.course_name}</strong>
				</div>
				<div className={styles.nameOfCat}>
					Название теста: <strong>{specialTest.test_name}</strong>
				</div>
				<div className={styles.nameOfCat}>
					Описание теста:
					<div className={styles.testDescription}>
						<strong>{specialTest.test_description}</strong>
					</div>
				</div>
				<div className={styles.nameOfCat}>
					Автор:
					<div className={styles.testDescription}>
						<strong>
							{' '}
							{specialTeacher.name} {specialTeacher.patronymic}
						</strong>
					</div>
				</div>
				<div className={styles.nameOfCat}>
					Минимальное кол-во вопросов:
					<div className={styles.testDescription}>
						<strong> {specialTest.min_question_count}</strong>
					</div>
				</div>
			</div>
		</div>
	)
}

export default SpecialTestInfo
