import { ADD_PROJECT, DELETE_PROJECT } from './types.ts';

export const addProject = (projectName: string) => ({
  type: ADD_PROJECT,
  payload: projectName,
});

export const deleteProject = (projectName: string) => ({
  type: DELETE_PROJECT,
  payload: projectName,
});
