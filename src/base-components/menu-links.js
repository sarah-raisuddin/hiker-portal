import React from "react";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";

function MenuLinks({
  loggedInStatus,
  isTermsConditionsPage,
  handleUserLogOut,
  closeMenu,
}) {
  const navigateTo = useNavigate();

  const handleSubmit = (link) => {
    navigateTo(link);
    if (closeMenu) {
      closeMenu(false);
    }
  };

  return (
    <div className="menu-links">
      {loggedInStatus && !isTermsConditionsPage && (
        <>
          <button
            className="underlined-link"
            onClick={() => {
              handleSubmit("/trips");
            }}
          >
            <p>Dashboard</p>
          </button>

          <button
            className="underlined-link"
            onClick={() => handleSubmit("/edit-account")}
          >
            <p>Edit Account</p>
          </button>
        </>
      )}
      {!isTermsConditionsPage && (
        <>
          <button
            className="underlined-link"
            onClick={() => {
              handleSubmit("/faqs");
            }}
          >
            <p>FAQs</p>
          </button>
          <button
            className="underlined-link"
            onClick={() => handleSubmit("/bug-report")}
          >
            <p>Report An Issue</p>
          </button>
          <button
            className="underlined-link"
            onClick={() => handleSubmit("/about-us")}
          >
            <p>About Us</p>
          </button>
        </>
      )}

      <div className="account-control-link">
        <li>
          {loggedInStatus ? (
            <Link to="/login" onClick={handleUserLogOut}>
              Logout
            </Link>
          ) : (
            <Link to="/login" onClick={() => handleSubmit("/login")}>
              Login
            </Link>
          )}
        </li>
      </div>
    </div>
  );
}

export default MenuLinks;
