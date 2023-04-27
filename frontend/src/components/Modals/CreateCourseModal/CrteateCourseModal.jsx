import React from 'react'
import { MdOutlineClose } from 'react-icons/md'
import styles from './styles.module.scss'
import Button from '../../../ui/button/Button'
import Input from '../../../ui/input/Input'

const CrteateCourseModal = ({
	handleOpenChangeCourseModal,
	change,
	form,
	handleUploadCourse,
}) => {
	return (
		<div className={styles.createCourseModal}>
			<div className={styles.content}>
				<p className={styles.title}>Создание курса</p>
				<div className={styles.close}>
					<Button
						classOfStyle={'closeButton'}
						title={<MdOutlineClose />}
						onClick={handleOpenChangeCourseModal}
					/>
				</div>
				<div className={styles.createForm}>
					<form>
						<Input
							classOfStyle={'auth'}
							type={'name'}
							name='nameOfCourse'
							placeholder='Название курса'
							onChange={change}
							value={form.nameOfCourse}
						/>
						<Input
							classOfStyle={'auth'}
							type={'name'}
							name='descriptionOfCourse'
							placeholder='Описание курса'
							onChange={change}
							value={form.descriptionOfCourse}
						/>
						<Button
							classOfStyle={'create'}
							title={'Создать'}
							onClick={handleUploadCourse}
						/>
					</form>
				</div>
			</div>
		</div>
	)
}

export default CrteateCourseModal
