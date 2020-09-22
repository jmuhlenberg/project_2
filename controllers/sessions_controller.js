const bcrypt = require('bcrypt')
const express = require('express')
const sessions = express.Router()
const User = require('../models/users.js')

//on 'Log In' click
sessions.get('/new', (req, res) => {
  res.render('sessions/sign_up.ejs', {currentUser: req.session.currentUser})
})

//on sessions/new form submit (log in)
sessions.post('/', (req, res) => {
  User.findOne({username: req.body.username}, (err, foundUser) => {
    if(err){
      console.log(err);
      res.render('user/log_in_fail.ejs')
    }else if (!foundUser){
      res.render('user/log_in_incorrect.ejs')
    }else{
      if(bcrypt.compareSync(req.body.password, foundUser.password)){
        req.session.currentUser = foundUser
        // console.log('log in successful');
        res.redirect('/home')
      }else{
        res.render('user/log_in_incorrect.ejs')
      }
    }
  })
})

//delete the session
sessions.delete('/', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/')
  })
})

module.exports = sessions
