import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postTodo } from '../actions/todoActions';

class ToDoHeader extends Component {
  state = {
    title: '',
    description: '',
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onTodoSubmit = e => {
    e.preventDefault();

    const { title, description } = this.state;

    const todoData = {
      title,
      description
    };

    this.props.postTodo(todoData);
    this.setState({ title: '', description: '' });
  };
  render() {
    const { title, description, errors } = this.state;
    return (
      <div className="toDoHeader">
        <h2>
          Simply Do <i className="fas fa-check" />
        </h2>
        <div className="inputContainer">
          <form onSubmit={this.onTodoSubmit}>
            <input
              type="text"
              name="title"
              placeholder="ToDo Title"
              value={title}
              onChange={this.onInputChange}
            />
            {errors.title ? <p className="errorText">{errors.title}</p> : null}
            <input
              type="text"
              name="description"
              placeholder="ToDo Description"
              value={description}
              onChange={this.onInputChange}
              className="description"
            />
            {errors.description ? (
              <p className="errorText">{errors.description}</p>
            ) : null}
            <button type="submit">
              Add <i className="fas fa-paper-plane" />
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { postTodo }
)(ToDoHeader);
