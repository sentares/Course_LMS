import React from 'react'
import Button from '../../ui/button/Button'
import styles from './styles.module.scss'
import TestsPageModule from './module/TestsPageModule'
import CreateTestModal from '../../components/Modals/CreateTestModal/CreateTestModal'
import { Link } from 'react-router-dom'

const TestsPage = () => {
	const {
		handleChangeModal,
		change,
		handleCreateTest,
		newTestId,
		allCourses,
		allTests,
		allTeachers,
		form,
		isOpenCreateTestModal,
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
					<Button
						title={'Создать тест'}
						classOfStyle={'create'}
						onClick={handleChangeModal}
					/>
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
									to={`/test/${test.id_test}`}
									key={test.id_test}
									className={styles.testItem}
								>
									<div className='w-full'>
										<div className={styles.nameBlock}>
											<div className={styles.name}>{test.test_name}</div>
											<div className={styles.count}>
												вопросов: {test.question_count}
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
