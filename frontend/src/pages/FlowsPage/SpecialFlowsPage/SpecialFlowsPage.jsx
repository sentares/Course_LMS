import React from 'react'
import SpecialFlowsPageModule from './module/SpecialFlowsPageModule'
import Input from '../../../ui/input/Input'
import Button from '../../../ui/button/Button'
import { TiArrowBack } from 'react-icons/ti'
import styles from './styles.module.scss'
import AddTestToFlowModal from '../../../components/Modals/AddTestToFlowModal/AddTestToFlowModal'
import ConnectedTestItem from '../../../components/Items/ConnectedTestItem/ConnectedTestItem'
import StudentsOfFlowsModal from '../../../components/Modals/StudentsOfFlowsModal/StudentsOfFlowsModal'

const SpecialFlowsPage = () => {
	const {
		form,
		specialFlows,
		specialTeacher,
		allTeachers,
		isPressChange,
		role,
		isAdded,
		isOpenAddTestModal,
		regulateTestsOfCourse,
		formForTest,
		arrOfFlowsStudents,
		connectedWithFlowsTests,
		isOpenStudentsModal,
		formForActivateStudents,
		changeFormForTest,
		changeFormForActivateStudents,
		handleSaveActivatedStudents,
		changeStudentsModal,
		change,
		handlePressChangeDate,
		handleClickRegisterCourse,
		changeOpenAddTestModal,
		handleSaveConnectTestWithFlow,
	} = SpecialFlowsPageModule()

	return (
		<div className={styles.SpecialFlows}>
			{specialFlows ? (
				<div className={styles.specialFlowsWrapper}>
					<div className={styles.specialFlowsItem}>
						<div className={styles.specialFlowsLabel}>Название потока:</div>
						<div className={styles.specialFlowsValue}>
							{role === 1 ? (
								<Input
									name='flows_name'
									placeholder={specialFlows.flows_name}
									value={form.flows_name}
									classOfStyle={'edit'}
									onChange={change}
									type='text'
								/>
							) : (
								<p>{specialFlows.flows_name}</p>
							)}
						</div>
					</div>
					<div className={styles.specialFlowsItem}>
						<div className={styles.specialFlowsLabel}>Дата регистрации:</div>
						<div className={styles.specialFlowsValue}>
							{!isPressChange ? (
								<>
									{role === 1 ? (
										<Button
											title={new Date(
												specialFlows.date_register
											).toLocaleString('ru-RU', {
												year: 'numeric',
												month: 'long',
												day: 'numeric',
											})}
											onClick={handlePressChangeDate}
											classOfStyle={'date'}
										/>
									) : (
										<p>
											{new Date(specialFlows.date_register).toLocaleString(
												'ru-RU',
												{
													year: 'numeric',
													month: 'long',
													day: 'numeric',
												}
											)}
										</p>
									)}
								</>
							) : (
								<>
									<Button
										title={<TiArrowBack />}
										onClick={handlePressChangeDate}
										classOfStyle={'back'}
									/>
									<Input
										name='date_register'
										value={form.date_register}
										classOfStyle={'editDate'}
										onChange={change}
										type='date'
									/>
								</>
							)}
						</div>
					</div>
					<div className={styles.specialFlowsItem}>
						<div className={styles.specialFlowsLabel}>Дата старта:</div>
						<div className={styles.specialFlowsValue}>
							{!isPressChange ? (
								<>
									{role === 1 ? (
										<Button
											title={new Date(specialFlows.date_start).toLocaleString(
												'ru-RU',
												{
													year: 'numeric',
													month: 'long',
													day: 'numeric',
												}
											)}
											onClick={handlePressChangeDate}
											classOfStyle={'date'}
										/>
									) : (
										<p>
											{new Date(specialFlows.date_start).toLocaleString(
												'ru-RU',
												{
													year: 'numeric',
													month: 'long',
													day: 'numeric',
												}
											)}
										</p>
									)}
								</>
							) : (
								<>
									<Button
										title={<TiArrowBack />}
										onClick={handlePressChangeDate}
										classOfStyle={'back'}
									/>
									<Input
										name='date_start'
										value={form.date_start}
										classOfStyle={'editDate'}
										onChange={change}
										type='date'
									/>
								</>
							)}
						</div>
					</div>
					<div className={styles.specialFlowsItem}>
						<div className={styles.specialFlowsLabel}>Дата окончания:</div>
						<div className={styles.specialFlowsValue}>
							{!isPressChange ? (
								<>
									{role === 1 ? (
										<Button
											title={new Date(specialFlows.date_end).toLocaleString(
												'ru-RU',
												{
													year: 'numeric',
													month: 'long',
													day: 'numeric',
												}
											)}
											onClick={handlePressChangeDate}
											classOfStyle={'date'}
										/>
									) : (
										<p>
											{new Date(specialFlows.date_end).toLocaleString('ru-RU', {
												year: 'numeric',
												month: 'long',
												day: 'numeric',
											})}
										</p>
									)}
								</>
							) : (
								<>
									<Button
										title={<TiArrowBack />}
										onClick={handlePressChangeDate}
										classOfStyle={'back'}
									/>
									<Input
										name='date_end'
										value={form.date_end}
										classOfStyle={'editDate'}
										onChange={change}
										type='date'
									/>
								</>
							)}
						</div>
					</div>
					<div className={styles.specialFlowsItem}>
						<div className={styles.specialFlowsLabel}>Преподаватель:</div>
						<div className={styles.specialFlowsValue}>
							{role === 1 ? (
								<select
									className={styles.choseTeacher}
									name='id_teacher'
									value={form.id_teacher}
									onChange={change}
								>
									<option value=''>Выберите учителя</option>
									{allTeachers?.map(teacher => (
										<option key={teacher.id_teacher} value={teacher.id_teacher}>
											{teacher.surname} {teacher.name} {teacher.patronymic}
										</option>
									))}
								</select>
							) : (
								<p>
									{specialTeacher?.name} {specialTeacher?.patronymic}
								</p>
							)}
						</div>
					</div>
					<div className={styles.specialFlowsItem}>
						<div className={styles.specialFlowsLabel}>Количество мест:</div>
						<div className={styles.specialFlowsValue}>
							{role === 1 ? (
								<Input
									name='count_of_seats'
									placeholder={specialFlows.count_of_seats}
									value={form.count_of_seats}
									classOfStyle={'edit'}
									onChange={change}
									type='number'
								/>
							) : (
								<p>{specialFlows.count_of_seats}</p>
							)}
						</div>
					</div>
					<div className={styles.specialFlowsItem}>
						<div className={styles.specialFlowsLabel}>Стоимость:</div>
						<div className={styles.specialFlowsValue}>
							{role === 1 ? (
								<Input
									name='price'
									placeholder={specialFlows.price}
									value={form.price}
									classOfStyle={'edit'}
									onChange={change}
									type='number'
								/>
							) : (
								<p>{specialFlows.price}</p>
							)}
						</div>
					</div>
					<div className={styles.specialFlowsItem}>
						<div className={styles.specialFlowsLabel}>Автивный:</div>
						<div>
							{role === 1 ? (
								<Button
									title={form.activ ? 'Активный' : 'Неактивный'}
									classOfStyle={form.activ ? 'activate' : 'deactivate'}
								/>
							) : (
								<p className={form.activ ? 'activate' : 'deactivate'}>
									{form.activ ? 'Активный' : 'Неактивный'}
								</p>
							)}
						</div>
					</div>

					{role === 1 && (
						<div className={styles.buttonBlock}>
							<Button title={'Сохранить изменения'} classOfStyle={'auth'} />
						</div>
					)}
					{role === 2 || (
						<div className={styles.buttonBlock}>
							<Button title={'Студенты потока'} classOfStyle={'auth'} />
						</div>
					)}
					{role === 4 && !isAdded && (
						<div className={styles.buttonBlock}>
							<Button
								title={'Записаться'}
								classOfStyle={'auth'}
								onClick={handleClickRegisterCourse}
							/>
						</div>
					)}
					{role === 4 && isAdded && (
						<div className={styles.added}>Вы записаны на курс</div>
					)}
					{role == null && (
						<div className={styles.buttonBlock}>
							<Button
								title={'Записаться'}
								classOfStyle={'auth'}
								onClick={handleClickRegisterCourse}
							/>
						</div>
					)}
					{role === 2 && (
						<>
							{isOpenStudentsModal && (
								<StudentsOfFlowsModal
									changeStudentsModal={changeStudentsModal}
									arrOfFlowsStudents={arrOfFlowsStudents}
									formForActivateStudents={formForActivateStudents}
									changeFormForActivateStudents={changeFormForActivateStudents}
									handleSaveActivatedStudents={handleSaveActivatedStudents}
								/>
							)}
							{isOpenAddTestModal && (
								<AddTestToFlowModal
									formForTest={formForTest}
									changeFormForTest={changeFormForTest}
									changeOpenAddTestModal={changeOpenAddTestModal}
									handleSaveConnectTestWithFlow={handleSaveConnectTestWithFlow}
									regulateTestsOfCourse={regulateTestsOfCourse}
									arrOfFlowsStudents={arrOfFlowsStudents}
								/>
							)}
							<div className={styles.testForFlow}>
								<Button
									title={'Студенты'}
									classOfStyle={'auth'}
									onClick={changeStudentsModal}
								/>
							</div>
							<div className={styles.testForFlow}>
								<div className='w-full'>
									<div className={styles.testsNaming}>Тесты потока</div>

									<Button
										title={'Привязать тест'}
										classOfStyle={'auth'}
										onClick={changeOpenAddTestModal}
									/>
									<div className='mb-4'>
										{connectedWithFlowsTests?.length ? (
											<>
												{connectedWithFlowsTests.map(test => (
													<ConnectedTestItem key={test.id_test} test={test} />
												))}
											</>
										) : (
											<div>Пока нет привязанных тестов</div>
										)}
									</div>
								</div>
							</div>
						</>
					)}
				</div>
			) : (
				<div>Loading</div>
			)}
		</div>
	)
}

export default SpecialFlowsPage
