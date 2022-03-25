import { supabase } from "../supabaseClient";

//action types

const SET_ROUTINE = "SET_ROUTINE";
const ADD_STRETCH = "ADD_STRETCH";

//action creators

const _setRoutine = (routine) => {
  return {
    type: SET_ROUTINE,
    routine,
  };
};

const _addStretch = (routine) => {
  return {
    type: ADD_STRETCH,
    routine,
  };
};
//thunks

export const setRoutine = (id) => {
  return async (dispatch) => {
    try {
      let { data: routine, error } = await supabase
        .from("routines")
        .select(
          `*,
        stretches:stretches(*)
        `
        )
        .eq("id", id);

      console.log(routine);

      dispatch(_setRoutine(routine));
    } catch (error) {
      console.log(error);
    }
  };
};

export const addStretch = (stretchId, routineId) => {
  return async (dispatch) => {
    try {
      const { data, error } = await supabase
        .from("stretchRoutines")
        .insert([{ stretchId: stretchId, routineId: routineId }]);
    } catch (error) {
      console.log(error);
    }
  };
};

//reducer

let initialState = [];

export default function routineReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ROUTINE:
      return action.routine;
    default:
      return state;
  }
}
