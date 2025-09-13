import React, { useState } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { NOTICE_API_END_POINT } from "../../utils/constants";
import { toast } from "react-toastify";

const CreateNotice = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${NOTICE_API_END_POINT}/create`,
        { title, message },
        { withCredentials: true }
      );

      if (res.data) {
        toast.success("Notice created successfully!");
        setTitle("");
        setMessage("");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to create notice");
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center p-6 mt-12">
      <div className="bg-white/90 backdrop-blur-lg border border-gray-200 shadow-2xl rounded-2xl p-10 w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create Notice
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Notice Title"
            className="w-full p-3 border rounded-lg text-gray-900"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Notice Message"
            className="w-full p-3 border rounded-lg text-gray-900"
            rows="4"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className="flex justify-center">
            <Button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
              Publish
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNotice;
