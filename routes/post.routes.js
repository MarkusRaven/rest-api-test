const { Router } = require('express')
const PostController = require('../controllers/post.controller.js')
const auth = require('../middlewares/auth-middleware.js')
const router = Router()

router.get('/', PostController.getPosts)

router.post('/add', auth, PostController.addPost)

router.post('/edit', auth, PostController.editPost)

router.get('/delete/:id', auth, PostController.deletePost)

module.exports = router
