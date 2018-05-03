let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let taskSchema = new Schema({
  description: {type: String, required: true},
  status: {type: String, default: 'incomplete'},
  priority: {type: Number, default: 0},
  dateCreated: {type: Date, default: Date.now()},
  dateCompleted: {type: Date},
});

const Task = module.exports = mongoose.model('Task', taskSchema);

module.exports.getTasks = () => {
  return Task.find();
}

module.exports.getTask = id => {
  return Task.findById({_id: id});
}

module.exports.editTask = (id, update) => {
  return Task.findByIdAndUpdate({_id: id}, update);
}

module.exports.removeTask = id => {
  return Task.findByIdAndRemove({_id: id});
}