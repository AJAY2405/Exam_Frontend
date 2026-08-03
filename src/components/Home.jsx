
import React from "react";
import Navbar from "./shared/Navbar";
import HomeSection from "./HomeSection";
 
const Home = () => {
  return (
    <div className="flex h-screen mt-8">
      
      {/* Sidebar */}
      <Navbar />
 
      {/* Main Content */}
      <div className="flex-1 relative overflow-y-auto">
        <HomeSection />
      </div>
 
    </div>
  );
};
 
export default Home;
 
