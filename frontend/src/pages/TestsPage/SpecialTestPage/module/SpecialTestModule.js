import { useParams } from 'react-router-dom'
import useTest from '../../../../hooks/useTest'
import { useEffect, useState } from 'react'
import useCourse from '../../../../hooks/useCourse'
import useQuestion from '../../../../hooks/useQuestion'
import { useDispatch, useSelector } from 'react-redux'
import useTeacher from '../../../../hooks/useTeacher'
import useTopic from '../../../../hooks/useTopic'
import useAnswer from '../../../../hooks/useAnswer'
import { setQuestionInfo } from '../../../../redux/slices/question'

const SpecialTestModule = () => {
	const user = useSelector(state => state.auth.user)
	const params = useParams()
	const dispacth = useDispatch()
	const { id_test } = params
	const [isAuthor, setIsAuthor] = useState(false)
	const [isOpenModal, setIsOpenModal] = useState(false)
	const [isOpenTopicModal, setIsOpenTopicModal] = useState(false)
	const [isOpenTopicInfoBlock, setIsOpenTopicInfoBlock] = useState(false)
	const [isOpenQuestionModal, setIsOpenQuestionModal] = useState(false)
	const [idOfClickedTopic, setIdOfClickedTopic] = useState()
	const [topicName, setTopicName] = useState('')
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

	const {
		createQuestions,
		getTestsQuestions,
		getTopicsQuestion,
		getSpecialQuestion,
		specialQuestion,
		topicsQuestions,
	} = useQuestion(question, options, id_test, isAllFieldsFilled)

	const { getSpecialTeacher, specialTeahcer } = useTeacher(
		specialTest?.id_teacher,
		null
	)

	const { getTopics, getSpecialTopic, createTopic, testsTopics, specialTopic } =
		useTopic(id_test, topicName)

	const { getAnswers, getRightAnswer, questionsAnswers, rightAnswer } =
		useAnswer()

	const chekIsAuthor = async () => {
		if (user?.id_teacher === specialTest?.id_teacher) {
			setIsAuthor(true)
		}
	}

	const getCourseInfo = async () => {
		if (specialTest !== null) {
			getSpecialCourse()
		}
		return
	}

	const changeQuestion = e => setQuestion(e.target.value)
	const changeTopicName = e => setTopicName(e.target.value)
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

	const handleChangeTopicModal = () => {
		setIsOpenTopicModal(!isOpenTopicModal)
	}
	const handleChangeModal = async () => {
		setIsOpenModal(!isOpenModal)
		await getTopicsQuestion(idOfClickedTopic)
	}
	const handleChangeQuestionModal = async () => {
		setIsOpenQuestionModal(!isOpenQuestionModal)
	}
	const handleChangeTopicInfoBlock = async id_topic => {
		setIsOpenTopicInfoBlock(true)
		setIdOfClickedTopic(id_topic)
		await getSpecialTopic(id_topic)
		await getTopicsQuestion(id_topic)
	}
	const handleUploadTopic = async event => {
		event.preventDefault()
		createTopic()
	}
	const handleClickQuestion = async id_question => {
		dispacth(setQuestionInfo(id_question))
		await handleChangeQuestionModal()
		await getSpecialQuestion(id_question)
		await getAnswers(id_question)
		await getRightAnswer(id_question)
	}

	const handleUploadQuestion = async event => {
		event.preventDefault()
		createQuestions(specialTopic.id_topic)
		getTestsQuestions()
		setQuestion('')
		setOptions([
			{ number: 1, text: '', isCorrect: true },
			{ number: 2, text: '', isCorrect: false },
			{ number: 3, text: '', isCorrect: false },
			{ number: 4, text: '', isCorrect: false },
		])
		if (isAllFieldsFilled) {
			handleChangeModal()
		}
	}

	useEffect(() => {
		getSpecialTest(id_test)
		getTestsQuestions()
	}, [])

	useEffect(() => {
		getTopics()
		getCourseInfo()
		getSpecialTeacher()
		chekIsAuthor()
	}, [specialTest])

	return {
		specialTest,
		specialCourse,
		isOpenModal,
		isOpenTopicModal,
		question,
		options,
		isAllFieldsFilled,
		specialTeahcer,
		isAuthor,
		topicName,
		testsTopics,
		isOpenTopicInfoBlock,
		specialTopic,
		topicsQuestions,
		isOpenQuestionModal,
		specialQuestion,
		questionsAnswers,
		rightAnswer,
		idOfClickedTopic,
		handleChangeQuestionModal,
		handleChangeModal,
		handleChangeTopicModal,
		handleOptionTextChange,
		handleCorrectOptionChange,
		changeQuestion,
		changeTopicName,
		handleUploadQuestion,
		handleUploadTopic,
		handleChangeTopicInfoBlock,
		handleClickQuestion,
	}
}

export default SpecialTestModule
