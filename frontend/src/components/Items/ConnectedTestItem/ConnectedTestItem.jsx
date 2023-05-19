import React, { useEffect } from 'react'
import styles from './styles.module.scss'
import { Link } from 'react-router-dom'
import useTest from '../../../hooks/useTest'

const ConnectedTestItem = ({ test }) => {
	const { getSpecialTest, specialTest } = useTest()

	const formatDate = dateString => {
		const date = new Date(dateString)
		const month = date.toLocaleString('default', { month: 'short' })
		const time = date.toLocaleTimeString([], {
			hour: '2-digit',
			minute: '2-digit',
		})

		return `${date.getDate()} ${month} ${time}`
	}

	useEffect(() => {
		if (test) {
			getSpecialTest(test.id_test)
		}
	}, [test])

	return (
		<>
			{specialTest?.length ? (
				<div>Loading</div>
			) : (
				<Link
					className={styles.ConnectedTestItem}
					to={`testToPass/${test.id_test}`}
				>
					<div className={styles.name}>{specialTest?.test_name}</div>
					<div>
						<div className={styles.date}>
							Начало: {formatDate(test.date_begin_test)}{' '}
						</div>
						<div className={styles.date}>
							Конец: {formatDate(test.date_end_test)}{' '}
						</div>
					</div>
				</Link>
			)}
		</>
	)
}

export default ConnectedTestItem
