import { useState } from 'react'
import { toast } from 'react-toastify'
import { useHttp } from './useHttp'

const useFlows = (id_course, form, id_teacher) => {
	const [allFlowsOfCourse, setAllFlowsOfCourse] = useState(null)
	const [isDoneFunction, setIsDoneFunction] = useState(null)
	const [specialFlows, setSpesialFlows] = useState(null)
	const [teachersFlows, setTeachersFlows] = useState(null)
	const [courseAndStudentsConnect, setCourseAndStudentsConnect] = useState(null)

	const { request } = useHttp()

	const getAllCourseFlows = async () => {
		try {
			const { data } = await request(`/courseFlows/getOfCourse/${id_course}`)
			setAllFlowsOfCourse(data)
		} catch (e) {
			console.log(e)
		}
	}

	const getSpecialCourseFlows = async id_flows => {
		try {
			const { data } = await request(`/courseFlows/getSpecial/${id_flows}`)
			setSpesialFlows(data)
		} catch (e) {
			console.log(e)
		}
	}

	const getFlowsOfTeacher = async () => {
		try {
			const { data } = await request(
				`/courseFlows/getTeachersFlows/${id_teacher}`
			)
			setTeachersFlows(data)
		} catch (e) {
			console.log(e)
		}
	}

	const getStudentsOfFlow = async id_flows => {
		try {
			const { data } = await request(
				`/courseFlows/getStudentsOfFlow/${id_flows}`
			)
			setCourseAndStudentsConnect(data)
		} catch (e) {
			console.log(e)
		}
	}

	const createCourseFlow = async () => {
		try {
			const {
				flows_name,
				date_register,
				date_start,
				date_end,
				price,
				id_teacher,
				count_of_seats,
				activ,
			} = form

			if (
				flows_name.trim().length &&
				date_register.trim().length &&
				date_start.trim().length &&
				date_end.trim().length &&
				price.trim().length &&
				id_teacher.trim().length &&
				count_of_seats.trim().length
			) {
				const { type, message } = await request(
					`/courseFlows/create/${id_course}`,
					'POST',
					{
						flows_name: flows_name.trim(),
						date_register: date_register.trim(),
						date_start: date_start.trim(),
						date_end: date_end.trim(),
						price: price.trim(),
						id_teacher: id_teacher.trim(),
						count_of_seats: count_of_seats.trim(),
						activ,
					}
				)
				toast[type](message)
				setIsDoneFunction(message)
			}

			toast.warn('Заполните пустые поля')
		} catch (e) {
			console.log(e)
		}
	}

	const activateStudentsOfFLow = async (id_flows, arrOfIdStudents) => {
		try {
			const { type, message } = await request(
				`/studentsFollows/activateStudents/${id_flows}`,
				'PUT',
				{
					arrOfIdStudents,
				}
			)
			toast[type](message)
		} catch (e) {
			console.log(e)
		}
	}

	return {
		isDoneFunction,
		allFlowsOfCourse,
		specialFlows,
		teachersFlows,
		courseAndStudentsConnect,
		createCourseFlow,
		getAllCourseFlows,
		getSpecialCourseFlows,
		getFlowsOfTeacher,
		getStudentsOfFlow,
		activateStudentsOfFLow,
	}
}

export default useFlows
