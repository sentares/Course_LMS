import { toast } from 'react-toastify'
import { useHttp } from './useHttp'

const useEdit = questionInfo => {
	const { request } = useHttp()
	const updateQuestion = async (state, initialState) => {
		const id_question = questionInfo
		const updatedFields = {}

		if (state.questionTitle !== initialState.questionTitle) {
			updatedFields.questionTitle = state.questionTitle
		}

		const updatedAnswers = state.answers.filter(answer => {
			const initialAnswer = initialState.answers.find(
				a => a.id_answers === answer.id_answers
			)
			return initialAnswer && answer.answers !== initialAnswer.answers
		})

		if (updatedAnswers.length) {
			updatedFields.answers = updatedAnswers
		}

		if (
			state.right &&
			state.right.id_answers !== initialState.right.id_answers
		) {
			updatedFields.right = state.right
		}

		if (Object.keys(updatedFields).length) {
			const { type, message } = await request(
				`/edit/question/${id_question}`,
				'PUT',
				{ state: updatedFields }
			)
			toast[type](message)
		} else {
			toast.warn('Нет изменении')
		}
	}

	return { updateQuestion }
}

export default useEdit
