import React from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
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

const appRouter = createBrowserRouter([
  {
    element: <Layout />, // Navbar wrapper
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/profile", element: <Profile /> },

      // Student routes
      { path: "/test", element: <StudentPages /> },
      // { path: "/test", element: <div className="p-4">Please select a test to start.</div> },
      { path: "/student/tests/:id", element: <TakeTest /> },

      // Teacher routes
      // { path: "/teacher", element: <TeacherPage /> },
      { path: "/teacher/create-test", element: <CreateTest /> },
      { path: "/teacher/results", element: <TeacherTestResults /> },
       // Notes (⚡ no protection)
      { path: "/notes/upload", element: <UploadNote /> },
      { path: "/notes", element: <NotesList /> },
    ]
  },

  // Auth routes
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },

  // Redirect unknown routes
  { path: "*", element: <Navigate to="/" replace /> },
]);

function App() {
  return (
    <>
      <RouterProvider router={appRouter} />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
