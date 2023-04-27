import React from 'react'
import RegisterModules from './modules/RegisterModules'
import Input from '../../../ui/input/Input'
import styles from './styles.module.scss'
import Button from '../../../ui/button/Button'
import ReCAPTCHA from 'react-google-recaptcha'

const RegisterForm = () => {
	const {
		form,
		recaptchaKey,
		isDisabled,
		onChangeForm,
		handleClickRegister,
		onChangeRecap,
	} = RegisterModules()

	return (
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
					type='text'
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
		</form>
	)
}

export default RegisterForm
