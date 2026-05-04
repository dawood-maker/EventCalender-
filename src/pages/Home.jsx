import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Profile from "../components/Profile";
import Dashboard from "../components/DashBoard/Dashboard";

function Home() {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <>
      {/* Navbar */}
      <Navbar setShowProfile={setShowProfile} />

      <Dashboard />

      {/* Profile Popup */}
      <Profile showProfile={showProfile} setShowProfile={setShowProfile} />
    </>
  );
}

export default Home;
