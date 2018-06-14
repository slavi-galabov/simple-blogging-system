const mongoose = require('mongoose')
const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required'
const Schema = mongoose.Schema;

let articleSchema = new mongoose.Schema({
    title: {type: String, required: REQUIRED_VALIDATION_MESSAGE},
    excerpt: {type: String, required: REQUIRED_VALIDATION_MESSAGE},
    description: {type: String, required: REQUIRED_VALIDATION_MESSAGE},
    author: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
    date: {type: mongoose.Schema.Types.Date, required: true, default: Date.now},
    image: {type: String},
    comment: [{type: Schema.ObjectId, ref: 'Comment'}]
})

let Article = mongoose.model('Article', articleSchema)
module.exports = Article