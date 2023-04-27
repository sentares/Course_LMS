import React from 'react'
import styles from './styles.module.scss'
import SpecialCourseModule from './module/SpecialCourseModule'

const SpecialCoursePage = () => {
	const { specialCourse } = SpecialCourseModule()
	console.log(specialCourse)
	return <div>SpecialCoursePage</div>
}

export default SpecialCoursePage
