import React from "react";
import Navbar from "./shared/Navbar";
import HomeSection from "./HomeSection";

const Home = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Navbar />

      {/* Main Content */}
      <HomeSection />
    </div>
  );
};

export default Home;
