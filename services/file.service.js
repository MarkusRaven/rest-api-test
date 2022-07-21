const uuid = require('uuid')
const path = require('path')

class FileService {
	saveFile(file, directory = '') {
		try {
			if (file === null) {
				return null
			}
			const fileName =
				directory + '/' + uuid.v4() + '.' + file.mimetype.split('/')[1]
			const filePath = path.resolve('static', fileName)
			file.mv(filePath)
			return fileName
		} catch (e) {
			console.log(e.message)
		}
	}
}
module.exports = new FileService()
