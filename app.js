//brings in all of my envirment variables from a .env file
require('dotenv').config({})
const PORT = process.env.PORT || 3000;
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
// require('./config/passport')(passport);
const logger = require('./utils/logger');
const morgan = require('morgan');
const userRoutes = require('./routes/users');
const taskRoutes = require('./routes/tasks');
const app = express();

mongoose.connect(process.env.dbpath);

app.use(morgan('dev',{ stream: logger.stream }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);

app.listen(PORT, '0.0.0.0', () => {
  console.log('Server started on port ' + PORT);
})