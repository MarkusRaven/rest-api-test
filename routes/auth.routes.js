const { Router } = require('express')
const AuthController = require('../controllers/auth.controller.js')
const { body } = require('express-validator')
const router = Router()

router.post(
	'/registration',
	body('email').isEmail(),
	body('name').isString().isLength({ min: 2, max: 32 }),
	body('password').isLength({ min: 5, max: 32 }),
	AuthController.registration
)

router.post(
	'/login',
	body('email').isEmail(),
	body('password').isLength({ min: 5, max: 32 }),
	AuthController.login
)

router.get('/refresh', AuthController.refresh)

module.exports = router
