import React, { useState } from "react";

function Contact() {
  const [flip, setFlip] = useState(false);

  return (
    <div
      id="contacts"
      className="flex min-h-[70vh] w-full items-center justify-center py-10
      bg-white transition-colors duration-300"
    >
      {/* Flip Container */}
      <div
        className="relative w-full max-w-[420px] sm:max-w-[500px] h-[420px] perspective"
        onMouseEnter={() => setFlip(true)}
        onMouseLeave={() => setFlip(false)}
      >
        {/* Card */}
        <div
          className={`relative w-full h-full transition-transform duration-700 ${
            flip ? "rotate-y-180" : ""
          }`}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* ================= FRONT SIDE ================= */}
          <div
            className="absolute w-full h-full 
            bg-white/80
            backdrop-blur-lg
            border border-blue-200
            rounded-2xl shadow-xl 
            p-8 flex flex-col items-center justify-center gap-4
            transition-colors duration-300"
            style={{ backfaceVisibility: "hidden" }}
          >
            <h1 className="text-2xl sm:text-3xl font-bold 
              bg-gradient-to-r from-blue-500 to-pink-500 
              bg-clip-text text-transparent">
              Contact Us
            </h1>

            <p className="text-gray-600 text-center">
              We'd love to hear from you 💬
            </p>

            <p className="text-sm text-gray-500 text-center">
              Hover to fill the form ✨
            </p>

            {/* Glow Effect */}
            <div className="w-20 h-20 rounded-full 
              bg-gradient-to-r from-blue-400 to-pink-400 
              opacity-20 blur-xl absolute bottom-10">
            </div>
          </div>

          {/* ================= BACK SIDE (FORM) ================= */}
          <form
            action="https://formsubmit.co/rahul372602@gmail.com"
            method="POST"
            className="absolute w-full h-full 
            bg-white/90
            backdrop-blur-lg
            border border-blue-200
            rounded-2xl shadow-xl 
            p-6 flex flex-col gap-4 justify-center
            transition-colors duration-300"
            style={{
              transform: "rotateY(180deg)",
              backfaceVisibility: "hidden",
            }}
          >
            <h1 className="text-xl sm:text-2xl font-bold text-center 
              bg-gradient-to-r from-blue-500 to-pink-500 
              bg-clip-text text-transparent">
              Send Message
            </h1>

            {/* Name */}
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              className="w-full rounded-lg p-3 
              bg-blue-50
              text-black
              border border-blue-200
              focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />

            {/* Email */}
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              className="w-full rounded-lg p-3 
              bg-blue-50
              text-black
              border border-blue-200
              focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
            />

            {/* Message */}
            <textarea
              name="message"
              placeholder="Your Message"
              rows="4"
              required
              className="w-full rounded-lg p-3 
              bg-blue-50
              text-black
              border border-blue-200
              focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            ></textarea>

            {/* Button */}
            <button
              type="submit"
              className="rounded-lg 
              bg-gradient-to-r from-blue-500 to-pink-500 
              px-5 py-3 text-lg font-semibold text-white 
              shadow-md transition-all duration-300 
              hover:scale-105 hover:shadow-lg"
            >
              Send Message 🚀
            </button>
          </form>
        </div>
      </div>

      {/* 3D Utility */}
      <style>
        {`
          .perspective {
            perspective: 1000px;
          }
          .rotate-y-180 {
            transform: rotateY(180deg);
          }
        `}
      </style>
    </div>
  );
}

export default Contact;