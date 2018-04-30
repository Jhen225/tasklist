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
  }
}