import { useParams } from 'react-router-dom'
import { useHttp } from '../../../../hooks/useHttp'

const SpecialTeacherModule = () => {
	const { getSpecialTeacher } = useHttp()
	const params = useParams()
	const { id_teacher } = params

	return { id_teacher }
}

export default SpecialTeacherModule
