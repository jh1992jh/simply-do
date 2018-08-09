const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const Todo = require('../../models/Todo');

const validateTodoInput = require('../../server-validation/todo');

const router = express.Router();

router.get('/test', (req, res) => {
  res.json({ msg: 'todos works' });
});

router.post(
  '/create',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateTodoInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newTodo = new Todo({
      title: req.body.title,
      description: req.body.description,
      user: req.user.id,
      score: req.body.score,
      done: false
    });

    newTodo
      .save()
      .then(todo => res.json(todo))
      .catch(err => res.status(400).json(err));
  }
);

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Todo.find({ user: req.user.id })
      .then(todos => res.json(todos))
      .catch(err => console.log(err));
  }
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Todo.findById(req.params.id)
      .then(todo => {
        // Check for todo owner
        if (todo.user.toString() !== req.user.id) {
          return res.status(401).json({ notauthorized: 'User not authorized' });
        }

        // Delete
        todo.remove().then(() => res.json({ success: true }));
      })
      .catch(err => res.status(404).json({ todonotfound: 'No todo found' }));
  }
);

router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const todo = Todo.findById(req.params.id);

    Todo.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { done: true, completedAt: Date() } },
      { upsert: true }
    )
      .then(todoUpdated => res.status(200).json(todoUpdated))
      .catch(err => console.log(err));
  }
);
module.exports = router;
