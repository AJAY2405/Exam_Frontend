import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { TEST_API_END_POINT } from "../../utils/constants";
function CreateTest() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([
    { question: "", options: { A: "", B: "", C: "", D: "" }, correctAnswer: "" }
  ]);

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

  const addQuestion = () => {
    setQuestions([...questions, { question: "", options: { A: "", B: "", C: "", D: "" }, correctAnswer: "" }]);
  };

 const submitTest = async (e) => {
  e.preventDefault();
  try {
    await axios.post(
      TEST_API_END_POINT,
      { title, description, questions },
      { withCredentials: true }
    );
    toast.success("Test created successfully!");
  } catch (err) {
    toast.error("Error creating test");
  }
};

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Create Test</h2>
      <form onSubmit={submitTest}>
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

        {questions.map((q, qIndex) => (
          <div key={qIndex} className="border p-4 mb-4 rounded">
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
              className="border p-2 w-full"
              value={q.correctAnswer}
              onChange={(e) => handleQuestionChange(qIndex, "correctAnswer", e.target.value)}
            >
              <option value="">Select Correct Answer</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
            </select>
          </div>
        ))}

        <button type="button" className="bg-gray-500 text-white p-2 rounded mr-2" onClick={addQuestion}>
          Add Question
        </button>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Save Test
        </button>
      </form>
    </div>
  );
}

export default CreateTest;
