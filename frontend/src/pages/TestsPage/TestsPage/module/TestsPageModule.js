import { useEffect, useState } from 'react'
import useCourse from '../../../../hooks/useCourse'
import useTest from '../../../../hooks/useTest'
import useTeacher from '../../../../hooks/useTeacher'
import { useDispatch, useSelector } from 'react-redux'
import { setNewTest } from '../../../../redux/slices/newTestSlice'

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
		min_question_count: '',
	})

	const { getAllCourses, allCourses } = useCourse()
	const { createTest, getTests, allTests, createdTest, isSucces } =
		useTest(form)
	const { getAllTeachers, allTeachers } = useTeacher()

	const change = e => setForm({ ...form, [e.target.name]: e.target.value })
	const handleChangeModal = () => {
		setIsOpenCreateTestModal(!isOpenCreateTestModal)
	}

	const handleCreateTest = async event => {
		event.preventDefault()
		await createTest()
		if (isSucces) {
			await handleChangeModal()
		}
	}

	const addNewTestToState = async () => {
		if (createdTest !== null) {
			dispatch(setNewTest(createdTest))
		}
	}

	const getTestsOfUser = async () => {
		if (user) {
			await getTests(user)
		}
		return
	}

	useEffect(() => {
		getAllCourses()
		getAllTeachers()
	}, [])

	useEffect(() => {
		getTestsOfUser()
	}, [user])

	useEffect(() => {
		getTests(user)
	}, [isOpenCreateTestModal])

	useEffect(() => {
		addNewTestToState()
	}, [createdTest])

	return {
		handleChangeModal,
		handleCreateTest,
		change,
		allTeachers,
		newTest,
		allCourses,
		allTests,
		isOpenCreateTestModal,
		form,
	}
}

export default TestsPageModule
