// src/App.js
import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Login from "./pages/login";
import AccountRegistration from "./pages/account-registration";
import PlanTrip from "./pages/trip-plan";
import TripProgress from "./pages/trip-progress";
import HikerDashboard from "./pages/hiker-dashboard";
import EditAccount from "./pages/edit-account";
import TermsAndConditions from "./pages/terms-conditions";
import TripSummary from "./pages/trip-summary";
import Home from "./pages/home";
import Faqs from "./pages/faqs";
// import Home from "./Home"; // Assuming you have a Home component

import HeaderMenu from "./base-components/header-menu"

function App() {
  return (
    <div>
      <HeaderMenu />
      <Routes>
        {
        <Route path="/" element={<Home />} /> }
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<AccountRegistration />} />
        <Route path="/plan-trip" element={<PlanTrip />} />
        <Route path="/trips" element={<HikerDashboard />} />
        <Route path="/edit-account" element={<EditAccount />} />
        <Route path="/terms-conditions" element={<TermsAndConditions />} />
        <Route path="/trip-summary" element={<TripSummary />} />
        <Route path="/trip-progress" element={<TripProgress />} />
        <Route path="/faqs" element={<Faqs />} /> 
        <Route path="/trip-plan" element={<PlanTrip />} />
        <Route path="/account-registration" element={<AccountRegistration />} />
      </Routes>
    </div>
    
  );
}

export default App;
