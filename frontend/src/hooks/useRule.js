import { toast } from 'react-toastify'
import { useHttp } from './useHttp'

const useRule = () => {
	const { request } = useHttp()

	const createRule = async (
		timeForTest,
		regulateCountOfQuestionInTopic,
		id_test,
		passingScore,
		isSertificate
	) => {
		const data = await request(`/rules/createRule/${id_test}`, 'PUT', {
			timeForTest,
			regulateCountOfQuestionInTopic,
			passingScore,
			isSertificate,
		})
		toast[data?.type](data?.message)
	}

	return { createRule }
}

export default useRule
