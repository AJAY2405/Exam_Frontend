import React from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/redux/authSlice";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-100 via-pink-50 to-purple-100 flex items-center justify-center p-6">
      <div className="bg-white/80 backdrop-blur-lg border border-gray-200 shadow-2xl rounded-2xl p-10 w-full max-w-3xl">
        
        {/* Profile Picture */}
        <div className="flex flex-col items-center">
          <Avatar className="h-32 w-32 shadow-xl border-4 border-white rounded-full overflow-hidden">
            <AvatarImage
              src="/Images/student.png"
              alt="profile"
            />
          </Avatar>

          <h1 className="mt-6 font-extrabold text-3xl text-gray-900 tracking-wide">
            {user?.fullname || "Your Name"}
          </h1>
          <p className="text-gray-600 text-lg mt-1 italic">
            {user?.email || "example@email.com"}
          </p>
        </div>

        {/* Divider */}

        {/* Stats Section */}
        

        {/* Divider */}
        <div className="my-6 border-t border-gray-300 w-2/3 mx-auto"></div>

        {/* Logout Button */}
        <div className="flex justify-center">
          <Button
            className="w-40 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-semibold py-2 rounded-lg shadow-md transition-all duration-300"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
