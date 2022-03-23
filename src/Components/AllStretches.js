import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setStretches } from "../store/stretches";

const AllStretches = () => {
  const dispatch = useDispatch();
  const stretches = useSelector((state) => state.stretches);

  useEffect(() => {
    dispatch(setStretches());
  }, []);
  // you need to add a dependency array (can be empty []) to this useEffect
  // or else it will dispatch over and over continuosly
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
