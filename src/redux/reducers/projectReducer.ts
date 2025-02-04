import { ADD_PROJECT, DELETE_PROJECT } from '../actions/types.ts';

interface ProjectState {
  projects: string[];
}

interface AddProjectAction {
  type: typeof ADD_PROJECT;
  payload: string;
}

interface DeleteProjectAction {
  type: typeof DELETE_PROJECT;
  payload: string;
}

type ProjectActionTypes = AddProjectAction | DeleteProjectAction;

const initialState: ProjectState = {
  projects: [],
};

const projectReducer = (
  state = initialState,
  action: ProjectActionTypes,
): ProjectState => {
  switch (action.type) {
    case ADD_PROJECT:
      return {
        ...state,
        projects: [...state.projects, action.payload],
      };
    case DELETE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter(
          (project) => project !== action.payload,
        ),
      };
    default:
      return state;
  }
};

export default projectReducer;
