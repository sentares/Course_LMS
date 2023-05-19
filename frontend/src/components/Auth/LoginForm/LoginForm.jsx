import React from 'react'
import Input from '../../../ui/input/Input'
import LoginFormModule from './modules/LoginFormModule'
import styles from './styles.module.scss'
import Button from '../../../ui/button/Button'

const LoginForm = () => {
	const {
		form,
		isTeacher,
		isCaptchaSuccessful,
		isDisabled,
		onChangeForm,
		onChangeRecap,
		handleClickLogin,
		handleClickSign,
	} = LoginFormModule()

	return (
		<form className={styles.LoginForm}>
			<div>
				<Input
					name='login'
					value={form.login}
					type='text'
					placeholder={isTeacher ? 'Введите ваш ИНН' : 'Введите ваш login'}
					onChange={onChangeForm}
					classOfStyle={'auth'}
				/>
			</div>
			<div>
				<Input
					name='password'
					value={form.password}
					type='text'
					placeholder={'Введите пароль'}
					onChange={onChangeForm}
					classOfStyle={'auth'}
				/>
			</div>
			<div>
				<Button
					title={'Войти'}
					onClick={handleClickLogin}
					classOfStyle={'auth'}
					// disabled={isDisabled}
				/>
			</div>
			<div className={styles.isHaveAcc}>
				Нет аккаунта?{' '}
				<button className={styles.regButton} onClick={handleClickSign}>
					Регистрация
				</button>
			</div>
		</form>
	)
}

export default LoginForm
