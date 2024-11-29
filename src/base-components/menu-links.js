import React from "react";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";

function MenuLinks({
  loggedInStatus,
  isTermsConditionsPage,
  handleUserLogOut,
}) {
  const navigateTo = useNavigate();
  return (
    <div className="menu-links">
      {loggedInStatus && !isTermsConditionsPage && (
        <>
          <button
            className="underlined-link"
            onClick={() => {
              navigateTo("/trips");
            }}
          >
            <p>Dashboard</p>
          </button>

          <button
            className="underlined-link"
            onClick={() => navigateTo("/edit-account")}
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
              navigateTo("/faqs");
            }}
          >
            <p>FAQs</p>
          </button>
          <button
            className="underlined-link"
            onClick={() => navigateTo("/bug-report")}
          >
            <p>Report An Issue</p>
          </button>
        </>
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
  );
}

export default MenuLinks;
