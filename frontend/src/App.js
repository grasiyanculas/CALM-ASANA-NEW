import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ToggleAuth from './components/ToggleAuth';
import UserQuestionnaire from './pages/UserQuestionnaire';
import PoseSuggestion from './pages/PoseSuggestion';
//import Dashboard from './pages/Dashboard';
//import SuggestedPoses from './/SuggestedPoses';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<ToggleAuth />} />
        <Route path="/UserQuestionnaire" element={<UserQuestionnaire />} />
       <Route path="/poses" element={<PoseSuggestion />} />
        
      </Routes>
    </Router>
  );
}

export default App;
