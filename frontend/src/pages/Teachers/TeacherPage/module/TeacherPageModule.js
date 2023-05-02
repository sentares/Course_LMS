import { useEffect, useState } from 'react'
import useTeacher from '../../../../hooks/useTeacher'

const TeacherPageModule = () => {
	const [openModal, setOpenModal] = useState(false)
	const [form, setForm] = useState({
		name: '',
		surname: '',
		patronymic: '',
		birthday: '',
		temp_inn: '',
		email: '',
		password: '',
		role: 2,
	})

	const { getAllTeachers, allTeachers, createTeacher } = useTeacher(null, form)

	const change = e => setForm({ ...form, [e.target.name]: e.target.value })

	const handleChangeModal = () => {
		setOpenModal(!openModal)
	}

	const handleUploadTeacher = async event => {
		event.preventDefault()
		await createTeacher()
	}

	useEffect(() => {
		getAllTeachers()
	}, [])

	useEffect(() => {
		getAllTeachers()
	}, [openModal])

	return {
		allTeachers,
		openModal,
		form,
		change,
		handleChangeModal,
		handleUploadTeacher,
	}
}

export default TeacherPageModule
