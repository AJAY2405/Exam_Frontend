


// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { useState, useEffect } from "react";
// import { STUDENT_API_END_POINT } from "../../utils/constants";
// import { motion } from "framer-motion";

// export default function TakeTest() {
//   const { id } = useParams();
//   const [test, setTest] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [err, setErr] = useState("");
//   const [answers, setAnswers] = useState([]);
//   const [result, setResult] = useState(null);

//   // New states for student info
//   const [studentName, setStudentName] = useState("");
//   const [studentEmail, setStudentEmail] = useState("");

//   useEffect(() => {
//     if (!id) return;
//     let cancelled = false;
//     setLoading(true);

//     axios
//       .get(`${STUDENT_API_END_POINT}/${id}`, { withCredentials: true })
//       .then((res) => {
//         if (!cancelled) {
//           setTest(res.data);
//           setAnswers(new Array(res.data.questions?.length || 0).fill(null));
//           setErr("");
//         }
//       })
//       .catch((e) => {
//         if (!cancelled) setErr(e?.response?.data?.message || e.message);
//       })
//       .finally(() => !cancelled && setLoading(false));

//     return () => {
//       cancelled = true;
//     };
//   }, [id]);

//   const handleChange = (qIdx, key) => {
//     const updated = [...answers];
//     updated[qIdx] = key;
//     setAnswers(updated);
//   };

//   const handleSubmit = async () => {
//     if (!studentName || !studentEmail) {
//       setErr("⚠ Please enter your name and email before submitting.");
//       return;
//     }

//     try {
//       const res = await axios.post(
//         `${STUDENT_API_END_POINT}/${id}/submit`,
//         { answers, studentName, studentEmail },
//         { withCredentials: true }
//       );
//       setResult(res.data);
//     } catch (e) {
//       setErr(e?.response?.data?.message || e.message);
//     }
//   };

//   if (!id) return <div className="p-4 text-red-600">No test ID provided.</div>;
//   if (loading) return <div className="p-4 animate-pulse">Loading test…</div>;
//   if (err) return <div className="p-4 text-red-600">Error: {err}</div>;
//   if (!test) return <div className="p-4">Test not found.</div>;

//   const answeredCount = answers.filter((a) => a !== null).length;

//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       {/* Header */}
//       <div className="mb-6">
//         <h2 className="text-3xl font-extrabold mb-2 text-blue-700">
//           {test.title}
//         </h2>
//         <p className="text-gray-600 mb-4">{test.description}</p>
//       </div>

//       {/* Student Info */}
//       {!result && (
//         <div className="mb-6 border rounded-xl p-4 shadow bg-gray-50">
//           <label className="block mb-2 font-medium">Your Name</label>
//           <input
//             type="text"
//             value={studentName}
//             onChange={(e) => setStudentName(e.target.value)}
//             className="w-full border p-2 rounded mb-4"
//             placeholder="Enter your full name"
//           />

//           <label className="block mb-2 font-medium">Your Email</label>
//           <input
//             type="email"
//             value={studentEmail}
//             onChange={(e) => setStudentEmail(e.target.value)}
//             className="w-full border p-2 rounded"
//             placeholder="Enter your email"
//           />
//         </div>
//       )}

//       {/* Progress */}
//       <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
//         <div
//           className="bg-blue-600 h-3 rounded-full transition-all"
//           style={{
//             width: `${(answeredCount / test.questions.length) * 100}%`,
//           }}
//         ></div>
//       </div>
//       <p className="text-sm text-gray-500 mb-6">
//         Answered {answeredCount}/{test.questions.length}
//       </p>

//       {/* Questions */}
//       {test.questions?.map((q, idx) => (
//         <motion.div
//           key={q._id || idx}
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.3, delay: idx * 0.1 }}
//           className="mb-6 border rounded-2xl p-5 shadow hover:shadow-md transition"
//         >
//           <div className="font-semibold text-lg mb-3">
//             {idx + 1}. {q.question}
//           </div>
//           <ul className="space-y-3">
//             {q.options && typeof q.options === "object" ? (
//               Object.entries(q.options).map(([key, value]) => (
//                 <li key={key}>
//                   <label className="flex items-center gap-3 cursor-pointer p-2 border rounded-lg transition hover:bg-gray-50">
//                     <input
//                       type="radio"
//                       name={`q-${idx}`}
//                       value={key}
//                       disabled={!!result}
//                       checked={answers[idx] === key}
//                       onChange={() => handleChange(idx, key)}
//                       className="h-4 w-4 text-blue-600 focus:ring-blue-500"
//                     />
//                     <span className="text-gray-700 font-medium">
//                       {key}. {value}
//                     </span>
//                   </label>
//                 </li>
//               ))
//             ) : (
//               <li className="text-gray-500">No options found</li>
//             )}
//           </ul>
//         </motion.div>
//       ))}

//       {/* Submit Button */}
//       {!result && (
//         <div className="flex justify-center">
//           <button
//             onClick={handleSubmit}
//             className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
//           >
//             Submit Test
//           </button>
//         </div>
//       )}

//       {/* Result */}
//       {result && (
//         <motion.div
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.4 }}
//           className="mt-8 p-6 border rounded-2xl shadow bg-green-50 text-center"
//         >
//           <h3 className="text-xl font-bold text-green-700 mb-3">Result</h3>
//           <p className="text-gray-700">
//             Total Questions: {result.totalQuestions}
//           </p>
//           <p className="text-gray-700">Score: {result.score}</p>
//           <p className="text-gray-700">
//             Percentage:{" "}
//             <span className="font-semibold">
//               {result.percentage.toFixed(2)}%
//             </span>
//           </p>
//         </motion.div>
//       )}
//     </div>
//   );
// }















import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { STUDENT_API_END_POINT } from "../../utils/constants";
import { motion } from "framer-motion";

export default function TakeTest() {
  const { id } = useParams();
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

  // Student info
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    setLoading(true);

    axios
      .get(`${STUDENT_API_END_POINT}/${id}`, { withCredentials: true })
      .then((res) => {
        if (!cancelled) {
          setTest(res.data);
          setAnswers(new Array(res.data.questions?.length || 0).fill(null));
          setErr("");
        }
      })
      .catch((e) => {
        if (!cancelled) setErr(e?.response?.data?.message || e.message);
      })
      .finally(() => !cancelled && setLoading(false));

    return () => {
      cancelled = true;
    };
  }, [id]);

  const handleChange = (qIdx, key) => {
    const updated = [...answers];
    updated[qIdx] = key;
    setAnswers(updated);
  };

  const handleSubmit = async () => {
    if (!studentName || !studentEmail) {
      setErr("⚠ Please enter your name and email before submitting.");
      return;
    }

    try {
      const res = await axios.post(
        `${STUDENT_API_END_POINT}/${id}/submit`,
        { answers, studentName, studentEmail },
        { withCredentials: true }
      );
      setResult(res.data);
    } catch (e) {
      setErr(e?.response?.data?.message || e.message);
    }
  };

  if (!id) return <div className="p-4 text-red-600">No test ID provided.</div>;
  if (loading) return <div className="p-4 animate-pulse">Loading test…</div>;
  if (err) return <div className="p-4 text-red-600">Error: {err}</div>;
  if (!test) return <div className="p-4">Test not found.</div>;

  const answeredCount = answers.filter((a) => a !== null).length;

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-extrabold mb-2 text-blue-700 mt-8">
          {test.title}
        </h2>
        <p className="text-gray-600 mb-4">{test.description}</p>
      </div>

      {/* Student Info */}
      {!result && (
        <div className="mb-6 border rounded-xl p-4 shadow bg-gray-50">
          <label className="block mb-2 font-medium">Your Name</label>
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            className="w-full border p-2 rounded mb-4"
            placeholder="Enter your full name"
          />

          <label className="block mb-2 font-medium">Your Email</label>
          <input
            type="email"
            value={studentEmail}
            onChange={(e) => setStudentEmail(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="Enter your email"
          />
        </div>
      )}

      {/* Progress */}
      <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
        <div
          className="bg-blue-600 h-3 rounded-full transition-all"
          style={{
            width: `${(answeredCount / test.questions.length) * 100}%`,
          }}
        ></div>
      </div>
      <p className="text-sm text-gray-500 mb-6">
        Answered {answeredCount}/{test.questions.length}
      </p>

      {/* Questions */}
      {test.questions?.map((q, idx) => (
        <motion.div
          key={q._id || idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: idx * 0.1 }}
          className="mb-6 border rounded-2xl p-5 shadow hover:shadow-md transition"
        >
          <div className="font-semibold text-lg mb-3">
            {idx + 1}. {q.question}
          </div>

          {/* ✅ Show Question Image if exists */}
          {q.image && (
            <div className="mb-4 flex justify-center">
              <img
                src={q.image}
                alt={`Question ${idx + 1}`}
                className="max-h-64 rounded-lg border object-contain"
              />
            </div>
          )}

          <ul className="space-y-3">
            {q.options && typeof q.options === "object" ? (
              Object.entries(q.options).map(([key, value]) => (
                <li key={key}>
                  <label className="flex items-center gap-3 cursor-pointer p-2 border rounded-lg transition hover:bg-gray-50">
                    <input
                      type="radio"
                      name={`q-${idx}`}
                      value={key}
                      disabled={!!result}
                      checked={answers[idx] === key}
                      onChange={() => handleChange(idx, key)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-700 font-medium">
                      {key}. {value}
                    </span>
                  </label>
                </li>
              ))
            ) : (
              <li className="text-gray-500">No options found</li>
            )}
          </ul>
        </motion.div>
      ))}

      {/* Submit Button */}
      {!result && (
        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
          >
            Submit Test
          </button>
        </div>
      )}

      {/* Result */}
      {result && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="mt-8 p-6 border rounded-2xl shadow bg-green-50 text-center"
        >
          <h3 className="text-xl font-bold text-green-700 mb-3">Result</h3>
          <p className="text-gray-700">
            Total Questions: {result.totalQuestions}
          </p>
          <p className="text-gray-700">Score: {result.score}</p>
          <p className="text-gray-700">
            Percentage:{" "}
            <span className="font-semibold">
              {result.percentage.toFixed(2)}%
            </span>
          </p>
        </motion.div>
      )}
    </div>
  );
}
