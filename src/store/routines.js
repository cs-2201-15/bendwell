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
      let { data: routines, error } = await supabase
        .from('routines')
        .select('*')
        .eq('userId', id)
      dispatch(_setRoutines(routines))
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
    default:
      return state;
  }
}
