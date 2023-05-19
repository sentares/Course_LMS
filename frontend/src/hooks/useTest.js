import { toast } from 'react-toastify'
import { useHttp } from './useHttp'
import { useState } from 'react'

const useTest = form => {
	const { request } = useHttp()
	const [createdTest, setCreatedTest] = useState(null)
	const [allTests, setAllTests] = useState(null)
	const [isSucces, setIsSucces] = useState(false)
	const [specialTest, setSpecialTest] = useState(null)
	const [regulateTests, setRegulateTests] = useState(null)
	const [regulateTestsOfCourse, setRegulateTestsOfCourse] = useState(null)
	const [connectedWithFlowsTests, setConnectedWidthFlowsTests] = useState(null)

	const getTests = async user => {
		if (user.role === 2) {
			const { data } = await request('/test')
			setAllTests(data)
		} else {
			const { data } = await request(`/test/getTeacher/${user.id_teacher}`)
			setAllTests(data)
		}
	}

	const getRegulateTests = async () => {
		const { data } = await request('/test/getRegulateTests')
		setRegulateTests(data)
	}

	const getRegulateTestsForCourse = async id_course => {
		const { data } = await request(
			`/test/getRegulateTestsOfCourse/${id_course}`
		)
		setRegulateTestsOfCourse(data)
	}

	const getSpecialTest = async id_test => {
		const { data } = await request(`/test/getSpecial/${id_test}`)
		setSpecialTest(data)
	}

	const getFullInfoAboutSpecialTest = async id_test => {
		const { data } = await request(`/test/getFullInfo/${id_test}`)
		setSpecialTest(data)
	}

	const createTest = async () => {
		const {
			id_teacher,
			id_course,
			test_name,
			test_description,
			min_question_count,
		} = form
		if (
			id_teacher &&
			id_course.trim().length &&
			test_name.trim().length &&
			test_description.trim().length &&
			min_question_count.trim().length
		) {
			const data = await request('/test/create', 'POST', {
				id_teacher,
				id_course: id_course.trim(),
				test_name: test_name.trim(),
				test_description: test_description.trim(),
				min_question_count: min_question_count.trim(),
			})
			toast[data.type](data.message)
			setCreatedTest(data.data)
			setIsSucces(true)
			return
		} else {
			toast.warn('Заполните пустые поля')
		}
		setIsSucces(true)
	}

	const connectTestWithFlow = async formForTest => {
		const { type, message } = await request(
			`/test/connectWithFlow`,
			'POST',
			formForTest
		)
		toast[type](message)
	}

	const getConnectedTests = async id_flows => {
		const { data } = await request(`test/getConnectedWithFlow/${id_flows}`)
		setConnectedWidthFlowsTests(data)
	}

	return {
		createTest,
		getTests,
		getSpecialTest,
		getRegulateTests,
		getRegulateTestsForCourse,
		connectTestWithFlow,
		getConnectedTests,
		getFullInfoAboutSpecialTest,
		regulateTestsOfCourse,
		connectedWithFlowsTests,
		regulateTests,
		specialTest,
		allTests,
		createdTest,
		isSucces,
	}
}

export default useTest
