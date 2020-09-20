/////////////////////
// DEPENDENCIES
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
// PORT
/////////////////////
const PORT = process.env.PORT



/////////////////////
// DATABASE
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
// MIDDLEWARE
/////////////////////
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//method override
app.use(methodOverride('_method'))



/////////////////////
// ROUTES
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
// SEED
/////////////////////
// Item.create([
//   {
//     name: 'containers',
//     price: 10,
//     description: 'random containers',
//     image: 'https://www.criticalcase.com/file/2017/12/container-vantaggi-470x336.png',
//     isAvailable: true
//   },
//   {
//     name: 'tools',
//     price: 15,
//     description: 'random assortment of tools',
//     image: 'https://facom.com.pl/29255-tm_large_default/cme16-set-of-76-piece-electronic-tools.jpg',
//     isAvailable: true
//   },
//   {
//     name: 'baby toy',
//     price: 5,
//     description: 'push mower baby toy',
//     image: 'https://target.scene7.com/is/image/Target/GUEST_157c95b8-933b-40f0-a92d-29bb841694ec?wid=325&hei=325&qlt=80&fmt=webp',
//     isAvailable: false
//   },
//   {
//     name: 'bicycle',
//     price: 25,
//     description: 'child size bike with balance wheels',
//     image: '',
//     isAvailable: true
//   },
//   {
//     name: 'rocker chair',
//     price: 500,
//     description: 'https://cdn.shopify.com/s/files/1/2150/6963/files/jackson-rocker-grey-grey-chr-wal-1.jpg',
//     image: '',
//     isAvailable: false
//   }
// ])

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
// LISTENER
/////////////////////
app.listen(PORT, () => console.log( 'Listening on port:', PORT));
