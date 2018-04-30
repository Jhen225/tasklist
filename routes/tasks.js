let express = require('express');
let router = express.Router();
let controller = require('../contollers/tasks');

router.get('/', controller.getTasks);
router.get('/:id', controller.getTask);
router.post('/', controller.newTask);
router.put('/:id', controller.editTask);
router.delete('/:id', controller.removeTask);

module.exports = router;