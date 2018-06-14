module.exports = {
  index: (req, res) => {
    res.render('home/index')
  },
  about: (req, res) => {
    res.locals.title = 'About'
    res.render('home/about')
  }
}
