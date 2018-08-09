import React, { Component, Fragment } from 'react';
import Todo from './Todo';
import Spinner from '../utilities/Spinner';

class ColumnContainerMobile extends Component {
  render() {
    const { doneTodos, todos, loading, showTab, activeTodos } = this.props; 
    let outputTodos;

    if (loading === true) {
      outputTodos = <Spinner />;
    } else if (showTab === 'done' && doneTodos.length === 0) {
        outputTodos = <p>You have not completed any Todos yet</p>;
    } else if (showTab === 'done' && doneTodos.length > 0) {
        outputTodos = doneTodos.map(todo => <Todo key={todo._id} todo={todo} />)
    }  else if (showTab === 'active' && activeTodos.length === 0) {
        outputTodos = <p>You have no Active Todos at the moment</p>;
    } else if (showTab === 'active' && activeTodos.length > 0) {
        outputTodos = activeTodos.map(todo => (
            <Todo key={todo._id} todo={todo} />
          ));
    } 
    return (
      <div className="mobileColumnContainer">
        {outputTodos}
      </div>
    )
  }
}



  export default ColumnContainerMobile;