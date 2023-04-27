import React from 'react'
import styles from './styles.module.scss'

const Button = ({ title, onClick, classOfStyle }) => {
	return (
		<button onClick={onClick} className={`${styles[classOfStyle]}`}>
			{title}
		</button>
	)
}

export default Button
