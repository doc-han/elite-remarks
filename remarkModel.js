const mongoose = require('mongoose')
const Schema = mongoose.Schema

const remarkSchema = new Schema({
	fullname: String,
	remark: String
})

module.exports = mongoose.model('remark', remarkSchema)