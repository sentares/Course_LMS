import { useNavigate } from 'react-router-dom'
import { useHttp } from './useHttp'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { setIsAuth, setUser } from '../redux/slices/authSlice'

const useAuth = (form, isCaptchaSuccessful) => {
	const { request } = useHttp()
	const navigate = useNavigate()
	const dispath = useDispatch()

	const getData = data => {
		dispath(setUser(data))
		dispath(setIsAuth(true))
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
			console.log(data)
			toast[type](message)
			if (accessToken.length) {
				getData(data)
			}
			return
		}
		toast.warn('Заполните пустые поля')
	}

	return { registerStudent, loginStudent }
}

export default useAuth
