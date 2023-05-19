import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import useFlows from '../../../../hooks/useFlows'
import useCourse from '../../../../hooks/useCourse'

const TeacherFlowsModule = () => {
	const user = useSelector(state => state.auth.user)
	const { role } = user
	const params = useParams()
	const { id_teacher } = params

	const { getFlowsOfTeacher, teachersFlows } = useFlows(null, null, id_teacher)
	const { getSpecialCourse, specialCourse } = useCourse(null, null)

	const getFlowsByRole = async () => {
		if (role === 3) {
			getFlowsOfTeacher()
		} else if (role === 2) {
		}
	}

	useEffect(() => {
		getFlowsByRole()
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
