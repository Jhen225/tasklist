const Task = require('../models/Task');

module.exports = {
  getTasks: (req, res) => {
    Task.getTasks()
      .then(tasks => res.json({ success: true, tasks: tasks }))
      .catch(err => res.status(400).json({ success: false, err: err.message }));
  },

  getTask: (req, res) => {
    Task.getTask(req.params.id)
      .then(task => res.json({ success: true, task: task }))
      .catch(err => res.status(400).json({ success: false, err: err.message }));
  },

  newTask: (req, res) => {
    let task = new Task(req.body);
    task.save()
      .then(() => res.json({ success: true, msg: 'task has been added' }))
      .catch(err => res.status(400).json({ success: false, err: err.message }));
  },

  editTask: (req, res) => {
    Task.editTask(req.params.id, req.body)
      .then(updated => {
        if (updated) {
          res.json({ success: true })
        } else {
          res.json({ success: false })
        }
      })
      .catch(err => res.status(400).json({ success: false, err: err.message }))
  },

  removeTask: (req, res) => {
    Task.removeTask(req.params.id, req.body)
      .then(removed => {
        if (removed) {
          res.json({ success: true })
        } else {
          res.json({ success: false })
        }
      })
      .catch(err => res.status(400).json({ success: false, err: err.message }));
  }
}