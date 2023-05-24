import { useEffect } from 'react'
import useFlows from '../../../../hooks/useFlows'
import { useParams } from 'react-router-dom'

const StudentsOfFlowsModule = () => {
	const params = useParams()
	const { id_flows } = params

	const { getStudentsOfFlow, courseAndStudentsConnect } = useFlows()

	useEffect(() => {
		getStudentsOfFlow(id_flows)
	}, [])

	return { courseAndStudentsConnect }
}

export default StudentsOfFlowsModule
