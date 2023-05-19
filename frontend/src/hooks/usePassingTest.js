import { useState } from 'react'
import { useHttp } from './useHttp'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { setInfoAboutTestPassing } from '../redux/slices/testPassingSlice'
import { setQuestionsOfTest } from '../redux/slices/testPassingSlice'

const usePassingTest = () => {
	const questionsOfTest = useSelector(
		state => state.testPassing.questionsOfTest
	)
	const { request } = useHttp()
	const dispatch = useDispatch()

	const [allQuestions, setAllQuestions] = useState(null)
	const [currentIndex, setCurrentIndex] = useState(0)
	const [test, setTest] = useState()
	const [id_question, setIdQuestion] = useState(null)
	const [answers, setAnswers] = useState(null)
	const [rightAnswer, setRightAnswer] = useState(null)
	const [testsByIds, setTestByIds] = useState(null)
	const [loading, setLodaing] = useState(false)
	// const [infoAboutTestPassing, setInfoAboutTestPassing] = useState(null)

	const getQuestionsForStudentTest = async id_test => {
		const { data } = await request(
			`/question/getQuestionsForStudent/${id_test}`
		)
		setAllQuestions(data)
		dispatch(setQuestionsOfTest(data))
	}

	const getSpecialQuestion = async () => {
		setTest(questionsOfTest[currentIndex])
		if (currentIndex !== -1) {
			setIdQuestion(questionsOfTest[currentIndex]?.id_question)
		} else {
			return
		}
	}

	const shuffleArray = array => {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1))
			;[array[i], array[j]] = [array[j], array[i]]
		}
	}

	const getSpecialAnswer = async id_question => {
		const { data } = await request(`/answer/${id_question}`)
		await shuffleArray(data)
		setAnswers(data)
	}

	const getSpecialRightAnswer = async () => {
		const { data } = await request(`/answer/getRightAnswer/${id_question}`)
		setRightAnswer(data)
	}

	const getInfoTestResultOfStudent = async (id_test, id_student) => {
		const { data } = await request(
			`/student/${id_student}/getTestInfo/${id_test}`
		)
		if (data) {
			dispatch(setInfoAboutTestPassing(data))
		}
	}

	const startPassResultTestOfStudent = async (id_test, id_student) => {
		const { data } = await request(
			`/student/${id_student}/startPassTest/${id_test}`,
			'POST'
		)
		toast[data?.type](data?.message)
	}

	const pushQuestionsIds = async (infoAboutTestPassing, arrOfQuestionsIds) => {
		const { id_test_result } = infoAboutTestPassing
		const { data } = await request(
			`/student/updateTestResultQuestions/${id_test_result}`,
			'PUT',
			{
				arrOfQuestionsIds,
			}
		)
	}

	const getQuestionsByArrIds = async (id_test, questionsArrIds) => {
		const { data } = await request(
			`/question/getQuestionsByArrQuestionsIds/${id_test}`,
			'POST',
			{ questionsArrIds }
		)
		setTestByIds(data)
		dispatch(setQuestionsOfTest(data))
	}

	const uploadResult = async (
		id_student,
		id_test,
		resultOfTest,
		id_test_result
	) => {
		setLodaing(true)
		const { data } = await request(
			`/student/${id_student}/uploadResultOfTest/${id_test}`,
			'POST',
			{ resultOfTest, id_test_result }
		)
		toast[data?.type](data?.message)
		setLodaing(false)
	}

	return {
		getQuestionsForStudentTest,
		getSpecialQuestion,
		setCurrentIndex,
		getSpecialAnswer,
		getSpecialRightAnswer,
		uploadResult,
		startPassResultTestOfStudent,
		pushQuestionsIds,
		getQuestionsByArrIds,
		getInfoTestResultOfStudent,
		rightAnswer,
		testsByIds,
		currentIndex,
		answers,
		test,
		allQuestions,
		id_question,
		loading,
	}
}

export default usePassingTest
