import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import Moment from 'react-moment';

class ShowDoneModal extends Component {
  render() {
    const { onToggleDoneModal, onUpdateDone, todo, onDeleteTodo } = this.props;
    const { title, description, _id, createdAt, completedAt } = todo;
    return (
      <div className="showDoneModalWrapper">
        <div className="showDoneModal">
          <i className="fas fa-times" onClick={onToggleDoneModal} />
          <div className="toDoInfo">
            <h2>{title}</h2>
            <p>{description}</p>
            <p> 
              <strong>Created At: </strong>
              <Moment format="DD/MM/YYYY">{createdAt}</Moment>
            </p>
            {completedAt !== null ? (
              <p> 
              <strong>Completed At: </strong>
              <Moment format="DD/MM/YYYY">{completedAt}</Moment>
            </p>
            ) : null}
            {completedAt !== null ? null : (
              <Fragment>
              <button
                className="doneBtnConfirm"
                onClick={() => onUpdateDone(_id)}
              >
                Done <i className="fas fa-check" />
                </button>
                <button className="forMobile deleteBtn" onClick={() => onDeleteTodo(todo._id)}>Delete  <i className="fas fa-trash-alt"  /></button>
                </Fragment>
              )}

          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(ShowDoneModal);
