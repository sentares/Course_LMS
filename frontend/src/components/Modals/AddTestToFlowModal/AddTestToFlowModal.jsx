import React from 'react'
import styles from './styles.module.scss'
import { MdOutlineClose } from 'react-icons/md'
import Button from '../../../ui/button/Button'
import Input from '../../../ui/input/Input'

const AddTestToFlowModal = ({
	changeOpenAddTestModal,
	arrOfFlowsStudents,
	formForTest,
	changeFormForTest,
	regulateTestsOfCourse,
	handleSaveConnectTestWithFlow,
}) => {
	return (
		<div className={styles.AddTestToFlowModal}>
			<div className={styles.content}>
				<p className={styles.title}>Привязка теста</p>
				<div className={styles.close}>
					<Button
						classOfStyle={'closeButton'}
						title={<MdOutlineClose />}
						onClick={changeOpenAddTestModal}
					/>
				</div>
				<div className={styles.addTestForm}>
					<form>
						<label>
							<p className={styles.titleLabel}>Тест</p>
							<select
								className={styles.choseTeacher}
								name='id_test'
								value={formForTest.id_test}
								onChange={changeFormForTest}
							>
								<option value=''>Выберите тест</option>
								{regulateTestsOfCourse.map(test => (
									<option key={test.id_test} value={test.id_test}>
										{test.test_name}
									</option>
								))}
							</select>
						</label>
						<label>
							<p className={styles.titleLabel}>Дата старта</p>
							<Input
								classOfStyle={'auth'}
								type='datetime-local'
								name='date_begin_test'
								placeholder='Дата старта'
								onChange={changeFormForTest}
								value={formForTest.date_begin_test}
							/>
						</label>
						<label>
							<p className={styles.titleLabel}>Дата окончания</p>
							<Input
								classOfStyle={'auth'}
								type='datetime-local'
								name='date_end_test'
								placeholder='Дата окончания'
								onChange={changeFormForTest}
								value={formForTest.date_end_test}
							/>
						</label>
						<label>
							<p className={styles.titleLabel}>Студенты потока</p>
							{arrOfFlowsStudents?.length ? (
								<>
									<div className={styles.choseAll}>
										<div>Выбрать всех</div>
										<div>
											<Input
												type='checkbox'
												classOfStyle={'checkBox'}
												onChange={changeFormForTest}
												name={'choseStudentsIds'}
												checked={
													arrOfFlowsStudents.length > 0 &&
													arrOfFlowsStudents.length ===
														formForTest.choseStudentsIds.length
												}
											/>
										</div>
									</div>
									{arrOfFlowsStudents.map(student => (
										<div key={student.id_student}>
											<div className={styles.studentItem}>
												<div>
													{student.surname} {student.name} {student.patronymic}
												</div>
												<div>
													<Input
														type='checkbox'
														classOfStyle={'checkBox'}
														onChange={changeFormForTest}
														name={student.id_student}
														checked={formForTest.choseStudentsIds.includes(
															student.id_student
														)}
													/>
												</div>
											</div>
										</div>
									))}
								</>
							) : (
								<div>Нет Студентов</div>
							)}
						</label>
						<label>
							<Button
								title={'Привязать тест'}
								classOfStyle={'auth'}
								onClick={handleSaveConnectTestWithFlow}
							/>
						</label>
					</form>
				</div>
			</div>
		</div>
	)
}

export default AddTestToFlowModal
