import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
  TaskActionTypes,
  updateTaskStatus,
} from '../redux/actions/taskActions.ts';
import EditTaskModal from './EditTaskModal.tsx';
import styles from '../styles/TaskBoard.module.scss';
import { Dispatch } from 'redux';
import { Task } from '../redux/reducers/taskReducer.ts';

interface TaskBoardProps {
  tasks: Task[];
}

const TaskBoard: React.FC<TaskBoardProps> = ({ tasks }) => {
  const dispatch = useDispatch<Dispatch<TaskActionTypes>>();
  const [selectedTask, setSelectedTask] = useState<any>(null);

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const taskId = parseInt(result.draggableId);
      const newStatus = destination.droppableId;
      dispatch(updateTaskStatus(taskId, newStatus));
    }
  };

  const getTasksByStatus = (status: string) => {
    return tasks.filter((task) => task.status === status);
  };

  const openEditModal = (task: any) => {
    setSelectedTask(task);
  };

  const closeEditModal = () => {
    setSelectedTask(null);
  };

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className={styles['task-board']}>
          {['Queue', 'Development', 'Done'].map((status) => (
            <Droppable droppableId={status} key={status}>
              {(provided) => (
                <div
                  className={styles['task-column']}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <h2>{status}</h2>
                  {getTasksByStatus(status).map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          className={styles['task-item']}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          onClick={() => openEditModal(task)}
                        >
                          <h3>{task.title}</h3>
                          <p>{task.description}</p>
                          {/* Добавь другие поля задачи */}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
      {selectedTask && (
        <EditTaskModal
          isOpen={!!selectedTask}
          onRequestClose={closeEditModal}
          task={selectedTask}
        />
      )}
    </div>
  );
};

export default TaskBoard;
