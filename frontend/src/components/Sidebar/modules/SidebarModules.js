import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'
import MenuLIst from '../menuList/MenuLIst'
import useStudent from '../../../hooks/useStudent'
import { setActiveTestsCount } from '../../../redux/slices/activeTestsSlice'

const SidebarModules = () => {
	const isAuth = useSelector(state => state.auth.isAuth)
	const user = useSelector(state => state.auth.user)
	const activeTestsCount = useSelector(
		state => state.activeTests.activeTestsCount
	)

	const dispatch = useDispatch()
	const location = useLocation()
	const currentPath = location.pathname

	const [nameOfRole, setNameOfRole] = useState('')
	const [menuList, setMenuList] = useState([])
	const {
		updatedMenuListStudent,
		menuListGuest,
		menuListAdmin,
		menuListManager,
		menuListTeacher,
	} = MenuLIst()

	const { logout } = useAuth()
	const { getPersonalActiveTestsCount, countOfActiveTest } = useStudent()

	const updatedMenuList = updatedMenuListStudent.map(menuItem => ({
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

	const updatedMenuListManager = menuListManager.map(menuItem => ({
		...menuItem,
		isActive: menuItem.link === currentPath,
	}))

	const updatedMenuListTeacher = menuListTeacher.map(menuItem => ({
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
			setNameOfRole(`Преподаватель ${user.name}`)
			setMenuList(updatedMenuListTeacher)
		} else if (user.role === 2) {
			setNameOfRole(`Менеджер ${user.name}`)
			setMenuList(updatedMenuListManager)
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
		if (user.role === 4) {
			getPersonalActiveTestsCount(user.id_student)
		}
	}, [user])

	useEffect(() => {
		if (countOfActiveTest > 0) {
			dispatch(setActiveTestsCount(countOfActiveTest))
		}
		return
	}, [countOfActiveTest])

	// useEffect(() => {
	// 	const updatedMenuListWithCount = updatedMenuListStudent.map(menuItem => {
	// 		if (menuItem.id === 6) {
	// 			return {
	// 				...menuItem,
	// 				// isActive: menuItem.link === currentPath,
	// 				count: activeTestsCount > 0 ? String(activeTestsCount) : '',
	// 			}
	// 		}
	// 		return menuItem
	// 	})

	// 	setMenuList(updatedMenuListWithCount)
	// }, [activeTestsCount])

	return {
		isAuth,
		menuList,
		nameOfRole,
		handleClickItem,
		logout,
	}
}

export default SidebarModules
