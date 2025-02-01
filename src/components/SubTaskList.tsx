import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  addSubTask,
  TaskActionTypes,
  toggleSubTask,
  updateTask,
} from '../redux/actions/taskActions.ts';
import { SubTask } from '../redux/reducers/taskReducer.ts';
import { Dispatch } from 'redux';
import { RootState } from '../redux/reducers/index.ts';
import { Task } from 'redux-saga';

interface SubTaskListProps {
  task: Task;
  taskId: number;
  subTasks: SubTask[];
}

const SubTaskList: React.FC<SubTaskListProps> = ({
  task,
  taskId,
  subTasks,
}) => {
  const [subTaskTitle, setSubTaskTitle] = useState('');
  const dispatch = useDispatch<Dispatch<TaskActionTypes>>();
  // const subTasks = useSelector(
  //   (state: RootState) =>
  //     state.tasks.tasks.find((task) => task.id === taskId)?.subTasks || [],
  // );

  const handleAddSubTask = () => {
    if (subTaskTitle.trim()) {
      const newSubTask: SubTask = {
        id: Date.now(),
        title: subTaskTitle,
        completed: false,
      };
      dispatch(addSubTask(taskId, newSubTask));
      setSubTaskTitle('');
      task.subTasks.push(newSubTask);

      dispatch(updateTask(task));
    }
  };

  const handleToggleSubTask = (subTaskId: number) => {
    dispatch(toggleSubTask(taskId, subTaskId));
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
