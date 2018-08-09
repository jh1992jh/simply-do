const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const users = require('./api/routes/users');
const todos = require('./api/routes/todos');

const db = require('./config/keys').mongoURI;

mongoose
  .connect(db)
  .then(() => console.log('Connected to the db'))
  .catch(err => console.log(err));

app.use(passport.initialize());

require('./config/passport')(passport);

app.use('/api/users', users);
app.use('/api/todos', todos);

app.get('/', (req, res) => {
  res.json({ msg: 'The root route works' });
});

const PORT = 5000;
app.listen(PORT, console.log(`The server is running on port ${PORT}`));
