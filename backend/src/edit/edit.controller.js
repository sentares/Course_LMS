const editService = require('./edit.service')

class EditController {
	async editQuestion(req, res) {
		try {
			const { id_question } = req.params
			const { state } = req.body

			if (state.questionTitle) {
				try {
					const rows = await editService.updateQuestion(state.questionTitle)
					res.status(200).json({
						message: 'Данные успешно изменены',
						type: 'success',
						data: rows
					})
				} catch (e) {
					console.log(e)
				}
			}

			if (state.right) {
				try {
					const rows = await editService.updateRightAnswer(state.right)
					console.log(state.right)
					res.status(200).json({
						message: 'Данные успешно изменены',
						type: 'success',
						data: rows
					})
				} catch (e) {
					console.log(e)
				}
			}
		} catch (e) {
			console.log(e)
			res.status(500).json({
				message: 'Ошибка в сервере',
				type: 'error',
				data: {}
			})
		}
	}
}

module.exports = new EditController()
