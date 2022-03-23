import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setRoutines } from "../store/routines";
import { supabase } from "../supabaseClient";

const AllRoutines = () => {
  const dispatch = useDispatch();
  const routines = useSelector((state) => state.routines) || [];

  useEffect(() => {
    let user = supabase.auth.user();
    dispatch(setRoutines(user.id));
  }, []);

  return (
    <div className="routines-view">
      {routines.map((routine) => {
        return (
          <div className="routine-preview" key={routine.id}>
            <Link to={`/routines/${routine.id}`}>
              <div className="routine-info">
                <h2>{routine.name}</h2>
                <h3>{`Notes: ${routine.notes}`}</h3>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default AllRoutines;
