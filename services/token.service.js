require('dotenv').config()
const jwt = require('jsonwebtoken')
const Token = require('../models/Token')
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET

class TokenService {
	async generateAccessToken(data) {
		const accessToken = jwt.sign(data, JWT_ACCESS_SECRET, {
			expiresIn: '30d',
		})
		return accessToken
	}

	validateAccessToken(token) {
		try {
			const userData = jwt.verify(token, JWT_ACCESS_SECRET)
			return userData
		} catch (e) {
			return null
		}
	}

	validateRefreshToken(token) {
		try {
			const userData = jwt.verify(token, JWT_REFRESH_SECRET)
			return userData
		} catch (e) {
			return null
		}
	}

	async generateTokens(payload) {
		const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, {
			expiresIn: '30m',
		})
		const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, {
			expiresIn: '30d',
		})
		return { accessToken, refreshToken }
	}
	async saveToken(userId, refreshToken) {
		const tokenData = await Token.findOne({ where: { userId } })
		if (tokenData) {
			return await Token.update({ refreshToken }, { where: { userId } })
		}
		const token = await Token.create({
			userId,
			refreshToken,
		})
		return token
	}

	async findToken(refreshToken) {
		const tokenData = await Token.findOne({ where: { refreshToken } })
		return tokenData
	}
}

module.exports = new TokenService()
