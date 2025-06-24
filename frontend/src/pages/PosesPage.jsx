import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PosesPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const poses = location.state?.poses || [];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-600 to-blue-400 p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xl p-8">
        <h2 className="text-2xl font-bold text-center text-purple-800 mb-6">
          Your Personalized Yoga Poses
        </h2>
        {poses.length === 0 && (
          <div className="text-center text-gray-500">No poses found.</div>
        )}
        <div className="space-y-6">
          {poses.map((pose, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-br from-blue-100 to-purple-50 rounded-xl p-5 shadow"
            >
              <h3 className="text-xl font-semibold text-purple-900">
                {pose.name}
              </h3>
              <p className="mb-2 text-gray-700">
                <strong>Difficulty:</strong>{" "}
                {pose["difficulty level"] ||
                  pose.difficulty ||
                  pose.difficultyLevel ||
                  "Unknown"}
              </p>
              <p className="mb-2 text-gray-600">
                <strong>Description:</strong> {pose.description}
              </p>
              <p className="mb-2 text-green-700">
                <strong>Benefits:</strong>{" "}
                {Array.isArray(pose.benefits)
                  ? (
                      <ul className="list-disc pl-5">
                        {pose.benefits.map((b, i) => (
                          <li key={i}>{b}</li>
                        ))}
                      </ul>
                    )
                  : pose.benefits}
              </p>
            </div>
          ))}
        </div>
        <button
          onClick={() => navigate("/")}
          className="mt-8 bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-3 rounded-full font-semibold hover:scale-105 transition"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default PosesPage;
