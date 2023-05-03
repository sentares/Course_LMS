import React from 'react'
import styles from './styles.module.scss'
import Button from '../../../ui/button/Button'
import { MdOutlineClose } from 'react-icons/md'
import Input from '../../../ui/input/Input'
import CreateAnswerItem from '../../Items/CreateAnswerItem/CreateAnswerItem'

const CreateQuestionModal = ({
	isAllFieldsFilled,
	question,
	options,
	changeQuestion,
	handleChangeModal,
	handleUploadQuestion,
	handleOptionTextChange,
	handleCorrectOptionChange,
}) => {
	return (
		<div className={styles.CreateQuestionModal}>
			<div className={styles.content}>
				<p className={styles.title}>Добавление вопроса</p>
				<div className={styles.close}>
					<Button
						classOfStyle={'closeButton'}
						title={<MdOutlineClose />}
						onClick={handleChangeModal}
					/>
				</div>
				<div className={styles.createForm}>
					<form className='w-full'>
						<label>
							Вопрос:
							<Input
								type='text'
								value={question}
								onChange={changeQuestion}
								placeholder={'Вопрос'}
								name={question}
								classOfStyle={'auth'}
							/>
						</label>
						{options.map(option => (
							<CreateAnswerItem
								key={option.number}
								option={option}
								onTextChange={handleOptionTextChange}
								onCorrectChange={handleCorrectOptionChange}
							/>
						))}
						<Button
							onClick={handleUploadQuestion}
							title={'Создать вопрос'}
							classOfStyle={isAllFieldsFilled ? 'auth' : 'notReady'}
							disabled={isAllFieldsFilled}
						/>
					</form>
				</div>
			</div>
		</div>
	)
}

export default CreateQuestionModal
