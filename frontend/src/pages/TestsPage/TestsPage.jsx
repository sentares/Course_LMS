import React from 'react'
import Button from '../../ui/button/Button'
import styles from './styles.module.scss'
import TestsPageModule from './module/TestsPageModule'
import CreateTestModal from '../../components/Modals/CreateTestModal/CreateTestModal'

const TestsPage = () => {
	const {
		handleChangeModal,
		change,
		handleCreateTest,
		allCourses,
		form,
		isOpenCreateTestModal,
	} = TestsPageModule()

	return (
		<div className={styles.TestsPage}>
			{isOpenCreateTestModal && (
				<CreateTestModal
					handleChangeModal={handleChangeModal}
					handleCreateTest={handleCreateTest}
					change={change}
					form={form}
					allCourses={allCourses}
				/>
			)}
			<div className={styles.buttonBlock}>
				<Button
					title={'Создать тест'}
					classOfStyle={'create'}
					onClick={handleChangeModal}
				/>
			</div>
		</div>
	)
}

export default TestsPage
