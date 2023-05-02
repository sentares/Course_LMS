import { useEffect, useState } from 'react'
import useCourse from '../../../hooks/useCourse'
import { useSelector } from 'react-redux'
import useTest from '../../../hooks/useTest'

const TestsPageModule = () => {
	const user = useSelector(state => state.auth.user)
	const { id_teacher } = user

	const [isOpenCreateTestModal, setIsOpenCreateTestModal] = useState(false)
	const [form, setForm] = useState({
		id_teacher: id_teacher,
		id_course: '',
		test_name: '',
		test_description: '',
		question_count: '',
	})

	const handleChangeModal = () => {
		setIsOpenCreateTestModal(!isOpenCreateTestModal)
	}

	const { getAllCourses, allCourses } = useCourse()
	const { createTest, getTests, allTests } = useTest(form)

	const change = e => setForm({ ...form, [e.target.name]: e.target.value })

	const handleCreateTest = async event => {
		event.preventDefault()
		await createTest()
	}

	useEffect(() => {
		getAllCourses()
		getTests()
	}, [])

	return {
		handleChangeModal,
		handleCreateTest,
		change,
		allCourses,
		isOpenCreateTestModal,
		form,
	}
}

export default TestsPageModule
