import React, { useState } from "react";
import { useTheme } from "./theme-provider";

const data = [
  {
    id: 1,
    title: "Admission Open 2026",
    category: "Admission",
    date: "1 April 2026",
    image:
      "https://res.cloudinary.com/dfxr85udp/image/upload/v1775198065/Gemini_Generated_Image_m0762dm0762dm076_tulosf.png",
    highlight: true,
    desc: "Admissions are now open for the academic session 2026-27.",
    details: "Full admission details here...",
  },
  {
    id: 2,
    title: "Mid-Term Exams",
    category: "Exam",
    date: "April 2026",
    image:
      "https://res.cloudinary.com/dfxr85udp/image/upload/v1775581326/Gemini_Generated_Image_3lb4px3lb4px3lb4_kpdh1r.png",
    desc: "Mid-term exams will begin from 15 April.",
    details: "Exam instructions...",
  },
  {
    id: 3,
    title: "Annual Function 2026",
    category: "Event",
    date: "April 25, 2026",
    image:
      "https://res.cloudinary.com/dfxr85udp/image/upload/v1775580607/Gemini_Generated_Image_yoyduwyoyduwyoyd_k4jy2w.png",
    desc: "Join our grand cultural annual function.",
    details: "Event details...",
  },
];

const categories = ["All", "Admission", "Exam", "Event"];

export default function Announcement() {
  const [active, setActive] = useState("All");
  const [selected, setSelected] = useState(null);

  const { resolvedTheme } = useTheme();

  const filtered =
    active === "All" ? data : data.filter((item) => item.category === active);

  const latest = data.find((item) => item.highlight);

  const getImage = (img) =>
    img && img !== "xyz" ? img : "/Images/default.jpg";

  /* ================= DETAIL PAGE ================= */
  if (selected) {
    return (
      <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white p-6 mt-10">
        <button
          onClick={() => setSelected(null)}
          className="mb-6 px-5 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white transition"
        >
          ← Back
        </button>

        <div className="max-w-3xl mx-auto border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden">
          <img
            src={getImage(selected.image)}
            alt={selected.title}
            className="w-full h-72 object-cover"
          />

          <div className="p-6">
            <span className="text-xs font-medium bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-300 px-3 py-1 rounded-full">
              {selected.category}
            </span>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-3 mb-1">
              {selected.title}
            </h2>

            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              📅 {selected.date}
            </p>

            <p className="leading-relaxed text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
              {selected.details}
            </p>
          </div>
        </div>
      </div>
    );
  }

  /* ================= MAIN PAGE ================= */
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      {/* Header */}
      <div className="text-center py-14 px-4 border-b border-gray-100 dark:border-gray-800">
        <img src="/Images/logo.png" alt="logo" className="w-20 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Announcements
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Stay updated with the latest academy news & events
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Latest */}
        {latest && (
          <div
            onClick={() => setSelected(latest)}
            className="cursor-pointer border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden mb-10 flex flex-col md:flex-row hover:border-orange-400 transition"
          >
            <img
              src={getImage(latest.image)}
              alt={latest.title}
              className="w-full md:w-1/2 h-56 object-cover"
            />

            <div className="p-6 flex flex-col justify-center">
              <span className="text-xs font-semibold text-red-500 mb-2">
                🔥 Latest Update
              </span>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {latest.title}
              </h2>
              <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm">
                {latest.desc}
              </p>
              <span className="text-xs text-gray-400 mt-4">
                📅 {latest.date}
              </span>
            </div>
          </div>
        )}

        {/* Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition ${
                active === cat
                  ? "bg-orange-500 border-orange-500 text-white"
                  : "bg-white dark:bg-transparent border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-orange-400"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelected(item)}
              className="cursor-pointer border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden hover:border-orange-400 transition"
            >
              <img
                src={getImage(item.image)}
                alt={item.title}
                className="h-44 w-full object-cover"
              />

              <div className="p-5">
                <span className="text-xs font-medium bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-300 px-3 py-1 rounded-full">
                  {item.category}
                </span>

                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-3">
                  {item.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                  {item.desc}
                </p>

                <p className="text-xs text-gray-400 mt-3">📅 {item.date}</p>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-gray-400 py-16">
            No announcements in this category yet.
          </p>
        )}
      </div>
    </div>
  );
}