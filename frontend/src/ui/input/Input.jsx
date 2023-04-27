import React from 'react'
import styles from './styles.module.scss'

const Input = ({ name, type, value, onChange, placeholder, classOfStyle }) => {
	return (
		<input
			name={name}
			className={styles[classOfStyle]}
			type={`${type}`}
			value={value}
			onChange={onChange}
			placeholder={placeholder}
		/>
	)
}

export default Input
