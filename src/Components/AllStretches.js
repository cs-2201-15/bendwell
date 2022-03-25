import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setRoutines } from "../store/routines";
import { setStretches } from "../store/stretches";
import { supabase } from "../supabaseClient";

const AllStretches = () => {
  const dispatch = useDispatch();
  const stretches = useSelector((state) => state.stretches);
  const routines = useSelector((state) => state.routines);

  const [selectVal, setSelectVal] = useState("select a routine");
  //routine use selector

  let user = supabase.auth.user();

  useEffect(() => {
    dispatch(setRoutines(user.id));
    dispatch(setStretches());
  }, []);

  const handleSelect = (event) => {
    setSelectVal(event.target.value);
  };

  const handleClick = () => {
    //dispatch our func on click
    return true;
  };

  return (
    <div>
      {stretches.map((stretch) => {
        return (
          <div className="stretch-preview" key={stretch.id}>
            <Link to={`/stretches/${stretch.id}`}>
              <h2>{stretch.name}</h2>
              <img src={stretch.image_url} alt="Stretch Img" />
              <h3>{`Target: ${stretch.target}`}</h3>
            </Link>
            <div>
              <button
                type="button"
                className="add-to-routine"
                onClick={() => handleClick()}
              >
                Add to a routine
              </button>
              <select
                id="selectRoutines"
                name="routines"
                value={selectVal}
                onChange={() => handleSelect}
              >
                {routines.map((routine) => {
                  return (
                    <option
                      key={routine.id}
                      value={routine.id}
                      label={routine.name}
                    >
                      {routine.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AllStretches;
