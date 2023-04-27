import { useState } from 'react'
import { useHttp } from './useHttp'

const useTeacher = () => {
	const { request } = useHttp()

	const [allTeachers, setAllTeachers] = useState(null)
	const [specialTeahcer, setSpecialTeacher] = useState(null)

	const getAllTeachers = async () => {
		const { data } = await request('/teacher')
		setAllTeachers(data)
	}

	const getSpecialTeacher = async () => {
		const { data } = await request('/teacher/getSpecial')
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
