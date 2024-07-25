import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/wanderSafe-logo-grey.png";

function HeaderMenu() {
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
                        <Link to="/login">Login</Link>
                    </li>
                    <li>
                        <Link to="/faqs">FAQs</Link>
                    </li>
                    <li>
                        <Link to="/trip-progress">Trip Progress</Link>
                    </li>
                    <li>
                        <Link to="/trips">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/edit-account">Edit Account</Link>
                    </li>
                    <li>
                        <Link to="/terms-conditions">Terms and Conditions</Link>
                    </li>
                    <li>
                        <Link to="/trip-summary">Trip Summary</Link>
                    </li>
                    <li>
                        <Link to="/trip-plan">Trip Plan</Link>
                    </li>
                    <li>
                        <Link to="/account-registration">Account Registration</Link>
                    </li>
                </ul>
            </div>   
        </nav>
    );
};

export default HeaderMenu;
