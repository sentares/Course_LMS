import React from 'react'
import { useLocation } from 'react-router-dom'
import Sidebar from '../components/Sidebar/Sidebar'

const Layout = props => {
	const { children } = props
	const { pathname } = useLocation()

	return (
		<div>
			{pathname === '/register' || pathname === '/login' ? (
				<div>{children}</div>
			) : (
				<div>
					<Sidebar />
					<div>{children}</div>
				</div>
			)}
		</div>
	)
}

export default Layout
