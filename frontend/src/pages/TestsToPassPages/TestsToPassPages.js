import React from 'react'
import { useSelector } from 'react-redux'
import StudentTestsToPass from './student/StudentTestsToPass'

const TestsToPassPages = () => {
	const user = useSelector(state => state.auth.user)
	const isAuth = useSelector(state => state.auth.isAuth)
	const { role } = user

	return (
		<div>
			{isAuth && role === 4 && <StudentTestsToPass />}
			{isAuth && role === 3 && <div></div>}
			{isAuth && role === 2 && <div></div>}
			{isAuth && role === 1 && <div></div>}
		</div>
	)
}

export default TestsToPassPages
