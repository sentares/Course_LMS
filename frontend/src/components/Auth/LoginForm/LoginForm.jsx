import React from 'react'
import Input from '../../../ui/input/Input'
import LoginFormModule from './modules/LoginFormModule'
import styles from './styles.module.scss'
import Button from '../../../ui/button/Button'

const LoginForm = () => {
	const {
		form,
		isCaptchaSuccessful,
		isDisabled,
		onChangeForm,
		onChangeRecap,
		handleClickLogin,
	} = LoginFormModule()

	return (
		<form className={styles.LoginForm}>
			<div>
				<Input
					name='login'
					value={form.login}
					type='text'
					placeholder={'Введите ваш login'}
					onChange={onChangeForm}
				/>
			</div>
			<div>
				<Input
					name='password'
					value={form.password}
					type='text'
					placeholder={'Введите пароль'}
					onChange={onChangeForm}
				/>
			</div>
			<div>
				<Button
					title={'Войти'}
					onClick={handleClickLogin}
					// disabled={isDisabled}
				/>
			</div>
		</form>
	)
}

export default LoginForm
