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
    image: "https://res.cloudinary.com/dfxr85udp/image/upload/v1775581326/Gemini_Generated_Image_3lb4px3lb4px3lb4_kpdh1r.png",
    desc: "Mid-term exams will begin from 15 April.",
    details: "Exam instructions...",
  },
  {
    id: 3,
    title: "Annual Function 2026",
    category: "Event",
    date: "April 25, 2026",
    image: "https://res.cloudinary.com/dfxr85udp/image/upload/v1775580607/Gemini_Generated_Image_yoyduwyoyduwyoyd_k4jy2w.png",
    desc: "Join our grand cultural annual function.",
    details: "Event details...",
  },
];

const categories = ["All", "Admission", "Exam", "Event"];

export default function Announcement() {
  const [active, setActive] = useState("All");
  const [selected, setSelected] = useState(null);

  // optional (if needed)
  const { resolvedTheme } = useTheme();

  const filtered =
    active === "All" ? data : data.filter((item) => item.category === active);

  const latest = data.find((item) => item.highlight);

  const getImage = (img) =>
    img && img !== "xyz" ? img : "/Images/default.jpg";

  /* ================= DETAIL PAGE ================= */
  if (selected) {
    return (
      <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-all duration-300 p-6 mt-10">
        <button
          onClick={() => setSelected(null)}
          className="mb-6 px-5 py-2 rounded-full 
          bg-orange-500 hover:bg-orange-600 
          text-white transition"
        >
          ← Back
        </button>

        <div
          className="max-w-4xl mx-auto 
        bg-orange-100/40 dark:bg-white/5 
        backdrop-blur-xl 
        border border-orange-300/40 dark:border-white/10 
        rounded-3xl shadow-2xl overflow-hidden"
        >
          <img
            src={getImage(selected.image)}
            alt={selected.title}
            className="w-full h-80 object-cover"
          />

          <div className="p-8">
            <h2 className="text-4xl font-bold text-orange-500 mb-2">
              {selected.title}
            </h2>

            <p className="text-gray-500 dark:text-gray-400 mb-6">
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
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-all duration-300 overflow-hidden">
      {/* HERO */}
      <div
        className="relative text-center py-20 
      bg-gradient-to-r from-orange-400 via-white to-green-500 text-white overflow-hidden"
      >
        <div className="absolute w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse top-[-100px] left-[-100px]" />
        <div className="absolute w-96 h-96 bg-orange-300/20 rounded-full blur-3xl animate-pulse bottom-[-120px] right-[-120px]" />

        <img src="/Images/logo.png" alt="logo" className="w-36 mx-auto" />

        <h1 className="text-5xl font-extrabold text-orange-700 relative z-10">
          Announcements
        </h1>

        <p className="opacity-90 mt-3 text-lg relative z-10 text-orange-600">
          Stay updated with latest academy news & events
        </p>
      </div>

      {/* 🔥 LATEST */}
      {latest && (
        <div className="max-w-6xl mx-auto px-4 -mt-14 mb-12">
          <div
            onClick={() => setSelected(latest)}
            className="group cursor-pointer rounded-3xl overflow-hidden
            bg-orange-100/40 dark:bg-white/5 backdrop-blur-xl
            border border-orange-300/40 dark:border-white/10
            shadow-xl hover:shadow-2xl transition hover:scale-[1.02]"
          >
            <div className="overflow-hidden md:w-1/2">
              <img
                src={getImage(latest.image)}
                alt={latest.title}
                className="h-72 w-full object-cover group-hover:scale-110 transition"
              />
            </div>

            <div className="p-8 flex flex-col justify-center">
              <span className="text-red-500 font-bold mb-2 animate-pulse">
                🔥 Latest Update
              </span>

              <h2 className="text-3xl font-bold text-orange-500">
                {latest.title}
              </h2>

              <p className="mt-3 text-gray-600 dark:text-gray-300">
                {latest.desc}
              </p>

              <span className="text-gray-400 mt-4">
                📅 {latest.date}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* FILTER */}
      <div className="flex justify-center gap-4 flex-wrap mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-6 py-2 rounded-full font-semibold transition
            ${
              active === cat
                ? "bg-orange-500 text-white shadow-lg scale-105"
                : "bg-orange-100/60 dark:bg-white/5 text-black dark:text-white border border-orange-300 dark:border-white/20 hover:scale-105"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* CARDS */}
      <div className="max-w-6xl mx-auto px-4 pb-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelected(item)}
            className="group cursor-pointer rounded-3xl
            bg-orange-100/40 dark:bg-white/5 backdrop-blur-xl
            border border-orange-300/40 dark:border-white/10
            shadow-lg hover:shadow-2xl transition hover:-translate-y-3"
          >
            <div className="overflow-hidden rounded-t-3xl">
              <img
                src={getImage(item.image)}
                alt={item.title}
                className="h-52 w-full object-cover group-hover:scale-110 transition"
              />
            </div>

            <div className="p-6">
              <span className="text-xs font-semibold bg-orange-200 dark:bg-orange-800 text-orange-700 dark:text-orange-300 px-3 py-1 rounded-full">
                {item.category}
              </span>

              <h3 className="text-xl font-bold mt-3 group-hover:text-orange-500 transition">
                {item.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                {item.desc}
              </p>

              <p className="text-xs text-gray-400 mt-4">
                📅 {item.date}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}