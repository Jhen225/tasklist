const express = require('express');
const controller = require('../contollers/users');
let router = express.Router();

router.post('/new', controller.addUser);
router.put('/:id', controller.editUser);
router.delete('/:id', controller.removeUser);


module.exports = router;