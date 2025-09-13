import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CLASS_STUDENT_API_END_POINT } from "../../utils/constants";

function StudentList() {
  const { id } = useParams();
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    name: "",
    rollno: "",
    mobile: "",
    fatherName: "",
    aadharNo: "",
    dob: "",
  });

  const fetchStudents = async () => {
    try {
      const res = await axios.get(`${CLASS_STUDENT_API_END_POINT}/${id}`);
      setStudents(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addStudent = async () => {
    if (
      !newStudent.name.trim() ||
      !newStudent.rollno.trim() ||
      !newStudent.aadharNo.trim() ||
      !newStudent.dob
    )
      return;
    try {
      await axios.post(`${CLASS_STUDENT_API_END_POINT}/${id}/add`, newStudent);
      setNewStudent({
        name: "",
        rollno: "",
        mobile: "",
        fatherName: "",
        aadharNo: "",
        dob: "",
      });
      fetchStudents();
    } catch (error) {
      console.error(error);
    }
  };

  const removeStudent = async (studentId) => {
    try {
      await axios.delete(
        `${CLASS_STUDENT_API_END_POINT}/${id}/remove/${studentId}`
      );
      fetchStudents();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleChange = (e) => {
    setNewStudent({ ...newStudent, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-4 sm:p-6 mt-10 max-w-6xl mx-auto">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 text-center">
        👨‍🎓 Students
      </h2>

      {/* Add Student Form */}
      <div className="bg-white shadow-md rounded-xl p-4 sm:p-6 mb-8 border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Add New Student</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            name="name"
            placeholder="Name"
            value={newStudent.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="rollno"
            placeholder="Roll No"
            value={newStudent.rollno}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="mobile"
            placeholder="Mobile"
            value={newStudent.mobile}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="fatherName"
            placeholder="Father's Name"
            value={newStudent.fatherName}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="aadharNo"
            placeholder="Aadhar Number (12 digits)"
            value={newStudent.aadharNo}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            name="dob"
            value={newStudent.dob}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={addStudent}
          className="mt-4 w-full sm:w-auto bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition duration-200"
        >
          ➕ Add Student
        </button>
      </div>

      {/* Student Table */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Student List</h3>
        {students.length === 0 ? (
          <p className="text-gray-500">No students found. Add one above.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 shadow-md rounded-lg overflow-hidden text-sm sm:text-base">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-2 sm:px-4 py-2 text-left">Name</th>
                  <th className="px-2 sm:px-4 py-2 text-left">Roll No</th>
                  <th className="px-2 sm:px-4 py-2 text-left hidden sm:table-cell">
                    Mobile
                  </th>
                  <th className="px-2 sm:px-4 py-2 text-left hidden sm:table-cell">
                    Father&apos;s Name
                  </th>
                  <th className="px-2 sm:px-4 py-2 text-left">Aadhar No</th>
                  <th className="px-2 sm:px-4 py-2 text-left">DOB</th>
                  <th className="px-2 sm:px-4 py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, idx) => (
                  <tr
                    key={student._id}
                    className={`${
                      idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-gray-100 transition`}
                  >
                    <td className="px-2 sm:px-4 py-2 font-medium text-gray-800">
                      {student.name}
                    </td>
                    <td className="px-2 sm:px-4 py-2 text-gray-700">
                      {student.rollno}
                    </td>
                    <td className="px-2 sm:px-4 py-2 text-gray-700 hidden sm:table-cell">
                      {student.mobile}
                    </td>
                    <td className="px-2 sm:px-4 py-2 text-gray-700 hidden sm:table-cell">
                      {student.fatherName}
                    </td>
                    <td className="px-2 sm:px-4 py-2 text-gray-700">
                      {student.aadharNo}
                    </td>
                    <td className="px-2 sm:px-4 py-2 text-gray-700">
                      {new Date(student.dob).toLocaleDateString()}
                    </td>
                    <td className="px-2 sm:px-4 py-2 text-center">
                      <button
                        onClick={() => removeStudent(student._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
                      >
                        ❌ Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentList;
