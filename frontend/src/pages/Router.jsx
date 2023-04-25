import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './HomePage/HomePage'
import RegisterPage from './RegisterPage/RegisterPage'
import LoginPage from './LoginPage/LoginPage'
import { useSelector } from 'react-redux'

const Router = () => {
	const isAuth = useSelector(state => state.auth.isAuth)
	const user = useSelector(state => state.auth.user)
	const { role } = user

	if (isAuth && role === 4) {
		return (
			<Routes>
				<Route path='/login' element={<Navigate replace to='/' />} />
				<Route path='/register' element={<Navigate replace to='/' />} />
				<Route path='/' element={<HomePage />} />
			</Routes>
		)
	} else {
		return (
			<Routes>
				<Route path='/' element={<Navigate replace to='/login' />} />
				<Route path='/login' element={<LoginPage />} />
				<Route path='/register' element={<RegisterPage />} />
				{/* <Route path='/loginAdmin' element={<LoginAdmin />} /> */}
			</Routes>
		)
	}
}

export default Router
