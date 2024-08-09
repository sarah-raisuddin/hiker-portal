import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/wanderSafe-logo-grey.png";

function HeaderMenu({ isUserLoggedIn, handleUserLogOut }) {
  return (
    <nav className="header-menu">
      <div className="header-menu-left">
        <Link to="/home" className="menu-logo">
          <img className="menu-logo" src={logo} alt="WanderSafe Logo" />
        </Link>
      </div>
      <div className="header-menu-right">
        <ul className="menu-links">
          <li>
            <Link to="/faqs">FAQs</Link>
          </li>
          {isUserLoggedIn && (
            <li>
              <Link to="/edit-account">Edit Account</Link>
            </li>
          )}
          {/* The links below are for development rn and should be removed once proper
                        routing is in place. */}
          <li>
            <Link to="/trip-progress">Trip Progress</Link>
          </li>
          {/* DEBUG: left links here for easy debug later if needed
                    <li>
                        <Link to="/terms-conditions">Terms and Conditions</Link>
                    </li>
                    <li>
                        <Link to="/trips">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/account-registration">Account Registration</Link>
                    </li>
                                        <li>
                        <Link to="/trip-summary">Trip Summary</Link>
                    </li>
                    <li>
                        <Link to="/trip-plan">Trip Plan</Link>
                    </li>
                    */}

          {isUserLoggedIn ? (
            <div className="account-control-link">
              <li>
                <Link to="/home" onClick={handleUserLogOut}>
                  Logout
                </Link>
              </li>
            </div>
          ) : (
            <div className="account-control-link">
              <li>
                <Link to="/login">Login</Link>
              </li>
            </div>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default HeaderMenu;
