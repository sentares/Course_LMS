import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import useTest from '../../../../hooks/useTest'
import { useEffect, useState } from 'react'
import usePassingTest from '../../../../hooks/usePassingTest'
import useDoc from '../../../../hooks/useDoc'

const SpecialTestToPassModule = () => {
	const params = useParams()
	const { id_test } = params
	const navigate = useNavigate()

	const user = useSelector(state => state.auth.user)
	const infoAboutTestPassing = useSelector(
		state => state.testPassing.infoAboutTestPassing
	)

	const [openModal, setOpenModal] = useState(false)

	const { getFullInfoAboutSpecialTest, specialTest } = useTest()
	const { postDataForDoc } = useDoc()
	const {
		startPassResultTestOfStudent,
		getQuestionsForStudentTest,
		getQuestionsByArrIds,
		getInfoTestResultOfStudent,
		testsByIds,
	} = usePassingTest()

	const handleClickStartTest = async () => {
		if (infoAboutTestPassing) {
			setOpenModal(!openModal)
			await checkIsStudentFirstPass()
		}
	}

	const checkIsStudentFirstPass = async () => {
		if (infoAboutTestPassing?.questions) {
			await getQuestionsByArrIds(id_test, infoAboutTestPassing.questions)
		} else if (infoAboutTestPassing === 'not started') {
			await getQuestionsForStudentTest(id_test)
		}
	}

	const onAllow = async event => {
		event.preventDefault()
		await startPassResultTestOfStudent(id_test, user.id_student)
		await getInfoTestResultOfStudent(id_test, user.id_student)
		await navigate(`/startPassTest/${id_test}`)
	}

	const handleClickDoc = async () => {
		await postDataForDoc(infoAboutTestPassing, user)
	}

	useEffect(() => {
		getFullInfoAboutSpecialTest(id_test)
		getInfoTestResultOfStudent(id_test, user.id_student)
	}, [])


	const isPassed = infoAboutTestPassing?.status === 'passed'
	return {
		specialTest,
		openModal,
		isPassed,
		user,
		infoAboutTestPassing,
		handleClickStartTest,
		handleClickDoc,
		onAllow,
	}
}

export default SpecialTestToPassModule
