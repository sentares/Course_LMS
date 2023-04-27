import React from 'react'
import SpecialTeacherModule from './module/SpecialTeacherModule'
import { useParams } from 'react-router-dom'
import TeacherPageModule from '../TeacherPage/module/TeacherPageModule'
import styles from './styles.module.scss'

const SpecialTeacherPage = () => {
	const { id_teacher } = SpecialTeacherModule()

	return <div>SpecialTeacherPage</div>
}

export default SpecialTeacherPage
