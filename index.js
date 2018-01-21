const path = require('path')
const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const hbs = require('express-handlebars')
const favicon = require('serve-favicon')
var serveIndex = require('serve-index');

var app = express()
app.engine('hbs', hbs.create({
  extname: 'hbs',
  defaultLayout: 'layout',
  layoutsDir: path.join(__dirname, '/views/layouts'),
  helpers: {
    isEqual: function (a, b, opts) {
      if (a === b) {
        return opts.fn(this)
      } else {
        return opts.inverse(this)
      }
    }
  }
}).engine)
app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'hbs')

app.use(bodyParser.json())       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}))

app.use(favicon(path.join(__dirname, '/public/images/favicon.ico')))

app.use('/public', express.static('public'), serveIndex('public', {'icons': true}))
app.use(express.static(path.join(__dirname, '/public')))

app.get('/', (req, res) => {
  res.render('index', { title: 'Home' })
})

var port = 6001

http.createServer(app).listen(port)

console.log('Started on port', port)

module.exports = app
