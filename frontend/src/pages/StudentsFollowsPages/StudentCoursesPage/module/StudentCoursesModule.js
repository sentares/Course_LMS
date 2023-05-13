import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import useStudent from '../../../../hooks/useStudent'

const StudentCoursesModule = () => {
	const isAuth = useSelector(state => state.auth.isAuth)
	const user = useSelector(state => state.auth.user)

	const {
		getStudentsFollows,
		getStudentsCourses,
		getStudentsFlows,
		studentsFlows,
		studentsCourses,
		studentFollows,
	} = useStudent()

	const getCourseInfo = async () => {
		if (studentFollows) {
			const courseIds = studentFollows.map(course => course.id_course)
			const flowsIds = studentFollows.map(flow => flow.id_flows)
			await getStudentsCourses(courseIds)
			await getStudentsFlows(flowsIds)
		} else {
			return
		}
	}

	useEffect(() => {
		getStudentsFollows(user.id_student)
	}, [])

	useEffect(() => {
		getCourseInfo()
	}, [studentFollows])

	return { studentFollows, studentsCourses, studentsFlows, studentsFlows }
}

export default StudentCoursesModule
