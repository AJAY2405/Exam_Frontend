// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { TEST_API_END_POINT } from "../../utils/constants";

// function EditTest() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [loading, setLoading] = useState(true);
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [questions, setQuestions] = useState([]);

//   // Load existing test
//   useEffect(() => {
//     const fetchTest = async () => {
//       try {
//         const res = await axios.get(`${TEST_API_END_POINT}/${id}`, {
//           withCredentials: true,
//         });
//         const test = res.data.test;
//         setTitle(test.title || "");
//         setDescription(test.description || "");
//         setQuestions(
//           (test.questions || []).map((q) => ({
//             question: q.question || "",
//             options: {
//               A: q.options?.A || "",
//               B: q.options?.B || "",
//               C: q.options?.C || "",
//               D: q.options?.D || "",
//             },
//             correctAnswer: q.correctAnswer || "",
//             existingImage: q.image || null, // ⬅️ image already uploaded (URL)
//             image: null, // ⬅️ new file, if teacher replaces it
//           }))
//         );
//       } catch (err) {
//         console.error(err);
//         toast.error("Failed to load test");
//         navigate("/teacher/tests");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchTest();
//   }, [id, navigate]);

//   const handleQuestionChange = (index, field, value) => {
//     const newQuestions = [...questions];
//     newQuestions[index][field] = value;
//     setQuestions(newQuestions);
//   };

//   const handleOptionChange = (qIndex, optionKey, value) => {
//     const newQuestions = [...questions];
//     newQuestions[qIndex].options[optionKey] = value;
//     setQuestions(newQuestions);
//   };

//   const handleImageChange = (qIndex, file) => {
//     const newQuestions = [...questions];
//     newQuestions[qIndex].image = file;
//     setQuestions(newQuestions);
//   };

//   const addQuestion = () => {
//     setQuestions([
//       ...questions,
//       {
//         question: "",
//         options: { A: "", B: "", C: "", D: "" },
//         correctAnswer: "",
//         existingImage: null,
//         image: null,
//       },
//     ]);
//   };

//   const removeQuestion = (qIndex) => {
//     setQuestions(questions.filter((_, i) => i !== qIndex));
//   };

//   const submitEdit = async (e) => {
//     e.preventDefault();

//     try {
//       const formData = new FormData();
//       formData.append("title", title);
//       formData.append("description", description);
//       formData.append(
//         "questions",
//         JSON.stringify(
//           questions.map(({ question, options, correctAnswer, existingImage, image }) => ({
//             question,
//             options,
//             correctAnswer,
//             // keep existing image URL unless a new file is being uploaded
//             image: image ? null : existingImage,
//           }))
//         )
//       );

//       // append any newly selected images
//       questions.forEach((q) => {
//         if (q.image) {
//           formData.append("images", q.image);
//         }
//       });

//       await axios.put(`${TEST_API_END_POINT}/${id}`, formData, {
//         withCredentials: true,
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       toast.success("Test updated successfully!");
//       navigate("/teacher/tests");
//     } catch (err) {
//       console.error(err);
//       toast.error("Error updating test");
//     }
//   };

//   if (loading) {
//     return <div className="p-4 max-w-3xl mx-auto mt-15">Loading test...</div>;
//   }

//   return (
//     <div className="p-4 max-w-3xl mx-auto mt-15">
//       <div className="flex gap-2 mb-4">
//         <Link
//           to="/teacher/tests"
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
//         >
//           View All Tests
//         </Link>
//         <Link
//           to="/teacher/create-test"
//           className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500"
//         >
//           Create New Test
//         </Link>
//       </div>

//       <h2 className="text-xl font-bold mb-4">Edit Test</h2>
//       <form onSubmit={submitEdit}>
//         <input
//           className="border p-2 w-full mb-2"
//           placeholder="Test Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           required
//         />
//         <textarea
//           className="border p-2 w-full mb-4"
//           placeholder="Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//         ></textarea>

//         {questions.map((q, qIndex) => (
//           <div key={qIndex} className="border p-4 mb-4 rounded">
//             <div className="flex justify-between items-start mb-2">
//               <span className="text-sm text-gray-500">Question {qIndex + 1}</span>
//               {questions.length > 1 && (
//                 <button
//                   type="button"
//                   onClick={() => removeQuestion(qIndex)}
//                   className="text-red-600 text-sm hover:underline"
//                 >
//                   Remove
//                 </button>
//               )}
//             </div>

//             <input
//               className="border p-2 w-full mb-2"
//               placeholder="Question"
//               value={q.question}
//               onChange={(e) => handleQuestionChange(qIndex, "question", e.target.value)}
//             />

//             {["A", "B", "C", "D"].map((opt) => (
//               <input
//                 key={opt}
//                 className="border p-2 w-full mb-2"
//                 placeholder={`Option ${opt}`}
//                 value={q.options[opt]}
//                 onChange={(e) => handleOptionChange(qIndex, opt, e.target.value)}
//               />
//             ))}

//             <select
//               className="border p-2 w-full mb-2"
//               value={q.correctAnswer}
//               onChange={(e) => handleQuestionChange(qIndex, "correctAnswer", e.target.value)}
//             >
//               <option value="">Select Correct Answer</option>
//               <option value="A">A</option>
//               <option value="B">B</option>
//               <option value="C">C</option>
//               <option value="D">D</option>
//             </select>

//             {q.existingImage && !q.image && (
//               <div className="mb-2">
//                 <p className="text-sm text-gray-500 mb-1">Current image:</p>
//                 <img
//                   src={q.existingImage}
//                   alt="Question"
//                   className="h-24 rounded border"
//                 />
//               </div>
//             )}

//             <input
//               type="file"
//               accept="image/*"
//               className="mb-2"
//               onChange={(e) => handleImageChange(qIndex, e.target.files[0])}
//             />

//             {q.image && (
//               <p className="text-sm text-green-600">
//                 New image selected: {q.image.name}
//               </p>
//             )}
//           </div>
//         ))}

//         <button
//           type="button"
//           className="bg-yellow-600 text-white p-2 rounded mr-2 hover:bg-amber-500"
//           onClick={addQuestion}
//         >
//           Add Question
//         </button>
//         <button
//           type="submit"
//           className="bg-green-600 text-white p-2 rounded hover:bg-green-500"
//         >
//           Save Changes
//         </button>
//       </form>
//     </div>
//   );
// }

// export default EditTest;




import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";
import { TEST_API_END_POINT } from "../../utils/constants";

function EditTest() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  // ✅ NEW: duration in minutes
  const [duration, setDuration] = useState(30);
  const [questions, setQuestions] = useState([]);

  // Load existing test
  useEffect(() => {
    const fetchTest = async () => {
      try {
        const res = await axios.get(`${TEST_API_END_POINT}/${id}`, {
          withCredentials: true,
        });
        const test = res.data.test;
        setTitle(test.title || "");
        setDescription(test.description || "");
        setDuration(test.duration && test.duration > 0 ? test.duration : 30); // ✅ NEW
        setQuestions(
          (test.questions || []).map((q) => ({
            question: q.question || "",
            options: {
              A: q.options?.A || "",
              B: q.options?.B || "",
              C: q.options?.C || "",
              D: q.options?.D || "",
            },
            correctAnswer: q.correctAnswer || "",
            existingImage: q.image || null, // ⬅️ image already uploaded (URL)
            image: null, // ⬅️ new file, if teacher replaces it
          }))
        );
      } catch (err) {
        console.error(err);
        toast.error("Failed to load test");
        navigate("/teacher/tests");
      } finally {
        setLoading(false);
      }
    };
    fetchTest();
  }, [id, navigate]);

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (qIndex, optionKey, value) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[optionKey] = value;
    setQuestions(newQuestions);
  };

  const handleImageChange = (qIndex, file) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].image = file;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: "",
        options: { A: "", B: "", C: "", D: "" },
        correctAnswer: "",
        existingImage: null,
        image: null,
      },
    ]);
  };

  const removeQuestion = (qIndex) => {
    setQuestions(questions.filter((_, i) => i !== qIndex));
  };

  const submitEdit = async (e) => {
    e.preventDefault();

    // ✅ NEW: validate duration before saving
    const durationNum = Number(duration);
    if (!Number.isFinite(durationNum) || durationNum <= 0) {
      toast.error("Please enter a valid duration (in minutes)");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("duration", durationNum); // ✅ NEW
      formData.append(
        "questions",
        JSON.stringify(
          questions.map(({ question, options, correctAnswer, existingImage, image }) => ({
            question,
            options,
            correctAnswer,
            // keep existing image URL unless a new file is being uploaded
            image: image ? null : existingImage,
          }))
        )
      );

      // append any newly selected images
      questions.forEach((q) => {
        if (q.image) {
          formData.append("images", q.image);
        }
      });

      await axios.put(`${TEST_API_END_POINT}/${id}`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Test updated successfully!");
      navigate("/teacher/tests");
    } catch (err) {
      console.error(err);
      toast.error("Error updating test");
    }
  };

  if (loading) {
    return <div className="p-4 max-w-3xl mx-auto mt-15">Loading test...</div>;
  }

  return (
    <div className="p-4 max-w-3xl mx-auto mt-15">
      <div className="flex gap-2 mb-4">
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
          Create New Test
        </Link>
      </div>

      <h2 className="text-xl font-bold mb-4">Edit Test</h2>
      <form onSubmit={submitEdit}>
        <input
          className="border p-2 w-full mb-2"
          placeholder="Test Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="border p-2 w-full mb-4"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        {/* ✅ NEW: Duration field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ⏱ Test Duration (in minutes)
          </label>
          <input
            type="number"
            min="1"
            className="border p-2 w-full sm:w-48"
            placeholder="e.g. 30"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            Students will have this much time to complete the test once they start.
          </p>
        </div>

        {questions.map((q, qIndex) => (
          <div key={qIndex} className="border p-4 mb-4 rounded">
            <div className="flex justify-between items-start mb-2">
              <span className="text-sm text-gray-500">Question {qIndex + 1}</span>
              {questions.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeQuestion(qIndex)}
                  className="text-red-600 text-sm hover:underline"
                >
                  Remove
                </button>
              )}
            </div>

            <input
              className="border p-2 w-full mb-2"
              placeholder="Question"
              value={q.question}
              onChange={(e) => handleQuestionChange(qIndex, "question", e.target.value)}
            />

            {["A", "B", "C", "D"].map((opt) => (
              <input
                key={opt}
                className="border p-2 w-full mb-2"
                placeholder={`Option ${opt}`}
                value={q.options[opt]}
                onChange={(e) => handleOptionChange(qIndex, opt, e.target.value)}
              />
            ))}

            <select
              className="border p-2 w-full mb-2"
              value={q.correctAnswer}
              onChange={(e) => handleQuestionChange(qIndex, "correctAnswer", e.target.value)}
            >
              <option value="">Select Correct Answer</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
            </select>

            {q.existingImage && !q.image && (
              <div className="mb-2">
                <p className="text-sm text-gray-500 mb-1">Current image:</p>
                <img
                  src={q.existingImage}
                  alt="Question"
                  className="h-24 rounded border"
                />
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              className="mb-2"
              onChange={(e) => handleImageChange(qIndex, e.target.files[0])}
            />

            {q.image && (
              <p className="text-sm text-green-600">
                New image selected: {q.image.name}
              </p>
            )}
          </div>
        ))}

        <button
          type="button"
          className="bg-yellow-600 text-white p-2 rounded mr-2 hover:bg-amber-500"
          onClick={addQuestion}
        >
          Add Question
        </button>
        <button
          type="submit"
          className="bg-green-600 text-white p-2 rounded hover:bg-green-500"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditTest;