import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStretches } from "../store/stretches";

const AllStretches = () => {
  const dispatch = useDispatch();
  const stretches = useSelector((state) => state.stretches);

  useEffect(() => {
    dispatch(setStretches());
  });

  return (
    <div>
      {console.log(stretches)}
      {stretches.map((stretch) => {
        return <h1>{stretch.name}</h1>;
      })}
    </div>
  );
};

export default AllStretches;
