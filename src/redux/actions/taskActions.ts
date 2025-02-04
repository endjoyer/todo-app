import {
  ADD_TASK,
  UPDATE_TASK_STATUS,
  ADD_SUBTASK,
  TOGGLE_SUBTASK,
  ADD_COMMENT,
  ADD_REPLY,
  UPDATE_TASK,
  UPDATE_TASK_ORDER,
} from './types.ts';
import { Task, SubTask, Comment } from '../reducers/taskReducer.ts';

interface AddTaskAction {
  type: typeof ADD_TASK;
  payload: Task;
}

interface UpdateTaskStatusAction {
  type: typeof UPDATE_TASK_STATUS;
  payload: { taskId: number; status: string };
}

interface AddSubTaskAction {
  type: typeof ADD_SUBTASK;
  payload: { taskId: number; subTask: SubTask };
}

interface ToggleSubTaskAction {
  type: typeof TOGGLE_SUBTASK;
  payload: { taskId: number; subTaskId: number };
}

interface AddCommentAction {
  type: typeof ADD_COMMENT;
  payload: { taskId: number; comment: Comment };
}

interface AddReplyAction {
  type: typeof ADD_REPLY;
  payload: { taskId: number; commentId: number; reply: Comment };
}

interface UpdateTaskAction {
  type: typeof UPDATE_TASK;
  payload: Task;
}

interface UpdateTaskOrderAction {
  type: typeof UPDATE_TASK_ORDER;
  payload: { status: string; tasks: Task[] };
}

export type TaskActionTypes =
  | AddTaskAction
  | UpdateTaskStatusAction
  | AddSubTaskAction
  | ToggleSubTaskAction
  | AddCommentAction
  | AddReplyAction
  | UpdateTaskAction
  | UpdateTaskOrderAction;

export const addTask = (task: Task): AddTaskAction => ({
  type: ADD_TASK,
  payload: task,
});

export const updateTaskStatus = (
  taskId: number,
  status: string,
): UpdateTaskStatusAction => ({
  type: UPDATE_TASK_STATUS,
  payload: { taskId, status },
});

export const addSubTask = (
  taskId: number,
  subTask: SubTask,
): AddSubTaskAction => ({
  type: ADD_SUBTASK,
  payload: { taskId, subTask },
});

export const toggleSubTask = (
  taskId: number,
  subTaskId: number,
): ToggleSubTaskAction => ({
  type: TOGGLE_SUBTASK,
  payload: { taskId, subTaskId },
});

export const addComment = (
  taskId: number,
  comment: Comment,
): AddCommentAction => ({
  type: ADD_COMMENT,
  payload: { taskId, comment },
});

export const addReply = (
  taskId: number,
  commentId: number,
  reply: Comment,
): AddReplyAction => ({
  type: ADD_REPLY,
  payload: { taskId, commentId, reply },
});

export const updateTask = (task: Task): UpdateTaskAction => ({
  type: UPDATE_TASK,
  payload: task,
});

export const updateTaskOrder = (
  status: string,
  tasks: Task[],
): UpdateTaskOrderAction => ({
  type: UPDATE_TASK_ORDER,
  payload: { status, tasks },
});
