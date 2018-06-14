const mongoose = require('mongoose')
const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required'

let articleSchema = new mongoose.Schema({
    title: {type: String, required: REQUIRED_VALIDATION_MESSAGE},
    excerpt: {type: String, required: REQUIRED_VALIDATION_MESSAGE},
    description: {type: String, required: REQUIRED_VALIDATION_MESSAGE},
    author: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
    date: {type: mongoose.Schema.Types.Date, required: true, default: Date.now},
})

let Article = mongoose.model('Article', articleSchema)
module.exports = Article