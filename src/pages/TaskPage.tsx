import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/reducers/index.ts';
import AddTask from '../components/AddTask.tsx';
import TaskBoard from '../components/TaskBoard.tsx';

const TaskPage: React.FC = () => {
  const selectedProject = localStorage.getItem('selectedProject');
  const tasks = useSelector((state: RootState) =>
    state.tasks.tasks.filter((task) => task.projected === selectedProject),
  );

  return (
    <div>
      <h1>Task Page</h1>
      <AddTask />
      <TaskBoard tasks={tasks} />
    </div>
  );
};

export default TaskPage;
