import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/wanderSafe-logo-grey.png";
import { useNavigate } from "react-router-dom";

function HeaderMenu({ isUserLoggedIn, handleUserLogOut }) {
  // navigation
  const navigateTo = useNavigate();

  // useNavigate was used so that user log-in status does not get
  // reset like it does when Link is used
  const handleFaqNav = () => {
    navigateTo("/faqs");
  };

  const handleEditAccountNav = () => {
    navigateTo("/edit-account");
  };

  const handleHomeNav = () => {
    navigateTo("/home");
  };

  const handleDashboardNav = () => {
    navigateTo("/trips");
  };

  const handleReportBugNav = () => {
    navigateTo("/bug-report");
  };

  return (
    <nav className="header-menu">
      <div className="header-menu-left">
        <button className="menu-logo" onClick={handleHomeNav}>
          <img className="menu-logo" src={logo} alt="WanderSafe Logo" />
        </button>
      </div>
      <div className="header-menu-right">
        <div className="menu-links">
          {isUserLoggedIn && (
            <button className="underlined-link" onClick={handleDashboardNav}>
              <p>Dashboard</p>
            </button>
          )}
          {isUserLoggedIn && (
            <button className="underlined-link" onClick={handleEditAccountNav}>
              <p>Edit Account</p>
            </button>
          )}
          <button className="underlined-link" onClick={handleFaqNav}>
            <p>FAQs</p>
          </button>
          <button className="underlined-link" onClick={handleReportBugNav}>
            <p>Report An Issue</p>
          </button>
          <div className="account-control-link">
            <li>
              {isUserLoggedIn ? (
                <Link to="/home" onClick={handleUserLogOut}>
                  Logout
                </Link>
              ) : (
                <Link to="/login">Login</Link>
              )}
            </li>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default HeaderMenu;
