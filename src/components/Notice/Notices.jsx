import React, { useEffect, useState } from "react";
import { NOTICE_API_END_POINT } from "../../utils/constants";
import axios from "axios";

const Notices = () => {
  const [notices, setNotices] = useState([]);
  const [selectedNotice, setSelectedNotice] = useState(null);

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

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });

  return (
    <div
      className="w-full min-h-screen 
      bg-white
      text-black
      flex items-center justify-center p-6 mt-12 
      transition-colors duration-300"
    >
      {/* 🔹 Main Card */}
      <div
        className="bg-orange-100/40
        backdrop-blur-xl 
        border border-orange-300/40
        shadow-2xl rounded-2xl p-10 w-full max-w-3xl"
      >
        {/* Title */}
        <h1 className="text-3xl font-extrabold text-center text-black mb-8">
          📢 Latest Notices
        </h1>

        {/* No Notices */}
        {notices.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">
            No notices yet
          </p>
        ) : (
          <div className="space-y-4">
            {notices.map((notice) => (
              <button
                key={notice._id}
                onClick={() => setSelectedNotice(notice)}
                className="w-full text-left p-5 
                bg-orange-200/40
                rounded-2xl shadow-md 
                border border-orange-300/40
                hover:shadow-xl hover:scale-[1.01] 
                transition-all duration-300
                flex justify-between items-center gap-4"
              >
                <h2 className="font-bold text-lg text-black">
                  {notice.title}
                </h2>
                <span className="text-xs text-gray-500 italic whitespace-nowrap">
                  {formatDate(notice.createdAt)}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 🔹 Full Notice Modal */}
      {selectedNotice && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50"
          onClick={() => setSelectedNotice(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedNotice(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl leading-none"
              aria-label="Close"
            >
              ✕
            </button>

            <h2 className="font-bold text-2xl text-black border-b border-orange-400 pb-2 mb-4 pr-8">
              {selectedNotice.title}
            </h2>

            <p className="text-gray-700 whitespace-pre-line leading-relaxed">
              {selectedNotice.message}
            </p>

            <p className="text-xs text-gray-500 mt-6 text-right italic">
              {formatDate(selectedNotice.createdAt)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notices;