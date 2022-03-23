import { supabase } from "../supabaseClient";

//action types

const SET_ROUTINES = "SET_ROUTINES";

//action creators

const _setRoutines = (routines) => {
  return {
    type: SET_ROUTINES,
    routines,
  };
};

//thunks

export const setRoutines = (id) => {
  return async (dispatch) => {
    try {
      let { data: Routines, error } = await supabase
        .from('Routines')
        .select('*')
        .eq('id', id)
      dispatch(_setRoutines(Routines))
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
      return action.routine;
    default:
      return state;
  }
}
