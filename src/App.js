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
            <Link to="/plan-trip">trip</Link>
          </li>
          <Link to="/trip-progress">dashboard</Link>
          <Link to="/trips">dashboard</Link>
        </ul>
      </nav>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<AccountRegistration />} />
        <Route path="/plan-trip" element={<PlanTrip />} />
        <Route path="/trips" element={<HikerDashboard />} />
      </Routes>
    </div>
  );
}

export default App;
