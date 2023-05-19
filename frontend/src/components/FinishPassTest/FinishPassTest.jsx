import React from 'react'
import styles from './styles.module.scss'
import Button from '../../ui/button/Button'

const FinishPassTest = ({
	percentageOfRightAnswer,
	hadlePostResult,
	stopTest,
	start,
}) => {
	return (
		<div className={styles.FinishPassTest}>
			<div className={styles.result}>
				{start === 'stop' ? (
					<>
						<div className={styles.textOfResult}>
							Вы ответили правильно на{' '}
							<span className={styles.percentage}>
								{percentageOfRightAnswer}%
							</span>{' '}
							вопросов
						</div>
						<Button
							title={'Отправить результаты'}
							classOfStyle={'auth'}
							onClick={hadlePostResult}
						/>
					</>
				) : (
					<Button
						title={'Завершить тест'}
						classOfStyle={'auth'}
						onClick={stopTest}
					/>
				)}
			</div>
		</div>
	)
}

export default FinishPassTest
