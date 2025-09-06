// src/components/Layout.jsx
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer"; // 👈 import Footer

const Layout = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Right Content Area */}
      <div
        className={`
          flex-1 flex flex-col transition-all duration-300
          ${isOpen ? "ml-[260px]" : "ml-0"} 
          md:ml-[260px]  // Always show margin on desktop
        `}
      >
        {/* Page Content */}
        <div className="flex-1 overflow-auto">
          <Outlet /> {/* Profile, Student Table, Teacher Table, etc. */}
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
