import React from 'react'
import { useSelector } from 'react-redux'
import StudentHomePage from './student/StudentHomePage'

const HomePage = () => {
	const isAuth = useSelector(state => state.auth.isAuth)
	const user = useSelector(state => state.auth.user)
	const { role } = user
	console.log(role)
	return (
		<div>
			{isAuth && role === 4 && <StudentHomePage />}
			{isAuth && role === 3 && <div></div>}
			{isAuth && role === 2 && <div></div>}
			{isAuth && role === 1 && <div></div>}
		</div>
	)
}

export default HomePage
