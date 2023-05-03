import React from 'react'
import { AiOutlineCheckCircle } from 'react-icons/ai'
import styles from './styles.module.scss'
import Input from '../../../ui/input/Input'
import Button from '../../../ui/button/Button'

const CreateAnswerItem = ({ option, onTextChange, onCorrectChange }) => {
	const handleTextChange = event => {
		onTextChange(option.number, event.target.value)
	}

	const handleCorrectChange = event => {
		event.preventDefault()
		onCorrectChange(option.number)
	}

	return (
		<div className={styles.AnswerItem}>
			<label className={styles.answerBlock}>
				<Input
					classOfStyle={'answer'}
					type='text'
					value={option.text}
					onChange={handleTextChange}
					placeholder={`Ответ ${option.number}`}
				/>
				<Button
					classOfStyle={option.isCorrect ? 'correct' : 'inCorrect'}
					type='button'
					className={styles.checkpoint}
					onClick={handleCorrectChange}
					title={<AiOutlineCheckCircle />}
				/>
			</label>
		</div>
	)
}

export default CreateAnswerItem
