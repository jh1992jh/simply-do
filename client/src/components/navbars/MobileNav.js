import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom'

class MobileNav extends Component {
    render() {
        const { toggleNavDropdown, navDropdownOpen, closeNavDropdown, auth, onLogoutClick} = this.props;
    return (
        <div className="mobileNav">
        <div className="navMobileTop">
         <Link to="/dashboard" onClick={closeNavDropdown}>
         <h2>
           Simply Do <i className="fas fa-check" />
         </h2>
       </Link>
       <i className="fas fa-ellipsis-h" onClick={toggleNavDropdown} />
       </div>
       {navDropdownOpen === true ? (<div className="navDropdown">
       {auth.isAuthenticated === true ? (
         <Fragment>
           <div className="navLinksRight">
             <Link to="statistics" onClick={closeNavDropdown}>
               <span>Statistics</span>
             </Link>
           </div>
           <div className="profileInfo">
             <h3>{auth.user.email}</h3>
             <a href="#!" onClick={onLogoutClick}>
               <button className="logout" onClick={onLogoutClick}>
                 Logout
               </button>
             </a>
           </div>
         </Fragment>
       ) : null}
       </div>) : null}
       </div>
    )
  }
}

export default MobileNav;