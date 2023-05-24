import {
  APPLY_JOB_FAIL,
  APPLY_JOB_REQUEST,
  APPLY_JOB_SUCCESS,
  GET_ALL_JOB_FAIL,
  GET_ALL_JOB_REQUEST,
  GET_ALL_JOB_SUCCESS,
  GET_SINGLE_JOB_FAIL,
  GET_SINGLE_JOB_REQUEST,
  GET_SINGLE_JOB_SUCCESS,
} from "../constants/jobConstants";

export const jobsReducer = (state = { jobs: [] }, action) => {
  switch (action.type) {
    case GET_ALL_JOB_REQUEST:
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

    case GET_ALL_JOB_SUCCESS:
      return {
        ...state,
        loading: false,
        jobs: action.payload,
      };

    case GET_ALL_JOB_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const jobReducer = (state = { job: {} }, action) => {
  switch (action.type) {
    case GET_SINGLE_JOB_REQUEST:
    case APPLY_JOB_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_SINGLE_JOB_SUCCESS:
    case APPLY_JOB_SUCCESS:
      return {
        ...state,
        loading: false,
        job: action.payload,
      };

    case GET_SINGLE_JOB_FAIL:
    case APPLY_JOB_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
