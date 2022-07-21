const PostService = require('../services/post.service')

class PostController {
	async getPosts(req, res) {
		try {
			const posts = await PostService.getPosts()
			res.json(posts)
		} catch (e) {
			res.status(500).send({
				message: 'server error',
				error: e.message,
			})
		}
	}
	async addPost(req, res) {
		try {
			const post = await PostService.addPost(
				req.body.message,
				req.files?.media,
				req.user.id
			)
			return res.json(post)
		} catch (e) {
			res.status(400).send({
				message: 'error while adding post',
				error: e.message,
			})
		}
	}

	async editPost(req, res) {
		try {
			const editedPost = await PostService.editPost(
				req.body.postId,
				{
					message: req.body.message,
					media: req.files?.media,
				},
				req.user.id
			)
			return res.json(editedPost)
		} catch (e) {
			res.status(400).send({
				message: 'editing post error',
				error: e.message,
			})
		}
	}
	async deletePost(req, res) {
		try {
			const delPost = await PostService.deletePost(req.params.id)
			return res.json(delPost)
		} catch (e) {
			res.status(400).send({
				message: 'deleting post error',
				error: e.message,
			})
		}
	}
}

module.exports = new PostController()
