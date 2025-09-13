import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  CLASS_API_END_POINT,
  CLASS_STUDENT_API_END_POINT,
} from "../../utils/constants";

function ClassList() {
  const [classes, setClasses] = useState([]);
  const [name, setName] = useState("");

  const fetchClasses = async () => {
    try {
      const res = await axios.get(CLASS_API_END_POINT);
      setClasses(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createClass = async () => {
    if (!name.trim()) return;
    try {
      await axios.post(`${CLASS_API_END_POINT}/create`, { name });
      setName("");
      fetchClasses();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  return (
    <div className="p-6 mt-10 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        📚 All Classes
      </h2>

      {/* Input & Button */}
      <div className="flex flex-col sm:flex-row items-center gap-3 mb-6">
        <input
          type="text"
          placeholder="Enter class name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full sm:flex-1 border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={createClass}
          className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition duration-200"
        >
          ➕ Add Class
        </button>
      </div>

      {/* Class List */}
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {classes.map((cls) => (
          <li
            key={cls._id}
            className="border border-gray-200 rounded-xl shadow-md p-4 hover:shadow-lg transition"
          >
            <Link
              to={`/classes/${cls._id}`}
              className="block text-lg font-semibold text-blue-600"
            >
              {cls.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* Empty State */}
      {classes.length === 0 && (
        <p className="text-gray-500 text-center mt-6">
          No classes found. Add a new class above.
        </p>
      )}
    </div>
  );
}

export default ClassList;
