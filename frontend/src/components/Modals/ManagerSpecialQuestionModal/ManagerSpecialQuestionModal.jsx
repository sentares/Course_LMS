import React from 'react'
import styles from './styles.module.scss'
import { MdOutlineClose } from 'react-icons/md'
import Button from '../../../ui/button/Button'
import Input from '../../../ui/input/Input'
import ManagerModule from './module/ManagerModule'
import { AiOutlineCheckCircle } from 'react-icons/ai'

const ManagerSpecialQuestionModal = ({ handleChangeQuestionModal }) => {
	const {
		questionTitle,
		right,
		answers,
		handleChangeQuestion,
		handleChangeAnswers,
		changeCorrectAnswer,
		handleUpdateQuestion,
	} = ManagerModule()

	return (
		<div className={styles.SpecialQuestionModal}>
			{questionTitle !== null && answers && right ? (
				<div className={styles.content}>
					<div className={styles.title}>
						<Input
							type={'text'}
							placeholder={'Вопрос'}
							value={questionTitle}
							classOfStyle={'answer'}
							onChange={handleChangeQuestion}
						/>
					</div>
					<div className={styles.close}>
						<Button
							classOfStyle={'closeButton'}
							title={<MdOutlineClose />}
							onClick={handleChangeQuestionModal}
						/>
					</div>
					<div className={styles.questionBlock}>
						<div className={styles.questionsAnswers}>
							{answers.map(answer => (
								<div key={answer.id_answers} className={styles.answerItem}>
									<Input
										value={answer.answers}
										onChange={e => handleChangeAnswers(e, answer.id_answers)}
										placeholder={'Ответ'}
										classOfStyle={
											right.id_answers === answer.id_answers
												? 'rightAnswer'
												: 'answer'
										}
									/>
									<Button
										title={<AiOutlineCheckCircle />}
										type='button'
										onClick={changeCorrectAnswer.bind(null, answer.id_answers)}
										classOfStyle={
											right.id_answers === answer.id_answers
												? 'correct'
												: 'inCorrect'
										}
									/>
								</div>
							))}
						</div>
					</div>
					<Button
						classOfStyle={'auth'}
						title={'Сохранить изменения'}
						onClick={handleUpdateQuestion}
					/>
				</div>
			) : (
				<div>Loading</div>
			)}
		</div>
	)
}

export default ManagerSpecialQuestionModal
