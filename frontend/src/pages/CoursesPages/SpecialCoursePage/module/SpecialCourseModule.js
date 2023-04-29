import { useParams } from 'react-router-dom'
import useCourse from '../../../../hooks/useCourse'
import { useEffect, useState } from 'react'
import useFlows from '../../../../hooks/useFlows'
import useTeahcer from '../../../../hooks/useTeacher'

const SpecialCourseModule = () => {
	const params = useParams()
	const { id_course } = params

	const [isOpenModal, setIsOpenModal] = useState(false)
	const [form, setForm] = useState({
		flows_name: '',
		date_register: '',
		date_start: '',
		date_end: '',
		price: '',
		id_teacher: '',
		count_of_seats: '',
		activ: false,
	})

	const { getSpecialCourse, specialCourse } = useCourse(null, id_course)
	const { getAllTeachers, allTeachers } = useTeahcer()

	const {
		allFlowsOfCourse,
		isDoneFunction,
		createCourseFlow,
		getAllCourseFlows,
	} = useFlows(id_course, form)

	const handleChangeModal = async () => {
		setIsOpenModal(!isOpenModal)
		await getAllTeachers()
	}

	const change = e => setForm({ ...form, [e.target.name]: e.target.value })

	const handleCreateFlow = async event => {
		event.preventDefault()
		await createCourseFlow()
		handleChangeModal()
	}

	useEffect(() => {
		getAllCourseFlows()
		getSpecialCourse()
	}, [])

	useEffect(() => {
		getAllCourseFlows()
	}, [isOpenModal])

	return {
		form,
		isOpenModal,
		specialCourse,
		allFlowsOfCourse,
		allTeachers,
		handleChangeModal,
		change,
		handleCreateFlow,
	}
}

export default SpecialCourseModule
