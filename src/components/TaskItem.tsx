import React from 'react';
import { Task } from '../redux/reducers/taskReducer.ts';
import styles from '../styles/TaskItem.module.scss';

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
    <div className={styles['task-item']}>
      <h3>
        {index}. {task.title}
      </h3>
      <p>{task.description}</p>
      <p className={styles['priority']}>Priority: {task.priority}</p>
      <p className={styles['status']}>Status: {task.status}</p>
      <p className={styles['created-at']}>
        Created At: {new Date(task.createdAt).toLocaleString()}
      </p>
      {task.status !== 'Development' && task.endDate && (
        <p className={styles['end-date']}>
          Date of completion: {new Date(task.endDate).toLocaleString()}
        </p>
      )}
      <p className={styles['working-time']}>
        Working Time: {formatTime(workingTime)}
      </p>
    </div>
  );
};

export default TaskItem;
