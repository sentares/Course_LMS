import React from 'react'
import styles from './style.module.scss'
import { MdOutlineClose } from 'react-icons/md'
import Button from '../../../ui/button/Button'
import Input from '../../../ui/input/Input'

const CreateTopicModal = ({
	handleChangeTopicModal,
	form,
	change,
	handleCreateTopic,
}) => {
	return (
		<div className={styles.CreateTopicModal}>
			<div className={styles.content}>
				<p className={styles.title}>Создание темы</p>
				<div className={styles.close}>
					<Button
						classOfStyle={'closeButton'}
						title={<MdOutlineClose />}
						onClick={handleChangeTopicModal}
					/>
				</div>
				<div className={styles.createForm}>
					<form>
						<label htmlFor=''>
							<p className={styles.titleLabel}>Название темы</p>
							<Input
								classOfStyle={'auth'}
								type={'text'}
								name=''
								placeholder='Название темы'
								onChange={change}
								value={form}
							/>
						</label>
						<Button
							classOfStyle={'create'}
							title={'Создать'}
							onClick={handleCreateTopic}
						/>
					</form>
				</div>
			</div>
		</div>
	)
}

export default CreateTopicModal
