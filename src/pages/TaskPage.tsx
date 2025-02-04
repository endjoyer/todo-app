import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/reducers/index.ts';
import AddTask from '../components/AddTask.tsx';
import TaskBoard from '../components/TaskBoard.tsx';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/TaskPage.module.scss';

const TaskPage: React.FC = () => {
  const selectedProject = localStorage.getItem('selectedProject');
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => task.projected === selectedProject);
  }, [tasks, selectedProject]);

  const navigate = useNavigate();

  return (
    <div className={styles['task-page']}>
      <h1>Task Page</h1>
      <button
        className={styles['task-page-back-button']}
        onClick={() => navigate('/')}
      />
      <AddTask />
      <TaskBoard tasks={filteredTasks} />
    </div>
  );
};

export default TaskPage;
