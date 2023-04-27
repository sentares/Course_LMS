import { useState } from 'react'
import { useHttp } from './useHttp'
import { toast } from 'react-toastify'

const useCourse = (form, id_course) => {
	const [allCourses, setAllCourses] = useState(null)
	const [specialCourse, setSpecialCourse] = useState(null)
	const { request } = useHttp()

	const getAllCourses = async () => {
		const { data } = await request('/course')
		setAllCourses(data)
	}

	const createCourse = async () => {
		const { nameOfCourse, descriptionOfCourse } = form
		if (nameOfCourse.trim().length && descriptionOfCourse.trim().length) {
			const { message, type } = await request('/course/create', 'POST', {
				nameOfCourse: nameOfCourse.trim(),
				descriptionOfCourse: descriptionOfCourse.trim(),
			})
			toast[type](message)
		}
	}

	const getSpecialCourse = async () => {
		const { rows } = await request(`/course/getSpecial/${id_course}`)
		console.log(rows)
		setSpecialCourse(rows)
	}

	return {
		getAllCourses,
		getSpecialCourse,
		createCourse,
		allCourses,
		specialCourse,
	}
}

export default useCourse
