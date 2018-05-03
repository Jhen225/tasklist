const express = require('express');
const controller = require('../contollers/users');
let router = express.Router();

router.post('/new', controller.addUser);
router.put('/:id', controller.editUser);
router.delete('/:id', controller.removeUser);
router.get('/', controller.getUser);
router.get('/:id/tasks/', controller.getUserTasks);
router.get('/:id/tasks/:taskid', controller.getUserTask);
router.post('/:id/tasks/', controller.addUserTask);
router.put('/:id/tasks/:taskid', controller.editUserTask);
router.delete('/:id/tasks/:taskid', controller.removeUserTask);


module.exports = router;