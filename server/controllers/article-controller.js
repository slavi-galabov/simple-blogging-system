const Article = require('mongoose').model('Article')
const range = require("range")
const fs = require('fs')
const path = require('path')

module.exports = {
    articleAddGet: (req, res) => {
        res.render('article/add')
    },
    articleAddPost: (req, res) => {
        let reqArticle = req.body
        let featureImage = req.files.image
        let newFileName = `${new Date().getTime()}_${featureImage.name}`
        let imagePath = path.resolve(__dirname, '..', '..', `public/img/${newFileName}`);
        featureImage.mv(imagePath, function (err) {
            if (err)
                return res.status(500).send(err);
            Article.create({
                title: reqArticle.title,
                description: reqArticle.description,
                excerpt: reqArticle.excerpt,
                author: req.user._id,
                image: newFileName
            }).then(article => {
                res.locals.globalSuccess = 'Successfully created'
                res.redirect('/article/details/' + article._id)
            })
        });
    },

    articleDetails: (req, res) => {
        let id = req.params.id
        Article
            .findById(id)
            .populate('author')
            .populate({
                path: 'comment',
                populate: {
                    path: 'author',
                }
            })
            .then(article => {
                if (!article) {
                    res.locals.globalError = 'Invalid article'
                    res.redirect('article/list/1')
                    return
                }

                let options = {year: 'numeric', month: 'long', day: 'numeric'}
                let dateFormated = article.date.toLocaleDateString('en-UK', options)

                res.locals.dateFormated = dateFormated
                res.locals.title = article.title
                res.locals.article = article
                res.render('article/details')
            })


    },
    articleList: (req, res) => {
        Article.find({}).then((data) => {
            let per_page = 6;
            let num_page = Number(req.params.page);
            let max_pages = Math.ceil(data.length / per_page);
            let starting = per_page * (num_page - 1)
            let ending = per_page + starting

            res.locals.title = "All Posts"
            res.locals.pages = range.range(1, max_pages + 1);
            res.locals.current_page = num_page
            res.locals.articles = data.slice(starting, ending)
            res.render('article/list');
        })
    },
    articleEditGet: (req, res) => {
        let id = req.params.id;
        Article
            .findById(id)
            .then(
                article => {
                    res.render('article/edit', article)
                })
    },
    articleDelete: (req, res) => {
        let id = req.params.id
        Article
            .findById(id)
            .then(article => {
                let imagePath = path.resolve(__dirname, '..', '..', `public/img/${article.image}`);
                fs.unlink(imagePath, function (err) {
                    Article.remove(
                        {_id: id},
                        function (err, result) {
                            res.locals.globalSuccess = 'Successfully deleted'
                            res.redirect('/article/list/1')
                        });
                });
            })
    },
    articleEditPost: (req, res) => {
        let reqArticle = req.params

        Article.findById(reqArticle.id, function (err, article) {
            if (!article)
                return next(new Error('Could not load Document'));
            else {
                article.title = reqArticle.title
                article.description = reqArticle.description
                article.excerpt = reqArticle.excerpt

                article.update(reqArticle.id, function (err) {
                    if (err) {
                        console.log('error')
                    } else {
                        res.locals.globalSuccess = 'Successfully Updated'
                        res.redirect('/article/details/' + reqArticle.id)
                    }
                })
            }
        })
    }
}