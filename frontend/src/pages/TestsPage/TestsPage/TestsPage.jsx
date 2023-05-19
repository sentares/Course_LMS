import React from 'react'
import Button from '../../../ui/button/Button'
import styles from './styles.module.scss'
import TestsPageModule from './module/TestsPageModule'
import CreateTestModal from '../../../components/Modals/CreateTestModal/CreateTestModal'
import { Link } from 'react-router-dom'

const TestsPage = () => {
	const {
		handleChangeModal,
		change,
		handleCreateTest,
		newTest,
		allCourses,
		allTests,
		allTeachers,
		form,
		isOpenCreateTestModal,
		role,
	} = TestsPageModule()

	return (
		<div className={styles.TestsPage}>
			{isOpenCreateTestModal && (
				<CreateTestModal
					handleChangeModal={handleChangeModal}
					handleCreateTest={handleCreateTest}
					change={change}
					form={form}
					allCourses={allCourses}
				/>
			)}
			<div>
				<div className={styles.buttonBlock}>
					{role === 3 && (
						<Button
							title={'Создать тест'}
							classOfStyle={'create'}
							onClick={handleChangeModal}
						/>
					)}
					{role === 2 && <div className={styles.allTestsName}>Все тесты</div>}
				</div>
				{allTests && allCourses && allTeachers && (
					<div>
						{allTests.map(test => {
							const course = allCourses.find(
								c => c.id_course === test.id_course
							)
							const teacher = allTeachers.find(
								t => t.id_teacher === test.id_teacher
							)
							return (
								<Link
									to={`/tests/${test.id_test}`}
									key={test.id_test}
									className={
										test.question_count >= test.min_question_count
											? styles.testItem
											: styles.testItemNotReady
									}
								>
									<div className='w-full'>
										{test.id_test === newTest.id_test && (
											<div className={styles.new}>new</div>
										)}
										<div className={styles.nameBlock}>
											{test.regulate && (
												<div className={styles.roleExist}>Есть условие</div>
											)}
											<div className={styles.name}>{test.test_name}</div>
											<div className={styles.count}>
												<div>
													вопросов:{' '}
													<span className={styles.countReady}>
														{test.question_count ? test.question_count : 0}
													</span>
												</div>
												<div>мин: {test.min_question_count}</div>
											</div>
										</div>
										<div className={styles.description}>
											{test.test_description}
										</div>
										<div className={styles.nameBlock}>
											<div className={styles.courseName}>
												{course?.course_name}
											</div>
											<div className={styles.teacherName}>
												{teacher?.name} {teacher?.patronymic}
											</div>
										</div>
									</div>
								</Link>
							)
						})}
					</div>
				)}
			</div>
		</div>
	)
}

export default TestsPage
