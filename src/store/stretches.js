import { supabase } from "../supabaseClient";

//action types

const SET_STRETCHES = "SET_STRETCHES";

//action creators

const _setStretches = (stretches) => {
  return {
    type: SET_STRETCHES,
    stretches,
  };
};

//thunks

export const setStretches = () => {
  return async (dispatch) => {
    try {
      let { data: Stretches, error } = await supabase
        .from("stretches")
        .select("*")
        .order("id", { ascending: true });
      dispatch(_setStretches(Stretches));
    } catch (error) {
      console.log(error);
    }
  };
};

//reducer

let initialState = [];

export default function stretchesReducer(state = initialState, action) {
  switch (action.type) {
    case SET_STRETCHES:
      return action.stretches;
    default:
      return state;
  }
}
