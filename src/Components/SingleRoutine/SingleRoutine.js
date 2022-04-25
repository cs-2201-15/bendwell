import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { setRoutineCamera } from "../../store/camera";
import { deleteStretch, setRoutine } from "../../store/routine";
import EditDetails from "../EditDetails/EditDetails";
import "./singleroutine.scss";

const SingleRoutine = () => {
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState(false);
  const [isActive, setActive] = useState(false);

  const dispatch = useDispatch();
  let params = useParams();
  const navigate = useNavigate();

  const routineId = params.id;
  let routine = useSelector((state) => state.routine) || {};
  if (!routine.stretches) {
    routine.stretches = [];
  }

  useEffect(() => {
    dispatch(setRoutine(routineId));
    setLoading(false);
  }, []);

  const handleClick = () => {
    dispatch(setRoutineCamera(routine.stretches));
    navigate(`/testwindow`);
  };

  const handleDelete = (stretchId, routineId) => {
    dispatch(deleteStretch(stretchId, routineId));
  };

  const handleToggle = () => {
    setActive(!isActive);
  };

  if (loading) {
    return <p>Loading...</p>;
  } else {
    return (
      <>
        {details ? (
          <div className="edit-details">
            <EditDetails routine={routine} setDetails={setDetails} />
          </div>
        ) : null}
        <div
          className={`main-container ${isActive ? "_active" : ""}`}
          // style={{ width: "100vw", height: "100vh" }}
        >
          <div
            className="single-routine-header"
            style={{ borderBottom: "2px" }}
          >
            <h2 style={{ paddingTop: "10px" }}>{routine.name}</h2>
            <h3 style={{ color: "navy" }}>{routine.notes}</h3>
          </div>

          {/* <div className="landingpage-single"> */}
          {/* <h1 className="routine-banner">Personalized Routines</h1> */}
          {/* </div> */}

          <div className="single-routine-container">
            {routine.stretches.length ? (
              routine.stretches.map((stretch, i) => {
                return (
                  <div className="stretch-preview" key={i}>
                    <Link to={`/stretches/${stretch.id}`}>
                      <h2 style={{ color: "navy", paddingBottom: "5px" }}>
                        {stretch.name}
                      </h2>
                      <img src={stretch.image_url} alt="Stretch Img" />
                      <h3>{`Target: ${stretch.target}`}</h3>
                    </Link>
                    <button
                      className="add-to-routine"
                      onClick={() => handleDelete(stretch.id, routine.id)}
                    >
                      Remove Stretch
                    </button>
                  </div>
                );
              })
            ) : (
              <h4 className="warning">
                No current stretches. Go to "Stretches" tab to add some
                stretches here!
              </h4>
            )}
          </div>
          <div className="start-routine-footer">
            {routine.stretches.length ? (
              <button
                type="button"
                className="add-to-routine"
                onClick={() => handleClick()}
              >
                Start Routine
              </button>
            ) : (
              <></>
            )}
            <button
              className={`add-to-routine`}
              type="button"
              onClick={() => {
                setDetails(true);
              }}
            >
              Edit Details
            </button>
          </div>

          <div className="tier3">
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/005/004/110/small/challenge-icon-mountain-with-flag-business-logo-vector.jpg"
              alt="challenge_icon"
              className="challenge"
            />
            <div className="more">
              <span style={{ color: "#23b54d" }}>Ready</span> for more?
            </div>
            <Link to="/stretches">
              <button type="button" className="addmore">
                Add Stretches!
              </button>
            </Link>
          </div>
        </div>
      </>
    );
  }
};

export default SingleRoutine;
