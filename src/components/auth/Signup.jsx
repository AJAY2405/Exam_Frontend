import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { setLoading } from "../../redux/authSlice"; // adjust path
import { USER_API_END_POINT } from "../../utils/constants"; // adjust path
import { Typewriter } from "react-simple-typewriter";
import { Eye, EyeOff } from "lucide-react";


const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    // role: "",
    file: "",
  });
const [showPassword, setShowPassword] = useState(false);
  const { loading, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role || "student");

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-[#FAF6F2]">
      <div className="flex flex-col md:flex-row w-full h-full md:h-[75%] md:w-[70%] bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Left Section */}
        <div className="flex-1 flex items-center justify-center bg-[#FAE5D3] p-8">
          <img
            src="/Images/student.png"
            alt="Signup Illustration"
            className="w-64 md:w-80"
          />
        </div>

        {/* Right Section */}
        <div className="flex-1 flex flex-col justify-center p-8 md:p-12">
          <h2 className="text-[#010004] text-3xl font-bold">
            Create Account
          </h2>{" "}
          <form onSubmit={submitHandler} className="space-y-4">
            <div>
              <label className="block text-gray-600 mb-1">Full Name</label>
              <input
                type="text"
                value={input.fullname}
                onChange={changeEventHandler}
                name="fullname"
                placeholder="User Name"
                className="w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-peach-300 text-black"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1">Email</label>
              <input
                type="email"
                value={input.email}
                name="email"
                onChange={changeEventHandler}
                placeholder="email@gmail.com"
                className="w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-peach-300 text-black"
              />
            </div>

             <div>
              <label className="block text-gray-600 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={input.password}
                  onChange={changeEventHandler}
                  placeholder="Enter your password"
                  className="w-full border border-gray-300 rounded-full px-4 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-[#FCD9B8] text-black"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* <div>
              <label className="block text-gray-600 mb-1">Role</label>
              <select
                name="role"
                value={input.role}
                onChange={changeEventHandler}
                className="w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-peach-300 text-black"
              >
                <option value="">Select Role</option>
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </select>
            </div> */}

            <button
              type="submit"
              disabled={loading}
              className="relative w-full py-3 bg-transparent border border-[#e1c9b2] text-[#e2772b] rounded-full font-semibold overflow-hidden group disabled:opacity-50"
            >
              {/* background animation */}
              <span className="absolute inset-0 bg-[#dc893b] translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out"></span>

              {/* button text */}
              <span className="relative z-10 group-hover:text-white">
                {loading ? "Signing Up..." : "Sign Up"}
              </span>
            </button>
          </form>
          <p className="text-center text-sm mt-6 text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#F4A261] font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;




