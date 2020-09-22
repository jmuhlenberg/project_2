const express = require('express')
const app = express.Router()
const Item = require('../models/items.js')

const isAuthenticated = (req, res, next) => {
  if (req.session.currentUser) {
    return next()
  } else {
    res.redirect('/sessions/new')
  }
}


//items index
app.get('/', (req, res)=>{
  res.redirect('/home')
});


//create new item
app.get('/new', (req, res) => {
  res.render('user/new_item.ejs', {currentUser: req.session.currentUser})
})


//POST route to create new item
app.post('/', (req, res) => {
  if(req.body.isAvailable === 'on'){
    req.body.isAvailable = true
  }else{
    req.body.isAvailable = false
  }
  Item.create(req.body, (error, createdItem) => {
    if (error) {
      console.log(error);
    }else{
      console.log(createdItem);
      res.redirect('/items')
    }
  })
})


//show route for specific item
app.get('/:id', (req, res)=>{
  Item.findById(req.params.id, (err, foundItem)=>{
      res.render('user/show.ejs', {item: foundItem, currentUser: req.session.currentUser})
  })
})


//delete
app.delete('/:id', (req, res) => {
  Item.findByIdAndRemove(req.params.id, (err, data) => {
    res.redirect('/home')
  })
})


//edit
app.get('/:id/edit', (req, res) => {
  Item.findById(req.params.id, (err, foundItem) => {
    res.render('user/edit.ejs', {item: foundItem, currentUser: req.session.currentUser})
  })
})


//update
app.put('/:id', isAuthenticated, (req, res) => {
  if(req.body.isAvailable === 'on'){
    req.body.isAvailable = true
  }else{
    req.body.isAvailable = false
  }
  Item.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedItem) => {
    res.redirect('/home')
  })
})

module.exports = app
