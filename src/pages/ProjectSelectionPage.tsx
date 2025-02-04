import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/reducers/index.ts';
import AddProject from '../components/AddProject.tsx';
import { useNavigate } from 'react-router-dom';
import { deleteProject } from '../redux/actions/projectActions.ts';
import styles from '../styles/ProjectSelectionPage.module.scss';

const ProjectSelectionPage: React.FC = () => {
  const projects = useSelector((state: RootState) => state.projects.projects);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSelectProject = (projectName: string) => {
    localStorage.setItem('selectedProject', projectName);
    navigate('/tasks');
  };

  const handleDeleteProject = (projectName: string) => {
    dispatch(deleteProject(projectName));
  };

  return (
    <div className={styles['project-selection-page']}>
      <h1>Project Selection</h1>
      <div className={styles['add-project']}>
        <AddProject />
      </div>
      <ul>
        {projects.map((project, index) => (
          <li key={index}>
            <button onClick={() => handleSelectProject(project)}>
              {project}
            </button>
            <button
              title="Delete Project"
              onClick={() => handleDeleteProject(project)}
              className={styles['delete-button']}
            ></button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectSelectionPage;
