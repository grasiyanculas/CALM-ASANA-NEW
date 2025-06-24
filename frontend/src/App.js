import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ToggleAuth from './components/ToggleAuth';
import UserQuestionnaire from './pages/UserQuestionnaire';
import PosesPage from './pages/PosesPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<ToggleAuth />} />
        <Route path="/UserQuestionnaire" element={<UserQuestionnaire />} />
         <Route path="/poses" element={<PosesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
