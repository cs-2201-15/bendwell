import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { setRoutineCamera } from "../store/camera";
import { setRoutine } from "../store/routine";

const SingleRoutine = () => {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  let params = useParams();
  const navigate = useNavigate();

  const routineId = params.id;
  let routine = useSelector((state) => state.routine);
  routine = routine[0] || {};
  if (!routine.stretches) {
    routine.stretches = [];
  }
  console.log(routine);

  useEffect(() => {
    dispatch(setRoutine(routineId));
    setLoading(false);
  }, []);

  const handleClick = () => {
    dispatch(setRoutineCamera(routine.stretches));
    navigate(`/stretchcam`);
  };

  if (loading) {
    return <p>Loading...</p>;
  } else {
    return (
      <div className="single-stretch">
        <h2>{routine.name}</h2>
        <h3>{routine.notes}</h3>
        <button type="button" onClick={() => handleClick()}>
          Start Routine
        </button>
        {routine.stretches.map((stretch) => {
          return (
            <div className="stretch-preview" key={stretch.id}>
              <Link to={`/stretches/${stretch.id}`}>
                <p>{stretch.name}</p>
                <img src={stretch.image_url} alt="Stretch Img" />
                <p>{`Target: ${stretch.target}`}</p>
              </Link>
            </div>
          );
        })}
      </div>
    );
  }
};

export default SingleRoutine;
