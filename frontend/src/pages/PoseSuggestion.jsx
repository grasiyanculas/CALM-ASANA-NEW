import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function PoseSuggestion() {
  const location = useLocation();
  const navigate = useNavigate();
  const poses = location.state?.poses || [];

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-300 to-blue-300 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-4">🧘 Your Personalized Yoga Pose Suggestions</h1>

      {poses.length === 0 ? (
        <p className="text-red-600 text-lg">No pose suggestions found. Please try again.</p>
      ) : (
        <div className="grid gap-6 w-full max-w-3xl">
          {poses.map((pose, index) => (
            <div key={index} className="bg-white shadow-lg rounded-2xl p-6 border border-blue-200">
              <h2 className="text-xl font-semibold mb-2">{pose.name}</h2>
              <p className="mb-2 text-gray-700"><strong>Description:</strong> {pose.description}</p>
              <p className="text-gray-700"><strong>Benefits:</strong> {pose.benefits}</p>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={() => navigate('/')}
        className="mt-8 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
      >
        Back to Home
      </button>
    </div>
  );
}

export default PoseSuggestion;
