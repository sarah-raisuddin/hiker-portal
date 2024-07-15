// src/App.js
import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import About from "./about";
import "./App.scss";
import Login from "./pages/login";
import AccountRegistration from "./pages/account-registration";
import PlanTrip from "./pages/trip-plan";
import TripProgress from "./pages/trip-progress";
import HikerDashboard from "./pages/hiker-dashboard";
import EditAccount from "./pages/edit-account";
import TermsAndConditions from "./pages/terms-conditions";
import TripSummary from "./pages/trip-summary";
// import Home from "./Home"; // Assuming you have a Home component

function App() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/plan-trip">Create Trip Plan</Link>
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
        </ul>
      </nav>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<AccountRegistration />} />
        <Route path="/plan-trip" element={<PlanTrip />} />
        <Route path="/trips" element={<HikerDashboard />} />
        <Route path="/edit-account" element={<EditAccount />} />
        <Route path="/terms-conditions" element={<TermsAndConditions />} />
        <Route path="/trip-summary" element={<TripSummary />} />
        <Route path="/trip-progress" element={<TripProgress />} />   
      </Routes>
    </div>
  );
}

export default App;
