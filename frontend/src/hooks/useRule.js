import { toast } from 'react-toastify'
import { useHttp } from './useHttp'

const useRule = () => {
	const { request } = useHttp()

	const createRule = async (
		timeForTest,
		regulateCountOfQuestionInTopic,
		id_test
	) => {
		const data = await request(`/rules/createRule/${id_test}`, 'PUT', {
			timeForTest,
			regulateCountOfQuestionInTopic,
		})
		toast[data?.type](data?.message)
	}

	return { createRule }
}

export default useRule
