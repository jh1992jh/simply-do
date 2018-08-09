import React, { Component } from 'react';
import Todo from '../todo/Todo';

class DoneTodosColumn extends Component {
  render() {
    const { doneTodos, showDoneTodos, onToggleShowDoneTodos } = this.props;
    let outputTodos;
    if (doneTodos.length === 0) {
      outputTodos = <p>You have not completed any Todos yet</p>;
    } else if (showDoneTodos === true && doneTodos.length > 0) {
      outputTodos = doneTodos.map(todo => <Todo key={todo._id} todo={todo} />);
    }
    return (
      <div className="doneTodosColumn">
        <div className="columnHeadContainer">
          <h4>
            Done Todos: {doneTodos.length}{' '}
            <i className="fas fa-caret-down" onClick={onToggleShowDoneTodos} />
          </h4>
        </div>
        <div className="columnTodoList">{outputTodos}</div>
      </div>
    );
  }
}

export default DoneTodosColumn;
