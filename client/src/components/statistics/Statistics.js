import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getTodos } from '../../actions/todoActions';
import Spinner from '../../utilities/Spinner';
import DoneTodosColumn from './DoneTodosColumn';
import ActiveTodosColumn from './ActiveTodosColumn';
import ColumnContainerMobile from './ColumnContainerMobile';

class Statistics extends Component {
  state = {
    showDoneTodos: false,
    showActiveTodos: false,
    showTab: 'done'
  };
  componentDidMount() {
    this.props.getTodos();
    if (this.props.match.url === '/statistics') {
      console.log('1');
    }
  }

  onToggleShowDoneTodos = () => {
    const { showDoneTodos } = this.state;
    this.setState({ showDoneTodos: !showDoneTodos });
  };

  onToggleShowActiveTodos = () => {
    const { showActiveTodos } = this.state;
    this.setState({ showActiveTodos: !showActiveTodos });
  };
  render() {
    const { showActiveTodos, showDoneTodos, showTab } = this.state;
    const { doneTodos, todos, loading } = this.props.todos;
    let outputContent;

    if (loading === true) {
      outputContent = <Spinner />;
    } else {
      outputContent = (
        <Fragment>
          <DoneTodosColumn
            showDoneTodos={showDoneTodos}
            doneTodos={doneTodos}
            onToggleShowDoneTodos={this.onToggleShowDoneTodos}
          />
          <ActiveTodosColumn
            showActiveTodos={showActiveTodos}
            activeTodos={todos}
            onToggleShowActiveTodos={this.onToggleShowActiveTodos}
          />
        </Fragment>
      );
    }
    return (
      <div className="statistics">
        <div className="overlay" />
        <div className="toDoContainer forDesktop">{outputContent}</div>
        <div className="forMobile">
        <div className="columnContainer">
          <div className="tabs">
            <h3 className={showTab === 'done' ? 'selected' : null} onClick={() => this.setState({showTab: 'done'})}>Done</h3>
            <h3 className={showTab === 'active' ? 'selected' : null} onClick={() => this.setState({showTab: 'active'})} >Active</h3>
          </div>
        </div>
         <ColumnContainerMobile showTab={showTab} todos={todos} doneTodos={doneTodos} activeTodos={todos}/>

          
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  todos: state.todos
});

export default connect(
  mapStateToProps,
  { getTodos }
)(Statistics);
