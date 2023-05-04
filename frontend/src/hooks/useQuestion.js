import { toast } from 'react-toastify'
import { useHttp } from './useHttp'
import { useState } from 'react'

const useQuestion = (
	question,
	options,
	id_test,
	isAllFieldsFilled,
	topicName
) => {
	const [testsTopics, setTestsTopics] = useState(null)
	const [createdQuestion, setCreatedQuestion] = useState(null)
	const [testsAllQuestions, setTestsAllQuestions] = useState(null)
	const { request } = useHttp()

	const getTopics = async () => {
		const { data } = await request(`/question/topics/${id_test}`)
		setTestsTopics(data)
	}

	const createTopic = async () => {
		if (topicName.trim().length) {
			const data = await request(`/question/createTopic/${id_test}`, 'POST', {
				topicName: topicName.trim(),
			})
			toast[data?.type](data?.message)
		} else if (!topicName.trim().length) {
			toast.warn('Заполните пустые поля')
		}
	}

	const getTestsQuestions = async () => {
		const { data } = await request(`/question/${id_test}`)
		setTestsAllQuestions(data)
	}

	const createQuestions = async () => {
		if (isAllFieldsFilled) {
			const data = await request(`/question/create/${id_test}`, 'POST', {
				question,
				options,
			})
			setCreatedQuestion(data)
			toast[data?.type](data?.message)
		}
		toast.warn('Заполните все поля')
		return
	}

	return {
		createTopic,
		getTopics,
		createQuestions,
		getTestsQuestions,
		testsAllQuestions,
		testsTopics,
	}
}

export default useQuestion
