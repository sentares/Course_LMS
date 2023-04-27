import { useParams } from 'react-router-dom'
import useCourse from '../../../../hooks/useCourse'
import { useEffect } from 'react'

const SpecialCourseModule = () => {
	const params = useParams()
	const { id_course } = params
	const { getSpecialCourse, specialCourse } = useCourse(id_course, null)
	console.log(id_course)

	useEffect(() => {
		getSpecialCourse()
	}, [])

	return { specialCourse }
}

export default SpecialCourseModule
