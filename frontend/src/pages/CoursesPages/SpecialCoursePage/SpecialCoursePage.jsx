import React from 'react'
import styles from './styles.module.scss'
import SpecialCourseModule from './module/SpecialCourseModule'
import Button from '../../../ui/button/Button'
import CreateCourseFlowsModal from '../../../components/Modals/CreateCourseFlowModal/CreateCourseFlowsModal'
import { Link } from 'react-router-dom'

const SpecialCoursePage = () => {
	const {
		isOpenModal,
		specialCourse,
		form,
		allFlowsOfCourse,
		allTeachers,
		change,
		handleChangeModal,
		handleCreateFlow,
	} = SpecialCourseModule()

	return (
		<>
			{specialCourse ? (
				<div className={styles.SpecialCoursePage}>
					{isOpenModal && (
						<CreateCourseFlowsModal
							handleChangeModal={handleChangeModal}
							form={form}
							change={change}
							handleCreateFlow={handleCreateFlow}
							allTeachers={allTeachers}
						/>
					)}
					<div>
						<div className={styles.infoBlock}>
							<div>
								<div className={styles.courseName}>
									Название курса: <strong>{specialCourse.course_name}</strong>
								</div>
								<div className={styles.courseDescription}>
									Описание: {specialCourse.course_description}
								</div>
							</div>
						</div>
						<div className={styles.flowsBlock}>
							<div>
								<div className={styles.shapka}>Потоки курсов:</div>
								<div>
									<Button
										title={'Создать поток'}
										onClick={handleChangeModal}
										classOfStyle={'create'}
									/>
								</div>
								{allFlowsOfCourse ? (
									<div>
										{allFlowsOfCourse.map(courseFlow => (
											<Link
												to={`/coursesFlows/${courseFlow.id_flows}`}
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
									<div>Пока нет потоков</div>
								)}
							</div>
						</div>
					</div>
				</div>
			) : (
				<div>Loading</div>
			)}
		</>
	)
}

export default SpecialCoursePage
