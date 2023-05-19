import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import useCourse from '../../../../hooks/useCourse'

const ManagerCourseModule = () => {
	const user = useSelector(state => state.auth.user)
	const [isOpenCreateCourseModal, setIsOpenCourseModal] = useState(false)
	const [form, setForm] = useState({
		nameOfCourse: '',
		descriptionOfCourse: '',
	})

	const { getAllCourses, createCourse, allCourses } = useCourse(form, null)

	const change = e => setForm({ ...form, [e.target.name]: e.target.value })
	const handleOpenChangeCourseModal = () => {
		if (user.role === 1) {
			setIsOpenCourseModal(!isOpenCreateCourseModal)
		}
	}

	const handleUploadCourse = async event => {
		event.preventDefault()
		if (user.role === 1) {
			await createCourse()
			handleOpenChangeCourseModal()
		}
	}

	useEffect(() => {
		getAllCourses()
	}, [])

	useEffect(() => {
		getAllCourses()
	}, [isOpenCreateCourseModal])

	return {
		form,
		allCourses,
		isOpenCreateCourseModal,
		user,
		change,
		handleOpenChangeCourseModal,
		handleUploadCourse,
	}
}

export default ManagerCourseModule
