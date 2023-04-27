import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from '../pages/HomePage/HomePage'
import LikedPage from '../pages/LikedPage/LikedPage'
import LoginAdminPage from '../pages/AuthPages/LoginAdminPage/LoginAdminPage'
import RegisterPage from '../pages/AuthPages/RegisterPage/RegisterPage'
import LoginPage from '../pages/AuthPages/LoginPage/LoginPage'
import TeacherPage from '../pages/Teachers/TeacherPage/TeacherPage'
import SpecialTeacherPage from '../pages/Teachers/SpecialTeacherPage/SpecialTeacherPage'
import CoursesPage from '../pages/CoursesPages/CoursesPage/CoursesPage'
import SpecialCoursePage from '../pages/CoursesPages/SpecialCoursePage/SpecialCoursePage'

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
	} else if (isAuth && role === 1) {
		return (
			<Routes>
				<Route path='/loginAdmin' element={<Navigate replace to='/' />} />
				<Route path='/courses' element={<CoursesPage />} />
				<Route path='/courses/:id_course' element={<SpecialCoursePage />} />
				<Route path='/teachers' element={<TeacherPage />} />
				<Route path='/teachers/:id_teacher' element={<SpecialTeacherPage />} />
				<Route path='/' element={<HomePage />} />
			</Routes>
		)
	} else {
		return (
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/login' element={<LoginPage />} />
				<Route path='/register' element={<RegisterPage />} />
				<Route path='/courses' element={<CoursesPage />} />
				<Route path='/loginAdmin' element={<LoginAdminPage />} />
			</Routes>
		)
	}
}

export default Router
