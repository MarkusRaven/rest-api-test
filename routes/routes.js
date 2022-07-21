module.exports = function (app) {
	app.use('/', require('./auth.routes'))
	app.use('/post', require('./post.routes'))
}
