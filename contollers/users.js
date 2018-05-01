const User = require('../models/User');
const logger = require('../utils/logger');

module.exports = {
  addUser: (req, res) => {
    /**
     * TODO: Add in proper validation 
     */
    if (!req.body.username || !req.body.password) {
      res.json({ success: false });
    }

    let user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      password: req.body.password
    })
    user.save()
      .then(() => {
        res.json({ success: true });
      });
  },

  editUser: (req, res) => {
    /**
     * TODO: Add in proper validation 
     */
    User.editUser(req.params.id, req.body)
      .then(isUpdated => {
        if (isUpdated) {
          res.json({ success: true })
        } else {
          res.json({ success: false })
        }
      })
      .catch(err => res.status(400).json({ success: false, err: err.message }));
  },

  removeUser: (req, res) => {
    User.removeUser(req.params.id)
      .then(isRemoved => {
        if (isRemoved) {
          res.json({ success: true })
        } else {
          res.json({ success: false })
        }
      })
      .catch(err => res.status(400).json({ success: false }));
  },

  getUser: (req, res) => {
    User.getUser(req.params.id)
      .then(user => {
        res.json({ success: true, user: user })
      })
      .catch(err => res.status(400).json({ success: false }));
  },

  getUserTasks: (req, res) => {
    User.getUserTasks(req.params.id)
      .then(user => res.json({ success: true, tasks: user.tasks }))
      .catch(err => res.status(400).json({ success: false, err: err.message }));
  },

  getUserTask: (req, res) => {
    User.getUserTask(req.params.id)
      .then(user => res.json({ success: true, tasks: user.tasks.id(req.params.taskid) }))
      .catch(err => res.status(400).json({ success: false, err: err.message }));
  },

  addUserTask: (req, res) => {
    User.addUserTask(req.params.id, req.body, logger)
      .then(added => res.json({ success: true, msg: 'task had been added' }))
      .catch(err => res.status(400).json({ success: false, err: err.message }));
  },

  removeUserTask: (req, res) => {
    User.removeUserTask(req.params.id)
      .then(added => res.json({ success: true }))
      .catch(err => res.status(400).json({ success: false, err: err.message }));
  },

  /**
   * This is sooooooo broken and idk why but I also can come back to this
   */
  editUserTask: (req, res) => {

    User.editUserTask(req.params.id, req.params.taskId, req.body, logger)
      .then(user => {
        res.json({ success: true })
      })
      .catch(err => res.status(400).json({ success: false, err: err }));
  }
}