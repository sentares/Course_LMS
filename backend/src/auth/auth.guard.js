const authGuard = (req, res, next) => {
	const { token } = req.cookies

	if (token) {
		return next()
	}
	res.status(401).json({})
}

module.exports = authGuard
