import React from 'react'
import styles from './styles.module.scss'
import LoginForm from '../../../components/Auth/LoginForm/LoginForm'

const LoginPage = () => {
	return (
		<div className={styles.LoginPage}>
			<LoginForm className={styles.form} />
		</div>
	)
}

export default LoginPage
