// const mongoose = require('mongoose');
// const Comment = require('mongoose').model('Comment')
const Comment = require('../data/Comment.js')
const Article = require('mongoose').model('Article')

module.exports = {
    commentAddPost: (req, res) => {
        let reqComment = req.body
        console.log(reqComment);
        Comment.create({
            comment: reqComment.comment,
            article: reqComment.articleId,
            author: req.user._id,
        }).then(comment => {
            Article
                .findById(reqComment.articleId)
                .then(article => {
                    article.comment.push(comment._id);
                    article.save();
                    res.locals.globalSuccess = 'Successfully created'
                    res.redirect('/article/details/' + reqComment.articleId)
                })
        })
    }
}