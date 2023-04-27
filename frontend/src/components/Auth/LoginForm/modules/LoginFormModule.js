import { useState } from 'react'
import useAuth from '../../../../hooks/useAuth'
import { useLocation } from 'react-router-dom'

const LoginModule = () => {
	const [form, setForm] = useState({
		login: '',
		password: '',
	})

	const { pathname } = useLocation()

	const [isDisabled, setIsDisabled] = useState(false)
	const [isCaptchaSuccessful, setIsCaptchaSuccess] = useState(true)

	const { loginStudent, loginAdmin } = useAuth(form, isCaptchaSuccessful)

	const onChangeRecap = () => {
		setIsCaptchaSuccess(true)
	}

	const onChangeForm = e =>
		setForm({ ...form, [e.target.name]: e.target.value })

	const handleClickLogin = async e => {
		e.preventDefault()
		if (pathname === '/loginAdmin') {
			await loginAdmin()
		} else {
			await loginStudent()
		}
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
