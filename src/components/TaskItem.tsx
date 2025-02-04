import React from 'react';
import { Task } from '../redux/reducers/taskReducer.ts';

interface TaskItemProps {
  task: Task;
  index: number;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, index }) => {
  const calculateWorkingTime = () => {
    let totalMinutes = task.workingTime;
    if (task.status === 'Development' && task.developmentStartTime) {
      const currentTime = new Date().getTime();
      const startTime = new Date(task.developmentStartTime).getTime();
      const additionalMinutes = (currentTime - startTime) / 60000;
      totalMinutes += additionalMinutes;
    }
    return totalMinutes;
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = Math.round(minutes % 60);
    return `${hours}h ${remainingMinutes}m`;
  };

  const workingTime = calculateWorkingTime();

  return (
    <div>
      <h3>
        {index}. {task.title}
      </h3>
      <p>{task.description}</p>
      <p>Priority: {task.priority}</p>
      <p>Status: {task.status}</p>
      <p>Created At: {new Date(task.createdAt).toLocaleString()}</p>
      {task.status !== 'Development' && task.endDate && (
        <p>Date of completion: {new Date(task.endDate).toLocaleString()}</p>
      )}
      <p>Working Time: {formatTime(workingTime)}</p>
    </div>
  );
};

export default TaskItem;
