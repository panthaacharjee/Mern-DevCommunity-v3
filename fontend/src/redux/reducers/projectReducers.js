import {
  GET_ALL_PROJECT_FAIL,
  GET_ALL_PROJECT_REQUEST,
  GET_ALL_PROJECT_SUCCESS,
  GET_SINGLE_PROJECT_FAIL,
  GET_SINGLE_PROJECT_REQUEST,
  GET_SINGLE_PROJECT_SUCCESS,
} from "../constants/projectConstants";

export const projectsReducer = (state = { projects: [] }, action) => {
  switch (action.type) {
    case GET_ALL_PROJECT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    //     case CREATE_POST_SUCCESS:
    //       return {
    //         ...state,
    //         loading: false,
    //         posts: [action.payload.post, ...state.posts],
    //       };

    case GET_ALL_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        projects: action.payload,
      };

    case GET_ALL_PROJECT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const projectReducer = (state = { project: {} }, action) => {
  switch (action.type) {
    case GET_SINGLE_PROJECT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_SINGLE_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        project: action.payload,
      };

    case GET_SINGLE_PROJECT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
