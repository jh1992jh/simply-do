import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loginUser, registerUser } from '../../actions/authActions';

class Login extends Component {
  state = {
    email: '',
    password: '',
    showForm: 'signin',
    errors: {}
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmitSignIn = e => {
    e.preventDefault();

    //const { email, password } = this.state;

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  };

  onSubmitSignUp = e => {
    e.preventDefault();

    const { email, password, showForm } = this.state;

    const userData = {
      email,
      password
    };

    this.props.registerUser(userData, this.props.history);
    this.setState({ email: '', password: '', showForm: 'signin' });
  };

  render() {
    const { email, password, showForm, errors } = this.state;
    return (
      <Fragment>
        <div className="darkOverlay" />
        <div className="login">
          <div className="loginContainer">
            <div className="loginHeader">
              {showForm === 'signin' ? (
                <Fragment>
                  <h4 className="selected">Sign In</h4>
                  <h4 onClick={() => this.setState({ showForm: 'signup' })}>
                    Sign Up
                  </h4>
                </Fragment>
              ) : (
                <Fragment>
                  <h4 onClick={() => this.setState({ showForm: 'signin' })}>
                    Sign In
                  </h4>
                  <h4 className="selected">Sign Up</h4>
                </Fragment>
              )}
            </div>
            <div className="loginForm">
              <form
                onSubmit={
                  showForm === 'signin'
                    ? this.onSubmitSignIn
                    : this.onSubmitSignUp
                }
                noValidate
              >
                <input
                  type="email"
                  name="email"
                  required
                  onChange={this.onChange}
                  value={email}
                  placeholder="Email"
                />
                {errors.email ? (
                  <p className="errorText">{errors.email}</p>
                ) : null}
                <input
                  type="password"
                  name="password"
                  required
                  onChange={this.onChange}
                  value={password}
                  placeholder="Password"
                />
                {errors.password ? (
                  <p className="errorText">{errors.password}</p>
                ) : null}
                <button value="submit">
                  {showForm === 'signin' ? 'Sign In' : 'Sign Up'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser, registerUser }
)(withRouter(Login));
