// src/components/Layout.jsx
import React, { useState } from "react";
import { Outlet, useNavigation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

// Simple Spinner component (you can customize)
const LoadingSpinner = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-white/70 z-50">
    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const Layout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigation = useNavigation();

  // React Router gives "loading" state during navigation
  const isLoading = navigation.state === "loading";

  return (
    <div className="flex min-h-screen bg-gray-50 relative">
      {/* Sidebar */}
      <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Right Content Area */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300
          ${isOpen ? "ml-[260px]" : "ml-0"} 
          md:ml-[260px]`}
      >
        {/* Loading Overlay */}
        {isLoading && <LoadingSpinner />}

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
