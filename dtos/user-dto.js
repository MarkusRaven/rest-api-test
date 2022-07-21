module.exports = class UserDto {
	email
	id
	name

	constructor(model) {
		this.email = model.email
		this.name = model.name
		this.id = model.id
	}
}
