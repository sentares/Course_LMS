import React from 'react'
import CoursesPageModule from './module/CoursesPageModule'
import styles from './styles.module.scss'
import { Link } from 'react-router-dom'
import Button from '../../../ui/button/Button'
import CrteateCourseModal from '../../../components/Modals/CreateCourseModal/CrteateCourseModal'

const CoursesPage = () => {
	const {
		allCourses,
		isOpenCreateCourseModal,
		form,
		change,
		handleUploadCourse,
		handleOpenChangeCourseModal,
	} = CoursesPageModule()

	return (
		<div className={styles.CoursePage}>
			{isOpenCreateCourseModal && (
				<CrteateCourseModal
					handleOpenChangeCourseModal={handleOpenChangeCourseModal}
					change={change}
					form={form}
					handleUploadCourse={handleUploadCourse}
				/>
			)}
			<div>
				<div className={styles.buttonBlock}>
					<Button
						title={'Создать курс'}
						classOfStyle={'create'}
						onClick={handleOpenChangeCourseModal}
					/>
				</div>
				{allCourses && (
					<div>
						{allCourses.map(course => (
							<Link
								to={`/courses/${course.id_course}`}
								key={course.id_course}
								className={styles.courseItem}
							>
								<div>
									<div className={styles.name}>{course.course_name}</div>
									<div className={styles.description}>
										{course.course_description}
									</div>
								</div>
							</Link>
						))}
					</div>
				)}
			</div>
		</div>
	)
}

export default CoursesPage
