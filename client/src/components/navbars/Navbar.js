import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { Link } from 'react-router-dom';
import MobileNav from './MobileNav';

class Navbar extends Component {
  state = {
    navDropdownOpen: false
  }

  toggleNavDropdown = () => {
    const { navDropdownOpen } = this.state;

    this.setState({ navDropdownOpen: !navDropdownOpen})
  }

  closeNavDropdown = () => {
    const { navDropdownOpen } = this.state;

    this.setState({ navDropdownOpen: false})
  }
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  render() {
    const { auth } = this.props;
    const { navDropdownOpen } = this.state;
    return (
      <nav>
        <div className="navLinksLeft forDesktop">
          <Link to="/dashboard">
            <h2>
              Simply Do <i className="fas fa-check" />
            </h2>
          </Link>
        </div>

        {auth.isAuthenticated === true ? (
          <Fragment>
            <div className="navLinksRight forDesktop">
              <Link to="statistics" >
                <span>Statistics</span>
              </Link>
            </div>
            <div className="profileInfo forDesktop">
              <h3>{auth.user.email}</h3>
              <a href="#!" onClick={this.onLogoutClick}>
                <button className="logout" onClick={this.onLogoutClick}>
                  Logout
                </button>
              </a>
            </div>
          </Fragment>
        ) : null}


        <div className="forMobile">
        <MobileNav toggleNavDropdown={this.toggleNavDropdown} navDropdownOpen={navDropdownOpen} auth={auth} onLogoutClick={this.onLogoutClick} closeNavDropdown={this.closeNavDropdown}/>
        </div>
        
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);
