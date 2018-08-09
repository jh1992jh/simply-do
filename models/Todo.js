const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  score: {
    type: Number,
    default: 1
  },
  done: {
    type: Boolean
  },
  completedAt: {
    type: Date,
    default: null
  }
});

module.exports = Todo = mongoose.model('todos', TodoSchema);
