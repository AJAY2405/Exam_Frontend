// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { Button } from "../ui/button";
// import { Avatar, AvatarImage } from "../ui/avatar";
// import { User, Menu, X } from "lucide-react";
// import axios from "axios";
// import { USER_API_END_POINT } from "../../utils/constants";
// import { setUser } from "../../redux/authSlice";
// import { toast } from "sonner";
// import { Typewriter } from "react-simple-typewriter";

// const Navbar = ({}) => {
//   const { user } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [isOpen, setIsOpen] = useState(false);
//   const logoutHandler = async () => {
//     try {
//       const res = await axios.get(`${USER_API_END_POINT}/logout`, {
//         withCredentials: true,
//       });
//       if (res.data.success) {
//         dispatch(setUser(null));
//         navigate("/login");
//         toast.success(res.data.message);
//       }
//     } catch (error) {
//       toast.error(error?.response?.data?.message || "Logout failed");
//     }
//   };

//   return (
//     <>
//       {/* Mobile Top Navbar */}
//       <div className="md:hidden fixed top-0 left-0 w-full bg-[#FAF6F2] shadow-md flex items-center justify-between px-4 py-3 z-50">
//         <img src="/Images/logo.png" alt="Logo" className="h-8 select-none" />

//         <button
//           onClick={() => setIsOpen(!isOpen)}
//           className="text-gray-800 focus:outline-none"
//         >
//           {isOpen ? <X size={28} /> : <Menu size={28} />}
//         </button>
//       </div>

//       {/* Sidebar */}
//       <aside
//         className={`bg-[#FAF6F2] shadow-md fixed top-0 left-0 h-full w-[260px] z-40 transform transition-transform duration-300 
//         ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
//       >
//         {/* Logo */}
//         <div className="hidden md:flex items-center gap-3 p-4 border-b border-gray-200">
//           <img
//             src="/Images/logo.png"
//             alt="Logo"
//             className="h-[80%] w-[80%] select-none"
//           />
//         </div>

//         {/* Links */}
//         <ul className="flex flex-col gap-6 p-4 font-medium text-xl md:text-2xl mt-12">
//           <h2 className="text-[#232324] text-2xl md:text-3xl font-bold flex items-center gap-2 mb-5">
//             {user && (
//               <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 bg-clip-text text-transparent">
//                 <Typewriter
//                   words={[user?.fullname || "Guest"]}
//                   loop
//                   typeSpeed={150}
//                   deleteSpeed={100}
//                   delaySpeed={1500}
//                 />
//               </span>
//             )}
//           </h2>

//           <li>
//             <Link
//               to="/"
//               onClick={() => setIsOpen(false)}
//               className="flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-200 hover:bg-[#FCD9B8] hover:text-white"
//             >
//               Home
//             </Link>
//           </li>

//           {user?.role === "student" && (
//             <li>
//               <Link
//                 to="/test"
//                 onClick={() => setIsOpen(false)}
//                 className="flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-200 hover:bg-[#FCD9B8] hover:text-white"
//               >
//                 Test
//               </Link>
//             </li>
//           )}

//           {user?.role === "teacher" && (
//             <>
//               <li>
//                 <Link
//                   to="/teacher/create-test"
//                   onClick={() => setIsOpen(false)}
//                   className="flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-200 hover:bg-[#FCD9B8] hover:text-white"
//                 >
//                   Create Test
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/teacher/results"
//                   onClick={() => setIsOpen(false)}
//                   className="flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-200 hover:bg-[#FCD9B8] hover:text-white"
//                 >
//                   Results
//                 </Link>
//               </li>
//             </>
//           )}

//           <li>
//             <Link
//               to="/about"
//               onClick={() => setIsOpen(false)}
//               className="flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-200 hover:bg-[#FCD9B8] hover:text-white"
//             >
//               About
//             </Link>
//           </li>
//         </ul>

//         {/* Bottom Section */}
//         <div className="absolute bottom-4 w-full px-4">
//           {user ? (
//             <div className="flex flex-col items-center gap-3">
//               <Avatar>
//                 <AvatarImage
//                   src={
//                     user?.profile?.profilePhoto || "/Images/default-avatar.png"
//                   }
//                   alt="User"
//                 />
//               </Avatar>

//               <Link
//                 to="/profile"
//                 onClick={() => setIsOpen(false)}
//                 className="flex items-center gap-2 hover:text-[#f4418f] w-full justify-center"
//               >
//                 <User size={18} /> Profile
//               </Link>

//               <Button
//                 onClick={logoutHandler}
//                 className="bg-red-600 hover:bg-red-700 text-white w-full"
//               >
//                 Logout
//               </Button>
//             </div>
//           ) : (
//             <div className="flex flex-col gap-2">
//               <Link to="/login" onClick={() => setIsOpen(false)}>
//                 <Button variant="outline" className="w-full">
//                   Login
//                 </Button>
//               </Link>
//               <Link to="/signup" onClick={() => setIsOpen(false)}>
//                 <Button className="bg-[#0d22d6] text-white w-full">
//                   Signup
//                 </Button>
//               </Link>
//             </div>
//           )}
//         </div>
//       </aside>
//     </>
//   );
// };

// export default Navbar;










// Navbar.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { User, Menu, X } from "lucide-react";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/constants";
import { setUser } from "../../redux/authSlice";
import { toast } from "sonner";
import { Typewriter } from "react-simple-typewriter";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  return (
    <>
      {/* Mobile Top Navbar */}
      <div className="md:hidden fixed top-0 left-0 w-full bg-[#FAF6F2] shadow-md flex items-center justify-between px-4 py-3 z-50">
        <img src="/Images/logo.png" alt="Logo" className="h-8 select-none" />
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-800 focus:outline-none"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`bg-[#FAF6F2] shadow-md fixed top-0 left-0 h-full w-[260px] z-40 transform transition-transform duration-300 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Logo */}
        <div className="hidden md:flex items-center gap-3 p-4 border-b border-gray-200">
          <img
            src="/Images/logo.png"
            alt="Logo"
            className="h-[80%] w-[80%] select-none"
          />
        </div>

        {/* Links */}
        <ul className="flex flex-col gap-6 p-4 font-medium text-xl md:text-2xl mt-12">
          <h2 className="text-[#232324] text-2xl md:text-3xl font-bold flex items-center gap-2 mb-5">
            {user && (
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 bg-clip-text text-transparent">
                {[user?.fullname[0] || "Guest"]}
                <Typewriter
                  words={[user?.fullname.slice(1) || "Guest"]}
                  loop
                  typeSpeed={150}
                  deleteSpeed={100}
                  delaySpeed={1500}
                />
              </span>
            )}
          </h2>

          <li>
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-200 hover:bg-[#FCD9B8] hover:text-white"
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
                  className="flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-200 hover:bg-[#FCD9B8] hover:text-white"
                >
                  Test
                </Link>
              </li>
              <li>
                <Link
                  to="/notes"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-200 hover:bg-[#FCD9B8] hover:text-white"
                >
                  Read Notes
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
                  className="flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-200 hover:bg-[#FCD9B8] hover:text-white"
                >
                  Create Test
                </Link>
              </li>
              <li>
                <Link
                  to="/teacher/results"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-200 hover:bg-[#FCD9B8] hover:text-white"
                >
                  Results
                </Link>
              </li>
              <li>
                <Link
                  to="/notes/upload"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-200 hover:bg-[#FCD9B8] hover:text-white"
                >
                  Upload Notes
                </Link>
              </li>
            </>
          )}

          <li>
            <Link
              to="/about"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-200 hover:bg-[#FCD9B8] hover:text-white"
            >
              About
            </Link>
          </li>
        </ul>

        {/* Bottom Section */}
        <div className="absolute bottom-4 w-full px-4">
          {user ? (
            <div className="flex flex-col items-center gap-3">
              <Avatar>
                <AvatarImage
                  src={user?.profile?.profilePhoto || "/Images/default-avatar.png"}
                  alt="User"
                />
              </Avatar>
              <Link
                to="/profile"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 hover:text-[#f4418f] w-full justify-center"
              >
                <User size={18} /> Profile
              </Link>
              <Button
                onClick={logoutHandler}
                className="bg-red-600 hover:bg-red-700 text-white w-full"
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
                <Button className="bg-[#0d22d6] text-white w-full">
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






