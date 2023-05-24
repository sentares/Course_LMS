import { useNavigate, useParams } from 'react-router-dom'
import useFlows from '../../../../hooks/useFlows'
import useTeacher from '../../../../hooks/useTeacher'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import useStudent from '../../../../hooks/useStudent'
import useTest from '../../../../hooks/useTest'

const SpecialFlowsPageModule = () => {
	const navigate = useNavigate()
	const params = useParams()
	const user = useSelector(state => state.auth.user)

	const { role } = user
	const { id_flows } = params

	const [isPressChange, setIsPressChange] = useState(false)
	const [isOpenStudentsModal, setIsOpenStudentsModal] = useState(false)
	const [isOpenAddTestModal, setIsOpenAddTestModal] = useState(false)
	const [studentsIds, setStudentsIds] = useState(null)
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

	const [formForActivateStudents, setFormForActivateStudents] = useState([])
	const [formForTest, setFormForTest] = useState({
		id_course: '',
		id_flows: id_flows,
		id_test: '',
		date_begin_test: '',
		date_end_test: '',
		choseStudentsIds: [],
	})

	const {
		getSpecialCourseFlows,
		getStudentsOfFlow,
		activateStudentsOfFLow,
		specialFlows,
		courseAndStudentsConnect,
	} = useFlows(null, null)

	const { getSpecialTeacher, getAllTeachers, allTeachers, specialTeacher } =
		useTeacher(specialFlows?.id_teacher)

	const {
		addStudentToCourseFlows,
		checkIsStudentAdded,
		getStudentsByFlowConnect,
		arrOfFlowsStudents,
		isAdded,
	} = useStudent()

	const {
		getRegulateTestsForCourse,
		connectTestWithFlow,
		getConnectedTests,
		regulateTestsOfCourse,
		connectedWithFlowsTests,
	} = useTest()

	const change = e => setForm({ ...form, [e.target.name]: e.target.value })

	const changeFormForTest = e => {
		const { name, value, checked, type } = e.target
		if (type === 'checkbox') {
			if (name === 'choseStudentsIds') {
				if (checked) {
					const selectedStudents = arrOfFlowsStudents.map(
						student => student.id_student
					)
					setFormForTest({
						...formForTest,
						choseStudentsIds: selectedStudents.map(Number),
					})
				} else {
					setFormForTest({ ...formForTest, choseStudentsIds: [] })
				}
			} else {
				const studentId = Number(name)
				const selectedStudents = checked
					? [...formForTest.choseStudentsIds, studentId]
					: formForTest.choseStudentsIds.filter(id => id !== studentId)

				setFormForTest({ ...formForTest, choseStudentsIds: selectedStudents })
			}
		} else {
			setFormForTest({
				...formForTest,
				[name]: value,
				id_course: specialFlows?.id_course,
			})
		}
	}

	const changeFormForActivateStudents = (event, studentId) => {
		const checked = event.target.checked
		if (studentId === 'selectAll') {
			if (checked) {
				const allStudentIds = arrOfFlowsStudents.map(
					student => student.id_student
				)
				setFormForActivateStudents(allStudentIds)
			} else {
				setFormForActivateStudents([])
			}
		} else {
			if (checked) {
				setFormForActivateStudents(prevState => [...prevState, studentId])
			} else {
				setFormForActivateStudents(prevState =>
					prevState.filter(id => id !== studentId)
				)
			}
		}
	}

	const handlePressChangeDate = () => {
		setIsPressChange(!isPressChange)
	}

	const handleClickRegisterCourse = async event => {
		event.preventDefault()
		if (role === 4) {
			await addStudentToCourseFlows(
				user.id_student,
				id_flows,
				specialFlows.id_course
			)
		} else {
			toast.warn('Войдите в свой аккаунт или пройдите регистрацию')
			navigate('/login')
		}
	}

	const changeStudentsModal = async event => {
		event.preventDefault()
		await getStudentsByFlowConnect(studentsIds)
		setIsOpenStudentsModal(!isOpenStudentsModal)
	}

	const changeOpenAddTestModal = async event => {
		event.preventDefault()
		await filterAndGetActivateStudents(courseAndStudentsConnect)
		await getRegulateTestsForCourse(specialFlows.id_course)
		setIsOpenAddTestModal(!isOpenAddTestModal)
	}

	const getIdStudentsArray = courseAndStudentsConnect => {
		if (courseAndStudentsConnect) {
			let idStudentsArray = courseAndStudentsConnect.map(function (student) {
				return student.id_student
			})
			setStudentsIds(idStudentsArray)
		}
	}

	const filterAndGetActivateStudents = async courseAndStudentsConnect => {
		if (courseAndStudentsConnect) {
			const activeStudents = courseAndStudentsConnect
				.filter(student => student.is_active)
				.map(student => student.id_student)
			await getStudentsByFlowConnect(activeStudents)
		}
	}

	const handleSaveActivatedStudents = async event => {
		if (!formForActivateStudents.length) {
			toast.warn('Никто из студентов не активирован')
		} else {
			event.preventDefault()
			await activateStudentsOfFLow(id_flows, formForActivateStudents)
			setIsOpenStudentsModal(false)
			getConnectedTests(id_flows)
		}
	}

	const handleSaveConnectTestWithFlow = async e => {
		e.preventDefault()
		const {
			id_course,
			id_flows,
			id_test,
			date_begin_test,
			date_end_test,
			choseStudentsIds,
		} = formForTest

		if (
			id_course !== '' &&
			id_flows !== '' &&
			id_test !== '' &&
			choseStudentsIds.length > 0 &&
			date_begin_test &&
			date_end_test &&
			isValidDate(date_begin_test) &&
			isValidDate(date_end_test) &&
			isStartDateValid(date_begin_test, date_end_test)
		) {
			await connectTestWithFlow(formForTest)
			setIsOpenAddTestModal(!isOpenAddTestModal)
		} else {
			if (id_course === '') {
				toast.warn('Пожалуйста, выберите курс')
			} else if (id_flows === '') {
				toast.warn('Пожалуйста, выберите поток')
			} else if (id_test === '') {
				toast.warn('Пожалуйста, выберите тест')
			} else if (choseStudentsIds.length === 0) {
				toast.warn('Пожалуйста, выберите хотя бы одного студента')
			} else if (!date_begin_test || !date_end_test) {
				toast.warn('Пожалуйста, заполните даты начала и окончания')
			} else if (!isValidDate(date_begin_test)) {
				toast.warn('Пожалуйста, введите корректную дату начала')
			} else if (!isValidDate(date_end_test)) {
				toast.warn('Пожалуйста, введите корректную дату окончания')
			} else if (!isStartDateValid(date_begin_test, date_end_test)) {
				toast.warn(
					'Разница между началом и окончанием теста должна составлять минимум 2 минуты'
				)
			}
		}
	}

	const isValidDate = value => {
		const date = new Date(value)
		return !isNaN(date.getTime())
	}

	const isStartDateValid = (startDate, endDate) => {
		const start = new Date(startDate)
		const end = new Date(endDate)
		const timeDiffInMinutes = Math.floor((end - start) / 60000)
		return start <= end && timeDiffInMinutes >= 2
	}

	useEffect(() => {
		getSpecialCourseFlows(id_flows)
		getAllTeachers()
	}, [])

	useEffect(() => {
		if (specialFlows && specialFlows.id_teacher) {
			getSpecialTeacher(specialFlows.id_teacher)
			setForm(specialFlows)
			checkIsStudentAdded(user.id_student, id_flows)
			getStudentsOfFlow(id_flows)
			getConnectedTests(id_flows)
		}
	}, [specialFlows])

	useEffect(() => {
		getIdStudentsArray(courseAndStudentsConnect)
	}, [courseAndStudentsConnect])

	useEffect(() => {
		if (specialFlows) {
			getConnectedTests(id_flows)
		}
	}, [isOpenAddTestModal])

	useEffect(() => {
		if (courseAndStudentsConnect) {
			const activeStudents = courseAndStudentsConnect
				.filter(student => student.is_active)
				.map(student => student.id_student)
			setFormForActivateStudents(activeStudents)
		}
	}, [courseAndStudentsConnect])

	return {
		specialFlows,
		specialTeacher,
		form,
		allTeachers,
		isPressChange,
		role,
		isAdded,
		isOpenAddTestModal,
		formForTest,
		regulateTestsOfCourse,
		arrOfFlowsStudents,
		connectedWithFlowsTests,
		isOpenStudentsModal,
		formForActivateStudents,
		change,
		changeFormForTest,
		changeStudentsModal,
		changeFormForActivateStudents,
		handlePressChangeDate,
		handleClickRegisterCourse,
		changeOpenAddTestModal,
		handleSaveConnectTestWithFlow,
		handleSaveActivatedStudents,
	}
}

export default SpecialFlowsPageModule
