import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  addSubTask,
  toggleSubTask,
  TaskActionTypes,
} from '../redux/actions/taskActions.ts';
import { SubTask } from '../redux/reducers/taskReducer.ts';
import { Dispatch } from 'redux';
import styles from '../styles/SubTaskList.module.scss';

interface SubTaskListProps {
  taskId: number;
  subTasks: SubTask[];
  setSubTasks: React.Dispatch<React.SetStateAction<SubTask[]>>;
}

const SubTaskList: React.FC<SubTaskListProps> = ({
  taskId,
  subTasks,
  setSubTasks,
}) => {
  const [subTaskText, setSubTaskText] = useState('');
  const dispatch = useDispatch<Dispatch<TaskActionTypes>>();

  const handleAddSubTask = () => {
    if (subTaskText.trim()) {
      const newSubTask: SubTask = {
        id: Date.now(),
        title: subTaskText,
        completed: false,
      };

      dispatch(addSubTask(taskId, newSubTask));
      setSubTasks([...subTasks, newSubTask]);
      setSubTaskText('');
    }
  };

  const handleToggleSubTask = (subTaskId: number) => {
    dispatch(toggleSubTask(taskId, subTaskId));
    setSubTasks((prevSubTasks) =>
      prevSubTasks.map((subTask) =>
        subTask.id === subTaskId
          ? { ...subTask, completed: !subTask.completed }
          : subTask,
      ),
    );
  };

  return (
    <div className={styles['subtask-list']}>
      <h4>SubTasks</h4>
      <div className={styles['subtask-input']}>
        <input
          type="text"
          value={subTaskText}
          onChange={(e) => setSubTaskText(e.target.value)}
          placeholder="Enter subtask"
        />
        <button onClick={handleAddSubTask}>Add</button>
      </div>
      <ul>
        {subTasks.map((subTask) => (
          <li key={subTask.id}>
            <p className={subTask.completed ? styles['completed'] : ''}>
              {subTask.title}
            </p>
            <button onClick={() => handleToggleSubTask(subTask.id)}>
              {subTask.completed ? 'Undo' : 'Complete'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubTaskList;
