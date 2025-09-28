import React, { useState } from "react";
import axios from "axios";
import { NOTES_API_END_POINT } from "../../utils/constants";
import toast from "react-hot-toast";

const UploadNote = () => {
  const [title, setTitle] = useState("");
  const [pdf, setPdf] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("pdf", pdf);

      await axios.post(`${NOTES_API_END_POINT}/upload`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("📄 Note uploaded successfully!");
      setTitle("");
      setPdf(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "❌ Upload failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          📄 Upload Your Note
        </h2>
        <form onSubmit={handleUpload} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Enter Note Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setPdf(e.target.files[0])}
            required
            className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50 cursor-pointer"
          />

          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-3 bg-green-600 text-white rounded-lg font-semibold transition-all duration-300 ease-in-out hover:bg-green-500 active:bg-green-800"
          >
            Upload PDF
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadNote;
