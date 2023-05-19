import { useState } from 'react'
import useAuth from '../../../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

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
	const navigate = useNavigate()

	const onChangeRecap = () => {
		setIsCaptchaSuccess(true)
	}

	const onChangeForm = e =>
		setForm({ ...form, [e.target.name]: e.target.value })

	const handleClickRegister = async e => {
		e.preventDefault()
		await registerStudent(form, isCaptchaSuccessful)
	}

	const handleClickSign = () => {
		navigate('/login')
	}

	return {
		form,
		isDisabled,
		isCaptchaSuccessful,
		onChangeForm,
		handleClickRegister,
		onChangeRecap,
		handleClickSign,
	}
}

export default RegisterModules
