// Navbar.jsx
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "../ui/button";
import { User, Menu, X } from "lucide-react";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/constants";
import { setUser } from "../../redux/authSlice";
import { toast } from "sonner";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Logout failed");
    }
  };

  const isActive = (path) =>
    location.pathname === path
      ? "bg-orange-400/60 text-black font-semibold shadow-md"
      : "text-gray-800 hover:bg-orange-300/40 hover:text-black";

  return (
    <>
      {/* 🔹 Mobile Top Navbar */}
      <div className="md:hidden fixed top-0 left-0 w-full 
      bg-orange-200/40 backdrop-blur-lg 
      shadow-md flex items-center justify-between px-4 py-3 z-50 transition-all duration-300">
        
        <img src="/Images/logo.png" alt="Logo" className="h-8 select-none" />

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-900"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* 🔹 Sidebar */}
      <aside
        className={`bg-orange-100/40 backdrop-blur-xl 
        shadow-2xl fixed top-0 left-0 h-full w-[260px] z-40 
        transform transition-all duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Logo */}
        <div className="hidden md:flex items-center justify-center py-6 
        border-b border-orange-300/40">
          <img src="/Images/logo.png" alt="Logo" className="h-[100px] select-none" />
        </div>

        {/* Links */}
        <ul className="flex flex-col gap-4 p-4 font-medium text-lg md:text-xl mt-16">

          {user && (
            <h2 className="text-gray-900 text-2xl md:text-3xl font-bold mb-5">
              {user?.fullname}
            </h2>
          )}

          <li>
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${isActive("/")}`}
            >
              Home
            </Link>
          </li>

          {user?.role === "student" && (
            <>
              <li>
                <Link
                  to="/test"
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${isActive("/test")}`}
                >
                  Test
                </Link>
              </li>

              <li>
                <Link
                  to="/notes"
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${isActive("/notes")}`}
                >
                  Notes
                </Link>
              </li>
               <li>
                <Link
                  to="/progress"
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${isActive("/progress")}`}
                >
                  My Progress
                </Link>
              </li>

              <li>
                <Link
                  to="/notices"
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${isActive("/notices")}`}
                >
                  Notice
                </Link>
              </li>
            </>
          )}

          {user?.role === "teacher" && (
            <>
              <li>
                <Link
                  to="/teacher/create-test"
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${isActive("/teacher/create-test")}`}
                >
                  Create Test
                </Link>
              </li>

              <li>
                <Link
                  to="/teacher/results"
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${isActive("/teacher/results")}`}
                >
                  Results
                </Link>
              </li>

              {/* <li>
                <Link
                  to="/classes"
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${isActive("/classes")}`}
                >
                  Classes
                </Link>
              </li> */}

              <li>
                <Link
                  to="/notes/upload"
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${isActive("/notes/upload")}`}
                >
                  Upload Notes
                </Link>
              </li>

              <li>
                <Link
                  to="/create-notice"
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${isActive("/create-notice")}`}
                >
                  New Notice
                </Link>
              </li>
            </>
          )}

          <li>
            <Link
              to="/about"
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${isActive("/about")}`}
            >
              About
            </Link>
          </li>
        </ul>

        {/* 🔹 Bottom Section */}
        <div className="absolute bottom-6 w-full px-4">
          {user ? (
            <div className="flex flex-col items-center gap-3 p-4 rounded-xl 
            shadow-lg bg-orange-200/30 backdrop-blur-lg transition-all duration-300">

              <Link
                to="/profile"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 text-gray-900 hover:text-orange-600"
              >
                <User size={18} /> Profile
              </Link>

              <Button
                onClick={logoutHandler}
                className="bg-red-600 hover:bg-red-800 text-white w-full"
              >
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <Link to="/login" onClick={() => setIsOpen(false)}>
                <Button variant="outline" className="w-full">
                  Login
                </Button>
              </Link>

              <Link to="/signup" onClick={() => setIsOpen(false)}>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white w-full">
                  Signup
                </Button>
              </Link>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Navbar;