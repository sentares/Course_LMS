import { useEffect, useState } from 'react'
import useCourse from '../../../../hooks/useCourse'
import { useSelector } from 'react-redux'

const CoursesPageModule = () => {
	const user = useSelector(state => state.auth.user)
	const [isOpenCreateCourseModal, setIsOpenCourseModal] = useState(false)
	const [form, setForm] = useState({
		nameOfCourse: '',
		descriptionOfCourse: '',
	})

	const { getAllCourses, createCourse, allCourses } = useCourse(form, null)

	const change = e => setForm({ ...form, [e.target.name]: e.target.value })
	const handleOpenChangeCourseModal = () => {
		setIsOpenCourseModal(!isOpenCreateCourseModal)
	}

	const handleUploadCourse = async event => {
		event.preventDefault()
		await createCourse()
		handleOpenChangeCourseModal()
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

export default CoursesPageModule
