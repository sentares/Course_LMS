import React, { useEffect, useState } from 'react'

const TimerComponent = () => {
	const personalTests = [
		{ id_test: 1, name: 'Test 1' },
		{ id_test: 2, name: 'Test 2' },
		{ id_test: 3, name: 'Test 3' },
	]

	const arrOfTestResult = [
		{ id_test: 1, status: 'Passed' },
		{ id_test: 3, status: 'Failed' },
	]

	// Проверяем наличие id_test в arrOfTestResult и обновляем статус в personalTests
	personalTests.forEach(test => {
		const matchingResult = arrOfTestResult.find(
			result => result.id_test === test.id_test
		)
		if (matchingResult && matchingResult.status) {
			test.status = matchingResult.status
		}
	})

	return (
		<div>
			<p>Generate Date: </p>
		</div>
	)
}

export default TimerComponent
