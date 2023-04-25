import React from 'react'
import styles from './styles.module.scss'

const Input = ({ name, type, value, onChange, placeholder }) => {
	return (
		<input
			name={name}
			className={styles.InputAuth}
			type={`${type}`}
			value={value}
			onChange={onChange}
			placeholder={placeholder}
		/>
	)
}

export default Input
