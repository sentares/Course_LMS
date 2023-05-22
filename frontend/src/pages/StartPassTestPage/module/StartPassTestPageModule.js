import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import usePassingTest from '../../../hooks/usePassingTest'
import useTest from '../../../hooks/useTest'

const StartPassTestPageModule = () => {
	const { user } = useSelector(state => state.auth)
	const { infoAboutTestPassing, questionsOfTest } = useSelector(
		state => state.testPassing
	)

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

	const checkAnswer = () => {
		if (choseAnswer === rightAnswer?.id_answers) {
			if (isRight === 'true') {
				setState(prevState => ({
					...prevState,
					isRight: null,
					countRightAnswers: prevState.countRightAnswers - 1,
				}))
			} else {
				setState(prevState => ({
					...prevState,
					isRight: 'true',
					countRightAnswers: prevState.countRightAnswers + 1,
				}))
			}
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

	const deleteLocal = () => {
		localStorage.removeItem('questionsAndAnswers')
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
	}, [questionsOfTest, currentIndex, id_question, choseAnswer])

	useEffect(() => {
		if (id_question) {
			getSpecialAnswer(id_question)
			getSpecialRightAnswer()
			// correctIndexQuestionWhereIStoped()
		}
	}, [questionsOfTest, id_question])

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

	//logic for pagination

	const handleClickPrev = () => {
		if (currentIndex === 0) {
			return false
		} else {
			setCurrentIndex(currentIndex - 1)
		}
	}

	const handleClickNext = () => {
		if (currentIndex === questionsOfTest.length - 1) {
			return false
		} else {
			setCurrentIndex(currentIndex + 1)
		}
	}

	const handleCLickQuestion = index => {
		setCurrentIndex(index)
	}

	const generate_date = infoAboutTestPassing?.generate_date
	const time = specialTest?.time

	return {
		test,
		percentageOfProgress,
		answers,
		percentageOfRightAnswer,
		start,
		currentIndex,
		questionsOfTest,
		studentChose,
		generate_date,
		time,
		handleClickPrev,
		handleClickNext,
		handleClickOnAnswer,
		hadlePostResult,
		stopTest,
		deleteLocal,
		handleCLickQuestion,
	}
}

export default StartPassTestPageModule
