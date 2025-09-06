import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { setLoading, setUser } from "../../redux/authSlice";
import { USER_API_END_POINT } from "../../utils/constants";
import { Typewriter } from "react-simple-typewriter";
const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    // role: "",
  });

  const { loading, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Handle role-based redirect
  useEffect(() => {
    if (user) {
      if (user.role === "student") {
        navigate("/student");
      } else if (user.role === "teacher") {
        navigate("/teacher");
      }
    }
  }, [user, navigate]);

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-[#FAF6F2]">
      <div className="flex flex-col md:flex-row w-full h-full md:h-[80%] md:w-[70%] bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Left Section */}
        <div className="flex-1 flex flex-col justify-center p-8 md:p-12">
          <h2 className="text-[#080808] text-3xl font-bold">
            L
            <Typewriter
              words={["ogin Account"]}
              loop={true}
              typeSpeed={150}
              deleteSpeed={100}
              delaySpeed={1500}
            />
          </h2>{" "}
          <form onSubmit={submitHandler} className="space-y-4">
            <div>
              <label className="block text-gray-600 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={input.email}
                onChange={changeEventHandler}
                placeholder="email@gmail.com"
                className="w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FCD9B8] text-black"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={input.password}
                onChange={changeEventHandler}
                placeholder="Enter your password"
                className="w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FCD9B8] text-black"
              />
            </div>

            {/* <div>
              <label className="block text-gray-600 mb-1">Role</label>
              <select
                name="role"
                value={input.role}
                onChange={changeEventHandler}
                className="w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FCD9B8] text-black"
              >
                <option value="">Select Role</option>
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </select>
            </div>  */}

            <button
              type="submit"
              disabled={loading}
              className="relative w-full py-3 bg-transparent border border-[#FCD9B8] text-[#FCD9B8] rounded-full font-semibold overflow-hidden group disabled:opacity-50"
            >
              {/* background animation */}
              <span className="absolute inset-0 bg-[#e48d3c] translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out"></span>

              {/* button text */}
              <span className="relative z-10 group-hover:text-white">
                {loading ? "Logging In..." : "Login"}
              </span>
            </button>
          </form>
          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-3 text-gray-400 text-sm">Or continue with</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <p className="text-center text-sm mt-6 text-gray-500">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-[#F4A261] font-semibold hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>

        {/* Right Section */}
        <div className="flex-1 flex items-center justify-center bg-[#FAE5D3] p-8">
          <img
            src="/Images/student.png"
            alt="Login Illustration"
            className="w-64 md:w-80"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
