import React from 'react'
import { useLocation } from 'react-router-dom'
import Sidebar from '../components/Sidebar/Sidebar'

const Layout = props => {
	const { children } = props
	const { pathname } = useLocation()

	return (
		<>
			{pathname === '/register' ||
			pathname === '/login' ||
			pathname === '/loginAdmin' ||
			pathname === '/loginTeacher' ||
			pathname.startsWith('/startPassTest/') ? (
				<>{children}</>
			) : (
				<div className='flex w-full'>
					<Sidebar />
					<div className=''>{children}</div>
				</div>
			)}
		</>
	)
}

export default Layout
