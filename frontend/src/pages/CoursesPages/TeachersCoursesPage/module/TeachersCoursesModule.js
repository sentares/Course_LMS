import { useParams } from 'react-router-dom'
import useCourse from '../../../../hooks/useCourse'
import { useEffect } from 'react'

const TeachersCoursesModule = () => {
	const params = useParams()
	const { id_teacher } = params

	const { getTeachersCourses, teachersCourses } = useCourse()

	useEffect(() => {
		getTeachersCourses(id_teacher)
	}, [])

	return { id_teacher, teachersCourses }
}

export default TeachersCoursesModule
