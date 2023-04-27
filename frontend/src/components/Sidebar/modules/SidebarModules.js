import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'
import MenuLIst from '../menuList/MenuLIst'

const SidebarModules = () => {
	const isAuth = useSelector(state => state.auth.isAuth)
	const user = useSelector(state => state.auth.user)
	const [nameOfRole, setNameOfRole] = useState('')
	const [menuList, setMenuList] = useState([])
	const { menuListStudent, menuListGuest, menuListAdmin } = MenuLIst()
	const location = useLocation()
	const { logout } = useAuth()
	const currentPath = location.pathname

	const updatedMenuList = menuListStudent.map(menuItem => ({
		...menuItem,
		isActive: menuItem.link === currentPath,
	}))

	const updatedMenuListGuest = menuListGuest.map(menuItem => ({
		...menuItem,
		isActive: menuItem.link === currentPath,
	}))

	const updatedMenuListAdmin = menuListAdmin.map(menuItem => ({
		...menuItem,
		isActive: menuItem.link === currentPath,
	}))

	const checkRole = () => {
		if (!isAuth) {
			setNameOfRole('Гость')
			setMenuList(updatedMenuListGuest)
		} else if (user.role === 4) {
			setNameOfRole('Студент')
			setMenuList(updatedMenuList)
		} else if (user.role === 3) {
			setNameOfRole('Преподаватель')
		} else if (user.role === 2) {
			setNameOfRole('Менеджер')
		} else if (user.role === 1) {
			setNameOfRole('Администратор')
			setMenuList(updatedMenuListAdmin)
		}
	}

	const handleClickItem = clickedItemId => {
		const newMenuItems = menuList.map(menuItem => {
			if (menuItem.id === clickedItemId) {
				return {
					...menuItem,
					isActive: true,
				}
			} else {
				return {
					...menuItem,
					isActive: false,
				}
			}
		})
		setMenuList(prevMenuList => {
			newMenuItems.forEach((newMenuItem, index) => {
				prevMenuList[index] = newMenuItem
			})
			return [...prevMenuList]
		})
	}

	useEffect(() => {
		checkRole()
	}, [user])

	return {
		isAuth,
		menuList,
		nameOfRole,
		handleClickItem,
		logout,
	}
}

export default SidebarModules
