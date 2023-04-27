import { useEffect } from 'react'
import useTeacher from '../../../../hooks/useTeacher'

const TeacherPageModule = () => {
	const { getAllTeachers, allTeachers } = useTeacher()

	useEffect(() => {
		getAllTeachers()
	}, [])

	return {
		allTeachers,
	}
}

export default TeacherPageModule
