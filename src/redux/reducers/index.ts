import { combineReducers } from 'redux';
import projectReducer from './projectReducer.ts';
import taskReducer from './taskReducer.ts';

const appReducer = combineReducers({
  projects: projectReducer,
  tasks: taskReducer,
});

const rootReducer = (state: any, action: any) => {
  const newState = appReducer(state, action);
  localStorage.setItem('appState', JSON.stringify(newState));
  return newState;
};

export type RootState = ReturnType<typeof appReducer>;
export default rootReducer;
