import { supabase } from '../supabaseClient';

//action types

const SET_ROUTINES = 'SET_ROUTINES';
const ADD_ROUTINE = 'ADD_ROUTINE';
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
//thunks

export const setRoutines = (id) => {
  return async (dispatch) => {
    try {
      let { data: routines, error } = await supabase
        .from('routines')
        .select('*')
        .eq('userId', id);
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
        .from('routines')
        .insert([{ userId: id }]);
      dispatch(_addRoutine(routine));
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
      return action.routine;
    default:
      return state;
  }
}
