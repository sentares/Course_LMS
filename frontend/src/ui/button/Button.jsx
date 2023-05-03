import React from 'react'
import styles from './styles.module.scss'

const Button = ({ title, onClick, classOfStyle, disabled }) => {
	return (
		<button
			onClick={onClick}
			className={`${styles[classOfStyle]}`}
			disabled={disabled ? !disabled : null}
		>
			{title}
		</button>
	)
}

export default Button
