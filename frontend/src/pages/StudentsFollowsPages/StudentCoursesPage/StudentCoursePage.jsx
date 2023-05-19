import React from 'react'
import styles from './styles.module.scss'
import StudentCoursesModule from './module/StudentCoursesModule'
import { Link } from 'react-router-dom'

const StudentCoursePage = () => {
	const { studentsCourses, studentsFlows } = StudentCoursesModule()
	return (
		<div className={styles.StudentCoursePage}>
			<div className={styles.myCourses}>
				<div>Мои курсы</div>
				{studentsCourses?.length && studentsFlows?.length ? (
					<div>
						{studentsFlows.map(flow => {
							const courseOfFlows = studentsCourses.filter(
								course => course.id_course === flow.id_course
							)
							return (
								<Link
									to={`/myCourses/${flow.id_flows}`}
									key={flow.id_flows}
									className={styles.courseItem}
								>
									<div className='w-full'>
										<div className='flex justify-between'>
											<div className={styles.name}>{flow.flows_name}</div>
											{courseOfFlows.map(course => (
												<div
													key={course.id_course}
													className={styles.courseName}
												>
													{course.course_name}
												</div>
											))}
										</div>
										<div className={styles.description}>
											{flow.active ? 'активный' : 'неактивный'}
										</div>
									</div>
								</Link>
							)
						})}
					</div>
				) : (
					<div>Пока нет записанных курсов</div>
				)}
			</div>
		</div>
	)
}

export default StudentCoursePage
