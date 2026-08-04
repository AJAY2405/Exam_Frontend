import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Contact from "./Contact";

/* ================= DATA ================= */

const teachers = [
  {
    id: 1,
    name: "Mr. Shivam Sahani",
    subject: "Mathematics / English",
    qualification: "B.Sc, M.Sc",
    image: "/Images/teacher1.jpg",
  },
  {
    id: 2,
    name: "Mr. Ajay Sahani",
    subject: "Science / Math / Computer",
    qualification: "B.Tech Computer Science [AI & ML]",
    image: "/Images/teacher3.jpg",
  },
  {
    id: 3,
    name: "Mr. Nirbhay Sahani",
    subject: "Hindi / General Knowledge",
    qualification: "B.A [Hindi], BTC",
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
  const [index, setIndex] = useState(1);

  const nextCard = () => {
    setIndex((prev) => (prev + 1) % data.length);
  };

  const prevCard = () => {
    setIndex((prev) => (prev - 1 + data.length) % data.length);
  };

  const current = data[index];

  return (
    <section className="py-5">
      <h2 className="text-3xl font-bold text-center mb-10 text-black">
        {type === "teacher" ? "Our Teachers" : "Our Achievers"}
      </h2>

      <div className="flex items-center justify-center gap-8">
        {/* Previous */}
        <button onClick={prevCard}>
          <ChevronLeft
            size={25}
            strokeWidth={2.5}
            className="text-orange-500 hover:text-orange-600 transition cursor-pointer"
          />
        </button>

        {/* Card */}
        <div className="w-[300px] bg-white rounded-2xl shadow-lg border border-orange-100 p-6 text-center">
          <img
            src={current.image}
            alt={current.name}
            className="w-24 h-24 rounded-full object-cover border-4 border-orange-500 mx-auto"
          />

          <h3 className="mt-4 text-xl font-semibold text-black">
            {current.name}
          </h3>

          <p className="mt-2 text-orange-500 font-medium">
            {type === "teacher"
              ? current.subject
              : current.achievement}
          </p>

          <p className="mt-2 text-gray-600">
            {current.qualification}
          </p>
        </div>

        {/* Next */}
        <button onClick={nextCard}>
          <ChevronRight
            size={25}
            strokeWidth={2.5}
            className="text-orange-500 hover:text-orange-600 transition cursor-pointer"
          />
        </button>
      </div>
    </section>
  );
}

/* ================= HOME ================= */

function HomeSection() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white px-6 py-15 space-y-16 ">
      {/* Hero */}
      <section className="text-center">
        <img
          src="/Images/logo.png"
          alt="Logo"
          className="w-36 mx-auto"
        />

        <p className="max-w-3xl mx-auto mt-4 text-gray-700">
          We prepare students for CHS, UP Board, CBSE, Bihar Board, and JNV
          with expert faculty and modern teaching methods.
        </p>
      </section>

      {/* Announcement */}
      <section className="flex justify-center">
        <button
          onClick={() => navigate("/announcement")}
          className="px-6 py-3 rounded-full bg-orange-500 text-white hover:bg-orange-600"
        >
          Announcements
        </button>
      </section>

      {/* Teachers */}
      <Slider data={teachers} type="teacher" />

      {/* Achievers */}
      <Slider data={achievers} type="achiever" />

      {/* Contact */}
      <Contact />
    </div>
  );
}

export default HomeSection;