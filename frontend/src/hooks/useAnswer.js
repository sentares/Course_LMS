import { useState } from 'react'
import { useHttp } from './useHttp'

const useAnswer = () => {
	const [questionsAnswers, setQuestionsAnswers] = useState(null)
	const [rightAnswer, setRightAnswer] = useState(null)

	const { request } = useHttp()

	const getAnswers = async id_question => {
		const { data } = await request(`/answer/${id_question}`)
		setQuestionsAnswers(data)
	}

	const getRightAnswer = async id_question => {
		const { data } = await request(`/answer/getRightAnswer/${id_question}`)
		setRightAnswer(data)
	}

	return { getAnswers, getRightAnswer, rightAnswer, questionsAnswers }
}

export default useAnswer
