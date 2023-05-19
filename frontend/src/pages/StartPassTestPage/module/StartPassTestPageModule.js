import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import usePassingTest from '../../../hooks/usePassingTest'
import useTest from '../../../hooks/useTest'
import // list of action imports from react-redux
'react-redux'

const StartPassTestPageModule = () => {
	const { user } = useSelector(state => state.auth)
	const { infoAboutTestPassing, questionsOfTest } = useSelector(
		state => state.testPassing
	)

	console.log(questionsOfTest)

	const navigate = useNavigate()
	const params = useParams()
	const { id_test } = params

	const [choseAnswer, setChoseAnswer] = useState(null)
	const [start, setStart] = useState('')
	const [resultOfTest, setResultOfTest] = useState({})
	const [studentChose, setStudentChose] = useState({})
	const [deleteLocalStorage, setDeleteLocalStorage] = useState(false)

	const [state, setState] = useState({
		isRight: '',
		countRightAnswers: 0,
	})
	const { isRight, countRightAnswers } = state

	const dispatch = useDispatch()
	const {
		getSpecialQuestion,
		setCurrentIndex,
		getSpecialAnswer,
		getSpecialRightAnswer,
		uploadResult,
		pushQuestionsIds,
		getInfoTestResultOfStudent,
		getQuestionsByArrIds,
		getQuestionsForStudentTest,
		rightAnswer,
		id_question,
		currentIndex,
		test,
		answers,
		loading,
	} = usePassingTest()
	const { getFullInfoAboutSpecialTest, specialTest } = useTest()

	const pushQuestionIdsToTestPassingInfo = () => {
		if (questionsOfTest?.length) {
			const arrOfQuestionsIds = questionsOfTest.map(
				question => question.id_question
			)
			pushQuestionsIds(infoAboutTestPassing, arrOfQuestionsIds)
		}
	}

	const handleClickOnAnswer = id_answers => {
		setChoseAnswer(id_answers)
		changeStudentMoves(id_answers)
		checkAnswer()
		handleNextQuestion()
	}

	const correctIndexQuestionWhereIStoped = () => {
		if (questionsOfTest) {
			const unansweredQuestionIndex = questionsOfTest?.findIndex(
				question => !studentChose[question.id_question]
			)
			setCurrentIndex(unansweredQuestionIndex)
		}
	}

	const changeStudentMoves = id_answers => {
		setStudentChose(prevState => {
			const updatedState = {
				...prevState,
				[test.id_question]: id_answers,
			}
			if (!deleteLocalStorage) {
				const mergedData = {
					...prevState,
					...updatedState,
				}
				localStorage.setItem('questionsAndAnswers', JSON.stringify(mergedData))
			}
			return updatedState
		})
	}

	const handleNextQuestion = () => {
		if (currentIndex === questionsOfTest?.length - 1) {
			setCurrentIndex(-1)
		} else {
			setCurrentIndex(prevIndex => prevIndex + 1)
		}
	}

	const checkAnswer = () => {
		if (choseAnswer === rightAnswer?.id_answers) {
			setState(prevState => ({
				...prevState,
				isRight: 'true',
				countRightAnswers: prevState.countRightAnswers + 1,
			}))
		} else {
			setState(prevState => ({ ...prevState, isRight: 'false' }))
		}
	}

	const hadlePostResult = event => {
		event.preventDefault()
		setDeleteLocalStorage(true)
		localStorage.removeItem('questionsAndAnswers')
		uploadResult(
			user.id_student,
			id_test,
			resultOfTest,
			infoAboutTestPassing.id_test_result
		)
		if (!loading) {
			navigate(`/testsToPass/${id_test}`)
		}
	}

	const stopTest = () => {
		setResultOfTest({
			countRightAnswers,
			percentageOfRightAnswer,
			studentChose,
		})
		setStart('stop')
	}

	const checkIsStudentFirstPass = () => {
		if (infoAboutTestPassing?.questions) {
			getQuestionsByArrIds(id_test, infoAboutTestPassing.questions)
		} else if (infoAboutTestPassing === 'not started') {
			getQuestionsForStudentTest(id_test)
		}
	}

	useEffect(() => {
		getFullInfoAboutSpecialTest(id_test)
		getInfoTestResultOfStudent(id_test, user.id_student)
		const storedData = localStorage.getItem('questionsAndAnswers')
		if (storedData) {
			try {
				const parsedData = JSON.parse(storedData)
				setStudentChose(parsedData)
			} catch (error) {
				console.error('Error parsing data from localStorage:', error)
			}
		}
	}, [])

	useEffect(() => {
		if (infoAboutTestPassing) {
			checkIsStudentFirstPass()
		}
	}, [infoAboutTestPassing])

	useEffect(() => {
		if (questionsOfTest?.length > 0 && infoAboutTestPassing) {
			pushQuestionIdsToTestPassingInfo()
			getSpecialQuestion()
		}
		if (id_question) {
			getSpecialAnswer(id_question)
			getSpecialRightAnswer()
			correctIndexQuestionWhereIStoped()
		}
	}, [questionsOfTest, currentIndex, id_question, choseAnswer])

	useEffect(() => {
		checkAnswer()
	}, [choseAnswer])

	const percentageOfProgress = (
		(currentIndex / questionsOfTest?.length) *
		100
	).toFixed(2)
	const percentageOfRightAnswer = (
		(countRightAnswers / questionsOfTest?.length) *
		100
	).toFixed(2)

	return {
		test,
		percentageOfProgress,
		answers,
		percentageOfRightAnswer,
		start,
		currentIndex,
		handleClickOnAnswer,
		hadlePostResult,
		stopTest,
	}
}

export default StartPassTestPageModule
