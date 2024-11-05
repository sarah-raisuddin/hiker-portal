import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../images/wanderSafe-logo-grey.png";
import { useNavigate, useLocation } from "react-router-dom";
import { isUserLoggedIn } from "../util";

function HeaderMenu({ handleUserLogOut }) {
  // navigation
  const navigateTo = useNavigate();
  const location = useLocation();

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

  // authentification
  const [loggedInStatus, setIsUserLoggedIn] = useState(false);
  useEffect(() => {
    setIsUserLoggedIn(isUserLoggedIn());
  }, [location]);

  // special case for terms and conditions page
  const isTermsConditionsPage = location.pathname === "/terms-conditions";

  return (
    <nav className="header-menu">
      <div className="header-menu-left">
        <button className="menu-logo" onClick={handleHomeNav}>
          <img className="menu-logo" src={logo} alt="WanderSafe Logo" />
        </button>
      </div>
      <div className="header-menu-right">
        <div className="menu-links">
          {loggedInStatus && !isTermsConditionsPage && (
            <button className="underlined-link" onClick={handleDashboardNav}>
              <p>Dashboard</p>
            </button>
          )}
          {loggedInStatus && !isTermsConditionsPage && (
            <button className="underlined-link" onClick={handleEditAccountNav}>
              <p>Edit Account</p>
            </button>
          )}
          {!isTermsConditionsPage && (
            <button className="underlined-link" onClick={handleFaqNav}>
              <p>FAQs</p>
            </button>
          )}
          {!isTermsConditionsPage && (
            <button className="underlined-link" onClick={handleReportBugNav}>
              <p>Report An Issue</p>
            </button>
          )}
          <div className="account-control-link">
            <li>
              {loggedInStatus ? (
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
