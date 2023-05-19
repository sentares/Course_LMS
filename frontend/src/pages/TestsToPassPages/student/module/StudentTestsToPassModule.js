import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import useStudent from '../../../../hooks/useStudent'

const StudentTestsToPassModule = () => {
	const user = useSelector(state => state.auth.user)

	const { getPersonalTests, personalTests } = useStudent()

	const formatDate = dateString => {
		const date = new Date(dateString)
		const month = date.toLocaleString('default', { month: 'short' })
		const time = date.toLocaleTimeString([], {
			hour: '2-digit',
			minute: '2-digit',
		})

		return `${date.getDate()} ${month} ${time}`
	}

	useEffect(() => {
		getPersonalTests(user.id_student)
	}, [])

	return { personalTests, formatDate }
}

export default StudentTestsToPassModule
