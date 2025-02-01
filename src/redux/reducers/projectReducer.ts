import { ADD_PROJECT } from '../actions/types.ts';

interface ProjectState {
  projects: string[];
}

const initialState: ProjectState = {
  projects: [],
};

const projectReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_PROJECT:
      return {
        ...state,
        projects: [...state.projects, action.payload],
      };
    default:
      return state;
  }
};

export default projectReducer;
