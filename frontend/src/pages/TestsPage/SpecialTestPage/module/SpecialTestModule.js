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
import { toast } from 'react-toastify'
import useRule from '../../../../hooks/useRule'

const SpecialTestModule = () => {
	const user = useSelector(state => state.auth.user)
	const regulateCountOfQuestionInTopic = useSelector(
		state => state.topic.regulateCountOfQuestionInTopic
	)
	const { role } = user
	const params = useParams()
	const dispacth = useDispatch()
	const { id_test } = params
	const [isAuthor, setIsAuthor] = useState(false)
	const [isOpenModal, setIsOpenModal] = useState(false)
	const [isOpenTopicModal, setIsOpenTopicModal] = useState(false)
	const [isOpenTopicInfoBlock, setIsOpenTopicInfoBlock] = useState(false)
	const [isOpenQuestionModal, setIsOpenQuestionModal] = useState(false)
	const [idOfClickedTopic, setIdOfClickedTopic] = useState()
	const [timeForTest, setTimeForTest] = useState(0)
	const [isGoodRule, setIsGoodRule] = useState(false)
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

	const { createRule } = useRule()
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

	const { getSpecialTeacher, specialTeacher } = useTeacher(
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
	const changeTimeForTest = e => setTimeForTest(e.target.value)

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
		setIdOfClickedTopic(id_topic)
		if (role === 3) {
			setIsOpenTopicInfoBlock(true)
			await getSpecialTopic(id_topic)
			await getTopicsQuestion(id_topic)
		}
	}

	const handleUploadTopic = async event => {
		event.preventDefault()
		await createTopic()
		handleChangeTopicModal()
		await getTopics()
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
		await createQuestions(specialTopic.id_topic)
		await getTestsQuestions()
		await getTopics()
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

	const checkIsGoodRule = async () => {
		const realCountOfQuestionInTopic = testsTopics?.reduce(
			(acc, topic) => ({
				...acc,
				[topic.id_topic]: topic.count_question || 0,
			}),
			{}
		)
		if (
			regulateCountOfQuestionInTopic === 0 ||
			Object.entries(regulateCountOfQuestionInTopic).some(
				([id_topic, count]) => count > realCountOfQuestionInTopic?.[id_topic]
			) ||
			Object.values(regulateCountOfQuestionInTopic).some(
				count => count === 0
			) ||
			timeForTest === 0
		) {
			setIsGoodRule(false)
		} else {
			setIsGoodRule(true)
		}
	}

	const handleSaveRegulate = async () => {
		const realCountOfQuestionInTopic = testsTopics.reduce(
			(acc, topic) => ({
				...acc,
				[topic.id_topic]: topic.count_question || 0,
			}),
			{}
		)
		if (regulateCountOfQuestionInTopic === 0) {
			toast.warn('Выберите вопросы тем')
			return
		}
		if (
			Object.entries(regulateCountOfQuestionInTopic).some(
				([id_topic, count]) => count > realCountOfQuestionInTopic[id_topic]
			)
		) {
			toast.warn('Вы превысили количество вопросов')
			return
		}
		if (
			Object.values(regulateCountOfQuestionInTopic).some(count => count === 0)
		) {
			toast.warn('Выберите вопросы всех тем')
			return
		}
		if (timeForTest === 0) {
			toast.warn('Выберите длительность теста')
			return
		}
		await createRule(timeForTest, regulateCountOfQuestionInTopic, id_test)
	}

	useEffect(() => {
		getSpecialTest(id_test)
	}, [])

	useEffect(() => {
		getTopics()
		getCourseInfo()
		getSpecialTeacher()
		chekIsAuthor()
		if (specialTest) {
			setTimeForTest(specialTest?.time)
		}
	}, [specialTest])

	useEffect(() => {
		checkIsGoodRule()
	}, [regulateCountOfQuestionInTopic, timeForTest])

	return {
		specialTest,
		specialCourse,
		isOpenModal,
		isOpenTopicModal,
		question,
		options,
		isAllFieldsFilled,
		specialTeacher,
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
		role,
		timeForTest,
		isGoodRule,
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
		changeTimeForTest,
		handleSaveRegulate,
		checkIsGoodRule,
	}
}

export default SpecialTestModule
