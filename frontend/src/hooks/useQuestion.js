import { toast } from 'react-toastify'
import { useHttp } from './useHttp'
import { useState } from 'react'

const useQuestion = (question, options, id_test, isAllFieldsFilled) => {
	const [testsAllQuestions, setTestsAllQuestions] = useState(null)
	const [topicsQuestions, setTopicsQuestions] = useState(null)
	const [specialQuestion, setSpecialQuestion] = useState(null)
	const { request } = useHttp()

	const getSpecialQuestion = async id_question => {
		const { data } = await request(`/question/getSpecial/${id_question}`)
		setSpecialQuestion(data)
	}

	const getTestsQuestions = async () => {
		const { data } = await request(`/question/${id_test}`)
		setTestsAllQuestions(data)
	}

	const getTopicsQuestion = async id_topic => {
		const { data } = await request(`/question/getTopicsQuestions/${id_topic}`)
		setTopicsQuestions(data)
	}

	const createQuestions = async id_topic => {
		if (isAllFieldsFilled) {
			const data = await request(`/question/create/${id_test}`, 'POST', {
				question,
				options,
				id_topic,
			})
			toast[data?.type](data?.message)
		}
		toast.warn('Заполните все поля')
		return
	}

	return {
		createQuestions,
		getTestsQuestions,
		getTopicsQuestion,
		getSpecialQuestion,
		topicsQuestions,
		testsAllQuestions,
		specialQuestion,
	}
}

export default useQuestion
