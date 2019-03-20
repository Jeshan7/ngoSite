const express = require("express"),
      bodyParser = require('body-parser'),
      handle = require('express-handlebars'),
      path = require('path'),
      mongoose = require('mongoose');

const app = express()



app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

var index = require('./routes/index')
app.use('/', index)

mongoose.connect('mongodb://localhost:27017/ngoDB')

var db = mongoose.connection;
db.on('error',console.error.bind(console,'Connection Error'))

app.engine('handlebars', handle())
app.set('view engine', 'handlebars')

app.use('/public', express.static(path.join(__dirname, 'public')))

app.listen(4000, () => {
  console.log("SERVER IS RUNNING")
})
