const DocService = require('./doc.service')

class DocController {
	async postDataToSertificate(req, res) {
		const { id_course, id_test_result, id_student } = req.params

		const data = await DocService.postDataToSertificate(id_course, id_test_result, id_student)
		const { courseInfo, studentInfo, testResultInfo } = data

		const formattedDeliveryDate = new Date(testResultInfo.delivery_date)
			.toLocaleDateString('en-GB', {
				day: '2-digit',
				month: '2-digit',
				year: 'numeric'
			})
			.split('/')
			.reverse()
			.join('.')

		res.render('certificate/certificate.hbs', {
			data: { courseInfo, studentInfo, testResultInfo, formattedDeliveryDate },
			query: req.query
		})
	}
}

module.exports = new DocController()
