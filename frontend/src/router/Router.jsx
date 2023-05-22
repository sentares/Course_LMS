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
import SpecialFlowsPage from '../pages/FlowsPage/SpecialFlowsPage/SpecialFlowsPage'
import LoginTeacherPage from '../pages/AuthPages/LoginTeacherPage/LoginTeacherPage'
import TeacherFlowsPage from '../pages/FlowsPage/TeacherFlowsPage/TeacherFlowsPage'
import TeachersCoursesPage from '../pages/CoursesPages/TeachersCoursesPage/TeachersCoursesPage'
import TestsPage from '../pages/TestsPage/TestsPage/TestsPage'
import SpecialTestPage from '../pages/TestsPage/SpecialTestPage/SpecialTestPage'
import StudentCoursePage from '../pages/StudentsFollowsPages/StudentCoursesPage/StudentCoursePage'
import SpecialCourseOfStudentPage from '../pages/StudentsFollowsPages/SpecialCourseOfStudentPage/SpecialCourseOfStudentPage'
import ManagerCoursePage from '../pages/CoursesPages/ManagerCoursePage/ManagerCoursePage'
import TestsToPassPages from '../pages/TestsToPassPages/TestsToPassPages'
import SpecialTestToPass from '../pages/TestsToPassPages/SpecialTestToPass/SpecialTestToPass'
import StartPassTestPage from '../pages/StartPassTestPage/StartPassTestPage'
import TESTPAGE from '../TESTPAGE/TESTPAGE'
import TimerComponent from '../TESTPAGE/TESTPAGE'

const Router = ({ user, isAuth }) => {
	const { role } = user

	if (isAuth && role === 4) {
		return (
			<Routes>
				<Route path='/login' element={<Navigate replace to='/' />} />
				<Route path='/register' element={<Navigate replace to='/' />} />
				<Route path='/' element={<HomePage />} />
				<Route path='/courses' element={<CoursesPage />} />
				<Route path='/courses/:id_course' element={<SpecialCoursePage />} />
				<Route path='/coursesFlows/:id_flows' element={<SpecialFlowsPage />} />
				<Route path='/myCourses' element={<StudentCoursePage />} />
				<Route
					path='/myCourses/:id_flows'
					element={<SpecialCourseOfStudentPage />}
				/>
				<Route path='/testsToPass' element={<TestsToPassPages />} />
				<Route path='/testsToPass/:id_test' element={<SpecialTestToPass />} />
				<Route path='/startPassTest/:id_test' element={<StartPassTestPage />} />
				<Route path='/pagination' element={<TimerComponent />} />
			</Routes>
		)
	} else if (isAuth && role === 1) {
		return (
			<Routes>
				<Route path='/loginAdmin' element={<Navigate replace to='/' />} />
				<Route path='/courses' element={<CoursesPage />} />
				<Route path='/courses/:id_course' element={<SpecialCoursePage />} />
				<Route path='/coursesFlows/:id_flows' element={<SpecialFlowsPage />} />
				<Route path='/teachers' element={<TeacherPage />} />
				<Route path='/teachers/:id_teacher' element={<SpecialTeacherPage />} />
				<Route path='/' element={<HomePage />} />
			</Routes>
		)
	} else if (isAuth && role === 2) {
		return (
			<Routes>
				<Route path='/loginTeacher' element={<Navigate replace to='/' />} />
				<Route path='/managerCourses' element={<ManagerCoursePage />} />
				<Route
					path='/managerCourses/:id_course'
					element={<SpecialCoursePage />}
				/>
				<Route path='/coursesFlows/:id_flows' element={<SpecialFlowsPage />} />
				<Route path='/tests' element={<TestsPage />} />
				<Route path='/tests/:id_test' element={<SpecialTestPage />} />
				<Route path='/' element={<HomePage />} />
			</Routes>
		)
	} else if (isAuth && role === 3) {
		return (
			<Routes>
				<Route path='/loginTeacher' element={<Navigate replace to='/' />} />
				<Route
					path='/teacher/:id_teacher/flows'
					element={<TeacherFlowsPage />}
				/>
				<Route
					path='/teacher/:id_teacher/courses'
					element={<TeachersCoursesPage />}
				/>
				<Route
					path='/teacher/:id_teacher/flows/:id_flows'
					element={<SpecialFlowsPage />}
				/>
				<Route path='/tests' element={<TestsPage />} />
				<Route path='/tests/:id_test' element={<SpecialTestPage />} />
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
				<Route path='/courses/:id_course' element={<SpecialCoursePage />} />
				<Route path='/coursesFlows/:id_flows' element={<SpecialFlowsPage />} />
				<Route path='/loginAdmin' element={<LoginAdminPage />} />
				<Route path='/loginTeacher' element={<LoginTeacherPage />} />
			</Routes>
		)
	}
}

export default Router
