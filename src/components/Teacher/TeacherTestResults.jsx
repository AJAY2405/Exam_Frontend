import React, { useEffect, useState } from "react";
import axios from "axios";
import { TEACHER_RESULTS_STUDENT } from "../../utils/constants";

const TeacherTestResults = () => {
  const [tests, setTests] = useState([]);
  const [selectedTest, setSelectedTest] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState([]);

  // filters
  const [timeFilter, setTimeFilter] = useState("");
  const [percentageFilter, setPercentageFilter] = useState("");

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
      setFilteredSubmissions(res.data.results || []);
      setSelectedTest(testId);
    } catch (err) {
      console.error("Error fetching submissions", err);
      setSubmissions([]);
      setFilteredSubmissions([]);
    }
  };

  // filter logic
  useEffect(() => {
    let data = [...submissions];

    // ✅ Time filter
    if (timeFilter) {
      const now = new Date();
      let cutoff = new Date();

      switch (timeFilter) {
        case "30min":
          cutoff = new Date(now.getTime() - 30 * 60 * 1000);
          break;
        case "1h":
          cutoff = new Date(now.getTime() - 1 * 60 * 60 * 1000);
          break;
        case "2h":
          cutoff = new Date(now.getTime() - 2 * 60 * 60 * 1000);
          break;
        case "5h":
          cutoff = new Date(now.getTime() - 5 * 60 * 60 * 1000);
          break;
        case "1d":
          cutoff = new Date(now.getTime() - 24 * 60 * 60 * 1000);
          break;
        case "2d":
          cutoff = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);
          break;
        case "5d":
          cutoff = new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000);
          break;
        default:
          cutoff = null;
      }

      if (cutoff) {
        data = data.filter(
          (s) => new Date(s.submittedAt) >= cutoff
        );
      }
    }

    // ✅ Percentage filter
    if (percentageFilter) {
      const threshold = parseInt(percentageFilter, 10);
      data = data.filter((s) => s.percentage >= threshold);
    }

    setFilteredSubmissions(data);
  }, [timeFilter, percentageFilter, submissions]);

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    const formattedTime = date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${formattedDate} at ${formattedTime}`;
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
              setFilteredSubmissions([]);
              setTimeFilter("");
              setPercentageFilter("");
            }}
          >
            ← Back to Tests
          </button>

          <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-700">
            Submissions
          </h2>

          {/* 🔽 Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="border px-3 py-2 rounded-lg"
            >
              <option value="">Filter by Time</option>
              <option value="30min">Last 30 Minutes</option>
              <option value="1h">Last 1 Hour</option>
              <option value="2h">Last 2 Hours</option>
              <option value="5h">Last 5 Hours</option>
              <option value="1d">Last 1 Day</option>
              <option value="2d">Last 2 Days</option>
              <option value="5d">Last 5 Days</option>
            </select>

            <select
              value={percentageFilter}
              onChange={(e) => setPercentageFilter(e.target.value)}
              className="border px-3 py-2 rounded-lg"
            >
              <option value="">Filter by Percentage</option>
              <option value="40">≥ 40%</option>
              <option value="50">≥ 50%</option>
              <option value="60">≥ 60%</option>
              <option value="70">≥ 70%</option>
              <option value="75">≥ 75%</option>
              <option value="80">≥ 80%</option>
            </select>
          </div>

          {filteredSubmissions && filteredSubmissions.length === 0 ? (
            <p className="text-gray-500 italic">No submissions match filters.</p>
          ) : (
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
                  {filteredSubmissions.map((s, index) => (
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
                        {formatDateTime(s.submittedAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TeacherTestResults;
