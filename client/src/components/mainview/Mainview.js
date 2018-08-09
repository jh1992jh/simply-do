import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import ToDoContainer from './ToDoContainer';
import ToDoHeader from './ToDoHeader';
import ToDoList from './ToDoList';

class Mainview extends Component {
  render() {
    return (
      <Fragment>
        <div className="overlay" />
        <ToDoContainer>
          <ToDoHeader />
          <ToDoList />
        </ToDoContainer>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Mainview);
