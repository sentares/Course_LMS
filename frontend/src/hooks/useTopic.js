import { toast } from 'react-toastify'
import { useHttp } from './useHttp'
import { useState } from 'react'

const useTopic = (id_test, topicName) => {
	const { request } = useHttp()

	const [testsTopics, setTestsTopics] = useState(null)
	const [specialTopic, setSpecialTopic] = useState(null)

	const getTopics = async () => {
		const { data } = await request(`/topics/${id_test}`)
		setTestsTopics(data)
	}

	const createTopic = async () => {
		if (topicName.trim().length) {
			const data = await request(`/topics/create/${id_test}`, 'POST', {
				topicName: topicName.trim(),
			})
			toast[data?.type](data?.message)
		} else if (!topicName.trim().length) {
			toast.warn('Заполните пустые поля')
		}
	}

	const getSpecialTopic = async id_topic => {
		const { data } = await request(`/topics/getSpecial/${id_topic}`)
		setSpecialTopic(data)
	}

	return { getTopics, createTopic, getSpecialTopic, testsTopics, specialTopic }
}

export default useTopic
