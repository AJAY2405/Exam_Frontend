import React, { useEffect, useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

// Auth pages
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";

// Common pages
import Home from "./components/Home";
import About from "./components/About";
import Profile from "./components/Profile";

// Student pages
import StudentPages from "./components/Student/StudentPages";
import TakeTest from "./components/Student/TakeTest";

// Teacher pages
import TeacherPage from "./components/TeacherPage";
import CreateTest from "./components/Teacher/CreateTest";

// Layout
import Layout from "./components/shared/Layout";
import TeacherTestResults from "./components/Teacher/TeacherTestResults";
import UploadNote from "./components/Notes/UploadNote";
import NotesList from "./components/Notes/NotesList";
// import ClassList from "./components/Class/ClassList";
// import StudentList from "./components/Class/StudentList";
import TeacherRoute from "./components/shared/TeacherRoute";
import Notices from "./components/Notice/Notices";
import CreateNotice from "./components/Notice/CreateNotice";
import {motion, AnimatePresence } from "framer-motion";
import Announcement from "./components/Announcement";
import TeacherTests from "./components/Teacher/TeacherTests";
import EditTest from "./components/Teacher/Edittest";
import ResultPage from "./components/Student/ResultPage";
import HomeSection from "./components/HomeSection";
import ProgressPage from "./components/Student/ProgressPage";

const appRouter = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <HomeSection /> },
      { path: "/announcement", element: <Announcement/> },
      { path: "/about", element: <About /> },
      { path: "/profile", element: <Profile /> },

      // ✅ Student routes
      { path: "/test", element: <StudentPages /> },
      { path: "/progress", element: <ProgressPage /> },
      { path: "/student/tests/:id", element: <TakeTest /> },
      { path: "/result", element: <ResultPage /> },
      { path: "/notices", element: <Notices/> },

      // ✅ Teacher-only routes
      {
        path: "/teacher/create-test",
        element: (
          <TeacherRoute>
            <CreateTest />
          </TeacherRoute>
        ),
      },
      {
        path: "/teacher/tests",
        element: (
          <TeacherRoute>
            <TeacherTests />
          </TeacherRoute>
        ),
      },
      {
        path: "/teacher/edit-test/:id",
        element: (
          <TeacherRoute>
            <EditTest />
          </TeacherRoute>
        ),
      },
      {
        path: "/teacher/results",
        element: (
          <TeacherRoute>
            <TeacherTestResults />
          </TeacherRoute>
        ),
      },

      // ✅ Notes (Teacher only)
      {
        path: "/notes/upload",
        element: (
          <TeacherRoute>
            <UploadNote />
          </TeacherRoute>
        ),
      },
      {
        path: "/notes",
        element: <NotesList />,
      },

      // ✅ Class management (Teacher only)
      
      
     
      {
        path: "/create-notice",
        element: (
          <TeacherRoute>
            <CreateNotice />
          </TeacherRoute>
        ),
      },
    ],
  },

  // Auth routes
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },

  // Redirect unknown routes
  { path: "*", element: <Navigate to="/" replace /> },
]);
function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 sec loader

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* 🔥 Loader */}
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-white z-50"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: [0.5, 1.1, 1], opacity: 1 }}
              transition={{ duration: 1.2 }}
              className="flex flex-col items-center gap-4"
            >
              {/* Logo */}
              <motion.img
                src="/Images/logo.png"
                alt="logo"
                className="w-30 h-30"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              {/* Title */}
              <h2 className="text-xl font-semibold bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent">
                Mangaldeep Academy
              </h2>

              {/* Dots */}
              <div className="flex gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-pink-500 rounded-full animate-bounce delay-150"></span>
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-300"></span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🚀 Main App */}
      {!loading && (
        <>
          <RouterProvider router={appRouter} />
          <ToastContainer position="top-right" autoClose={3000} />
        </>
      )}
    </>
  );
}

export default App;