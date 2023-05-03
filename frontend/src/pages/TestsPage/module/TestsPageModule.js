import { useEffect, useState } from 'react'
import useCourse from '../../../hooks/useCourse'
import { useDispatch, useSelector } from 'react-redux'
import useTest from '../../../hooks/useTest'
import useTeacher from '../../../hooks/useTeacher'
import { setNewTest } from '../../../redux/slices/newTestSlice'

const TestsPageModule = () => {
	const dispatch = useDispatch()

	const user = useSelector(state => state.auth.user)
	const newTest = useSelector(state => state.newTest.newTest)

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
	const { createTest, getTests, allTests, createdTest } = useTest(form)
	const { getAllTeachers, allTeachers } = useTeacher()
	const change = e => setForm({ ...form, [e.target.name]: e.target.value })

	const handleCreateTest = async event => {
		event.preventDefault()
		await createTest()
	}

	const addNewTestToState = async () => {
		if (createTest !== null) {
			dispatch(setNewTest(createdTest))
		}
	}

	useEffect(() => {
		getAllCourses()
		getTests()
		getAllTeachers()
	}, [])

	useEffect(() => {
		getTests()
	}, [isOpenCreateTestModal])

	useEffect(() => {
		addNewTestToState()
		console.log(newTest)
	}, [createTest])

	return {
		handleChangeModal,
		handleCreateTest,
		change,
		allTeachers,
		allCourses,
		allTests,
		isOpenCreateTestModal,
		form,
	}
}

export default TestsPageModule
