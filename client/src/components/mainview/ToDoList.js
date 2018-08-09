import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTodos } from '../../actions/todoActions';
import Spinner from '../../utilities/Spinner';
import Todo from '../todo/Todo';

class ToDoList extends Component {
  componentDidMount() {
    this.props.getTodos();
  }
  render() {
    let outputTodos;
    const { loading, todos } = this.props.todos;
    if (todos.length === 0) {
      outputTodos = <h3>You have no Todo's start by adding some!</h3>;
    } else if (loading === true) {
      outputTodos = <Spinner />;
    } else if (loading === false && todos.length > 0) {
      outputTodos = todos.map(todo => <Todo todo={todo} key={todo._id} />);
    }
    return (
      <div className="toDoList">
        <h3>To DO:</h3>
        <div className="listContainer">{outputTodos}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  todos: state.todos
});

export default connect(
  mapStateToProps,
  { getTodos }
)(ToDoList);
