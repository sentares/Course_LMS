import React from 'react'
import styles from './styles.module.scss'
import { Link } from 'react-router-dom'
import TeacherFlowsModule from './module/TeacherFlowsModule'

const TeacherFlowsPage = () => {
	const { id_teacher, teachersFlows, specialCourse } = TeacherFlowsModule()
	return (
		<div className={styles.TeacherFlowsPage}>
			{teachersFlows ? (
				<div>
					{teachersFlows.map(courseFlow => (
						<Link
							to={`/teacher/${id_teacher}/flows/${courseFlow.id_flows}`}
							key={courseFlow.id_flows}
							className={styles.courseItem}
						>
							<div className={styles.itemInformation}>
								<div className={styles.nameBlock}>
									<div>{courseFlow.flows_name}</div>
									<div
										className={
											courseFlow.activ
												? styles.isActiveBlock
												: styles.notIsActiveBlock
										}
									>
										{courseFlow.activ ? 'Активен' : 'Не активен'}
									</div>
								</div>
								<div className={styles.description}>
									мест: {courseFlow.count_of_seats}
								</div>
							</div>
						</Link>
					))}
				</div>
			) : (
				<div>Loading</div>
			)}
		</div>
	)
}

export default TeacherFlowsPage
