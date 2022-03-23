// import { supabase } from "../supabaseClient";

// //action types

// const SET_ROUTINE = "SET_ROUTINE";

// //action creators

// const _setRoutine = (routine) => {
//   return {
//     type: SET_ROUTINE,
//     routine,
//   };
// };

// //thunks

// export const setRoutine = () => {
//   return async (dispatch) => {
//     try {
//       let { data: Stretches, error } = await supabase
//         .from("Stretches")
//         .select("*");
//       dispatch(_setStretches(Stretches));
//     } catch (error) {
//       console.log(error);
//     }
//   };
// };

// //reducer

// let initialState = [];

// export default function routineReducer(state = initialState, action) {
//   switch (action.type) {
//     case SET_STRETCHES:
//       return action.stretches;
//     default:
//       return state;
//   }
// }
