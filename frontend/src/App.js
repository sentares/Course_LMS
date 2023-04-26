import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import useAuth from './hooks/useAuth'
import Router from './router/Router'
import Layout from './layout/Layout'

function App() {
	const isAuth = useSelector(state => state.auth.isAuth)
	const user = useSelector(state => state.auth.user)
	const { checkAuth } = useAuth()

	useEffect(() => {
		checkAuth()
	}, [])

	return (
		<>
			<ToastContainer />
			<Layout>
				<Router user={user} isAuth={isAuth} />
			</Layout>
		</>
	)
}

export default App
