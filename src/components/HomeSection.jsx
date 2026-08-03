import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Contact from "./Contact";
import CardSlider from "./CardSlider";

/* ================= DATA ================= */

const teachers = [
  {
    id: 1,
    name: "Mr. Shivam Sahani",
    subject: "Mathematics / English",
    qualification: "B.Sc , M.Sc",
    image: "/Images/teacher1.jpg",
  },
  {
    id: 2,
    name: "Mr. Ajay Sahani",
    subject: "Science / Math / Computer",
    qualification: "B.Tech Computer Science[AI&ML]",
    image: "/Images/teacher3.jpg",
  },
  {
    id: 3,
    name: "Mr. Nirbhay Sahani",
    subject: "Hindi / General Knowledge",
    qualification: "B.A [Hindi] , BTC",
    image: "/Images/teacher4.jpg",
  },
];

const achievers = [
  {
    id: 1,
    name: "XYZ Singh",
    achievement: "10th Topper 2024",
    qualification: "96%",
    image: "/Images/student1.jpg",
  },
  {
    id: 2,
    name: "XYZ Sahani",
    achievement: "12th Selection",
    qualification: "92%",
    image: "/Images/student2.jpg",
  },
];

/* ================= SLIDER ================= */
function Slider({ data, type }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % data.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [data.length]);

  const current = data[index];

  const getImage = (img) =>
    img && img !== "xyz" ? img : "/Images/default.jpg";

  return (
    <section>
      <h2 className="text-2xl sm:text-3xl font-bold text-black mb-8 text-center md:text-left">
        {type === "teacher" ? "👩‍🏫 Our Teachers" : "🏆 Our Achievers"}
      </h2>

      <div className="flex justify-center items-center h-[340px] relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, scale: 0.8, y: 60 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -60 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="
              bg-orange-100/40
              backdrop-blur-xl 
              border border-orange-400
              rounded-2xl shadow-xl 
              p-6 text-center w-[260px]
            "
          >
            <img
              src={getImage(current.image)}
              alt={current.name}
              className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-orange-500 object-cover"
            />

            <h3 className="text-lg font-semibold text-black">
              {current.name}
            </h3>

            <p className="text-orange-500 font-medium">
              {type === "teacher"
                ? current.subject
                : current.achievement}
            </p>

            <p className="text-gray-600">
              {current.qualification}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ================= MAIN ================= */
function HomeSection() {
  const navigate = useNavigate();

  return (
    <div
      className="
      min-h-screen w-full 
      bg-white
      text-black
      px-4 sm:px-6 md:px-8 py-8 space-y-16 
      transition-colors duration-300
    "
    >
      {/* 🔹 Hero */}
      <section className="text-center space-y-4">
        <img src="/Images/logo.png" alt="logo" className="w-36 mx-auto" />

        <p className="max-w-3xl mx-auto text-gray-700">
          We prepare students for CHS, UP Board, CBSE, Bihar Board, and JNV with
          expert faculty and modern teaching methods.
        </p>
      </section>

      {/* 🔹 Announcement */}
      <section className="flex justify-center">
        <button
          onClick={() => navigate("/announcement")}
          className="
            px-5 py-2 rounded-full 
            bg-orange-500 hover:bg-orange-600 
            text-white shadow-md 
            transition hover:scale-105 active:scale-95
          "
        >
           Announcements
        </button>
      </section>

      {/* 🔹 Teachers */}
      {/* <Slider data={teachers} type="teacher" /> */}

      {/* 🔹 Quote */}
      {/* <section className="bg-orange-100 p-6 rounded-xl text-center">
        <blockquote className="italic text-black text-xl">
          “Education is the most powerful weapon which you can use to change the world.”
          <span className="block mt-2 font-semibold text-orange-500">
            – Nelson Mandela
          </span>
        </blockquote>
      </section> */}

      {/* 🔹 Achievers */}
      {/* <Slider data={achievers} type="achiever" /> */}
      <CardSlider/>
      {/* 🔹 Contact */}
      <Contact />
    </div>
  );
}

export default HomeSection;