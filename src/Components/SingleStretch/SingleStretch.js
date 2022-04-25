import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
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
      <div>
        <div className="single-stretch-container">
          <div className="single-stretch-card">
            <h2>{stretch.name}</h2>
            <h3>{`Target: ${stretch.target}`}</h3>
            <div className="single-stretch-description">
              {/* <img src={stretch.stretchimages} alt="Stretch Img" /> */}
            </div>
            <button
              type="button"
              className="start-stretch-button"
              onClick={() => handleClick()}
            >
              Start Stretch
            </button>
          </div>

          <div className="secondhalf">
            <div className="stretch-gif">
              <img
                src={stretch.gif}
                alt="stretch"
                style={{ height: "370px", width: "350px" }}
              />
            </div>

            <div className="steps">
              <h2> Steps</h2>
              {stretch.one}
              <br />
              <br />
              {stretch.stepTwo}
              <br />
              <br />
              {stretch.stepThree}
              <br />
              <br />
              {stretch.stepFour}
              <br />
              <br />
              {stretch.stepFive}
            </div>
          </div>
          <div className="discover">
            <img
              src="https://static.thenounproject.com/png/4236378-200.png"
              alt="brave-icon"
              className="brave-icon"
            />
            <h2>
              Discover More <span style={{ color: "#23b54d" }}>Stretches</span>
            </h2>

            <Link to="/stretches">
              <button className="view-stretches">View Stretches</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
};

export default SingleStretch;
