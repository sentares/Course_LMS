import { useState } from 'react'
import { useHttp } from './useHttp'
import { toast } from 'react-toastify'

const useCourse = (form, id_course) => {
	const [allCourses, setAllCourses] = useState(null)
	const [specialCourse, setSpecialCourse] = useState(null)
	const [isDoneFunction, setIsDoneFunction] = useState(false)
	const [teachersCourses, setTeachersCourses] = useState(null)
	const { request } = useHttp()

	const getAllCourses = async () => {
		const { data } = await request('/course')
		setAllCourses(data)
	}

	const createCourse = async () => {
		const { nameOfCourse, descriptionOfCourse } = form
		if (nameOfCourse.trim().length && descriptionOfCourse.trim().length) {
			const { type, message } = await request('/course/create', 'POST', {
				nameOfCourse: nameOfCourse.trim(),
				descriptionOfCourse: descriptionOfCourse.trim(),
			})
			toast[type](message)
			setIsDoneFunction(true)
		}
		toast.warn('Заполните пустые поля')
	}

	const getSpecialCourse = async () => {
		const { data } = await request(`/course/getSpecial/${id_course}`)
		setSpecialCourse(data)
	}

	// const getTeachersCourses = async id_teachers => {
	// 	const { data } = await request(`/course/getTeachersCourse/${id_teachers}`)
	// 	setTeachersCourses(data)
	// }

	return {
		getAllCourses,
		getSpecialCourse,
		createCourse,
		// getTeachersCourses,
		// teachersCourses,
		allCourses,
		isDoneFunction,
		specialCourse,
	}
}

export default useCourse
