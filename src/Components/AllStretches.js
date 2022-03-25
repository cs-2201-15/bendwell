import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setRoutines } from '../store/routines';
import { setStretches } from '../store/stretches';
import { supabase } from '../supabaseClient';

const AllStretches = () => {
  const dispatch = useDispatch();
  const stretches = useSelector((state) => state.stretches);
  const routines = useSelector((state) => state.routines);
  //routine use selector

  let user = supabase.auth.user();

  useEffect(() => {
    dispatch(setStretches());
    dispatch(setRoutines(user.id));
  }, []);
  // you need to add a dependency array (can be empty []) to this useEffect
  // or else it will dispatch over and over continuosly

  //map over
  // create button / drop down / add to routine
  // selected routine, submit will fire off thunk with routine id

  return (
    <div>
      {console.log(stretches)}
      {stretches.map((stretch) => {
        return (
          <div className="stretch-preview" key={stretch.id}>
            <Link to={`/stretches/${stretch.id}`}>
              <h2>{stretch.name}</h2>
              <img src={stretch.image_url} alt="Stretch Img" />
              <h3>{`Target: ${stretch.target}`}</h3>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default AllStretches;
