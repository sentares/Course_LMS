import { useEffect, useState } from 'react'
import useAuth from '../../../../hooks/useAuth'
import { useLocation, useNavigate } from 'react-router-dom'

const LoginModule = () => {
	const [isTeacher, setIsTeacher] = useState(false)
	const [form, setForm] = useState({
		login: '',
		password: '',
	})

	const { pathname } = useLocation()
	const navigate = useNavigate()

	const [isDisabled, setIsDisabled] = useState(false)
	const [isCaptchaSuccessful, setIsCaptchaSuccess] = useState(true)

	const { loginStudent, loginAdmin, loginTeacher } = useAuth(
		form,
		isCaptchaSuccessful
	)

	const checkIsTeacher = () => {
		if (pathname === '/loginTeacher') {
			setIsTeacher(true)
		}
	}

	const onChangeRecap = () => {
		setIsCaptchaSuccess(true)
	}

	const onChangeForm = e =>
		setForm({ ...form, [e.target.name]: e.target.value })

	const handleClickLogin = async e => {
		e.preventDefault()
		if (pathname === '/loginAdmin') {
			await loginAdmin()
		} else if (pathname === '/loginTeacher') {
			await loginTeacher()
		} else {
			await loginStudent()
		}
	}
	const handleClickSign = () => {
		navigate('/register')
	}

	useEffect(() => {
		checkIsTeacher()
	})

	return {
		isTeacher,
		form,
		isDisabled,
		isCaptchaSuccessful,
		onChangeForm,
		handleClickLogin,
		onChangeRecap,
		handleClickSign,
	}
}

export default LoginModule
