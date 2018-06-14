const controllers = require('../controllers')
const auth = require('./auth')

module.exports = (app) => {
    app.get('/', controllers.home.index)
    app.get('/about', controllers.home.about)

    app.get('/users/register', controllers.users.registerGet)
    app.post('/users/register', controllers.users.registerPost)
    app.get('/users/login', controllers.users.loginGet)
    app.post('/users/login', controllers.users.loginPost)
    app.post('/users/logout', controllers.users.logout)

    app.get('/article/add', auth.isInRole('Admin'), controllers.article.articleAddGet)
    app.post('/article/add', auth.isInRole('Admin'), controllers.article.articleAddPost)
    app.post('/article/edit/:id', auth.isInRole('Admin'), controllers.article.articleEditPost)
    app.get('/article/edit/:id', auth.isInRole('Admin'), controllers.article.articleEditGet)
    app.get('/article/delete/:id', auth.isInRole('Admin'), controllers.article.articleDelete)
    app.get('/article/details/:id', controllers.article.articleDetails)
    app.get('/article/list/:page', controllers.article.articleList)

    app.all('*', (req, res) => {
        res.status(404)
        res.locals.title = "Ops! 404 Page not found"
        res.render('home/404');
    })
}
