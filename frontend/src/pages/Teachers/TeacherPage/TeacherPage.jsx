import React from 'react'
import styles from './styles.module.scss'
import { Link } from 'react-router-dom'
import TeacherPageModule from './module/TeacherPageModule'

const TeacherPage = () => {
	const { allTeachers } = TeacherPageModule()
	return (
		<div className={styles.TeacherPage}>
			<div>
				{allTeachers && (
					<div>
						{allTeachers.map(teacher => (
							<Link
								to={`/teachers/${teacher.id_teacher}`}
								key={teacher.id_teacher}
								className={styles.teacherItem}
							>
								<div>
									<div className={styles.name}>
										{teacher.name} {teacher.surname} {teacher.patronymic}
									</div>
									<div className={styles.role}>
										{teacher.role === 2 ? (
											<div className={styles.roleTeacher}>Преподователь</div>
										) : (
											<div className={styles.roleManager}>Менеджер</div>
										)}
									</div>
								</div>
							</Link>
						))}
					</div>
				)}
			</div>
		</div>
	)
}

export default TeacherPage
