import React from 'react'
import axios from 'axios'


const hostURL = ''
const apiURL = 'api'
const appName = 'lms-lite'

export const baseURL = `${hostURL}/${appName}/${apiURL}`

const api = axios.create({
	baseURL,
	withCredentials: true,
	validateStatus: status => {
		if (status >= 500) {
			return false
		}
		return true
	},
})

export const useHttp = () => {
	const [loader, setLoader] = React.useState(false)

	const request = React.useCallback(async (url, method = 'GET', body = {}) => {
		try {
			setLoader(true)
			const { data } = await api[method.toLowerCase()](url, body)
			return data
		} catch (e) {
			console.log(e)
		} finally {
			setLoader(false)
		}
	}, [])

	return { loader, request }
}
