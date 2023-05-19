import React from 'react'
import styles from './styles.module.scss'
import ManagerCourseModule from './module/ManagerCourseModule'
import { Link } from 'react-router-dom'

const ManagerCoursePage = () => {
	const { allCourses } = ManagerCourseModule()
	return (
		<div className={styles.CoursePage}>
			<div>
				<div>Все курсы:</div>
				{allCourses && (
					<div>
						{allCourses.map(course => (
							<Link
								to={`/managerCourses/${course.id_course}`}
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

export default ManagerCoursePage
