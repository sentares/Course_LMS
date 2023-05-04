import React from 'react'
import styles from './styles.module.scss'
import { MdOutlineClose } from 'react-icons/md'
import Button from '../../../ui/button/Button'
import Input from '../../../ui/input/Input'

const CreateTestModal = ({
	handleChangeModal,
	handleCreateTest,
	change,
	form,
	allCourses,
}) => {
	return (
		<div className={styles.createTestModal}>
			<div className={styles.content}>
				<p className={styles.title}>Создание теста</p>
				<div className={styles.close}>
					<Button
						classOfStyle={'closeButton'}
						title={<MdOutlineClose />}
						onClick={handleChangeModal}
					/>
				</div>
				<div className={styles.createForm}>
					<form>
						<label>
							<p className={styles.titleLabel}>Курс</p>
							<select
								className={styles.choseTeacher}
								name='id_course'
								value={form.id_course}
								onChange={change}
							>
								<option value=''>Выберите курс</option>
								{allCourses.map(course => (
									<option key={course.id_course} value={course.id_course}>
										{course.course_name}
									</option>
								))}
							</select>
						</label>
						<label htmlFor=''>
							<p className={styles.titleLabel}>Название</p>
							<Input
								classOfStyle={'auth'}
								type={'text'}
								name='test_name'
								placeholder='Название теста'
								onChange={change}
								value={form.test_name}
							/>
						</label>
						<label htmlFor=''>
							<p className={styles.titleLabel}>Описание</p>
							<Input
								classOfStyle={'auth'}
								type={'text'}
								name='test_description'
								placeholder='Описание теста'
								onChange={change}
								value={form.test_description}
							/>
						</label>
						<label htmlFor=''>
							<p className={styles.titleLabel}>Минимальное кол-во вопросов</p>
							<Input
								classOfStyle={'auth'}
								type={'number'}
								name='min_question_count'
								placeholder='Минимальное кол-во вопросов'
								onChange={change}
								value={form.min_question_count}
							/>
						</label>
						<Button
							classOfStyle={'create'}
							title={'Создать'}
							onClick={handleCreateTest}
						/>
					</form>
				</div>
			</div>
		</div>
	)
}

export default CreateTestModal
