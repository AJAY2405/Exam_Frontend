import React from "react";
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
import ClassList from "./components/Class/ClassList";
import StudentList from "./components/Class/StudentList";
import TeacherRoute from "./components/shared/TeacherRoute";
import Notices from "./components/Notice/Notices";
import CreateNotice from "./components/Notice/CreateNotice";

const appRouter = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/profile", element: <Profile /> },

      // ✅ Student routes
      { path: "/test", element: <StudentPages /> },
      { path: "/student/tests/:id", element: <TakeTest /> },
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
        path: "/classes",
        element: (
          <TeacherRoute>
            <ClassList />
          </TeacherRoute>
        ),
      },
      {
        path: "/classes/create",
        element: (
          <TeacherRoute>
            <ClassList />
          </TeacherRoute>
        ),
      },
      {
        path: "/classes/:id",
        element: (
          <TeacherRoute>
            <StudentList />
          </TeacherRoute>
        ),
      },
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
  return (
    <>
      <RouterProvider router={appRouter} />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
