import { useNavigate } from 'react-router-dom'
import { useHttp } from './useHttp'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { setIsAuth, setUser } from '../redux/slices/authSlice'
import { useState } from 'react'

const useAuth = (form, isCaptchaSuccessful) => {
	const [tryCount, setTryCount] = useState(null)
	const [isActive, setIsActive] = useState(true)
	const { request } = useHttp()
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const getData = data => {
		dispatch(setUser(data))
		dispatch(setIsAuth(true))
	}

	const registerStudent = async () => {
		const { name, surname, patronymic, login, password } = form
		if (
			name.trim().length &&
			surname.trim().length &&
			patronymic.trim().length &&
			login.trim().length &&
			password.trim().length &&
			isCaptchaSuccessful
		) {
			const { register, message, type } = await request(
				'/auth/register',
				'POST',
				{
					login: login.trim(),
					password: password.trim(),
					name: name.trim(),
					surname: surname.trim(),
					patronymic: patronymic.trim(),
				}
			)
			toast[type](message)
			if (register) {
				navigate('/login')
			}
			return
		}
		toast.warn('Заполните пустые поля')
	}

	const loginStudent = async () => {
		const { login, password } = form
		if (!isCaptchaSuccessful) {
			return toast.warn('Подтвердите что вы не робот')
		}
		if (login.trim().length && password.trim().length) {
			const { data, accessToken, message, type } = await request(
				'/auth/login',
				'POST',
				{ login: login.trim(), password: password.trim() }
			)
			toast[type](message)
			if (accessToken.length) {
				getData(data)
			}
			return
		}
		toast.warn('Заполните пустые поля')
	}

	const loginAdmin = async () => {
		const { login, password } = form
		if (!isCaptchaSuccessful) {
			return toast.warn('Подтвердите что вы не робот')
		}
		if (login.trim().length && password.trim().length) {
			const { data, accessToken, message, type } = await request(
				'/auth/loginAdmin',
				'POST',
				{ login: login.trim(), password: password.trim() }
			)
			toast[type](message)
			setIsActive(data.activ)
			setTryCount(data.try_count)
			if (accessToken.length) {
				getData(data)
			}
			return
		}
		toast.warn('Заполните пустые поля')
	}

	const loginTeacher = async () => {
		try {
			const { login: temp_inn, password } = form
			if (!isCaptchaSuccessful) {
				return toast.warn('Подтвердите что вы не робот')
			}
			if (temp_inn.trim().length && password.trim().length) {
				const { data, accessToken, message, type } = await request(
					'/auth/loginTeacher',
					'POST',
					{ temp_inn: temp_inn.trim(), password: password.trim() }
				)
				toast[type](message)

				if (accessToken.length) {
					getData(data)
				}
				return
			}
			toast.warn('Заполните пустые поля')
		} catch (e) {
			console.log(e)
		}
	}

	const checkAuth = async () => {
		try {
			const { data, accessToken } = await request('/auth/check')
			if (accessToken.length) {
				dispatch(setUser(data))
				dispatch(setIsAuth(true))
			}
		} catch (e) {
			console.log(e)
		}
	}

	const logout = async () => {
		await request('/auth/logout')
		dispatch(
			setUser({
				name: '',
				login: '',
				id_student: null,
				is_admin: null,
				role: null,
			})
		)
		dispatch(setIsAuth(false))
		navigate('/')
	}

	return {
		registerStudent,
		loginStudent,
		loginAdmin,
		loginTeacher,
		checkAuth,
		logout,
	}
}

export default useAuth
