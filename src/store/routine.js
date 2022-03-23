import { supabase } from "../supabaseClient";

//action types

const SET_ROUTINE = "SET_ROUTINE";

//action creators

const _setRoutine = (routine) => {
  return {
    type: SET_ROUTINE,
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
