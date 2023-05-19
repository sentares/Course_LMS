import { useState } from 'react'
import { useHttp } from './useHttp'
import { toast } from 'react-toastify'

const useStudent = () => {
	const { request } = useHttp()

	const [isAdded, setIsAdded] = useState(false)
	const [studentFollows, setStudentFollows] = useState(null)
	const [studentsCourses, setStudentsCourses] = useState(null)
	const [studentsFlows, setStudentFlows] = useState(null)
	const [arrOfFlowsStudents, setArrOfFlowsStudents] = useState(null)
	const [countOfActiveTest, setCountOfPersonalTest] = useState(0)
	const [personalTests, setPersonalTests] = useState(null)

	const getStudentsFollows = async id_student => {
		const { data } = await request(`/studentsFollows/${id_student}`)
		setStudentFollows(data)
	}

	const checkIsStudentAdded = async (id_student, id_flows) => {
		const { data } = await request(
			`/studentsFollows/${id_flows}/checkStudent/${id_student}`
		)
		setIsAdded(data)
	}

	const addStudentToCourseFlows = async (id_student, id_flows, id_course) => {
		const { type, message } = await request(
			`/studentsFollows/${id_flows}/addStudent/${id_student}/${id_course}`,
			'POST'
		)
		toast[type](message)
	}

	const getStudentsCourses = async courseIds => {
		const { data } = await request(
			`/studentsFollows/getStudentsCourses`,
			'POST',
			{
				courseIds,
			}
		)
		setStudentsCourses(data)
	}

	const getStudentsFlows = async flowsIds => {
		const { data } = await request(
			'/studentsFollows/getStudentsFlows',
			'POST',
			{
				flowsIds,
			}
		)
		setStudentFlows(data)
	}

	const getStudentsByFlowConnect = async studentsIds => {
		const { data } = await request('/student/getStudentsByArrIds', 'POST', {
			studentsIds,
		})
		setArrOfFlowsStudents(data)
	}

	const getPersonalActiveTestsCount = async id_student => {
		const { data } = await request(
			`/test/getPersonalActiveTestCount/${id_student}`
		)
		setCountOfPersonalTest(data)
	}

	const getPersonalTests = async id_student => {
		const { data } = await request(`/test/getPersonalTests/${id_student}`)
		setPersonalTests(data)
	}
	return {
		addStudentToCourseFlows,
		checkIsStudentAdded,
		getStudentsFollows,
		getStudentsCourses,
		getStudentsFlows,
		getStudentsByFlowConnect,
		getPersonalActiveTestsCount,
		getPersonalTests,
		personalTests,
		countOfActiveTest,
		arrOfFlowsStudents,
		studentsFlows,
		studentFollows,
		studentsCourses,
		isAdded,
	}
}

export default useStudent
