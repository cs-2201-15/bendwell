import { supabase } from "../supabaseClient";

//action types

const SET_ROUTINE = "SET_ROUTINE";
const ADD_STRETCH = "ADD_STRETCH";
const DELETE_STRETCH = "DELETE_STRETCH";
const EDIT_ROUTINE = "EDIT_ROUTINE";

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

const _deleteStretch = (stretchId) => {
  return {
    type: DELETE_STRETCH,
    stretchId,
  };
};
//thunks

const _editRoutine = (routine) => {
  return {
    type: EDIT_ROUTINE,
    routine,
  };
};

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
      dispatch(_setRoutine(routine[0]));
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

export const deleteStretch = (stretchId, routineId) => {
  return async (dispatch) => {
    try {
      const { data, error } = await supabase
        .from("stretchRoutines")
        .delete()
        .match({ stretchId: stretchId, routineId: routineId });
      dispatch(_deleteStretch(stretchId));
    } catch (error) {
      console.log(error);
    }
  };
};
export const editRoutine = (routineId, routineName, text) => {
  return async (dispatch) => {
    try {
      const { data: routine } = await supabase
        .from("routines")
        .update({ name: routineName, notes: text })
        .eq("id", routineId);

      const { data: updated } = await supabase
        .from("routines")
        .select(
          `*,
        stretches:stretches(*)
        `
        )
        .eq("id", routineId);

      dispatch(_editRoutine(updated));
    } catch (error) {
      console.log(error);
    }
  };
};
//reducer

let initialState = {};

export default function routineReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ROUTINE:
      return action.routine;
    case DELETE_STRETCH:
      return {
        ...state,
        stretches: state.stretches.filter(
          (stretch) => stretch.id !== action.stretchId
        ),
      };
    case EDIT_ROUTINE:
      return action.routine[0];
    default:
      return state;
  }
}
