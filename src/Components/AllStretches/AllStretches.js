import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setRoutines } from "../../store/routines";
import { addStretch } from "../../store/routine";
import { setStretches } from "../../store/stretches";
import { supabase } from "../../supabaseClient";

const AllStretches = () => {
  const dispatch = useDispatch();
  const stretches = useSelector((state) => state.stretches);
  const routines = useSelector((state) => state.routines);

  const [selectVal, setSelectVal] = useState("select a routine");
  //routine use selector

  let user = supabase.auth.user();

  useEffect(() => {
    dispatch(setStretches());
    dispatch(setRoutines(user.id));
  }, []);

  const handleSelect = (event) => {
    setSelectVal(event.target.value);
  };

  const handleClick = (stretch, selectedRoutineId) => {
    console.log(typeof selectVal);
    dispatch(addStretch(stretch.id, selectedRoutineId));
    const myRoutine = routines.filter((routine) => {
      return routine.id === Number(selectVal);
    });
    console.log("filter: ", myRoutine);
    alert(`Added ${stretch.name} to ${myRoutine[0].name}`);
  };

  return (
    <div>
      {console.log(selectVal)}
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
                onClick={() => handleClick(stretch, selectVal)}
              >
                Add to a routine
              </button>
              <select
                id="selectRoutines"
                name="routines"
                style={{ color: "black" }}
                value={selectVal}
                onChange={(event) => handleSelect(event)}
              >
                <option value="" label=""></option>
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
