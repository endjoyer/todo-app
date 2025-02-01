import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProjectSelectionPage from './pages/ProjectSelectionPage.tsx';
import TaskPage from './pages/TaskPage.tsx';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProjectSelectionPage />} />
        <Route path="/tasks" element={<TaskPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
