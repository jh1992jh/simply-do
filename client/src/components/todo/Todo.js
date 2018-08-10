import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { deleteTodo, updateDone } from '../../actions/todoActions';
import { withRouter } from 'react-router-dom';
import ShowDoneModal from '../modal/ShowDoneModal';

class Todo extends Component {
  constructor(props) {
    super(props);

    this.onToggleDescOpen = this.onToggleDescOpen.bind(this);
    this.onToggleDone = this.onToggleDone.bind(this);

    this.state = {
      descOpen: false,
      done: false,
      showDone: false
    };
  }

  onToggleDescOpen() {
    const { descOpen } = this.state;

    this.setState({ descOpen: !descOpen });
  }

  onToggleDone() {
    const { done } = this.state;

    this.setState({ done: !done });
  }

  onToggleDoneModal = () => {
    const { showDone } = this.state;
    this.setState({ showDone: !showDone });
  };

  onUpdateDone = _id => {
    this.props.updateDone(_id);
  };

  onDeleteTodo = _id => {
    this.props.deleteTodo(_id);
  };
  render() {
    const { url } = this.props.match;
    const { descOpen, done, showDone } = this.state;
    const { todo } = this.props;
    const { title, description, _id, createdAt } = todo;
    return (
      <Fragment>
      <div className="toDo forDesktop">
        <p className={done ? 'done' : null} onClick={this.onToggleDone}>
          {title}
        </p>{' '}
        {showDone === true ? (
          <ShowDoneModal
            onToggleDoneModal={this.onToggleDoneModal}
            onUpdateDone={this.onUpdateDone}
            todo={todo}
          />
        ) : null}
        <div className="icons">
          <button className="doneBtn" onClick={this.onToggleDoneModal}>
            {url === '/statistics' ? 'Info' : 'Done'}
          </button>
          <i className="fas fa-caret-down" onClick={this.onToggleDescOpen} />{' '}
          <i className="fas fa-times" onClick={() => this.onDeleteTodo(_id)} />
        </div>
        {descOpen ? <p className="description">{description}</p> : null}
      </div>

      <div className="forMobile">
      <div className="toDo">
      <p className={done ? 'done' : null} onClick={this.onToggleDone}>
        {title}
      </p>{' '}
      {showDone === true ? (
        <ShowDoneModal
          onToggleDoneModal={this.onToggleDoneModal}
          onUpdateDone={this.onUpdateDone}
          todo={todo}
          onDeleteTodo={this.onDeleteTodo}
        />
      ) : null}
      <div className="icons">
        <button className="doneBtn" onClick={this.onToggleDoneModal}>
          Info
        </button>
       
      </div>
    </div>
      </div>
      
      </Fragment>
    );
  }
}

export default connect(
  null,
  { deleteTodo, updateDone }
)(withRouter(Todo));
