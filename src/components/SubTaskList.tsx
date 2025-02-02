import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addSubTask, TaskActionTypes } from '../redux/actions/taskActions.ts';
import { SubTask } from '../redux/reducers/taskReducer.ts';
import { Dispatch } from 'redux';

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
  const [subTaskTitle, setSubTaskTitle] = useState('');
  const dispatch = useDispatch<Dispatch<TaskActionTypes>>();

  const handleAddSubTask = () => {
    if (subTaskTitle.trim()) {
      const newSubTask: SubTask = {
        id: Date.now(),
        title: subTaskTitle,
        completed: false,
      };
      dispatch(addSubTask(taskId, newSubTask));
      setSubTasks([...subTasks, newSubTask]);
      setSubTaskTitle('');
    }
  };

  const handleToggleSubTask = (subTaskId: number) => {
    const updatedSubTasks = subTasks.map((subTask) =>
      subTask.id === subTaskId
        ? { ...subTask, completed: !subTask.completed }
        : subTask,
    );
    setSubTasks(updatedSubTasks);
  };

  return (
    <div>
      <h4>Subtasks</h4>
      <input
        type="text"
        value={subTaskTitle}
        onChange={(e) => setSubTaskTitle(e.target.value)}
        placeholder="Enter subtask title"
      />
      <button onClick={handleAddSubTask}>Add Subtask</button>
      <ul>
        {subTasks.map((subTask) => (
          <li key={subTask.id}>
            <input
              type="checkbox"
              checked={subTask.completed}
              onChange={() => handleToggleSubTask(subTask.id)}
            />
            {subTask.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubTaskList;
