import { useParams } from 'react-router-dom'
import useTest from '../../../../hooks/useTest'
import { useEffect, useState } from 'react'
import useCourse from '../../../../hooks/useCourse'
import useQuestion from '../../../../hooks/useQuestion'

const SpecialTestModule = () => {
	const params = useParams()
	const { id_test } = params

	const [isOpenModal, setIsOpenModal] = useState(false)
	const [question, setQuestion] = useState('')
	const [options, setOptions] = useState([
		{ number: 1, text: '', isCorrect: true },
		{ number: 2, text: '', isCorrect: false },
		{ number: 3, text: '', isCorrect: false },
		{ number: 4, text: '', isCorrect: false },
	])

	const isAllFieldsFilled =
		question !== '' && options.every(option => option.text !== '')

	const { getSpecialTest, specialTest } = useTest(null, id_test)
	const { getSpecialCourse, specialCourse } = useCourse(
		null,
		specialTest?.id_course
	)
	const { createQuestions, getTestsQuestions, testsAllQuestions } = useQuestion(
		question,
		options,
		id_test,
		isAllFieldsFilled
	)

	const getCourseInfo = async () => {
		if (specialTest !== null) {
			getSpecialCourse()
		}
		return
	}

	const changeQuestion = e => setQuestion(e.target.value)
	const handleOptionTextChange = (optionNumber, optionText) => {
		setOptions(
			options.map(option => {
				if (option.number === optionNumber) {
					return { ...option, text: optionText }
				} else {
					return option
				}
			})
		)
	}

	const handleCorrectOptionChange = correctOption => {
		setOptions(
			options.map(option => {
				if (option.number === correctOption) {
					return { ...option, isCorrect: true }
				} else {
					return { ...option, isCorrect: false }
				}
			})
		)
	}

	const handleChangeModal = () => {
		setIsOpenModal(!isOpenModal)
	}

	const handleUploadQuestion = async event => {
		event.preventDefault()
		createQuestions()
		if (isAllFieldsFilled) {
			handleChangeModal()
		}
	}

	useEffect(() => {
		getSpecialTest(id_test)
		getTestsQuestions()
	}, [])

	useEffect(() => {
		getCourseInfo()
	}, [specialTest])

	return {
		specialTest,
		specialCourse,
		isOpenModal,
		question,
		options,
		isAllFieldsFilled,
		testsAllQuestions,
		handleChangeModal,
		handleOptionTextChange,
		handleCorrectOptionChange,
		changeQuestion,
		handleUploadQuestion,
	}
}

export default SpecialTestModule
