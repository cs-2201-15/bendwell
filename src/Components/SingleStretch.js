import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setSingleCamera } from "../store/camera";
import { setStretch } from "../store/stretch";

const SingleStretch = () => {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  let params = useParams();
  const stretchId = params.id;
  let stretch = useSelector((state) => state.stretch);
  const navigate = useNavigate();

  stretch = stretch[0] || {};
  console.log(stretch);

  useEffect(() => {
    dispatch(setStretch(stretchId));
    setLoading(false);
  }, []);

  const handleClick = () => {
    dispatch(setSingleCamera(stretch.id));
    navigate(`/testwindow`);
  };

  if (loading) {
    return <p>Loading...</p>;
  } else {
    return (
      <div className="single-stretch">
        <h2>{stretch.name}</h2>
        <h3>{`Target: ${stretch.target}`}</h3>
        <div className="stretch-content">
          <img src={stretch.image_url} alt="Stretch Img" />
          <p>{stretch.description}</p>
        </div>
        <button type="button" onClick={() => handleClick()}>
          Start Stretch
        </button>
      </div>
    );
  }
};

export default SingleStretch;
