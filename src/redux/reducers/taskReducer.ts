import {
  ADD_TASK,
  UPDATE_TASK_STATUS,
  ADD_SUBTASK,
  TOGGLE_SUBTASK,
  ADD_COMMENT,
  ADD_REPLY,
  UPDATE_TASK,
} from '../actions/types.ts';
import { TaskActionTypes } from '../actions/taskActions.ts';

export interface Comment {
  id: number;
  text: string;
  replies: Comment[];
}

export interface SubTask {
  id: number;
  title: string;
  completed: boolean;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  createdAt: Date;
  workingTime: number; // in minutes
  endDate: Date | null;
  priority: 'low' | 'medium' | 'high';
  files: File[];
  subTasks: SubTask[];
  comments: Comment[];
  projected: string;
}

interface TaskState {
  tasks: Task[];
}

const initialState: TaskState = {
  tasks: [],
};

const taskReducer = (
  state = initialState,
  action: TaskActionTypes,
): TaskState => {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case UPDATE_TASK_STATUS:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.taskId
            ? { ...task, status: action.payload.status }
            : task,
        ),
      };
    case ADD_SUBTASK:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.taskId
            ? { ...task, subTasks: [...task.subTasks, action.payload.subTask] }
            : task,
        ),
      };
    case TOGGLE_SUBTASK:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.taskId
            ? {
                ...task,
                subTasks: task.subTasks.map((subTask) =>
                  subTask.id === action.payload.subTaskId
                    ? { ...subTask, completed: !subTask.completed }
                    : subTask,
                ),
              }
            : task,
        ),
      };
    case ADD_COMMENT:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.taskId
            ? { ...task, comments: [...task.comments, action.payload.comment] }
            : task,
        ),
      };
    case ADD_REPLY:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.taskId
            ? {
                ...task,
                comments: task.comments.map((comment) =>
                  comment.id === action.payload.commentId
                    ? {
                        ...comment,
                        replies: [...comment.replies, action.payload.reply],
                      }
                    : comment,
                ),
              }
            : task,
        ),
      };
    case UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task,
        ),
      };
    default:
      return state;
  }
};

export default taskReducer;
