const User = require('../models/User')
const TokenService = require('./token.service')
const UserDto = require('../dtos/user-dto')
const bcrypt = require('bcrypt')

class AuthSevice {
	async registration(name, email, password) {
		const candidate = await User.findOne({ where: { email } })
		if (candidate) {
			throw new Error('Пользователь с таким email уже существует')
		}
		const hashPassword = await bcrypt.hash(password, 3)
		await User.create({ email, password: hashPassword, name })
		return { success: true }
	}
	async login(email, password) {
		const user = await User.findOne({ where: { email } })
		if (!user) {
			throw new Error('Пользователя не найден')
		}
		const isPassEquals = await bcrypt.compare(password, user.password)
		if (!isPassEquals) {
			throw new Error('Введён неверный логин или пароль')
		}
		const userDto = new UserDto(user.get({ plain: true }))
		const tokens = await TokenService.generateTokens({
			...userDto,
		})
		await TokenService.saveToken(userDto.id, tokens.refreshToken)
		return { tokens, user: userDto }
	}
	async refresh(refreshToken) {
		if (!refreshToken) {
			return 'Нет токена'
		}
		const userData = await TokenService.validateRefreshToken(refreshToken)
		const tokenFromDb = await TokenService.findToken(refreshToken)
		if (!userData || !tokenFromDb) {
			return 'Токена для обновления нет в базе данных'
		}
		const user = await User.findByPk(userData.id)
		const userDto = new UserDto(user.dataValues)
		const tokens = await TokenService.generateTokens({ ...userDto })
		await TokenService.saveToken(userDto.id, tokens.refreshToken)
		return {
			tokens,
			user: {
				id: user.id,
				tel: user.tel,
				name: user.name,
				email: user.email,
				city: user.cityId,
				role: user.role,
			},
		}
	}
}
module.exports = new AuthSevice()
