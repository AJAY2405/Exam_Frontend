import React from "react";
import { FaLinkedin, FaYoutube, FaTwitter } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-[#FAF6F2] text-gray-800 mt-10">
      <div className="max-w-4xl mx-auto px-6 py-10 rounded-2xl shadow-md">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          
          {/* School Logo & Name */}
          <div className="flex flex-col items-center sm:items-start">
            <img
              src="/Images/logo.png"
              alt="School Logo"
              className="w-16 h-16 mb-3"
            />
            <h2 className="text-xl font-bold">Mangaldeep Academy</h2>
            <p className="text-sm text-gray-600 mt-1 text-center sm:text-left">
              Excellence in Education, Empowering the Future.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="text-lg font-semibold mb-3">Connect with Us</h3>
            <div className="flex space-x-5 text-2xl text-gray-700">
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 transition"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-red-600 transition"
              >
                <FaYoutube />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-sky-500 transition"
              >
                <FaTwitter />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="text-lg font-semibold mb-3">Contact</h3>
            <p className="text-gray-700">📞 +91 98765 43210</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-300 mt-6 pt-4 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} Mangaldeep Academy. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
