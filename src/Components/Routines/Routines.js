import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setRoutines, addRoutine, removeRoutine } from "../../store/routines";
import { supabase } from "../../supabaseClient";
import "./routines.scss";

const AllRoutines = () => {
  const dispatch = useDispatch();
  const routines = useSelector((state) => state.routines) || [];

  let user = supabase.auth.user();
  useEffect(() => {
    dispatch(setRoutines(user.id));
  }, []);

  const handleClick = () => {
    dispatch(addRoutine(user.id));
  };

  const deleteRoutine = (id) => {
    dispatch(removeRoutine(id));
  };

  console.log(routines);

  return (
    <div className="main-container">
      <div className="routines-container">
        {routines.length ? null : "Please add a routine!"}

        {routines.map((routine) => {
          return (
            <div className="routine-preview" key={routine.id}>
              <div className="routine-card">
                <Link to={`/routines/${routine.id}`}>
                  <div className="routine-info">
                    <h2>{routine.name}</h2>
                    <h3>{`Notes: ${routine.notes}`}</h3>
                  </div>
                </Link>
                <button
                  type="button"
                  className="remove-routine"
                  onClick={() => deleteRoutine(routine.id)}
                >
                  Remove Routine
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="add-routine">
        <button type="button" onClick={() => handleClick()}>
          Add Routine
        </button>
      </div>
    </div>
  );
};

export default AllRoutines;
