import { useState } from 'react'
import useAuth from '../../../../hooks/useAuth'

const LoginModule = () => {
	const [form, setForm] = useState({
		login: '',
		password: '',
	})

	const [isDisabled, setIsDisabled] = useState(false)
	const [isCaptchaSuccessful, setIsCaptchaSuccess] = useState(true)

	const { loginStudent } = useAuth(form, isCaptchaSuccessful)

	const onChangeRecap = () => {
		setIsCaptchaSuccess(true)
	}

	const onChangeForm = e =>
		setForm({ ...form, [e.target.name]: e.target.value })

	const handleClickLogin = async e => {
		e.preventDefault()
		await loginStudent()
	}

	return {
		form,
		isDisabled,
		isCaptchaSuccessful,
		onChangeForm,
		handleClickLogin,
		onChangeRecap,
	}
}

export default LoginModule
