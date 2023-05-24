import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import useStudent from '../../../../hooks/useStudent'
import usePassingTest from '../../../../hooks/usePassingTest'

const StudentTestsToPassModule = () => {
	const user = useSelector(state => state.auth.user)

	const { getPersonalTests, personalTests } = useStudent()
	const { getStudentResultsOfTest, arrOfTestResult } = usePassingTest()

	const fetchData = async data => {
		for (let i = 0; i < data.length; i++) {
			const { id_student, id_test } = data[i]
			await getStudentResultsOfTest(id_student, id_test)
		}
	}

	const formatDate = dateString => {
		const date = new Date(dateString)
		const month = date.toLocaleString('default', { month: 'short' })
		const time = date.toLocaleTimeString([], {
			hour: '2-digit',
			minute: '2-digit',
		})

		return `${date.getDate()} ${month} ${time}`
	}

	// const checkAndUpdateTest = () => {
	// 	const updatedPersonalTests = personalTests?.map(test => {
	// 		const matchingResult = arrOfTestResult.find(
	// 			result => result.id_test === test.id_test
	// 		)
	// 		if (matchingResult && matchingResult.status) {
	// 			return { ...test, statusOfPass: matchingResult.status }
	// 		}
	// 		return test
	// 	})

	// 	console.log(updatedPersonalTests)
	// }

	// useEffect(() => {
	// 	if ((personalTests, arrOfTestResult)) {
	// 		checkAndUpdateTest()
	// 	}
	// }, [personalTests, arrOfTestResult])

	useEffect(() => {
		if (personalTests) {
			fetchData(personalTests)
		}
	}, [personalTests])

	useEffect(() => {
		getPersonalTests(user.id_student)
	}, [])

	return { personalTests, formatDate }
}

export default StudentTestsToPassModule
