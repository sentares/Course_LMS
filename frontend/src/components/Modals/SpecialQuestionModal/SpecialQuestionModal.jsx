import React from 'react'
import styles from './styles.module.scss'
import Button from '../../../ui/button/Button'
import Input from '../../../ui/input/Input'
import { MdOutlineClose } from 'react-icons/md'

const SpecialQuestionModal = ({
	handleChangeQuestionModal,
	specialQuestion,
	questionsAnswers,
	rightAnswer,
	change,
}) => {
	return (
		<div className={styles.SpecialQuestionModal}>
			<div className={styles.content}>
				<p className={styles.title}>{specialQuestion.question}</p>
				<div className={styles.close}>
					<Button
						classOfStyle={'closeButton'}
						title={<MdOutlineClose />}
						onClick={handleChangeQuestionModal}
					/>
				</div>
				<div className={styles.questionBlock}>
					<div className={styles.questionsAnswers}>
						{questionsAnswers?.map(answer => (
							<div
								key={answer.id_answers}
								className={
									answer.id_answers === rightAnswer.id_answers
										? styles.answersRightItem
										: styles.answersItem
								}
							>
								{answer.answers}
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default SpecialQuestionModal
