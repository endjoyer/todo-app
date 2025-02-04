import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
  TaskActionTypes,
  updateTaskOrder,
  updateTaskStatus,
} from '../redux/actions/taskActions.ts';
import TaskItem from './TaskItem.tsx';
import styles from '../styles/TaskBoard.module.scss';
import { Dispatch } from 'redux';
import { Task } from '../redux/reducers/taskReducer.ts';
import EditTaskModal from './EditTaskModal.tsx';
import SearchBar from './SearchBar.tsx';

interface TaskBoardProps {
  tasks: Task[];
}

const TaskBoard: React.FC<TaskBoardProps> = ({ tasks }) => {
  const dispatch = useDispatch<Dispatch<TaskActionTypes>>();
  const [selectedTask, setSelectedTask] = useState<{
    task: Task;
    index: number;
  } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const taskId = parseInt(result.draggableId);

    if (source.droppableId === destination.droppableId) {
      const columnTasks = tasks.filter(
        (task) => task.status === source.droppableId,
      );
      const [movedTask] = columnTasks.splice(source.index, 1);
      columnTasks.splice(destination.index, 0, movedTask);

      dispatch(updateTaskOrder(source.droppableId, columnTasks));
    } else {
      const sourceTasks = tasks.filter(
        (task) => task.status === source.droppableId,
      );
      const destinationTasks = tasks.filter(
        (task) => task.status === destination.droppableId,
      );

      const [movedTask] = sourceTasks.splice(source.index, 1);
      movedTask.status = destination.droppableId;
      destinationTasks.splice(destination.index, 0, movedTask);

      dispatch(updateTaskOrder(source.droppableId, sourceTasks));
      dispatch(updateTaskOrder(destination.droppableId, destinationTasks));

      dispatch(updateTaskStatus(taskId, destination.droppableId));
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
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
                  {filteredTasks
                    .filter((task) => task.status === status)
                    .map((task, index) => (
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
                            onClick={() => setSelectedTask({ task, index })}
                          >
                            <TaskItem task={task} index={index + 1} />
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
          onRequestClose={() => setSelectedTask(null)}
          task={selectedTask.task}
          index={selectedTask.index + 1}
        />
      )}
    </div>
  );
};

export default TaskBoard;
