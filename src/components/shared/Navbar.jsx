// Navbar.jsx
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "../ui/button";
import {
  User,
  Home,
  ClipboardList,
  FileText,
  TrendingUp,
  Bell,
  PlusCircle,
  BarChart3,
  UploadCloud,
  Megaphone,
  Info,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/constants";
import { setUser } from "../../redux/authSlice";
import { toast } from "sonner";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Single source of truth for open/closed — used on every screen size now.
  // true = sidebar visible; false = collapsed (icon rail on desktop, hidden on mobile)
  const [open, setOpen] = useState(true);

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

  const isActive = (path) => location.pathname === path;
  const collapsed = !open;

  const NavItem = ({ to, icon: Icon, label }) => {
    const active = isActive(to);
    return (
      <li className="relative group">
        <Link
          to={to}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
            collapsed ? "justify-center" : ""
          } ${
            active
              ? "bg-orange-100 text-orange-700 font-semibold"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <Icon size={20} className="shrink-0" />
          {!collapsed && <span className="truncate">{label}</span>}
        </Link>

        {collapsed && (
          <span className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-2 whitespace-nowrap rounded-md bg-gray-900 text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity z-50">
            {label}
          </span>
        )}
      </li>
    );
  };

  return (
    <>
      {/* ✅ NEW: floating button to reopen the sidebar when it's fully hidden on mobile */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="md:hidden fixed top-4 left-4 z-50 bg-white border border-gray-200 shadow-md rounded-lg p-2 text-gray-700"
        >
          <PanelLeftOpen size={20} />
        </button>
      )}

      {/* Mobile overlay backdrop — only when sidebar is open on small screens */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="md:hidden fixed inset-0 bg-black/30 z-30"
        />
      )}

      {/* 🔹 Sidebar — the ONLY nav element now, no separate top navbar */}
      <aside
        className={`bg-white border-r border-gray-200 fixed top-0 left-0 h-full z-40
        transform transition-all duration-300 flex flex-col
        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        ${collapsed ? "md:w-[72px]" : "w-[250px]"}`}
      >
        {/* Header: logo + toggle */}
        <div className="flex items-center justify-between px-3 py-4 border-b border-gray-100">
          {!collapsed && (
            <img src="/Images/logo.png" alt="Logo" className="h-9 select-none" />
          )}
          {/* <h2 className="font-bold text-1.5xl text-orange-700">MDA Institute</h2> */}
          <button
            onClick={() => setOpen((prev) => !prev)}
            className={`text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-lg p-2 transition ${
              collapsed ? "mx-auto" : ""
            }`}
            title={open ? "Collapse sidebar" : "Expand sidebar"}
          >
            {open ? <PanelLeftClose size={20} /> : <PanelLeftOpen size={20} />}
          </button>
        </div>

        {/* User name */}
        {user && !collapsed && (
          <div className="px-4 pt-4 pb-2">
            <p className="text-gray-900  font-bold text-1.5xl truncate"> {user?.fullname}</p>
          </div>
        )}

        {/* Links */}
        <ul className="flex-1 overflow-y-auto flex flex-col gap-1 p-2 mt-2">
          <NavItem to="/" icon={Home} label="Home" />

          {user?.role === "student" && (
            <>
              <NavItem to="/test" icon={ClipboardList} label="Test" />
              <NavItem to="/notes" icon={FileText} label="Notes" />
              <NavItem to="/progress" icon={TrendingUp} label="My Progress" />
              <NavItem to="/notices" icon={Bell} label="Notice" />
            </>
          )}

          {user?.role === "teacher" && (
            <>
              <NavItem to="/teacher/create-test" icon={PlusCircle} label="Create Test" />
              <NavItem to="/teacher/results" icon={BarChart3} label="Results" />
              <NavItem to="/notes/upload" icon={UploadCloud} label="Upload Notes" />
              <NavItem to="/create-notice" icon={Megaphone} label="New Notice" />
            </>
          )}

          <NavItem to="/about" icon={Info} label="About" />
        </ul>

        {/* Bottom section */}
        <div className="border-t border-gray-100 p-2">
          {user ? (
            <div className="flex flex-col gap-1">
              <div className="relative group">
                <Link
                  to="/profile"
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 transition ${
                    collapsed ? "justify-center" : ""
                  }`}
                >
                  <User size={20} className="shrink-0" />
                  {!collapsed && <span>{user?.email}</span>}
                </Link>
                {collapsed && (
                  <span className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-2 whitespace-nowrap rounded-md bg-gray-900 text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity z-50">
                    {user?.email}
                  </span>
                )}
              </div>

              <div className="relative group">
                <button
                  onClick={logoutHandler}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition ${
                    collapsed ? "justify-center" : ""
                  }`}
                >
                  <LogOut size={20} className="shrink-0" />
                  {!collapsed && <span>Logout</span>}
                </button>
                {collapsed && (
                  <span className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-2 whitespace-nowrap rounded-md bg-gray-900 text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity z-50">
                    Logout
                  </span>
                )}
              </div>
            </div>
          ) : (
            <div className={`flex flex-col gap-2 ${collapsed ? "items-center" : ""}`}>
              <Link to="/login" className="w-full">
                <Button variant="outline" className="w-full">
                  {collapsed ? "→" : "Login"}
                </Button>
              </Link>
              <Link to="/signup" className="w-full">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white w-full">
                  {collapsed ? "+" : "Signup"}
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