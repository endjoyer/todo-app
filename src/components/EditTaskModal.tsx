import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';
import { TaskActionTypes, updateTask } from '../redux/actions/taskActions.ts';
import SubTaskList from './SubTaskList.tsx';
import CommentSection from './CommentSection.tsx';
import { Task, SubTask, Comment } from '../redux/reducers/taskReducer.ts';

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
  const [subTasks, setSubTasks] = useState<SubTask[]>(task.subTasks);
  const [comments, setComments] = useState<Comment[]>(task.comments);
  const dispatch = useDispatch<Dispatch<TaskActionTypes>>();

  useEffect(() => {
    setSubTasks(task.subTasks);
    setComments(task.comments);
  }, [task]);

  const handleSave = () => {
    const updatedTask = {
      ...task,
      title,
      description,
      priority,
      subTasks,
      comments,
    };

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
      <SubTaskList
        taskId={task.id}
        subTasks={subTasks}
        setSubTasks={setSubTasks}
      />
      <CommentSection
        taskId={task.id}
        comments={comments}
        setComments={setComments}
      />
      <button onClick={handleSave}>Save</button>
      <button onClick={onRequestClose}>Cancel</button>
    </Modal>
  );
};

export default EditTaskModal;
