import { useSelector } from 'react-redux'
import useAnswer from '../../../../hooks/useAnswer'
import { useEffect, useState } from 'react'
import useQuestion from '../../../../hooks/useQuestion'
import useEdit from '../../../../hooks/useEdit'

const ManagerModule = () => {
	const questionInfo = useSelector(state => state.question.questionInfo)
	const [state, setState] = useState({
		questionTitle: null,
		answers: [],
		right: null,
	})
	const [initalState, setInitialState] = useState()

	const { updateQuestion } = useEdit(questionInfo)
	const { getSpecialQuestion, specialQuestion } = useQuestion()
	const { getAnswers, getRightAnswer, rightAnswer, questionsAnswers } =
		useAnswer()

	const getStateFor = async () => {
		const newState = {}
		if (specialQuestion) {
			newState.questionTitle = specialQuestion.question
			newState.answers = questionsAnswers
		}
		if (rightAnswer) {
			newState.right = rightAnswer
		}
		setState(prevState => ({ ...prevState, ...newState }))
		setInitialState(prevState => ({ ...prevState, ...newState }))
	}

	const handleChangeQuestion = e => {
		setState(prevState => ({ ...prevState, questionTitle: e.target.value }))
	}

	const handleChangeAnswers = (e, answerId) => {
		const updatedAnswers = state.answers.map(answer => {
			if (answer.id_answers === answerId) {
				return {
					...answer,
					answers: e.target.value,
				}
			}
			return answer
		})
		setState(prevState => ({ ...prevState, answers: updatedAnswers }))
	}

	const changeCorrectAnswer = id_answer => {
		setState(prevState => {
			const updatedRight = {
				...prevState.right,
				id_answers: id_answer,
			}
			return {
				...prevState,
				right: updatedRight,
			}
		})
	}

	const handleUpdateQuestion = async () => {
		await updateQuestion(state, initalState)
	}

	useEffect(() => {
		getAnswers(questionInfo)
		getRightAnswer(questionInfo)
	}, [questionInfo])

	useEffect(() => {
		getSpecialQuestion(questionInfo)
	}, [])

	useEffect(() => {
		if (specialQuestion) {
			getStateFor()
		}
	}, [specialQuestion, questionsAnswers, rightAnswer])

	return {
		answers: state.answers,
		questionTitle: state.questionTitle,
		right: state.right,
		handleChangeQuestion,
		handleChangeAnswers,
		changeCorrectAnswer,
		handleUpdateQuestion,
	}
}

export default ManagerModule
