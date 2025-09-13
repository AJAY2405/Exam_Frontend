import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { STUDENT_API_END_POINT } from "../../utils/constants";
import { BookOpen, FileText, PlayCircle, AlertCircle, Search } from "lucide-react";

export default function StudentPage() {
  const [tests, setTests] = useState([]);
  const [filteredTests, setFilteredTests] = useState([]); // ✅ Added state for filtered tests
  const [searchTerm, setSearchTerm] = useState("");        // ✅ Added state for search term
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  // ✅ Fetch tests from API and initialize both tests and filteredTests
  useEffect(() => {
    axios
      .get(STUDENT_API_END_POINT, { withCredentials: true })
      .then((res) => {
        setTests(res.data);
        setFilteredTests(res.data); // Initialize filteredTests with the fetched data
      })
      .catch((e) => setErr(e?.response?.data?.message || e.message))
      .finally(() => setLoading(false));
  }, []);

  // ✅ Filter tests based on the search term whenever it changes
  useEffect(() => {
    const filtered = tests.filter((test) =>
      test.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTests(filtered);
  }, [searchTerm, tests]);

  if (loading)
    return (
      <div className="p-12 flex flex-col items-center text-lg text-blue-600 animate-pulse">
        ⏳ Loading tests…
      </div>
    );

  if (err)
    return (
      <div className="p-12 flex flex-col items-center text-red-600 font-semibold">
        <AlertCircle className="w-10 h-10 mb-2" />
        ❌ Error: {err}
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-10">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-500 rounded-2xl shadow-lg p-10 text-center text-white mt-12">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-wide">
          📚 Available Tests
        </h1>
        <p className="mt-2 text-blue-100">
          Choose a test and start practicing to boost your knowledge.
        </p>
      </div>

      {/* ✅ Search Box */}
      <div className="max-w-6xl mx-auto mb-6 px-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search tests by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
        </div>
      </div>

      {/* No Tests or No Matches */}
      {filteredTests.length === 0 && (
        <div className="text-center text-gray-500 py-12">
          <BookOpen className="mx-auto w-12 h-12 text-gray-400 mb-3" />
          <p className="text-lg font-medium">No tests found matching your search.</p>
          <p className="text-sm">Try different keywords 🔍</p>
        </div>
      )}

      {/* Tests Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTests.map((t) => (
          <div
            key={t._id}
            className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100 hover:shadow-2xl hover:scale-[1.02] transition-transform duration-300 flex flex-col"
          >
            <div className="flex items-center gap-3">
              <BookOpen className="text-blue-600 w-6 h-6" />
              <h2 className="text-xl font-semibold text-gray-800">{t.title}</h2>
            </div>

            <div className="flex items-start gap-2 mt-3 text-gray-600">
              <FileText className="w-5 h-5 mt-1 flex-shrink-0 text-gray-400" />
              <p className="line-clamp-3">{t.description}</p>
            </div>

            <div className="mt-auto pt-6 flex justify-end">
              <Link
                to={`/student/tests/${t._id}`}
                className="px-5 py-2.5 flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl shadow hover:from-blue-700 hover:to-indigo-700 transition"
              >
                <PlayCircle className="w-5 h-5" /> Take Test
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
