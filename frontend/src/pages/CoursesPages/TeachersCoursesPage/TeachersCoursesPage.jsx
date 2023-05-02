import React from 'react'
import TeachersCoursesModule from './module/TeachersCoursesModule'

const TeachersCoursesPage = () => {
	const { teachersCourses } = TeachersCoursesModule()
	console.log(teachersCourses)
	return <div>TeachersCoursesPage</div>
}

export default TeachersCoursesPage
