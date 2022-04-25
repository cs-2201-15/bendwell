import { supabase } from "../supabaseClient";

//action types

const SET_ROUTINES = "SET_ROUTINES";
const ADD_ROUTINE = "ADD_ROUTINE";
const REMOVE_ROUTINE = "REMOVE_ROUTINE";
//action creators

const _setRoutines = (routines) => {
  return {
    type: SET_ROUTINES,
    routines,
  };
};

const _addRoutine = (routine) => {
  return {
    type: ADD_ROUTINE,
    routine,
  };
};

const _removeRoutine = (routineId) => {
  return {
    type: REMOVE_ROUTINE,
    routineId,
  };
};

//thunks

export const setRoutines = (id) => {
  return async (dispatch) => {
    try {
      let { data: routines, error } = await supabase
        .from("routines")
        .select(
          `*,
        stretches:stretches(*)
        `
        )
        .eq("userId", id);
      dispatch(_setRoutines(routines));
    } catch (error) {
      console.log(error);
    }
  };
};

export const addRoutine = (id) => {
  return async (dispatch) => {
    try {
      const { data: routine, error } = await supabase
        .from("routines")
        .insert([
          { userId: id, name: "new routine", notes: "Your New Routine!" },
        ]);
      dispatch(_addRoutine(routine));
    } catch (error) {
      console.log(error);
    }
  };
};
export const removeRoutine = (routineId) => {
  return async (dispatch) => {
    try {
      await supabase
        .from("stretchRoutines")
        .delete()
        .eq("routineId", routineId);
      const { data: routine, error } = await supabase
        .from("routines")
        .delete()
        .match({ id: routineId });
      dispatch(_removeRoutine(routineId));
    } catch (error) {
      console.log(error);
    }
  };
};

//reducer

let initialState = [];

export default function routinesReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ROUTINES:
      return action.routines;
    case ADD_ROUTINE:
      return [...state, action.routine[0]];
    case REMOVE_ROUTINE:
      return state.filter((routine) => routine.id !== action.routineId);
    default:
      return state;
  }
}
