import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addTask, TaskActionTypes } from '../redux/actions/taskActions.ts';
import { Dispatch } from 'redux';
import { Task } from '../redux/reducers/taskReducer.ts';
import styles from '../styles/AddTask.module.scss';

const AddTask: React.FC = () => {
  const [taskTitle, setTaskTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('low');
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useDispatch<Dispatch<TaskActionTypes>>();

  const handleAddTask = () => {
    const selectedProject = localStorage.getItem('selectedProject');
    if (taskTitle.trim() && selectedProject) {
      const newTask: Task = {
        id: Date.now(),
        title: taskTitle,
        description,
        status: 'Queue',
        createdAt: new Date(),
        workingTime: 0,
        developmentStartTime: null,
        endDate: null,
        priority,
        files: files,
        subTasks: [],
        comments: [],
        projected: selectedProject,
      };

      dispatch(addTask(newTask));
      setTaskTitle('');
      setDescription('');
      setPriority('low');
      setFiles([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(Array.from(event.target.files));
    }
  };

  return (
    <div className={styles['add-task']}>
      <input
        type="text"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        placeholder="Enter task title"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter task description"
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
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        ref={fileInputRef}
      />
      <button onClick={handleAddTask}>Add</button>
    </div>
  );
};

export default AddTask;
