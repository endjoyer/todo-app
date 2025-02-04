import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProject } from '../redux/actions/projectActions.ts';
import styles from '../styles/AddProject.module.scss';

const AddProject: React.FC = () => {
  const [projectName, setProjectName] = useState('');
  const dispatch = useDispatch();

  const handleAddProject = () => {
    if (projectName.trim()) {
      dispatch(addProject(projectName));
      setProjectName('');
    }
  };

  return (
    <div className={styles['add-project-container']}>
      <input
        type="text"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
        placeholder="Enter project name"
      />
      <button onClick={handleAddProject}>Add</button>
    </div>
  );
};

export default AddProject;
