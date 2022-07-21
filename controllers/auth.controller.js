const AuthService = require('../services/auth.service')
const { validationResult } = require('express-validator')

class AuthController {
	async registration(req, res) {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return res.status(400).json({
					message: `Ошибка при валидации`,
					errors: errors.array(),
				})
			}
			const { name, email, password } = req.body
			const token = await AuthService.registration(name, email, password)
			return res.json(token)
		} catch (e) {
			res.status(400).send({
				message: 'registration error',
				error: e.message,
			})
		}
	}

	async login(req, res) {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return res.json({
					message: `Ошибка при валидации`,
					errors: errors.array(),
				})
			}
			const { email, password } = req.body
			const userData = await AuthService.login(email, password)
			res.cookie('refreshToken', userData.tokens.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			})

			return res.json({
				message: 'Success authorization',
				userData,
			})
		} catch (e) {
			res.status(400).send({
				message: 'login error',
				error: e.message,
			})
		}
	}
	async refresh(req, res) {
		const { refreshToken } = req.cookies
		const userData = await AuthService.refresh(refreshToken)
		if (typeof userData === 'string') {
			return res.status(401).json(userData)
		}
		if (userData.tokens) {
			res.cookie('refreshToken', userData.tokens.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			})
		}
		return res.json(userData)
	}
}

module.exports = new AuthController()
