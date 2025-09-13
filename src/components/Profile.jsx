import React, { useState } from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { useSelector, useDispatch } from "react-redux";
import { logout, setUser } from "@/redux/authSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constants";

const Profile = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(user?.description || "");

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleSave = async () => {
    try {
      const res = await axios.put(
         `${USER_API_END_POINT}/update-description`,
        { description },
        { withCredentials: true }
      );

      if (res.data.success) {
        dispatch(setUser(res.data.user)); // ✅ update Redux store
        setIsEditing(false);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to update description");
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-100 via-pink-50 to-purple-100 flex items-center justify-center p-6 mt-12">
      <div className="bg-white/80 backdrop-blur-lg border border-gray-200 shadow-2xl rounded-2xl p-10 w-full max-w-3xl">
        
        {/* Profile Picture */}
        <div className="flex flex-col items-center">
          <Avatar className="h-32 w-32 shadow-xl border-4 border-white rounded-full overflow-hidden">
            <AvatarImage src="/Images/student.png" alt="profile" />
          </Avatar>

          <h1 className="mt-6 font-extrabold text-3xl text-gray-900 tracking-wide">
            {user?.fullname || "Your Name"}
          </h1>
          <p className="text-gray-600 text-lg mt-1 italic">
            {user?.email || "example@email.com"}
          </p>
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-gray-300 w-2/3 mx-auto"></div>

        {/* Extra Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-center">
          <div className="p-4 bg-gray-100 rounded-xl shadow-sm">
            <h3 className="font-semibold text-gray-700">Role</h3>
            <p className="text-gray-900">{user?.role || "student"}</p>
          </div>

          <div className="p-4 bg-gray-100 rounded-xl shadow-sm">
            <h3 className="font-semibold text-gray-700">Joined</h3>
            <p className="text-gray-900">
              {user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : "N/A"}
            </p>
          </div>

          <div className="p-4 bg-gray-100 rounded-xl shadow-sm col-span-1 sm:col-span-2">
            <h3 className="font-semibold text-gray-700">About</h3>
            {isEditing ? (
              <div className="mt-2">
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-3 border rounded-lg text-gray-900"
                  rows="4"
                />
                <div className="flex gap-3 mt-3 justify-center">
                  <Button
                    onClick={handleSave}
                    className="bg-green-500 text-white hover:bg-green-600"
                  >
                    Save
                  </Button>
                  <Button
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-400 text-white hover:bg-gray-500"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="mt-2">
                <h2 className="text-gray-900">
                  {user?.description ||
                    "No description added yet. Update your profile to tell more about yourself!"}
                </h2>
                <Button
                  onClick={() => setIsEditing(true)}
                  className="mt-5 bg-[#dedcdc] text-[#0a0a0a] hover:bg-[#a8a6a6]"
                >
                  Edit About
                </Button>
              </div>
            )}
          </div>
        </div>

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
