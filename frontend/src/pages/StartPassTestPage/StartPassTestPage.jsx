import React, { useState, useEffect } from 'react'
import FinishPassTest from '../../components/FinishPassTest/FinishPassTest'
import Button from '../../ui/button/Button'
import StartPassTestPageModule from './module/StartPassTestPageModule'
import styles from './styles.module.scss'
import moment from 'moment'

const StartPassTestPage = () => {
	const {
		test,
		percentageOfProgress,
		percentageOfRightAnswer,
		answers,
		currentIndex,
		start,
		questionsOfTest,
		studentChose,
		generate_date,
		time,
		handleClickPrev,
		handleClickNext,
		stopTest,
		handleClickOnAnswer,
		hadlePostResult,
		handleCLickQuestion,
		handleCLickPassTest,
	} = StartPassTestPageModule()

	const [generateDate, setGenerateDate] = useState(null)
	const [remainingTime, setRemainingTime] = useState(null)
	const [dataLoaded, setDataLoaded] = useState(false)

	const fetchData = async () => {
		const generateDateData = await generate_date
		setGenerateDate(moment(generateDateData, 'YYYY-MM-DD HH:mm:ss.SSS'))
		setDataLoaded(true)
	}

	const startTimer = async () => {
		if (generateDate && time) {
			const endDate = await generateDate.clone().add(time, 'minutes')

			const timer = setInterval(() => {
				const currentTime = moment()
				const remaining = moment.duration(endDate.diff(currentTime))

				if (remaining.asMilliseconds() > 0) {
					const hours = remaining.hours()
					const minutes = remaining.minutes()
					const seconds = remaining.seconds()
					const remainingTimeString = `${hours
						.toString()
						.padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds
						.toString()
						.padStart(2, '0')}`
					setRemainingTime(remainingTimeString)
				} else {
					clearInterval(timer)
					setRemainingTime('Время вышло')
					stopTest()
				}
			}, 1000)

			return () => {
				clearInterval(timer)
			}
		}
	}

	useEffect(() => {
		if (generate_date && time) {
			fetchData()
		}
	}, [generate_date, time])

	useEffect(() => {
		if (dataLoaded && generateDate && time) {
			startTimer()
		}
	}, [dataLoaded, generateDate, time])

	return (
		<div className={styles.StartPassTestPage}>
			{test && answers && currentIndex !== -1 ? (
				<div className='w-full flex justify-center items-center'>
					<div className={styles.infoTestBlock}>
						<div className={styles.info}>
							<div className={styles.tableOfAnswers}>
								<div className='w-full flex items-center justify-center'>
									<div className={styles.mapOfQuest}>
										{questionsOfTest.map((question, index) => {
											const isAnswered = studentChose?.hasOwnProperty(
												question.id_question
											)
											return (
												<button
													key={question.id_question}
													className={`${isAnswered && styles.answered} ${
														currentIndex === index
															? styles.activeQuestion
															: styles.notActiveQuestion
													} `}
													onClick={handleCLickQuestion.bind(null, index)}
												>
													{index + 1}
												</button>
											)
										})}
									</div>
								</div>
								<div className={styles.instruction}>
									<div>
										<div className={styles.colorBlocks}>
											<div className={styles.activeBlock}></div>
											<label>Текущий вопрос</label>
										</div>
										<div className={styles.colorBlocks}>
											<div className={styles.answeredBlock}></div>
											<label>Отвеченный вопрос</label>
										</div>
										<div className={styles.colorBlocks}>
											<div className={styles.notAnsweredBlock}></div>
											<label>Не отвеченный вопрос</label>
										</div>
									</div>
								</div>
								<div className={styles.timerBlock}>
									<p>
										Осталось времени:{' '}
										<label htmlFor=''>
											{remainingTime ? remainingTime : 'Loading'}
										</label>
									</p>
								</div>
							</div>
						</div>
					</div>
					<div className={styles.questBlock}>
						<div className={styles.block}>
							<div className={styles.quest}>
								{/* <button onClick={deleteLocal}>deleteLocal</button> */}
								<div
									className={styles.progressBar}
									style={{ width: `${percentageOfProgress}%` }}
								></div>
								<div
									className={styles.question}
									style={{
										userSelect: 'none',
									}}
								>
									{test.question}
								</div>
								<div className={styles.answersBlock}>
									{answers.map((item, index) => (
										<div className={styles.answer} key={item.id_answers}>
											<Button
												title={item.answers}
												classOfStyle={
													studentChose[test?.id_question] === item?.id_answers
														? 'answerChosedItem'
														: 'answerItem'
												}
												onClick={handleClickOnAnswer.bind(
													null,
													item.id_answers
												)}
											/>
										</div>
									))}
								</div>
								<div className={styles.paginationBlock}>
									<Button
										title={'<'}
										classOfStyle={currentIndex === 0 ? 'prevDisabled' : 'prev'}
										onClick={handleClickPrev}
									/>
									<Button
										title={'>'}
										classOfStyle={
											currentIndex === questionsOfTest.length - 1
												? 'nextDisabled'
												: 'next'
										}
										onClick={handleClickNext}
									/>
								</div>
							</div>
						</div>
						<div className={styles.finishButton}>
							<Button
								title={'Завершить тест'}
								classOfStyle={'notReady'}
								onClick={handleCLickPassTest}
							/>
						</div>
					</div>
				</div>
			) : (
				<FinishPassTest
					stopTest={stopTest}
					hadlePostResult={hadlePostResult}
					start={start}
					percentageOfRightAnswer={percentageOfRightAnswer}
				/>
			)}
		</div>
	)
}

export default StartPassTestPage
