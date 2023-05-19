import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import usePassingTest from '../hooks/usePassingTest'

const TESTPAGE = () => {
	const { infoAboutTestPassing, questionsOfTest } = useSelector(
		state => state.testPassing
	)
	const id_test = 117

	const { getQuestionsForStudentTest } = usePassingTest()
	console.log(questionsOfTest)

	useEffect(() => {
		getQuestionsForStudentTest(id_test)
	}, [])

	return <div>TESTPAGE</div>
}

export default TESTPAGE
