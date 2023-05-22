import React, { useEffect, useState } from 'react'
import moment from 'moment'

const TimerComponent = () => {
	const [generateDate, setGenerateDate] = useState(null)
	const [time, setTime] = useState(null)
	const [remainingTime, setRemainingTime] = useState(null)

	useEffect(() => {
		const fetchData = async () => {
			// Получите данные generate_date и time из API или другого источника
			const generateDateData = '2023-05-22 16:04:01.000'
			const timeData = 1

			// Установите значения generateDate и time
			setGenerateDate(moment(generateDateData, 'YYYY-MM-DD HH:mm:ss.SSS'))
			setTime(timeData)
		}

		fetchData()
	}, [])

	useEffect(() => {
		if (generateDate && time) {
			const endDate = generateDate.clone().add(time, 'minutes')

			// Запустите таймер обратного отсчета
			const timer = setInterval(() => {
				const currentTime = moment()
				const remaining = moment.duration(endDate.diff(currentTime))

				if (remaining.asMilliseconds() > 0) {
					const minutes = remaining.minutes()
					const seconds = remaining.seconds()
					const remainingTimeString = `${minutes
						.toString()
						.padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
					setRemainingTime(remainingTimeString)
				} else {
					// Time has expired, perform necessary actions
					clearInterval(timer)
					setRemainingTime('Time has expired')
					// Additional code to execute when time expires
				}
			}, 1000)

			return () => {
				// Очистите таймер при размонтировании компонента
				clearInterval(timer)
			}
		}
	}, [generateDate, time])

	return (
		<div>
			<p>
				Generate Date:{' '}
				{generateDate && generateDate.format('YYYY-MM-DD HH:mm:ss.SSS')}
			</p>
			<p>Time: {time}</p>
			<p>Remaining Time: {remainingTime}</p>
		</div>
	)
}

export default TimerComponent
