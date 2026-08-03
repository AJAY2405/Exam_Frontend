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
        dispatch(setUser(res.data.user));
        setIsEditing(false);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to update description");
    }
  };

  return (
    <div
      className="w-full min-h-screen 
      bg-white dark:bg-black 
      text-black dark:text-white 
      flex items-center justify-center p-6 mt-12 
      transition-colors duration-300"
    >
      {/* Card */}
      <div
        className="bg-orange-100/40 dark:bg-black/60 
        backdrop-blur-xl border border-orange-300/40 dark:border-white/10 
        shadow-2xl rounded-2xl p-10 w-full max-w-3xl"
      >
        {/* Profile */}
        <div className="flex flex-col items-center">
          <Avatar className="h-32 w-32 shadow-xl border-4 border-orange-400 rounded-full overflow-hidden">
            <AvatarImage src="/Images/student.png" alt="profile" />
          </Avatar>

          <h1 className="mt-6 font-extrabold text-3xl text-black dark:text-white">
            {user?.fullname || "Your Name"}
          </h1>

          <p className="text-gray-600 dark:text-gray-400 text-lg mt-1 italic">
            {user?.email || "example@email.com"}
          </p>
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-orange-300/40 dark:border-white/10 w-2/3 mx-auto"></div>

        {/* Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-center">
          
          {/* Role */}
          <div className="p-4 bg-orange-200/40 dark:bg-black/50 rounded-xl shadow-sm">
            <h3 className="font-semibold text-gray-700 dark:text-gray-300">
              Role
            </h3>
            <p className="text-black dark:text-white">
              {user?.role || "student"}
            </p>
          </div>

          {/* Joined */}
          <div className="p-4 bg-orange-200/40 dark:bg-black/50 rounded-xl shadow-sm">
            <h3 className="font-semibold text-gray-700 dark:text-gray-300">
              Joined
            </h3>
            <p className="text-black dark:text-white">
              {user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : "N/A"}
            </p>
          </div>

          {/* About */}
          <div className="p-4 bg-orange-200/40 dark:bg-black/50 rounded-xl shadow-sm col-span-1 sm:col-span-2">
            <h3 className="font-semibold text-gray-700 dark:text-gray-300">
              About
            </h3>

            {isEditing ? (
              <div className="mt-2">
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-3 border rounded-lg 
                  bg-white dark:bg-black 
                  text-black dark:text-white 
                  border-gray-300 dark:border-gray-600"
                  rows="4"
                />

                <div className="flex gap-3 mt-3 justify-center">
                  <Button className="bg-green-500 hover:bg-green-600 text-white" onClick={handleSave}>
                    Save
                  </Button>

                  <Button
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-400 hover:bg-gray-500 text-white"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="mt-2">
                <h2 className="text-black dark:text-white">
                  {user?.description ||
                    "No description added yet. Update your profile!"}
                </h2>

                <Button
                  onClick={() => setIsEditing(true)}
                  className="mt-5 bg-orange-400 hover:bg-orange-500 text-white"
                >
                  Edit About
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-orange-300/40 dark:border-white/10 w-2/3 mx-auto"></div>

        {/* Logout */}
        <div className="flex justify-center">
          <Button
            className="w-40 bg-red-500 hover:bg-red-700 text-white font-semibold py-2 rounded-lg shadow-md transition-all duration-300"
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