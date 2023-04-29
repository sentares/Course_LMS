import { useState } from 'react'
import { useHttp } from './useHttp'

const useTeacher = id_teacher => {
	const { request } = useHttp()

	const [allTeachers, setAllTeachers] = useState(null)
	const [specialTeahcer, setSpecialTeacher] = useState(null)

	const getAllTeachers = async () => {
		const { data } = await request('/teacher')
		setAllTeachers(data)
	}

	const getSpecialTeacher = async () => {
		const { data } = await request(`/teacher/getSpecial/${id_teacher}`)
		setSpecialTeacher(data)
	}

	return {
		getAllTeachers,
		getSpecialTeacher,
		specialTeahcer,
		allTeachers,
	}
}

export default useTeacher
