import React from 'react'
import { AiOutlineHome } from 'react-icons/ai'
import { BiMessageDetail, BiTask } from 'react-icons/bi'
import { CgProfile } from 'react-icons/cg'
import { DiJsBadge } from 'react-icons/di'
import { FaChalkboardTeacher, FaRegStar } from 'react-icons/fa'
import { RiSettings5Fill } from 'react-icons/ri'
import { GrTest } from 'react-icons/gr'
import { BsFillPersonFill } from 'react-icons/bs'
import { ImStackoverflow } from 'react-icons/im'
import { useSelector } from 'react-redux'

const MenuLIst = () => {
	const user = useSelector(state => state.auth.user)
	const activeTestsCount = useSelector(
		state => state.activeTests.activeTestsCount
	)

	const { id_teacher } = user

	const menuListStudent = [
		{
			id: 1,
			title: 'Главная',
			link: '/',
			icon: <AiOutlineHome />,
			isActive: true,
		},
		{
			id: 2,
			title: 'Курсы',
			link: '/courses',
			icon: <DiJsBadge />,
			isActive: false,
		},
		{
			id: 3,
			title: 'Мои курсы',
			link: '/myCourses',
			icon: <FaRegStar />,
			isActive: false,
		},
		{
			id: 4,
			title: 'Чат',
			link: '/chat',
			icon: <BiMessageDetail />,
			isActive: false,
			count: '',
		},
		// {
		// 	id: 5,
		// 	title: 'Задания',
		// 	link: '/tasks',
		// 	icon: <BiTask />,
		// 	isActive: false,
		// 	count: '',
		// },
		{
			id: 6,
			title: 'Тесты',
			link: '/testsToPass',
			icon: <BiTask />,
			isActive: false,
			count: '',
		},
		{
			id: 7,
			title: 'Профиль',
			link: '/profile',
			icon: <CgProfile />,
			isActive: false,
		},
		{
			id: 8,
			title: 'Настройки',
			link: '/settings',
			icon: <RiSettings5Fill />,
			isActive: false,
		},
	]

	const updatedMenuListStudent = menuListStudent.map(item => {
		if (item.id === 6) {
			return {
				...item,
				count: activeTestsCount > 0 ? String(activeTestsCount) : '',
			}
		}
		return item
	})

	const menuListGuest = [
		{
			id: 1,
			title: 'Главная',
			link: '/',
			icon: <AiOutlineHome />,
			isActive: true,
		},
		{
			id: 2,
			title: 'Курсы',
			link: '/courses',
			icon: <DiJsBadge />,
			isActive: false,
		},
		{
			id: 7,
			title: 'Настройки',
			link: '/settings',
			icon: <RiSettings5Fill />,
			isActive: false,
		},
	]

	const menuListAdmin = [
		{
			id: 1,
			title: 'Главная',
			link: '/',
			icon: <AiOutlineHome />,
			isActive: true,
		},
		{
			id: 2,
			title: 'Курсы',
			link: '/courses',
			icon: <DiJsBadge />,
			isActive: false,
		},
		{
			id: 3,
			title: 'Преподаватели',
			link: '/teachers',
			icon: <FaChalkboardTeacher />,
			isActive: false,
		},
		{
			id: 7,
			title: 'Настройки',
			link: '/settings',
			icon: <RiSettings5Fill />,
			isActive: false,
		},
	]

	const menuListManager = [
		{
			id: 1,
			title: 'Главная',
			link: '/',
			icon: <AiOutlineHome />,
			isActive: true,
		},
		{
			id: 2,
			title: 'Курсы и потоки',
			link: `/managerCourses`,
			icon: <DiJsBadge />,
			isActive: false,
		},
		{
			id: 3,
			title: 'Студенты',
			link: '/students',
			icon: <BsFillPersonFill />,
			isActive: false,
		},
		{
			id: 4,
			title: 'Материалы',
			link: '/materials',
			icon: <ImStackoverflow />,
			isActive: false,
		},
		{
			id: 5,
			title: 'Тесты',
			link: '/tests',
			icon: <GrTest />,
			isActive: false,
		},
		{
			id: 7,
			title: 'Настройки',
			link: '/settings',
			icon: <RiSettings5Fill />,
			isActive: false,
		},
	]

	const menuListTeacher = [
		{
			id: 1,
			title: 'Главная',
			link: '/',
			icon: <AiOutlineHome />,
			isActive: true,
		},
		{
			id: 2,
			title: 'Мои потоки',
			link: `/teacher/${id_teacher}/flows`,
			icon: <DiJsBadge />,
			isActive: false,
		},
		{
			id: 3,
			title: 'Студенты',
			link: '/students',
			icon: <BsFillPersonFill />,
			isActive: false,
		},
		{
			id: 4,
			title: 'Материалы',
			link: '/materials',
			icon: <ImStackoverflow />,
			isActive: false,
		},
		{
			id: 5,
			title: 'Тесты',
			link: '/tests',
			icon: <GrTest />,
			isActive: false,
		},
		{
			id: 7,
			title: 'Настройки',
			link: '/settings',
			icon: <RiSettings5Fill />,
			isActive: false,
		},
	]

	return {
		updatedMenuListStudent,
		menuListGuest,
		menuListAdmin,
		menuListManager,
		menuListTeacher,
	}
}

export default MenuLIst
