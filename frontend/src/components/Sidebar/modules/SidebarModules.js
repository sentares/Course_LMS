import { useEffect, useState } from 'react'

const SidebarModules = () => {
	const info = [
		{
			role: 'Студент',
			info1: 'Курсы',
			info2: 'Мои курсы',
		},
	]

	const [role, setRole] = useState(1)
	const [information, setInformation] = useState(info)

	useEffect(() => {}, [])

	return { role }
}

export default SidebarModules
