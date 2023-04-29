import React from 'react'
import styles from './styles.module.scss'
import { MdOutlineClose } from 'react-icons/md'
import Button from '../../../ui/button/Button'
import Input from '../../../ui/input/Input'

const CreateCourseFlowsModal = ({
	handleCreateFlow,
	handleChangeModal,
	form,
	change,
	allTeachers,
}) => {
	return (
		<div className={styles.createCourseModal}>
			<div className={styles.content}>
				{allTeachers && form ? (
					<>
						<p className={styles.title}>Создание потока</p>
						<div className={styles.close}>
							<Button
								classOfStyle={'closeButton'}
								title={<MdOutlineClose />}
								onClick={handleChangeModal}
							/>
						</div>
						<div className={styles.createForm}>
							<form>
								<label className={styles.labels}>
									<p className={styles.titleLabel}>Название</p>
									<Input
										classOfStyle={'auth'}
										type={'text'}
										name='flows_name'
										placeholder='Название потока'
										onChange={change}
										value={form.flows_name}
									/>
								</label>
								<label>
									<p className={styles.titleLabel}>Дата регистрации</p>
									<Input
										classOfStyle={'auth'}
										type={'date'}
										name='date_register'
										placeholder='Дата регистрации'
										onChange={change}
										value={form.date_register}
									/>
								</label>
								<label>
									<p className={styles.titleLabel}>Дата старта</p>
									<Input
										classOfStyle={'auth'}
										type={'date'}
										name='date_start'
										placeholder='Дата старта'
										onChange={change}
										value={form.date_start}
									/>
								</label>
								<label>
									<p className={styles.titleLabel}>Дата окончания</p>
									<Input
										classOfStyle={'auth'}
										type={'date'}
										name='date_end'
										placeholder='Дата окончания'
										onChange={change}
										value={form.date_end}
									/>
								</label>
								<label>
									<p className={styles.titleLabel}>Преподаватель</p>
									<select
										className={styles.choseTeacher}
										name='id_teacher'
										value={form.id_teacher}
										onChange={change}
									>
										<option value=''>Выберите учителя</option>
										{allTeachers.map(teacher => (
											<option
												key={teacher.id_teacher}
												value={teacher.id_teacher}
											>
												{teacher.surname} {teacher.name} {teacher.patronymic}
											</option>
										))}
									</select>
								</label>
								<label>
									<p className={styles.titleLabel}>Места</p>
									<Input
										classOfStyle={'auth'}
										type={'number'}
										name='count_of_seats'
										placeholder='Количество мест'
										onChange={change}
										value={form.count_of_seats}
									/>
								</label>
								<label>
									<p className={styles.titleLabel}>Стоимость</p>
									<Input
										classOfStyle={'auth'}
										type={'number'}
										name='price'
										placeholder='Стоимость'
										onChange={change}
										value={form.price}
									/>
								</label>
								<Button
									classOfStyle={'create'}
									title={'Создать'}
									onClick={handleCreateFlow}
								/>
							</form>
						</div>
					</>
				) : (
					<div>Loading</div>
				)}
			</div>
		</div>
	)
}

export default CreateCourseFlowsModal
