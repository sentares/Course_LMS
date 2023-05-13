import { useState } from 'react'
import { useHttp } from './useHttp'
import { toast } from 'react-toastify'

const useTeacher = (id_teacher, form) => {
	const { request } = useHttp()

	const [allTeachers, setAllTeachers] = useState(null)
	const [specialTeacher, setSpecialTeacher] = useState(null)

	const getAllTeachers = async () => {
		const { data } = await request('/teacher')
		setAllTeachers(data)
	}

	const getSpecialTeacher = async () => {
		const { data } = await request(`/teacher/getSpecial/${id_teacher}`)
		setSpecialTeacher(data)
	}

	const createTeacher = async () => {
		const {
			name,
			surname,
			patronymic,
			birthday,
			temp_inn,
			email,
			password,
			role,
		} = form
		if (
			name.trim().length &&
			surname.trim().length &&
			patronymic.trim().length &&
			birthday.trim().length &&
			temp_inn.trim().length &&
			email.trim().length &&
			password.trim().length &&
			role
		) {
			const { type, message } = await request('/teacher/create', 'POST', {
				name: name.trim(),
				surname: surname.trim(),
				patronymic: patronymic.trim(),
				birthday: birthday.trim(),
				temp_inn: temp_inn.trim(),
				email: email.trim(),
				password: password.trim(),
				role,
			})
			toast[type](message)
			return
		}
		toast.warn('Заполните пустые поля')
	}

	return {
		getAllTeachers,
		getSpecialTeacher,
		createTeacher,
		specialTeacher,
		allTeachers,
	}
}

export default useTeacher
