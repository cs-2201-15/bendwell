import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setStretch } from "../store/stretch";

const SingleStretch = () => {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  let params = useParams();
  const stretchId = params.id;
  let stretch = useSelector((state) => state.stretch);

  stretch = stretch[0] || {};
  console.log(stretch);

  useEffect(() => {
    dispatch(setStretch(stretchId));
    setLoading(false);
  }, []);

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
      </div>
    );
  }
};

export default SingleStretch;
