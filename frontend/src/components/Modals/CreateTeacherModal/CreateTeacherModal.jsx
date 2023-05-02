import React from 'react'
import Button from '../../../ui/button/Button'
import Input from '../../../ui/input/Input'
import { MdOutlineClose } from 'react-icons/md'
import styles from './styles.module.scss'

const CreateTeacherModal = ({
	form,
	change,
	handleChangeModal,
	handleUploadTeacher,
}) => {
	return (
		<div className={styles.createTeacherModal}>
			<div className={styles.content}>
				<p className={styles.title}>Добавление преподавателя</p>
				<div className={styles.close}>
					<Button
						classOfStyle={'closeButton'}
						title={<MdOutlineClose />}
						onClick={handleChangeModal}
					/>
				</div>
				<div className={styles.createForm}>
					<form>
						<Input
							classOfStyle={'auth'}
							type={'text'}
							name='name'
							placeholder='Имя'
							onChange={change}
							value={form.name}
						/>
						<Input
							classOfStyle={'auth'}
							type={'text'}
							name='surname'
							placeholder='Фамилия'
							onChange={change}
							value={form.surname}
						/>
						<Input
							classOfStyle={'auth'}
							type={'text'}
							name='patronymic'
							placeholder='Отчество'
							onChange={change}
							value={form.patronymic}
						/>
						<Input
							classOfStyle={'auth'}
							type={'date'}
							name='birthday'
							placeholder='Дата рождения'
							onChange={change}
							value={form.birthday}
						/>
						<Input
							classOfStyle={'auth'}
							type={'number'}
							name='temp_inn'
							placeholder='ИНН'
							onChange={change}
							value={form.temp_inn}
						/>
						<Input
							classOfStyle={'auth'}
							type={'text'}
							name='email'
							placeholder='Email'
							onChange={change}
							value={form.email}
						/>
						<Input
							classOfStyle={'auth'}
							type={'password'}
							name='password'
							placeholder='Пароль'
							onChange={change}
							value={form.password}
						/>
						{/* <label htmlFor='role' className={styles.label}>
							Выберите роль:
						</label> */}
						<select
							name='role'
							id='role'
							value={form.role}
							onChange={change}
							className={styles.choseRole}
						>
							<option value='3' className={styles.option}>
								Менеджер
							</option>
							<option value='2' className={styles.option}>
								Преподаватель
							</option>
						</select>
						<Button
							classOfStyle={'create'}
							title={'Добавить'}
							onClick={handleUploadTeacher}
						/>
					</form>
				</div>
			</div>
		</div>
	)
}

export default CreateTeacherModal
