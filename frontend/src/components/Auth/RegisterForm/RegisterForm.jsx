import React from 'react'
import RegisterModules from './modules/RegisterModules'
import Input from '../../../ui/input/Input'
import Button from '../../../ui/button/Button'
import ReCAPTCHA from 'react-google-recaptcha'
import { useNavigate } from 'react-router-dom'
import styles from './styles.module.scss'

const RegisterForm = () => {
	const {
		form,
		recaptchaKey,
		isDisabled,
		onChangeForm,
		handleClickRegister,
		onChangeRecap,
		handleClickSign,
	} = RegisterModules()

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
				<form className={styles.RegisterForm}>
					<div>
						<Input
							name='surname'
							value={form.surname}
							type='text'
							placeholder={'Введите вашу фамилию'}
							onChange={onChangeForm}
							classOfStyle={'auth'}
						/>
					</div>
					<div>
						<Input
							name='name'
							value={form.name}
							type='text'
							placeholder={'Введите ваше имя'}
							onChange={onChangeForm}
							classOfStyle={'auth'}
						/>
					</div>
					<div>
						<Input
							name='patronymic'
							value={form.patronymic}
							type='text'
							placeholder={'Введите ваше отчество'}
							onChange={onChangeForm}
							classOfStyle={'auth'}
						/>
					</div>
					<div>
						<Input
							name='login'
							value={form.login}
							type='text'
							placeholder={'Введите ваш login'}
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
					<div className={styles.captcha}>
						{/* <ReCAPTCHA sitekey={recaptchaKey} onChange={onChangeRecap} /> */}
					</div>
					<div>
						<Button
							title={'Регистрация'}
							onClick={handleClickRegister}
							classOfStyle={'auth'}
							// disabled={isDisabled}
						/>
					</div>
					<div className={styles.isHaveAcc}>
						Есть аккаунт?{' '}
						<button className={styles.regButton} onClick={handleClickSign}>
							Войти
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default RegisterForm
