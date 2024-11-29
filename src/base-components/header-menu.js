import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../images/logos/wanderSafe-logo-grey.png";
import { useNavigate, useLocation } from "react-router-dom";
import { isUserLoggedIn } from "../util";
import menuIcon from "../images/icons/menu-icon.png";
import MenuLinks from "./menu-links";
import SubmissionButton from "./button";
import closeIcon from "../images/buttons/button-close.png";
import mobileLogo from "../images/logos/mobile-logo.png";

function HeaderMenu({ handleUserLogOut }) {
  // navigation
  const navigateTo = useNavigate();
  const location = useLocation();

  // authentification
  const [loggedInStatus, setIsUserLoggedIn] = useState(false);
  const [openMobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    setIsUserLoggedIn(isUserLoggedIn());
  }, [location]);

  const handleHomeNav = () => {
    const link = loggedInStatus ? "/dashboard" : "/login";
    navigateTo(link);
  };

  // special case for terms and conditions page
  const isTermsConditionsPage = location.pathname === "/terms-conditions";

  return (
    <nav className="header-menu">
      <div className="header-menu-left">
        <button className="menu-logo" onClick={handleHomeNav}>
          <img className="desktop-menu-logo" src={logo} alt="WanderSafe Logo" />
          <img
            className="mobile-menu-logo"
            src={mobileLogo}
            alt="WanderSageLogo"
          />
        </button>
      </div>
      <div className="header-menu-right">
        <div className="mobile-menu-toggle">
          <div onClick={() => setMobileMenu(true)}>
            <img src={menuIcon} />
          </div>
        </div>
        <span className="desktop-links">
          <MenuLinks
            loggedInStatus={loggedInStatus}
            isTermsConditionsPage={isTermsConditionsPage}
            handleUserLogOut={handleUserLogOut}
          />
        </span>

        {openMobileMenu && (
          <>
            <div class="overlay" />
            <div className="mobile-menu">
              <SubmissionButton
                specialIcon={closeIcon}
                handleSubmit={() => setMobileMenu(false)}
              />
              <MenuLinks
                loggedInStatus={loggedInStatus}
                isTermsConditionsPage={isTermsConditionsPage}
                handleUserLogOut={handleUserLogOut}
              />
            </div>
          </>
        )}
      </div>
    </nav>
  );
}

export default HeaderMenu;
