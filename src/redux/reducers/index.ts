import { combineReducers } from 'redux';
import projectReducer from './projectReducer.ts';
import taskReducer from './taskReducer.ts';
import { TaskActionTypes } from '../actions/taskActions.ts';

const appReducer = combineReducers({
  projects: projectReducer,
  tasks: taskReducer,
});

const rootReducer = (state: RootState | undefined, action: TaskActionTypes) => {
  const newState = appReducer(state, action);
  localStorage.setItem('appState', JSON.stringify(newState));
  return newState;
};

export type RootState = ReturnType<typeof appReducer>;
export default rootReducer;
