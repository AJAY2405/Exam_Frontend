import React, { useEffect, useState } from "react";
import axios from "axios";
import { TEACHER_RESULTS_STUDENT } from "../../utils/constants";

const TeacherTestResults = () => {
  const [tests, setTests] = useState([]);
  const [selectedTest, setSelectedTest] = useState(null);
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    fetchTests();
  }, []);

  const fetchTests = async () => {
    try {
      const res = await axios.get(`${TEACHER_RESULTS_STUDENT}/tests`, {
        withCredentials: true,
      });
      setTests(res.data.tests || res.data);
    } catch (err) {
      console.error("Error fetching tests", err);
    }
  };

  const fetchSubmissions = async (testId) => {
    try {
      const res = await axios.get(
        `${TEACHER_RESULTS_STUDENT}/tests/${testId}`,
        { withCredentials: true }
      );
      setSubmissions(res.data.results || []);
      setSelectedTest(testId);
    } catch (err) {
      console.error("Error fetching submissions", err);
      setSubmissions([]);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto mt-6 sm:mt-15">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 text-center sm:text-left mt-10">
        📊 Student Test Results
      </h1>

      {/* Show test list */}
      {!selectedTest && (
        <div>
          <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-700">
            All Tests
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tests.map((test) => (
              <div
                key={test._id}
                className="p-4 sm:p-5 border rounded-xl sm:rounded-2xl shadow hover:shadow-lg cursor-pointer transition bg-white"
                onClick={() => fetchSubmissions(test._id)}
              >
                <h3 className="text-base sm:text-lg font-semibold text-blue-600">
                  {test.title}
                </h3>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                  {test.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Show submissions */}
      {selectedTest && (
        <div>
          <button
            className="mb-6 px-3 sm:px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow text-sm sm:text-base"
            onClick={() => {
              setSelectedTest(null);
              setSubmissions([]);
            }}
          >
            ← Back to Tests
          </button>

          <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-700">
            Submissions
          </h2>

          {submissions && submissions.length === 0 ? (
            <p className="text-gray-500 italic">No submissions yet.</p>
          ) : (
            submissions &&
            submissions.length > 0 && (
              <div className="overflow-x-auto rounded-lg shadow">
                <table className="w-full border-collapse bg-white rounded-lg overflow-hidden text-sm sm:text-base">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border px-3 sm:px-4 py-2 sm:py-3 text-left">
                        Student Name
                      </th>
                      <th className="border px-3 sm:px-4 py-2 sm:py-3 text-left">
                        Email
                      </th>
                      <th className="border px-3 sm:px-4 py-2 sm:py-3 text-center">
                        Score
                      </th>
                      <th className="border px-3 sm:px-4 py-2 sm:py-3 text-center">
                        Percentage
                      </th>
                      <th className="border px-3 sm:px-4 py-2 sm:py-3 text-center">
                        Submitted At
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {submissions.map((s, index) => (
                      <tr
                        key={s._id}
                        className={`${
                          index % 2 === 0 ? "bg-white" : "bg-gray-50"
                        } hover:bg-blue-50 transition`}
                      >
                        <td className="border px-3 sm:px-4 py-2">
                          {s.studentName}
                        </td>
                        <td className="border px-3 sm:px-4 py-2">
                          <span className="break-all">{s.studentEmail}</span>
                        </td>
                        <td className="border px-3 sm:px-4 py-2 text-center font-semibold text-blue-600">
                          {s.score}
                        </td>
                        <td className="border px-3 sm:px-4 py-2 text-center">
                          {s.percentage}%
                        </td>
                        <td className="border px-3 sm:px-4 py-2 text-center text-gray-600">
                          {new Date(s.submittedAt).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default TeacherTestResults;
