import React from 'react'
import SpecialTestModule from './module/SpecialTestModule'
import styles from './styles.module.scss'
import Button from '../../../ui/button/Button'
import CreateQuestionModal from '../../../components/Modals/CreateQuestionModal/CreateQuestionModal'

const SpecialTestPage = () => {
	const {
		specialTest,
		specialCourse,
		isOpenModal,
		options,
		question,
		isAllFieldsFilled,
		testsAllQuestions,
		handleChangeModal,
		changeQuestion,
		handleOptionTextChange,
		handleCorrectOptionChange,
		handleUploadQuestion,
	} = SpecialTestModule()

	return (
		<div className={styles.SpecialTestPage}>
			{specialTest && specialCourse && (
				<div>
					{isOpenModal && (
						<CreateQuestionModal
							isAllFieldsFilled={isAllFieldsFilled}
							options={options}
							question={question}
							handleChangeModal={handleChangeModal}
							changeQuestion={changeQuestion}
							handleOptionTextChange={handleOptionTextChange}
							handleCorrectOptionChange={handleCorrectOptionChange}
							handleUploadQuestion={handleUploadQuestion}
						/>
					)}
					<div className={styles.testInfoBlock}>
						<div className={styles.naming}>
							<div className={styles.nameOfCat}>
								Курс: <strong>{specialCourse.course_name}</strong>
							</div>
							<div className={styles.nameOfCat}>
								Название теста: <strong>{specialTest.test_name}</strong>
							</div>
							<div className={styles.nameOfCat}>
								Описание теста:
								<div className={styles.testDescription}>
									{specialTest.test_description}
								</div>
							</div>
						</div>
					</div>
					<div className={styles.questionBlock}>
						<Button
							classOfStyle={'auth'}
							title={'Добавить вопрос'}
							onClick={handleChangeModal}
						/>
						<div>
							{testsAllQuestions &&
								testsAllQuestions.map(question => (
									<div
										key={question.id_question}
										className={styles.questionItem}
									>
										{question.question}
									</div>
								))}
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default SpecialTestPage
