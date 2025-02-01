import React, { useState } from 'react';
import Modal from 'react-modal';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';
import {
  TaskActionTypes,
  updateTask,
  updateTaskStatus,
} from '../redux/actions/taskActions.ts';
import SubTaskList from './SubTaskList.tsx';
import CommentSection from './CommentSection.tsx';
import { Task } from '../redux/reducers/taskReducer.ts';

interface EditTaskModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  task: Task;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({
  isOpen,
  onRequestClose,
  task,
}) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [priority, setPriority] = useState(task.priority);
  const dispatch = useDispatch<Dispatch<TaskActionTypes>>();

  const handleSave = () => {
    // Обнови задачу в состоянии
    dispatch(updateTaskStatus(task.id, task.status)); // Здесь можно добавить больше логики для обновления задачи
    const updatedTask = { ...task, title, description };
    dispatch(updateTask(updatedTask));
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Edit Task"
    >
      <h2>Edit Task</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task Title"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Task Description"
      />
      <select
        value={priority}
        onChange={(e) =>
          setPriority(e.target.value as 'low' | 'medium' | 'high')
        }
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <SubTaskList task={task} taskId={task.id} subTasks={task.subTasks} />
      <CommentSection task={task} taskId={task.id} comments={task.comments} />
      <button onClick={handleSave}>Save</button>
      <button onClick={onRequestClose}>Cancel</button>
    </Modal>
  );
};

export default EditTaskModal;
