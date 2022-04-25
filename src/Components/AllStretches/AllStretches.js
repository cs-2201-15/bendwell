import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setRoutines } from "../../store/routines";
import { addStretch } from "../../store/routine";
import { setStretches } from "../../store/stretches";
import { supabase } from "../../supabaseClient";
import "./allstretches.scss";

const AllStretches = () => {
  const dispatch = useDispatch();
  const stretches = useSelector((state) => state.stretches);
  const routines = useSelector((state) => state.routines);

  const [selectVal, setSelectVal] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStretch, setCurrentStretch] = useState(null);
  //routine use selector

  let user = supabase.auth.user();

  useEffect(() => {
    dispatch(setStretches());
    if (user) {
      dispatch(setRoutines(user.id));
    }
  }, []);

  const handleSelect = (event) => {
    setSelectVal(event.target.value);
  };

  const handleClick = (stretch, selectedRoutineId) => {
    dispatch(addStretch(stretch.id, selectedRoutineId));
    // const myRoutine = routines.filter((routine) => {
    //   return routine.id === selectVal;
    // });
    // alert(`Added ${stretch.name} to ${myRoutine[0].name}`);
  };

  return (
    <div className="stretch-container">
      {isModalOpen ? (
        <div className="add-routine-popup">
          <div className="add-routine-popup-card">
            <div className="add-routine-popup-card-top">
              <h1>Select a routine:</h1>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                onClick={() => {
                  setIsModalOpen(false);
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <div className="add-routine-popup-card-mid">
              {routines?.map((routine) => {
                return (
                  <div
                    className="add-routine-popup-card-mid-name"
                    key={routine.id}
                  >
                    <span
                      onClick={() => {
                        setIsModalOpen(false);
                        handleClick(currentStretch, routine.id);
                      }}
                    >
                      {routine.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
      {stretches.map((stretch) => {
        return (
          <div className="stretch-preview" key={stretch.id}>
            <div className="stretch-content">
              <Link to={`/stretches/${stretch.id}`}>
                {" "}
                <img src={stretch.stretchimages} alt="Stretch Img" />
                <div className="stretch-content-text">
                  <h2>{stretch.name}</h2>
                  <h3>{`Target: ${stretch.target}`}</h3>
                </div>
              </Link>
              {user ? (
                <>
                  <div className="add-to-routine">
                    <button
                      onClick={() => {
                        setIsModalOpen(true);
                        setCurrentStretch(stretch);
                      }}
                    >
                      Add to a routine
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </button>
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AllStretches;
