const Post = require('../models/Post')
const User = require('../models/User')
const FileService = require('./file.service')

class PostSevice {
	async getPosts() {
		const posts = await Post.findAll({
			include: [{ model: User, attributes: ['name'] }],
		})
		return posts
	}
	async addPost(message, media = null, userId) {
		const fileName = FileService.saveFile(media, 'media')
		const post = await Post.create({
			userId,
			message,
			media: fileName,
		})
		return post
	}
	async editPost(id, data) {
		const fileName = FileService.saveFile(data.media, 'media')
		await Post.update(
			{ ...data, media: fileName !== null ? fileName : media },
			{ where: { id } }
		)
		const post = await Post.findByPk(id)
		return post
	}

	async deletePost(id) {
		await Post.destroy({ where: { id } })
		return { success: true }
	}
}
module.exports = new PostSevice()
