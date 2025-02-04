import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';
import {
  TaskActionTypes,
  updateTask,
  deleteTask,
} from '../redux/actions/taskActions.ts';
import SubTaskList from './SubTaskList.tsx';
import CommentSection from './CommentSection.tsx';
import { Task, SubTask, Comment } from '../redux/reducers/taskReducer.ts';
import TaskItem from './TaskItem.tsx';

interface EditTaskModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  task: Task;
  index: number;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({
  isOpen,
  onRequestClose,
  task,
  index,
}) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [priority, setPriority] = useState(task.priority);
  const [subTasks, setSubTasks] = useState<SubTask[]>(task.subTasks);
  const [comments, setComments] = useState<Comment[]>(task.comments);
  const [files, setFiles] = useState<File[]>(task.files);
  const dispatch = useDispatch<Dispatch<TaskActionTypes>>();

  useEffect(() => {
    setTitle(task.title);
    setDescription(task.description);
    setPriority(task.priority);
    setSubTasks(task.subTasks);
    setComments(task.comments);
    setFiles(task.files);
  }, [task]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles([...files, ...Array.from(event.target.files)]);
    }
  };

  const handleFileRemove = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);

    localStorage.setItem('taskFiles', JSON.stringify(updatedFiles));
  };

  useEffect(() => {
    const storedFiles = localStorage.getItem('taskFiles');
    if (storedFiles) {
      setFiles(JSON.parse(storedFiles));
    }
  }, []);

  const handleSave = () => {
    const updatedTask = {
      ...task,
      title,
      description,
      priority,
      subTasks,
      comments,
      files,
    };

    dispatch(updateTask(updatedTask));
    onRequestClose();
  };

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Edit Task"
    >
      <h2>Edit Task</h2>
      <TaskItem task={task} index={index} />
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
      <input type="file" multiple onChange={handleFileChange} />
      <ul>
        {files.map((file, index) => (
          <li key={index}>
            <a href={URL.createObjectURL(file)} download={file.name}>
              {file.name}
            </a>
            <button onClick={() => handleFileRemove(index)}>Remove</button>
          </li>
        ))}
      </ul>
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
      <button onClick={handleDelete}>Delete Task</button>
    </Modal>
  );
};

export default EditTaskModal;
