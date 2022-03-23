import { supabase } from "../supabaseClient";

//action types

const SET_STRETCH = "SET_STRETCH";

//action creators

const _setStretch = (stretch) => {
  return {
    type: SET_STRETCH,
    stretch,
  };
};

//thunks

export const setStretch = (id) => {
  return async (dispatch) => {
    try {
      let { data: Stretch, error } = await supabase
        .from("stretches")
        .select("*")
        .eq("id", id);
      dispatch(_setStretch(Stretch));
    } catch (error) {
      console.log(error);
    }
  };
};

//reducer

let initialState = [];

export default function stretchReducer(state = initialState, action) {
  switch (action.type) {
    case SET_STRETCH:
      return action.stretch;
    default:
      return state;
  }
}
