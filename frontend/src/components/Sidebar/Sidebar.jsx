import React from 'react'
import styles from './styles.module.scss'
import SidebarModules from './modules/SidebarModules'
import { Link } from 'react-router-dom'
import { ImExit } from 'react-icons/im'

const Sidebar = () => {
	const { nameOfRole, menuList, handleClickItem, isAuth, logout } =
		SidebarModules()

	return (
		<div className={styles.Sidebar}>
			<div className={styles.Sidebar_Block}>
				<div className={styles.nameBlock}>
					<div>{nameOfRole}</div>
				</div>
				<div className={styles.choseBlock}>
					<ul className={styles.choseList}>
						{menuList.length && (
							<>
								{menuList.map(menuItem => (
									<Link
										to={menuItem.link}
										onClick={() => handleClickItem(menuItem.id)}
										key={menuItem.id}
										className={
											menuItem.isActive
												? `${styles.aLink} ${styles.active}`
												: styles.aLink
										}
									>
										<span className={styles.iconBlock}>
											<svg className={styles.icon}>{menuItem.icon}</svg>
										</span>
										<span className={styles.title}>{menuItem.title}</span>
										{menuItem.count && (
											<span className={styles.countOfGreen}>
												{menuItem.count}
											</span>
										)}
									</Link>
								))}
								{isAuth ? (
									<button className={styles.aLink} onClick={logout}>
										<span className={styles.iconBlock}>
											<svg className={styles.icon}>
												<ImExit />
											</svg>
										</span>
										<span className={styles.title}>Выйти</span>
									</button>
								) : (
									<Link to={'/login'} className={styles.aLink}>
										<span className={styles.iconBlock}>
											<svg className={styles.icon}>
												<ImExit />
											</svg>
										</span>
										<span className={styles.title}>Войти</span>
									</Link>
								)}
							</>
						)}
					</ul>
					{!isAuth && (
						<ul className={styles.shortList}>
							<button className={styles.shortList_info}>
								<Link to={'/loginTeacher'}>Преподаватель</Link>
							</button>
							<button className={styles.shortList_info}>
								<Link to={'/loginAdmin'}>Администратор</Link>
							</button>
						</ul>
					)}
				</div>
			</div>
		</div>
	)
}

export default Sidebar
