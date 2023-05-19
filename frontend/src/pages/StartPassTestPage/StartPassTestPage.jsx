import React, { useState, useEffect } from 'react'
import Button from '../../ui/button/Button'
import styles from './styles.module.scss'
import StartPassTestPageModule from './module/StartPassTestPageModule'
import FinishPassTest from '../../components/FinishPassTest/FinishPassTest'

const StartPassTestPage = () => {
	const {
		test,
		percentageOfProgress,
		percentageOfRightAnswer,
		answers,
		currentIndex,
		start,
		stopTest,
		handleClickOnAnswer,
		hadlePostResult,
	} = StartPassTestPageModule()

	// const [timeRemaining, setTimeRemaining] = useState(20 * 60) // 20 minutes in seconds

	// useEffect(() => {
	// 	let timer
	// 	if (timeRemaining > 0) {
	// 		timer = setTimeout(() => {
	// 			setTimeRemaining(prevTime => prevTime - 1)
	// 		}, 1000) // update the timer every second
	// 	}

	// 	return () => {
	// 		clearTimeout(timer)
	// 	}
	// }, [timeRemaining])

	// const formatTime = time => {
	// 	const minutes = Math.floor(time / 60)
	// 	const seconds = time % 60
	// 	return `${minutes.toString().padStart(2, '0')}:${seconds
	// 		.toString()
	// 		.padStart(2, '0')}`
	// }

	return (
		<div className={styles.StartPassTestPage}>
			{test && answers && currentIndex !== -1 ? (
				<div className={styles.questBlock}>
					<div className={styles.quest}>
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
										classOfStyle={'answerItem'}
										onClick={handleClickOnAnswer.bind(null, item.id_answers)}
									/>
								</div>
							))}
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
			{/* <div className={styles.timer}>{formatTime(timeRemaining)}</div> */}
		</div>
	)
}

export default StartPassTestPage
