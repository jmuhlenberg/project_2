/////////////////////
//Dependencies
/////////////////////
const express = require('express')
const session = require('express-session')
const methodOverride  = require('method-override')
const mongoose = require('mongoose')
const app = express()
const db = mongoose.connection
const Item = require('./models/items.js')
require('dotenv').config()



/////////////////////
//Port
/////////////////////
const PORT = process.env.PORT



/////////////////////
//Database
/////////////////////
const MONGODBURI = process.env.MONGODBURI;

// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
mongoose.connect(MONGODBURI, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true})

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'))
db.on('connected', () => console.log('mongo connected: ', MONGODBURI))
db.on('disconnected', () => console.log('mongo disconnected'))



/////////////////////
//Middleware
/////////////////////
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//method override
app.use(methodOverride('_method'))



/////////////////////
// Routes
/////////////////////
app.get('/' , (req, res) => {
  res.render('user/index.ejs');
})

app.get('/home', (req, res) => {
  Item.find({}, (err, allItems) => {
      res.render('user/home.ejs', {items: allItems})
  })
})



/////////////////////
// CONTROLLERS
/////////////////////
const itemsController = require('./controllers/items_controller.js')
app.use('/items', itemsController)

const usersController = require('./controllers/users_controller.js')
app.use('/users', usersController)

const sessionsController = require('./controllers/sessions_controller.js')
app.use('/sessions', sessionsController)



/////////////////////
//Listener
/////////////////////
app.listen(PORT, () => console.log( 'Listening on port:', PORT));
