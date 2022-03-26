import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { setRoutineCamera } from "../store/camera";
import { deleteStretch, setRoutine } from "../store/routine";

const SingleRoutine = () => {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  let params = useParams();
  const navigate = useNavigate();

  const routineId = params.id;
  let routine = useSelector((state) => state.routine) || {};
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
    navigate(`/testwindow`);
  };

  const handleDelete = (stretchId, routineId) => {
    dispatch(deleteStretch(stretchId, routineId))
  }

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
              <button onClick={() => handleDelete(stretch.id, routine.id)}>Remove Stretch</button>
            </div>
          );
        })}
      </div>
    );
  }
};

export default SingleRoutine;
