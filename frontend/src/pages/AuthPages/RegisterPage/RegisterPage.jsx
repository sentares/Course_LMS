import React from 'react'
import RegisterForm from '../../../components/Auth/RegisterForm/RegisterForm'
import styles from './styles.module.scss'

const RegisterPage = () => {
	return (
		<div className={styles.LoginPage}>
			<RegisterForm />
		</div>
	)
}

export default RegisterPage
