import { useHttp } from './useHttp'
import { toast } from 'react-toastify'

const useStudent = () => {
	const { request } = useHttp()

	const addStudentToCourseFlows = async (id_student, id_flows) => {
		const { type, message } = await request(
			`/courseFlows/${id_flows}/addStudent/${id_student}`
		)
		toast[type](message)
	}

	return { addStudentToCourseFlows }
}

export default useStudent
