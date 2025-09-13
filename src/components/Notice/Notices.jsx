import React, { useEffect, useState } from "react";
import { NOTICE_API_END_POINT } from "../../utils/constants";
import axios from "axios";

const Notices = () => {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await axios.get(`${NOTICE_API_END_POINT}/all`, {
          withCredentials: true,
        });
        setNotices(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchNotices();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-yellow-100 via-pink-50 to-red-100 flex items-center justify-center p-6 mt-12">
      <div className="bg-white/90 backdrop-blur-lg border border-gray-200 shadow-2xl rounded-2xl p-10 w-full max-w-3xl">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
          Latest Notices
        </h1>

        {notices.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No notices yet</p>
        ) : (
          <div className="space-y-6">
            {notices.map((notice) => (
              <div
                key={notice._id}
                className="p-6 bg-gray-50 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300"
              >
                <h2 className="font-bold text-xl text-gray-900 border-b-2 border-yellow-300 pb-1 mb-3">
                  {notice.title}
                </h2>
                <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                  {notice.message}
                </p>
                <p className="text-xs text-gray-500 mt-4 text-right italic">
                  {new Date(notice.createdAt).toLocaleString("en-IN", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notices;
