import React from 'react'
import LoginForm from '../../../components/Auth/LoginForm/LoginForm'
import styles from './styles.module.scss'

const LoginAdminPage = () => {
	return (
		<div className={styles.LoginPage}>
			<LoginForm />
		</div>
	)
}

export default LoginAdminPage
