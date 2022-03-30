import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setSingleCamera } from "../../store/camera";
import { setStretch } from "../../store/stretch";
import "./singlestretch.scss";

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
      <div className="single-stretch-container">
        <div className="single-stretch-card">
          <h2>{stretch.name}</h2>
          <h3>{`Target: ${stretch.target}`}</h3>
          <div className="single-stretch-description">
            <img src={stretch.image_url} alt="Stretch Img" />
            <h3>{stretch.description}</h3>
          </div>

          <button
            type="button"
            className="start-stretch-button"
            onClick={() => handleClick()}
          >
            Start Stretch
          </button>
        </div>
      </div>
    );
  }
};

export default SingleStretch;
