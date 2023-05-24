import React from 'react'
import SpecialTestToPassModule from './module/SpecialTestToPassModule'
import styles from './styles.module.scss'
import Button from '../../../ui/button/Button'
import ReadyForTestModal from '../../../components/Modals/ReadyForTestModal/ReadyForTestModal'

const SpecialTestToPass = () => {
	const {
		specialTest,
		openModal,
		isPassed,
		infoAboutTestPassing,
		handleClickStartTest,
		onAllow,
	} = SpecialTestToPassModule()

	return (
		<div className={styles.SpecialTestToPass}>
			<div>
				{specialTest ? (
					<>
						{openModal && (
							<ReadyForTestModal
								handleClickStartTest={handleClickStartTest}
								onAllow={onAllow}
							/>
						)}
						<div className={styles.info}>
							<div className='w-full'>
								<div className={styles.infoBlocks}>
									Курс: <strong>{specialTest.course_name}</strong>
								</div>
								<div className={styles.infoBlocks}>
									Поток: <strong>{specialTest.flow_name}</strong>
								</div>
								<div className={styles.infoBlocks}>
									Название теста: <strong>{specialTest.test_name}</strong>
								</div>
								<div className={styles.infoBlocks}>
									Количество вопросов:{' '}
									<strong>{specialTest.question_count}</strong>
								</div>
								<div className={styles.infoBlocks}>
									Длительность теста: <strong>{specialTest.time} минут</strong>
								</div>
								<div className={styles.infoBlocks}>
									Проходной балл:{' '}
									<strong>
										{specialTest.score_to_passing}% правильных ответов
									</strong>
								</div>
							</div>
						</div>
						<div className='mt-4'>
							{!isPassed ? (
								<Button
									classOfStyle={'auth'}
									title={'Пройти тест'}
									onClick={handleClickStartTest}
								/>
							) : (
								<div>
									{infoAboutTestPassing.ball > specialTest.score_to_passing ? (
										<p className={styles.youPassed}>Вы прошли тест!</p>
									) : (
										<p className={styles.youLosed}>Вы провалили тест</p>
									)}
									<div className={styles.result}>
										ваш результат {infoAboutTestPassing.ball} %
									</div>
								</div>
							)}
						</div>
					</>
				) : (
					<div>Loader</div>
				)}
			</div>
		</div>
	)
}

export default SpecialTestToPass
