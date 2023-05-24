import React from 'react'
import styles from './styles.module.scss'
import LoginForm from '../../../components/Auth/LoginForm/LoginForm'

const LoginTeacherPage = () => {
	return (
		<div className={styles.LoginPage}>
			<LoginForm />
		</div>
	)
}

export default LoginTeacherPage
