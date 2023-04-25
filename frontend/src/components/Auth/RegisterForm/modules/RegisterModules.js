import { useState } from 'react'
import useAuth from '../../../../hooks/useAuth'

const RegisterModules = () => {
	const [form, setForm] = useState({
		login: '',
		name: '',
		patronymic: '',
		surname: '',
		password: '',
	})
	const [isDisabled, setIsDisabled] = useState(false)
	const [isCaptchaSuccessful, setIsCaptchaSuccess] = useState(true)
	// const recaptchaKey = process.env.REACT_APP_RECAPTCHA_SITE_KEY
	const { registerStudent } = useAuth(form, isCaptchaSuccessful)

	const onChangeRecap = () => {
		setIsCaptchaSuccess(true)
	}

	const onChangeForm = e =>
		setForm({ ...form, [e.target.name]: e.target.value })

	const handleClickRegister = async e => {
		e.preventDefault()
		await registerStudent(form, isCaptchaSuccessful)
	}

	return {
		form,
		isDisabled,
		isCaptchaSuccessful,
		onChangeForm,
		handleClickRegister,
		onChangeRecap,
	}
}

export default RegisterModules
