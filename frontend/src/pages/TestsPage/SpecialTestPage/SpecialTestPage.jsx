import React from 'react'
import SpecialTestModule from './module/SpecialTestModule'
import styles from './styles.module.scss'
import Button from '../../../ui/button/Button'
import CreateQuestionModal from '../../../components/Modals/CreateQuestionModal/CreateQuestionModal'
import CreateTopicModal from '../../../components/Modals/CreateTopicModal/CreateTopicModal'
import SpecialQuestionModal from '../../../components/Modals/SpecialQuestionModal/SpecialQuestionModal'
import ManagerSpecialQuestionModal from '../../../components/Modals/ManagerSpecialQuestionModal/ManagerSpecialQuestionModal'
import TestsTopicItem from '../../../components/Items/TestsTopicItem/TestsTopicItem'
import SpecialTestInfo from '../../../components/ShortInfo/SpecialTestInfo/SpecialTestInfo'
import QuestionOfTopicBlock from '../../../components/QuestionOfTopicBlock/QuestionOfTopicBlock'
import Input from '../../../ui/input/Input'

const SpecialTestPage = () => {
	const {
		specialTest,
		specialCourse,
		isOpenModal,
		isOpenTopicModal,
		isOpenQuestionModal,
		options,
		question,
		isAllFieldsFilled,
		specialTeacher,
		isAuthor,
		topicName,
		testsTopics,
		isOpenTopicInfoBlock,
		specialTopic,
		topicsQuestions,
		specialQuestion,
		questionsAnswers,
		rightAnswer,
		idOfClickedTopic,
		role,
		isSertificate,
		timeForTest,
		isGoodRule,
		passingScore,
		changeTopicName,
		handleClickQuestion,
		handleChangeModal,
		handleChangeTopicModal,
		changeQuestion,
		handleOptionTextChange,
		handleCorrectOptionChange,
		handleUploadQuestion,
		handleUploadTopic,
		handleChangeTopicInfoBlock,
		handleChangeQuestionModal,
		changeTimeForTest,
		changePassingScore,
		handleSaveRegulate,
		checkIsGoodRule,
		changeWithSertificate,
	} = SpecialTestModule()

	console.log(specialTest?.regulate)

	return (
		<div className={styles.SpecialTestPage}>
			{specialTest && specialCourse && specialTeacher && testsTopics ? (
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
						{isOpenQuestionModal &&
							specialQuestion &&
							rightAnswer &&
							!isAuthor && (
								<SpecialQuestionModal
									handleChangeQuestionModal={handleChangeQuestionModal}
									specialQuestion={specialQuestion}
									questionsAnswers={questionsAnswers}
									rightAnswer={rightAnswer}
								/>
							)}
						{isOpenQuestionModal && isAuthor && (
							<ManagerSpecialQuestionModal
								handleChangeQuestionModal={handleChangeQuestionModal}
								specialTest={specialTest}
							/>
						)}
						<SpecialTestInfo
							specialCourse={specialCourse}
							specialTeacher={specialTeacher}
							specialTest={specialTest}
						/>
						<div className={styles.questionBlock}>
							{isAuthor && role === 3 && !specialTest.regulate && (
								<Button
									classOfStyle={'auth'}
									title={'Добавить тему'}
									onClick={handleChangeTopicModal}
								/>
							)}
							{role === 2 && (
								<>
									<div className='mb-2'>
										{specialTest.regulate ? (
											<div className={styles.ruleExist}>Условие создано</div>
										) : (
											<Button
												classOfStyle={isGoodRule ? 'auth' : 'notReady'}
												title={'Создать условие'}
												onClick={handleSaveRegulate}
											/>
										)}
									</div>
									<div className='flex items-center justify-between mt-4 p-2 border-2 rounded-lg border-gray-200'>
										<label htmlFor=''>Длительность теста (минут)</label>
										<div className='flex justify-end'>
											{specialTest.regulate ? (
												<div className={styles.regulateInfo}>{timeForTest}</div>
											) : (
												<Input
													classOfStyle={'count'}
													type={'number'}
													min={1}
													value={timeForTest}
													placeholder={1}
													onChange={changeTimeForTest}
												/>
											)}
										</div>
									</div>
									<div className='flex items-center justify-between mt-1 p-2 border-2 rounded-lg border-gray-200'>
										<label htmlFor=''>Проходной балл</label>
										<div className='flex justify-end'>
											{specialTest.regulate ? (
												<div className={styles.regulateInfo}>
													{passingScore}
												</div>
											) : (
												<Input
													classOfStyle={'count'}
													type={'number'}
													min={1}
													value={passingScore}
													placeholder={1}
													onChange={changePassingScore}
												/>
											)}
										</div>
									</div>
									<div className='flex items-center justify-between mt-1 p-2 border-2 rounded-lg border-gray-200'>
										<label htmlFor=''>Сертификат</label>
										<div className='flex justify-end'>
											{specialTest.with_sertificate ? (
												<div className={styles.regulateInfo}>Да</div>
											) : (
												<Input
													// classOfStyle={'count'}
													type={'checkbox'}
													min={1}
													value={isSertificate}
													placeholder={1}
													onChange={changeWithSertificate}
												/>
											)}
										</div>
									</div>
								</>
							)}
							<div>
								<div className={styles.topics}>Темы:</div>
								{testsTopics?.length ? (
									<TestsTopicItem
										isRegulate={specialTest.regulate}
										role={role}
										testsTopics={testsTopics}
										idOfClickedTopic={idOfClickedTopic}
										handleChangeTopicInfoBlock={handleChangeTopicInfoBlock}
										handleSaveRegulate={handleSaveRegulate}
										checkIsGoodRule={checkIsGoodRule}
									/>
								) : (
									<div className={styles.haveNothing}>Пока ничего нет</div>
								)}
							</div>
						</div>
					</div>
					{isOpenTopicInfoBlock && specialTopic && role === 3 && (
						<QuestionOfTopicBlock
							isAuthor={isAuthor}
							specialTopic={specialTopic}
							topicsQuestions={topicsQuestions}
							isOpenTopicInfoBlock={isOpenTopicInfoBlock}
							handleChangeModal={handleChangeModal}
							handleClickQuestion={handleClickQuestion}
							specialTest={specialTest}
						/>
					)}
				</>
			) : (
				<div>Loader...</div>
			)}
		</div>
	)
}

export default SpecialTestPage
