const express = require('express');
const User = require('../models/User');
let router = express.Router();

router.post('/new', (req, res) => {
  let user = new User({
    firstName: 'Josh',
    lastName: 'Black',
    username: 'black.josh',
    password: 'password'
  })
  user.save()
  .then(() => {
    res.json({success:true});  
  });
});

module.exports = router;