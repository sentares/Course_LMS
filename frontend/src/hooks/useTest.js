import { toast } from 'react-toastify'
import { useHttp } from './useHttp'
import { useState } from 'react'

const useTest = form => {
	const { request } = useHttp()

	const [allTests, setAllTests] = useState(null)

	const getTests = async () => {
		const { data } = await request('/test')
		setAllTests(data)
		console.log(data)
	}

	const createTest = async () => {
		const {
			id_teacher,
			id_course,
			test_name,
			test_description,
			question_count,
		} = form
		if (
			id_teacher &&
			id_course.trim().length &&
			test_name.trim().length &&
			test_description.trim().length &&
			question_count.trim().length
		) {
			const { type, message } = await request('/test/create', 'POST', {
				id_teacher,
				id_course: id_course.trim(),
				test_name: test_name.trim(),
				test_description: test_description.trim(),
				question_count: question_count.trim(),
			})
			toast[type](message)
		}
		toast.warn('Заполните пустые поля')
	}

	return { createTest, getTests, allTests }
}

export default useTest