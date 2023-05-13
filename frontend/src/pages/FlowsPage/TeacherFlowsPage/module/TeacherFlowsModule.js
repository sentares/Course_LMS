import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useFlows from '../../../../hooks/useFlows'
import useCourse from '../../../../hooks/useCourse'

const TeacherFlowsModule = () => {
	const params = useParams()
	const { id_teacher } = params

	const { getFlowsOfTeacher, teachersFlows } = useFlows(null, null, id_teacher)

	const { getSpecialCourse, specialCourse } = useCourse(null, null)

	useEffect(() => {
		getFlowsOfTeacher()
	}, [])

	useEffect(() => {
		if (teachersFlows && teachersFlows.length > 0) {
			teachersFlows.forEach(flow => {
				getSpecialCourse(flow.id_course)
			})
		}
	}, [teachersFlows])

	return { id_teacher, teachersFlows, specialCourse }
}

export default TeacherFlowsModule
