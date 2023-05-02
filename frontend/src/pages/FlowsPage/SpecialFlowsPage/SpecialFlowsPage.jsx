import React from 'react'
import SpecialFlowsPageModule from './module/SpecialFlowsPageModule'
import Input from '../../../ui/input/Input'
import Button from '../../../ui/button/Button'
import { TiArrowBack } from 'react-icons/ti'
import styles from './styles.module.scss'

const SpecialFlowsPage = () => {
	const {
		form,
		specialFlows,
		specialTeahcer,
		allTeachers,
		isPressChange,
		isAdmin,
		change,
		handlePressChangeDate,
	} = SpecialFlowsPageModule()

	return (
		<div className={styles.SpecialFlows}>
			{specialFlows && specialTeahcer ? (
				<div className={styles.specialFlowsWrapper}>
					<div className={styles.specialFlowsItem}>
						<div className={styles.specialFlowsLabel}>Название потока:</div>
						<div className={styles.specialFlowsValue}>
							{isAdmin ? (
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
									{isAdmin ? (
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
									{isAdmin ? (
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
									{isAdmin ? (
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
							{isAdmin ? (
								<select
									className={styles.choseTeacher}
									name='id_teacher'
									value={form.id_teacher}
									onChange={change}
								>
									<option value=''>Выберите учителя</option>
									{allTeachers.map(teacher => (
										<option key={teacher.id_teacher} value={teacher.id_teacher}>
											{teacher.surname} {teacher.name} {teacher.patronymic}
										</option>
									))}
								</select>
							) : (
								<p>Вы:</p>
							)}
						</div>
					</div>
					<div className={styles.specialFlowsItem}>
						<div className={styles.specialFlowsLabel}>Количество мест:</div>
						<div className={styles.specialFlowsValue}>
							{isAdmin ? (
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
							{isAdmin ? (
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
							{isAdmin ? (
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
					{isAdmin ? (
						<div className={styles.buttonBlock}>
							<Button title={'Сохранить изменения'} classOfStyle={'auth'} />
						</div>
					) : (
						<div className={styles.buttonBlock}>
							<Button title={'Студенты потока'} classOfStyle={'auth'} />
						</div>
					)}
				</div>
			) : (
				<div>Loading</div>
			)}
		</div>
	)
}

export default SpecialFlowsPage
