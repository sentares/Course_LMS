import { toast } from 'react-toastify'
import { useHttp } from './useHttp'
import { useState } from 'react'

const useQuestion = (question, options, id_test, isAllFieldsFilled) => {
	const [createdQuestion, setCreatedQuestion] = useState(null)
	const [testsAllQuestions, setTestsAllQuestions] = useState(null)
	const { request } = useHttp()

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

	return { createQuestions, getTestsQuestions, testsAllQuestions }
}

export default useQuestion
