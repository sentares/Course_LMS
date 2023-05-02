import { useParams } from 'react-router-dom'
import useFlows from '../../../../hooks/useFlows'
import useTeacher from '../../../../hooks/useTeacher'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

const SpecialFlowsPageModule = () => {
	const user = useSelector(state => state.auth.user)
	const { role } = user

	const [form, setForm] = useState({
		activ: '',
		count_of_seats: '',
		date_end: '',
		date_register: '',
		date_start: '',
		flows_name: '',
		id_course: '',
		id_flows: '',
		id_teacher: '',
		price: '',
	})
	const [isPressChange, setIsPressChange] = useState(false)
	const [isAdmin, setIsAdmin] = useState(false)

	const params = useParams()
	const { id_flows } = params
	const checkIsAdmin = async () => {
		if (role === 1) {
			setIsAdmin(true)
		}
	}

	const { getSpecialCourseFlows, specialFlows } = useFlows(null, null, id_flows)
	const { getSpecialTeacher, getAllTeachers, allTeachers, specialTeahcer } =
		useTeacher(specialFlows ? specialFlows.id_teacher : null)

	const change = e => setForm({ ...form, [e.target.name]: e.target.value })
	const handlePressChangeDate = () => {
		setIsPressChange(!isPressChange)
	}

	useEffect(() => {
		checkIsAdmin()
		getSpecialCourseFlows()
		getAllTeachers()
	}, [])

	useEffect(() => {
		if (specialFlows && specialFlows.id_teacher) {
			getSpecialTeacher(specialFlows.id_teacher)
			setForm(specialFlows)
		}
	}, [specialFlows])

	return {
		specialFlows,
		specialTeahcer,
		form,
		allTeachers,
		isPressChange,
		isAdmin,
		change,
		handlePressChangeDate,
	}
}

export default SpecialFlowsPageModule
