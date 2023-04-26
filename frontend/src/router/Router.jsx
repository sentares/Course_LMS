import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from '../pages/HomePage/HomePage'
import RegisterPage from '../pages/RegisterPage/RegisterPage'
import LoginPage from '../pages/LoginPage/LoginPage'
import CoursesPage from '../pages/CoursesPage/CoursesPage'
import LikedPage from '../pages/LikedPage/LikedPage'

const Router = ({ user, isAuth }) => {
	const { role } = user

	if (isAuth && role === 4) {
		return (
			<Routes>
				<Route path='/login' element={<Navigate replace to='/' />} />
				<Route path='/register' element={<Navigate replace to='/' />} />
				<Route path='/' element={<HomePage />} />
				<Route path='/courses' element={<CoursesPage />} />
				<Route path='/liked' element={<LikedPage />} />
			</Routes>
		)
	} else {
		return (
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/login' element={<LoginPage />} />
				<Route path='/register' element={<RegisterPage />} />
				{/* <Route path='/loginAdmin' element={<LoginAdmin />} /> */}
			</Routes>
		)
	}
}

export default Router
