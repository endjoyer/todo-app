import { ADD_PROJECT } from './types.ts';

export const addProject = (projectName: string) => ({
  type: ADD_PROJECT,
  payload: projectName,
});
