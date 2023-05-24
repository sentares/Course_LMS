import React from 'react'
import Button from '../../../ui/button/Button'
import { MdOutlineClose } from 'react-icons/md'
import styles from './styles.module.scss'
import Input from '../../../ui/input/Input'

const StudentsOfFlowsModal = ({
	changeStudentsModal,
	arrOfFlowsStudents,
	formForActivateStudents,
	changeFormForActivateStudents,
	handleSaveActivatedStudents,
}) => {
	return (
		<div className={styles.StudentsOfFlowsModal}>
			<div className={styles.content}>
				<p className={styles.title}>Аткивация студентов потока</p>
				<div className={styles.close}>
					<Button
						classOfStyle={'closeButton'}
						title={<MdOutlineClose />}
						onClick={changeStudentsModal}
					/>
				</div>
				{arrOfFlowsStudents?.length ? (
					<>
						<div className={styles.choseAll}>
							<div>Выбрать всех</div>
							<div>
								<Input
									type='checkbox'
									classOfStyle={'checkBox'}
									onChange={event =>
										changeFormForActivateStudents(event, 'selectAll')
									}
									checked={
										arrOfFlowsStudents.length > 0 &&
										formForActivateStudents.length === arrOfFlowsStudents.length
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
											onChange={event =>
												changeFormForActivateStudents(event, student.id_student)
											}
											checked={formForActivateStudents.includes(
												student.id_student
											)}
										/>
									</div>
								</div>
							</div>
						))}
						<Button
							classOfStyle={'auth'}
							title={'Сохранить'}
							onClick={handleSaveActivatedStudents}
						/>
					</>
				) : (
					<div>Нет Студентов</div>
				)}
			</div>
		</div>
	)
}

export default StudentsOfFlowsModal
