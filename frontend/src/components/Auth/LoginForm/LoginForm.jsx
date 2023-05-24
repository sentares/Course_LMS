import React from 'react'
import Input from '../../../ui/input/Input'
import LoginFormModule from './modules/LoginFormModule'
import styles from './styles.module.scss'
import Button from '../../../ui/button/Button'
import { useNavigate } from 'react-router-dom'

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

	const navigate = useNavigate()
	const clickGoHome = () => {
		navigate('/')
	}

	return (
		<div className=' w-full flex justify-center'>
			<div className='w-full'>
				<div className={styles.goHome}>
					<div className='w-xs'>
						<Button
							title={'На главную'}
							classOfStyle='auth'
							onClick={clickGoHome}
						/>
					</div>
				</div>
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
							type='password'
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
			</div>
		</div>
	)
}

export default LoginForm
