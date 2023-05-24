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
import axios from "axios";

export const getAllJob =
  (keyword = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: GET_ALL_JOB_REQUEST });
      let link = `/api/v1/get/jobs?keyword=${keyword}`;

      const { data } = await axios.get(link);

      dispatch({ type: GET_ALL_JOB_SUCCESS, payload: data.jobs });
    } catch (error) {
      dispatch({
        type: GET_ALL_JOB_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const getSingleJob = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_JOB_REQUEST });

    const { data } = await axios.get(`/api/v1/get/job/${id}`);

    dispatch({ type: GET_SINGLE_JOB_SUCCESS, payload: data.job });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_JOB_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const applyJob = (id, userData) => async (dispatch) => {
  try {
    dispatch({ type: APPLY_JOB_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.put(
      `/api/v1/apply/job/${id}`,
      userData,
      config
    );
    dispatch({ type: APPLY_JOB_SUCCESS, payload: data.job });
  } catch (error) {
    dispatch({
      type: APPLY_JOB_FAIL,
      payload: error.response.data.message,
    });
  }
};
