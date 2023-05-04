import React from 'react'
import SpecialTestModule from './module/SpecialTestModule'
import styles from './styles.module.scss'
import Button from '../../../ui/button/Button'
import CreateQuestionModal from '../../../components/Modals/CreateQuestionModal/CreateQuestionModal'
import CreateTopicModal from '../../../components/Modals/CreateTopicModal/CreateTopicModal'

const SpecialTestPage = () => {
	const {
		specialTest,
		specialCourse,
		isOpenModal,
		isOpenTopicModal,
		options,
		question,
		isAllFieldsFilled,
		testsAllQuestions,
		specialTeahcer,
		isAuthor,
		topicName,
		testsTopics,
		isOpenTopicInfoBlock,
		changeTopicName,
		handleChangeModal,
		handleChangeTopicModal,
		changeQuestion,
		handleOptionTextChange,
		handleCorrectOptionChange,
		handleUploadQuestion,
		handleUploadTopic,
		handleChangeTopicInfoBlock,
	} = SpecialTestModule()

	return (
		<div className={styles.SpecialTestPage}>
			{specialTest && specialCourse && specialTeahcer && testsTopics && (
				<>
					<div className=' pr-10'>
						{isOpenModal && (
							<CreateQuestionModal
								isAllFieldsFilled={isAllFieldsFilled}
								options={options}
								question={question}
								handleChangeModal={handleChangeModal}
								changeQuestion={changeQuestion}
								handleOptionTextChange={handleOptionTextChange}
								handleCorrectOptionChange={handleCorrectOptionChange}
								handleUploadQuestion={handleUploadQuestion}
							/>
						)}
						{isOpenTopicModal && (
							<CreateTopicModal
								handleChangeTopicModal={handleChangeTopicModal}
								change={changeTopicName}
								form={topicName}
								handleCreateTopic={handleUploadTopic}
							/>
						)}
						<div className={styles.testInfoBlock}>
							<div className={styles.naming}>
								<div className={styles.nameOfCat}>
									Курс: <strong>{specialCourse.course_name}</strong>
								</div>
								<div className={styles.nameOfCat}>
									Название теста: <strong>{specialTest.test_name}</strong>
								</div>
								<div className={styles.nameOfCat}>
									Описание теста:
									<div className={styles.testDescription}>
										<strong>{specialTest.test_description}</strong>
									</div>
								</div>
								<div className={styles.nameOfCat}>
									Автор:
									<div className={styles.testDescription}>
										<strong>
											{' '}
											{specialTeahcer.name} {specialTeahcer.patronymic}
										</strong>
									</div>
								</div>
								<div className={styles.nameOfCat}>
									Минимальное кол-во вопросов:
									<div className={styles.testDescription}>
										<strong> {specialTest.min_question_count}</strong>
									</div>
								</div>
							</div>
						</div>
						<div className={styles.questionBlock}>
							{isAuthor && (
								<Button
									classOfStyle={'auth'}
									title={'Добавить тему'}
									onClick={handleChangeTopicModal}
								/>
							)}
							<div>
								<div className={styles.topics}>Темы:</div>
								{testsTopics?.length ? (
									<>
										{testsTopics.map((topic, index) => (
											<button
												key={topic.id_topic}
												className={styles.questionItem}
												onClick={handleChangeTopicInfoBlock.bind(
													null,
													topic.id_topic
												)}
											>
												<span className='font-semibold pr-1'>{index + 1}.</span>
												<span>{topic.topic_name}</span>
											</button>
										))}
									</>
								) : (
									<div>Пока ничего нет</div>
								)}
							</div>
						</div>
					</div>
					<div
						className={`transform transition-opacity ease-out duration-300 ${
							isOpenTopicInfoBlock ? 'opacity-100' : 'opacity-0'
						}`}
					>
						<div className={styles.TopicInfoBlock}>
							<div className={styles.content}>
								<div className={styles.topicName}>Тема:</div>
								{isAuthor && (
									<Button
										classOfStyle={'auth'}
										title={'Добавить вопрос'}
										onClick={handleChangeModal}
									/>
								)}
								<div className={styles.topics}>Вопросы:</div>
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	)
}

export default SpecialTestPage

{
	/* {testsAllQuestions &&
								testsAllQuestions.map((question, index) => (
									<div
										key={question.id_question}
										className={styles.questionItem}
									>
										<span className='font-semibold pr-1'>{index + 1}.</span>{' '}
										{question.question}
									</div>
								))} */
}
