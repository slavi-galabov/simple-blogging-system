const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')
const passport = require('passport')
const handlebars = require('express-handlebars')
const fileUpload = require('express-fileupload');

module.exports = (app) => {
    app.engine('handlebars', handlebars({
        defaultLayout: 'main'
    }))
    app.set('view engine', 'handlebars')
    app.use(cookieParser())
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(session({
        secret: 'neshto-taino!@#$%',
        resave: false,
        saveUninitialized: false
    }))
    app.use(passport.initialize())
    app.use(passport.session())

    app.use((req, res, next) => {
        if (req.user) {

            if(req.user.roles.indexOf("Admin") !== -1){
                res.locals.isAdmin = true
            }
            res.locals.currentUser = req.user
        }
        next()
    })

    app.use(express.static('public'))
    app.use(fileUpload({
        limits: { fileSize: 50 * 1024 * 1024 },
        // safeFileNames: true
    }))

    console.log('Express ready!')
}
