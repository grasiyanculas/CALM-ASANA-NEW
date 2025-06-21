// src/components/SuggestedPoses.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function SuggestedPoses() {
  const location = useLocation();
  const navigate = useNavigate();

  const poses = location.state?.poses || [];

  return (
    <div className="p-6 min-h-screen bg-gradient-to-r from-green-100 to-blue-100">
      <h2 className="text-3xl font-bold text-center mb-6">🧘 Your Personalized Yoga Pose Suggestions</h2>

      {poses.length === 0 ? (
        <p className="text-center text-gray-600">No suggestions found. Please try again.</p>
      ) : (
        <ul className="space-y-6">
          {poses.map((pose, index) => (
            <li key={index} className="p-6 bg-white rounded-xl shadow-md">
              <h3 className="text-2xl font-semibold mb-2">{pose.name}</h3>
              <p className="mb-2"><strong>Description:</strong> {pose.description}</p>
              <p className="mb-2"><strong>Difficulty:</strong> {pose["difficulty level"]}</p>
              <p className="mb-4"><strong>Benefits:</strong> {pose.benefits}</p>

              <button
                onClick={() => navigate('/practice', { state: { pose } })}
                className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
              >
                Practice This Pose
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-8 text-center">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => navigate('/')}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default SuggestedPoses;
