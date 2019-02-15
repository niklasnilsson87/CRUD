
const renderHomePage = (req, res) => res.render('index', { name: req.cookies.username })

module.exports = {
  renderHomePage
}
