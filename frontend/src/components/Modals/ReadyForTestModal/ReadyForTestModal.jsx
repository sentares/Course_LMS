import React from 'react'
import styles from './styles.module.scss'
import { MdOutlineClose } from 'react-icons/md'
import Button from '../../../ui/button/Button'

const ReadyForTestModal = ({ onAllow, handleClickStartTest }) => {
	return (
		<div className={styles.ReadyForTestModal}>
			<div className={styles.content}>
				<p className={styles.title}>Вы уверены, что хотите сдать тест?</p>
				<div className={styles.close}>
					<Button
						classOfStyle={'closeButton'}
						title={<MdOutlineClose />}
						onClick={handleClickStartTest}
					/>
				</div>
				<div className={styles.modalButtons}>
					<Button classOfStyle={'yes'} title={'Да'} onClick={onAllow} />
					<Button
						classOfStyle={'no'}
						title={'Отмена'}
						onClick={handleClickStartTest}
					/>
				</div>
			</div>
		</div>
	)
}

export default ReadyForTestModal
