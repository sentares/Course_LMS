import React from 'react'
import styles from './styles.module.scss'

const Input = ({
	name,
	type,
	value,
	onChange,
	placeholder,
	classOfStyle,
	min,
	max,
	checked,
}) => {
	return (
		<input
			name={name}
			className={styles[classOfStyle]}
			type={`${type}`}
			value={value}
			onChange={onChange}
			placeholder={placeholder}
			min={min}
			max={max}
			checked={checked}
		/>
	)
}

export default Input
