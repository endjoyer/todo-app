import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/reducers/index.ts';
import AddProject from '../components/AddProject.tsx';
import { useNavigate } from 'react-router-dom';

const ProjectSelectionPage: React.FC = () => {
  const projects = useSelector((state: RootState) => state.projects.projects);
  const navigate = useNavigate();

  const handleSelectProject = (projectName: string) => {
    localStorage.setItem('selectedProject', projectName);
    navigate('/tasks');
  };

  return (
    <div>
      <h1>Project Selection</h1>
      <AddProject />
      <ul>
        {projects.map((project, index) => (
          <li key={index}>
            <button onClick={() => handleSelectProject(project)}>
              {project}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectSelectionPage;
