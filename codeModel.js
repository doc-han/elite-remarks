const mongoose = require('mongoose')
const Schema = mongoose.Schema

const codeSchema = new Schema({
	code: String
})

module.exports = mongoose.model('code', codeSchema)