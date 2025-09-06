import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state;

  if (!result) return <p>No result to display.</p>;

  return (
    <div className="max-w-lg mx-auto p-4 text-center">
      <h2 className="text-2xl font-bold mb-4">Test Result</h2>
      <p>Total Questions: {result.totalQuestions}</p>
      <p>Score: {result.score}</p>
      <p>Percentage: {result.percentage.toFixed(2)}%</p>
      <button
        onClick={() => navigate("/")}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
      >
        Back to Home
      </button>
    </div>
  );
}
