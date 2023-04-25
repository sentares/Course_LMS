import React from 'react'
import styles from './styles.module.scss'

const Button = ({ title, onClick }) => {
	return (
		<button onClick={onClick} className={styles.ButtonAuth}>
			{title}
		</button>
	)
}

export default Button
