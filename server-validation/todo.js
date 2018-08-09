const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateTodoInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';
  data.description = !isEmpty(data.description) ? data.description : '';

  if (!Validator.isLength(data.title, { min: 2, max: 30 })) {
    errors.title = 'Title must be at least 2 characters';
  }

  if (!Validator.isLength(data.description, { min: 5, max: 100 })) {
    errors.description = 'Description must be at least 5 characters';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
 