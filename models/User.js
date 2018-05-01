const bcrypt = require('bcryptjs');
const logger = require('../utils/logger');
const ROUNDS = 10;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  username: { type: String, required: true },
  password: { type: String, required: true, select: false },
  tasks: [{
    description: { type: String, required: true },
    status: { type: String, default: 'incomplete' },
    priority: { type: Number, default: 0 },
    dateCreated: { type: Date, default: Date.now() },
    dateCompleted: { type: Date },
  }]
});

userSchema.pre('save', function (done) {
  let user = this;
  let password = user.password;
  bcrypt.genSalt(ROUNDS)
    .then(salt => bcrypt.hash(password, salt))
    .then(hash => {
      user.password = hash;
      done();
    });
});

let User = module.exports = mongoose.model('User', userSchema);

module.exports.editUser = (id, update) => {
  return User.findByIdAndUpdate({ _id: id }, update)
}

module.exports.removeUser = id => {
  return User.findByIdAndRemove({ _id: id })
}

module.exports.getUser = () => {
  return User.find();
}

module.exports.getUserTasks = userId => {
  return User.findById({ _id: userId }).select('tasks');
}

module.exports.getUserTask = userId => {
  return User.findById({ _id: userId }).select('tasks');
}

module.exports.editUserTask = (userId, taskId, update, logger) => {
  return User.findById({ _id: userId }).select('tasks')
  // .then(user => logger.debug(user))
  // .then(task => task.update(update))
  // .then(updated => logger.debug(updated))
  // .catch(err => logger.debug(err));
}

module.exports.addUserTask = (userId, task, logger) => {
  return User.findByIdAndUpdate({ _id: userId }, { $push: { 'tasks': task } })
}

module.exports.removeUserTask = (userId, task) => {
  return User.findByIdAndUpdate({ _id: userId }, { $push: { 'tasks': taskId } })
}