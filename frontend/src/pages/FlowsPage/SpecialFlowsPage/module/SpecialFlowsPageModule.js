import { useNavigate, useParams } from 'react-router-dom'
import useFlows from '../../../../hooks/useFlows'
import useTeacher from '../../../../hooks/useTeacher'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import useStudent from '../../../../hooks/useStudent'

const SpecialFlowsPageModule = () => {
	const user = useSelector(state => state.auth.user)
	const { role } = user
	const navigate = useNavigate()
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

	const params = useParams()
	const { id_flows } = params

	const { getSpecialCourseFlows, specialFlows } = useFlows(null, null, id_flows)
	const { getSpecialTeacher, getAllTeachers, allTeachers, specialTeahcer } =
		useTeacher(specialFlows ? specialFlows.id_teacher : null)
	const { addStudentToCourseFlows } = useStudent()

	const change = e => setForm({ ...form, [e.target.name]: e.target.value })
	const handlePressChangeDate = () => {
		setIsPressChange(!isPressChange)
	}

	const handleClickRegisterCourse = async event => {
		event.preventDefault()
		if (role === 4) {
			await addStudentToCourseFlows(user.id_student, id_flows)
		} else {
			toast.warn('Войдите в свой аккаунт или пройдите регистрацию')
			navigate('/login')
		}
	}

	useEffect(() => {
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
		role,
		change,
		handlePressChangeDate,
		handleClickRegisterCourse,
	}
}

export default SpecialFlowsPageModule
