
import React from "react";
import Navbar from "./shared/Navbar";
import HomeSection from "./HomeSection";
import { useSelector } from "react-redux";
import TeacherHome from "./TeacherHome";
 
const Home = () => {
const { user } = useSelector((state) => state.auth);  return (
    <div>
      {user?.role === "teacher" ? (
        <TeacherHome />
      ) : (
        <HomeSection />
      )}
    </div>
  );
};
 
export default Home;
 
