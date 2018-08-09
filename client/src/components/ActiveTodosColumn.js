import React, { Component } from 'react';
import Todo from './Todo';

class ActiveTodosColumn extends Component {
  render() {
    const {
      activeTodos,
      showActiveTodos,
      onToggleShowActiveTodos
    } = this.props;
    let outputTodos;

    if (activeTodos.length === 0) {
      outputTodos = <p>You have no Active Todos at the moment</p>;
    } else if (showActiveTodos === true && activeTodos.length > 0) {
      outputTodos = activeTodos.map(todo => (
        <Todo key={todo._id} todo={todo} />
      ));
    }
    return (
      <div className="activeTodosColumn">
        <div className="columnHeadContainer">
          <h4>
            Active Todos: {activeTodos.length}{' '}
            <i
              className="fas fa-caret-down"
              onClick={onToggleShowActiveTodos}
            />
          </h4>
        </div>
        <div className="columnTodoList">{outputTodos}</div>
      </div>
    );
  }
}

export default ActiveTodosColumn;
