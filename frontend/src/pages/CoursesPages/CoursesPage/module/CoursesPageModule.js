import { useEffect, useState } from 'react'
import useCourse from '../../../../hooks/useCourse'

const CoursesPageModule = () => {
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
		change,
		handleOpenChangeCourseModal,
		handleUploadCourse,
	}
}

export default CoursesPageModule
