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
  <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
    <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8">

      {/* Profile Image */}
      <div className="flex flex-col items-center">
        <Avatar className="h-28 w-28">
          <AvatarImage src="/Images/student.png" alt="Profile" />
        </Avatar>

        <h1 className="mt-4 text-2xl font-bold text-gray-800">
          {user?.fullname}
        </h1>

        <p className="text-gray-500">
          {user?.email}
        </p>
      </div>

      {/* Information */}
      <div className="mt-8 space-y-4">

        <div className="border rounded-lg p-4">
          <h3 className="font-semibold text-gray-700">Role</h3>
          <p className="text-gray-600">
            {user?.role}
          </p>
        </div>

        <div className="border rounded-lg p-4">
          <h3 className="font-semibold text-gray-700">Joined On</h3>
          <p className="text-gray-600">
            {user?.createdAt
              ? new Date(user.createdAt).toLocaleDateString()
              : "N/A"}
          </p>
        </div>

        <div className="border rounded-lg p-4">
          <h3 className="font-semibold text-gray-700 mb-2">
            About
          </h3>

          {isEditing ? (
            <>
              <textarea
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />

              <div className="flex gap-3 mt-4">
                <Button
                  onClick={handleSave}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                >
                  Save
                </Button>

                <Button
                  onClick={() => setIsEditing(false)}
                  className="flex-1 bg-gray-400 hover:bg-gray-500 text-white"
                >
                  Cancel
                </Button>
              </div>
            </>
          ) : (
            <>
              <p className="text-gray-600">
                {user?.description || "No description added."}
              </p>

              <Button
                onClick={() => setIsEditing(true)}
                className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white"
              >
                Edit About
              </Button>
            </>
          )}
        </div>

      </div>

      {/* Logout */}
      <Button
        onClick={handleLogout}
        className="w-full mt-8 bg-red-500 hover:bg-red-600 text-white"
      >
        Logout
      </Button>

    </div>
  </div>
);
};

export default Profile;