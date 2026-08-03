import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { TEST_API_END_POINT } from "../../utils/constants";

function TeacherTests() {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const { user } = useSelector((state) => state.auth);

  const fetchTests = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${TEST_API_END_POINT}/teacher/${user._id}`,
        { withCredentials: true }
      );
      setTests(res.data.tests || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load tests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?._id) {
      fetchTests();
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleDelete = async (testId, testTitle) => {
    const confirmed = window.confirm(
      `Delete "${testTitle}"? This cannot be undone.`
    );
    if (!confirmed) return;

    try {
      setDeletingId(testId);
      await axios.delete(`${TEST_API_END_POINT}/${testId}`, {
        withCredentials: true,
      });
      toast.success("Test deleted");
      setTests((prev) => prev.filter((t) => t._id !== testId));
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete test");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto mt-15">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">My Tests</h2>
        <div className="flex gap-2">
          <Link
            to="/teacher/tests"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
          >
            View All Tests
          </Link>
          <Link
            to="/teacher/create-test"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500"
          >
            + Create New Test
          </Link>
        </div>
      </div>

      {loading ? (
        <p>Loading tests...</p>
      ) : tests.length === 0 ? (
        <p className="text-gray-500">No tests created yet.</p>
      ) : (
        <div className="space-y-3">
          {tests.map((test) => (
            <div
              key={test._id}
              className="border p-4 rounded flex justify-between items-center gap-4"
            >
              <div>
                <h3 className="font-semibold">{test.title}</h3>
                <p className="text-sm text-gray-500">{test.description}</p>
                <p className="text-xs text-gray-400">
                  {test.questions?.length || 0} questions
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <Link
                  to={`/teacher/results`}
                  className="text-blue-600 hover:underline text-sm"
                >
                  Results
                </Link>
                <Link
                  to={`/teacher/edit-test/${test._id}`}
                  className="bg-yellow-500 text-white px-3 py-1.5 rounded text-sm hover:bg-yellow-400"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(test._id, test.title)}
                  disabled={deletingId === test._id}
                  className="bg-red-600 text-white px-3 py-1.5 rounded text-sm hover:bg-red-500 disabled:opacity-50"
                >
                  {deletingId === test._id ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TeacherTests;