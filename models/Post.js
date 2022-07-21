const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const Post = sequelize.define('post', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	message: { type: DataTypes.STRING },
	media: { type: DataTypes.STRING },
})

module.exports = Post
