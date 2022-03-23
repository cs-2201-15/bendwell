import { supabase } from "../supabaseClient";

//action types

const SET_CAMERA = "SET_CAMERA";

//action creators

const _setCamera = (camera) => {
  return {
    type: SET_CAMERA,
    camera,
  };
};

//thunks

export const setSingleCamera = (stretchId) => {
  return async (dispatch) => {
    try {
      let { data: singleCamera, error } = await supabase
        .from("stretches")
        .select("*")
        .eq("id", stretchId);

      dispatch(_setCamera(singleCamera));
    } catch (error) {
      console.log(error);
    }
  };
};

export const setRoutineCamera = (stretchArr) => {
  return async (dispatch) => {
    try {
      dispatch(_setCamera(stretchArr));
    } catch (error) {
      console.log(error);
    }
  };
};

//reducer

let initialState = [];

export default function cameraReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CAMERA:
      return [...action.camera];
    default:
      return state;
  }
}
