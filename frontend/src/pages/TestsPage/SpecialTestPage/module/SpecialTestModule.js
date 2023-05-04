import { useParams } from 'react-router-dom'
import useTest from '../../../../hooks/useTest'
import { useEffect, useState } from 'react'
import useCourse from '../../../../hooks/useCourse'
import useQuestion from '../../../../hooks/useQuestion'
import { useSelector } from 'react-redux'
import useTeacher from '../../../../hooks/useTeacher'

const SpecialTestModule = () => {
	const user = useSelector(state => state.auth.user)
	const params = useParams()
	const { id_test } = params
	const [isAuthor, setIsAuthor] = useState(false)
	const [isOpenModal, setIsOpenModal] = useState(false)
	const [isOpenTopicModal, setIsOpenTopicModal] = useState(false)
	const [isOpenTopicInfoBlock, setIsOpenTopicInfoBlock] = useState(false)
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
		createTopic,
		getTopics,
		testsTopics,
		testsAllQuestions,
	} = useQuestion(question, options, id_test, isAllFieldsFilled, topicName)
	const { getSpecialTeacher, specialTeahcer } = useTeacher(
		specialTest?.id_teacher,
		null
	)

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
	const handleChangeModal = () => {
		setIsOpenModal(!isOpenModal)
	}
	const handleChangeTopicInfoBlock = id_topic => {
		setIsOpenTopicInfoBlock(!isOpenTopicInfoBlock)
	}

	const handleUploadTopic = async event => {
		event.preventDefault()
		createTopic()
	}

	const handleUploadQuestion = async event => {
		event.preventDefault()
		createQuestions()
		if (isAllFieldsFilled) {
			handleChangeModal()
		}
		getTestsQuestions()
		setQuestion('')
		setOptions([
			{ number: 1, text: '', isCorrect: true },
			{ number: 2, text: '', isCorrect: false },
			{ number: 3, text: '', isCorrect: false },
			{ number: 4, text: '', isCorrect: false },
		])
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
		testsAllQuestions,
		specialTeahcer,
		isAuthor,
		topicName,
		testsTopics,
		isOpenTopicInfoBlock,
		handleChangeModal,
		handleChangeTopicModal,
		handleOptionTextChange,
		handleCorrectOptionChange,
		changeQuestion,
		changeTopicName,
		handleUploadQuestion,
		handleUploadTopic,
		handleChangeTopicInfoBlock,
	}
}

export default SpecialTestModule
