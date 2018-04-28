const express = require('express');
const User = require('../models/User');
let router = express.Router();

router.post('/new', (req, res) => {

  
  /**
   * TODO: Add in proper validation 
   */
   if(!req.body.username || !req.body.password){
    res.json({success:false});  
  }

  let user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    password: req.body.password
  })
  user.save()
  .then(() => {
    res.json({success:true});  
  });
});

module.exports = router;