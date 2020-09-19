const express = require('express')
const item = express.Router()
const Item = require('../models/items.js')

const isAuthenticated = (req, res, next) => {
  if (req.session.currentUser) {
    return next()
  } else {
    res.redirect('/sessions/new')
  }
}


module.exports = item
