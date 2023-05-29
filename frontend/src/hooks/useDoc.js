import React from 'react'
import { useHttp } from './useHttp'

const useDoc = () => {
	const { request } = useHttp()

	const postDataForDoc = async (infoAboutTestPassing, user) => {
		const data = request(
			`/doc/test/${infoAboutTestPassing.id_test}/student/${user.id_student}`,
			'POST',
			{ infoAboutTestPassing, user }
		)
	}
	return { postDataForDoc }
}

export default useDoc
