const mongoose = require('mongoose')
const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required'

let commentSchema = new mongoose.Schema({
    comment: {type: String, required: REQUIRED_VALIDATION_MESSAGE},
    author: {type: mongoose.Schema.Types.ObjectId, required: false, ref: 'User'},
    article: {type: mongoose.Schema.Types.ObjectId, required: REQUIRED_VALIDATION_MESSAGE, ref: 'Article'},
    date: {type: mongoose.Schema.Types.Date, required: true, default: Date.now},
})

let Comment = mongoose.model('Comment', commentSchema)
module.exports = Comment