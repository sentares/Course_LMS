import React from 'react'
import Button from '../../ui/button/Button'
import styles from './styles.module.scss'

const QuestionOfTopicBlock = ({
	isAuthor,
	specialTopic,
	topicsQuestions,
	isOpenTopicInfoBlock,
	handleChangeModal,
	handleClickQuestion,
}) => {
	return (
		<div
			className={`transform transition-opacity ease-out duration-300 ${
				isOpenTopicInfoBlock ? 'opacity-100' : 'opacity-0'
			}`}
		>
			<div className={styles.TopicInfoBlock}>
				<div className={styles.content}>
					<div className={styles.topicName}>
						Тема: {specialTopic.topic_name}
					</div>
					{isAuthor && (
						<Button
							classOfStyle={'auth'}
							title={'Добавить вопрос'}
							onClick={handleChangeModal}
						/>
					)}
					<div className={styles.topicsBlock}>
						<div className='w-full'>
							<div className={styles.topicsQuestionNaming}>Вопросы:</div>
							{topicsQuestions?.length ? (
								<div className={styles.questionsBlock}>
									{topicsQuestions.map((question, index) => (
										<div
											key={question.id_question}
											className={styles.questionItem}
											onClick={handleClickQuestion.bind(
												null,
												question.id_question
											)}
										>
											<span className='font-semibold pr-1'>{index + 1}.</span>{' '}
											{question.question}
										</div>
									))}
								</div>
							) : (
								<div className='flex justify-center mt-4 text-gray-400'>
									Пока нет вопросов
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default QuestionOfTopicBlock
