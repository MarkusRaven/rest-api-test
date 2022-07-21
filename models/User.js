const sequelize = require('../db')
const { DataTypes } = require('sequelize')
const Token = require('./Token')
const Post = require('./Post')

const User = sequelize.define('user', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: { type: DataTypes.STRING },
	email: { type: DataTypes.STRING, unique: true },
	password: { type: DataTypes.STRING },
})

User.hasOne(Token)
Token.belongsTo(User)

User.hasMany(Post)
Post.belongsTo(User)

module.exports = User
