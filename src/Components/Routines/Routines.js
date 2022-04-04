import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addRoutine, removeRoutine, setRoutines } from "../../store/routines";
import { supabase } from "../../supabaseClient";
import "./routines.scss";

const AllRoutines = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const routines = useSelector((state) => state.routines) || [];

  let user = supabase.auth.user();
  useEffect(() => {
    dispatch(setRoutines(user.id));
  }, []);

  const handleAddRoutine = () => {
    dispatch(addRoutine(user.id));
  };

  const handleDeleteRoutine = (id) => {
    dispatch(removeRoutine(id));
  };

  const renderRoutineNotes = (notes) => {
    if (notes.length > 400) {
      return `${notes.substring(0, 400)}...`;
    } else {
      return notes;
    }
  };

  return (
    <div className="routines">
      <div className="routines__topbar">
        <div className="routines__topbar-left">
          <h1 className="routines__header">Routines</h1>
          <p className="routines__routines-count">
            {routines.length} Routine{routines.length === 1 ? "" : "s"}
          </p>
        </div>
        <button
          className="routines__add-routine-btn"
          onClick={handleAddRoutine}
        >
          Add Routine
        </button>
      </div>
      <ul className="routines__routines">
        {routines.map((routine) => (
          <li className="routines__routine" key={routine.id}>
            {routine.stretches?.length > 0 && (
              <div className="routines__routine-left">
                {routine.stretches?.slice(0, 4)?.map((stretch, index) => (
                  <img
                    key={index}
                    className="routines__routine-stretch-image"
                    src={stretch.image_url}
                    alt={`${stretch.name} stretch`}
                  />
                ))}
              </div>
            )}
            <div className="routines__routine-middle">
              {routine.stretches?.length <= 0 && (
                <div className="routines__routine--no-stretches">
                  This routine has no stretches. 😭 Go&nbsp;
                  <Link className="" to="/stretches">
                    here
                  </Link>{" "}
                  to add one!
                </div>
              )}
              <div className="routines__routine-topbar">
                <p className="routines__routine-name">{routine.name}</p>
                <button
                  className="routines__remove-routine-btn"
                  onClick={handleDeleteRoutine}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
              <div className="routines__routine-middle-content">
                <p className="routines__routine-notes">
                  {renderRoutineNotes(routine.notes)}
                </p>

                <Link
                  className="routines__routine-link"
                  to={`/routines/${routine.id}`}
                >
                  Go to routine
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
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
                </Link>
              </div>
            </div>

            {routine.stretches?.length > 0 && (
              <div className="routines__routine-right">
                <h3 className="routines__stretches-title">
                  Stretches
                  <button
                    className="routines__add-stretch-btn"
                    onClick={() => navigate("/stretches")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </button>
                </h3>
                <ul className="routines__stretches-list">
                  {routine.stretches?.map((stretch, index) => (
                    <li className="routines__stretches-list-item" key={index}>
                      <p>
                        {index + 1}. {stretch.name}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllRoutines;
